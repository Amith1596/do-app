import React, { useState, useCallback, useMemo, useRef, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Animated, ScrollView } from 'react-native';
import { View } from 'react-native';
import { Text, FAB, Snackbar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTasks } from '../contexts/TasksContext';
import { useGoals } from '../contexts/GoalsContext';
import { EnergyState, TaskRecommendation, TimerSession } from '../types';
import { getRecommendation, filterByEnergy, getEnergyAvailability } from '../utils/recommendations';
import { calculateMomentum } from '../utils/momentum';
import { palette, fonts } from '../theme';
import EnergySelector from '../components/EnergySelector';
import FocusCard from '../components/FocusCard';
import MomentumMeter from '../components/MomentumMeter';
import TimerView from '../components/TimerView';
import AddTaskModal from '../components/AddTaskModal';

const ENERGY_BACKGROUNDS: Record<string, string> = {
  none: palette.cream,
  low: palette.energyScreenLow,
  steady: palette.energyScreenSteady,
  wired: palette.energyScreenWired,
};

function energyToIndex(energy: EnergyState | null): number {
  if (!energy) return 0;
  if (energy === 'low') return 1;
  if (energy === 'steady') return 2;
  return 3; // wired
}

export default function FocusScreen() {
  const [energy, setEnergy] = useState<EnergyState | null>(null);
  const [skippedIds, setSkippedIds] = useState<string[]>([]);
  const [skipCount, setSkipCount] = useState(0);
  const [lastCompletedGoalId, setLastCompletedGoalId] = useState<string | undefined>();
  const [timerSession, setTimerSession] = useState<TimerSession | null>(null);
  const [timeComparison, setTimeComparison] = useState<string | null>(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const navigation = useNavigation();
  const { tasks, toggleTask, updateTask, celebrationMessage, clearCelebration } = useTasks();
  const { goals } = useGoals();

  // --- Animated background ---
  const bgAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: energyToIndex(energy),
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [energy, bgAnim]);

  const animatedBg = bgAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [
      palette.cream,
      palette.energyScreenLow,
      palette.energyScreenSteady,
      palette.energyScreenWired,
    ],
  });

  // Sync header background with energy state
  useLayoutEffect(() => {
    const bgColor = energy ? ENERGY_BACKGROUNDS[energy] : palette.cream;
    navigation.setOptions({
      headerStyle: {
        backgroundColor: bgColor,
        shadowColor: 'transparent',
        elevation: 0,
      },
    });
  }, [energy, navigation]);

  const momentum = useMemo(() => calculateMomentum(tasks), [tasks]);

  const todayCount = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return tasks.filter(
      (t) => t.completed && t.completedAt && new Date(t.completedAt) >= startOfToday
    ).length;
  }, [tasks]);

  const recommendation: TaskRecommendation | null = useMemo(() => {
    if (!energy) return null;
    return getRecommendation(tasks, goals, energy, skippedIds, lastCompletedGoalId);
  }, [tasks, goals, energy, skippedIds, lastCompletedGoalId]);

  const energyAvailability = useMemo(() => {
    if (!energy) return null;
    return getEnergyAvailability(tasks);
  }, [tasks, energy]);

  const recommendedGoalName = useMemo(() => {
    if (!recommendation?.task.goalId) return undefined;
    return goals.find((g) => g.id === recommendation.task.goalId)?.title;
  }, [recommendation, goals]);

  const handleEnergySelect = useCallback((selected: EnergyState) => {
    setEnergy(selected);
    setSkippedIds([]);
    setSkipCount(0);
  }, []);

  const handleNotThis = useCallback(() => {
    if (!recommendation || !energy) return;
    const newSkippedIds = [...skippedIds, recommendation.task.id];

    // Check if all available tasks at this energy level have been skipped
    const incomplete = tasks.filter((t) => !t.completed);
    const candidates = filterByEnergy(incomplete, energy);
    const available = candidates.length > 0 ? candidates : incomplete;
    const allSkipped = available.every((t) => newSkippedIds.includes(t.id));

    if (allSkipped) {
      // Circular loop: reset so recommendations start fresh from #1
      setSkippedIds([]);
      setSkipCount(0);
    } else {
      setSkippedIds(newSkippedIds);
      setSkipCount((prev) => prev + 1);
    }
  }, [recommendation, skippedIds, tasks, energy]);

  const handleDoIt = useCallback(() => {
    if (!recommendation) return;
    setTimerSession({
      taskId: recommendation.task.id,
      taskTitle: recommendation.task.title,
      estimatedMinutes: recommendation.task.estimatedMinutes || 15,
      startedAt: new Date(),
    });
  }, [recommendation]);

  const handleTimerDone = useCallback(
    async (actualSeconds: number) => {
      if (!timerSession) return;

      const estimatedSeconds = timerSession.estimatedMinutes * 60;
      const actualMinutes = Math.round(actualSeconds / 60);
      const estimatedMinutes = timerSession.estimatedMinutes;

      // Generate time comparison message (shame-free)
      const diff = actualSeconds - estimatedSeconds;
      if (Math.abs(diff) < 30) {
        setTimeComparison(`You guessed ${estimatedMinutes} min, took ${actualMinutes} min. Spot on!`);
      } else if (diff > 0) {
        setTimeComparison(
          `You guessed ${estimatedMinutes} min, took ${actualMinutes} min — that's common, your estimates will get better.`
        );
      } else {
        setTimeComparison(
          `You guessed ${estimatedMinutes} min, took ${actualMinutes} min. Faster than you thought!`
        );
      }

      // Mark task complete
      await toggleTask(timerSession.taskId);
      setLastCompletedGoalId(
        tasks.find((t) => t.id === timerSession.taskId)?.goalId || undefined
      );
      setSkippedIds([]);
      setSkipCount(0);
      setTimerSession(null);
    },
    [timerSession, toggleTask, tasks]
  );

  const handleTimerAbandon = useCallback(() => {
    setTimerSession(null);
  }, []);

  const handleChangeEnergy = useCallback(() => {
    setEnergy(null);
    setSkippedIds([]);
    setSkipCount(0);
  }, []);

  // --- Focus view content ---
  const allDone = tasks.filter((t) => !t.completed).length === 0;
  const noTasks = tasks.length === 0;

  return (
    <Animated.View style={[styles.container, { backgroundColor: animatedBg }]}>
      {timerSession ? (
        <TimerView
          session={timerSession}
          onDone={handleTimerDone}
          onAbandon={handleTimerAbandon}
        />
      ) : !energy ? (
        <EnergySelector onSelect={handleEnergySelect} />
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Momentum meter */}
          <MomentumMeter momentum={momentum} />

          {/* Energy indicator + change button */}
          <View style={styles.energyRow}>
            <Text variant="bodySmall" style={styles.energyLabel}>
              Energy: {energy === 'low' ? 'Low' : energy === 'steady' ? 'Steady' : 'Wired'}
            </Text>
            <Button
              mode="text"
              onPress={handleChangeEnergy}
              compact
              labelStyle={styles.changeEnergyLabel}
            >
              Change
            </Button>
          </View>

          {/* Main content area */}
          <View style={styles.focusArea}>
            {noTasks ? (
              <View style={styles.emptyState}>
                <Text variant="titleLarge" style={styles.emptyTitle}>
                  A clean slate
                </Text>
                <Text variant="bodyMedium" style={styles.emptySubtitle}>
                  Tap + to add your first task
                </Text>
              </View>
            ) : allDone ? (
              <View style={styles.emptyState}>
                <Text variant="titleLarge" style={styles.emptyTitle}>
                  Nothing right now
                </Text>
                <Text variant="bodyMedium" style={styles.emptySubtitle}>
                  Enjoy the quiet. You've earned it.
                </Text>
              </View>
            ) : recommendation ? (
              <>
                <FocusCard
                  recommendation={recommendation}
                  goalName={recommendedGoalName}
                  onDoIt={handleDoIt}
                  onNotThis={handleNotThis}
                />
                {skipCount >= 3 && (
                  <Text variant="bodySmall" style={styles.skipHint}>
                    Having trouble picking? Try changing your energy level.
                  </Text>
                )}
              </>
            ) : (
              <View style={styles.emptyState}>
                <Text variant="titleLarge" style={styles.emptyTitle}>
                  Nothing matches right now
                </Text>
                {energyAvailability && (() => {
                  const alternatives = (['low', 'steady', 'wired'] as const)
                    .filter((level) => level !== energy && energyAvailability[level] > 0);
                  if (alternatives.length > 0) {
                    const parts = alternatives.map((level) => {
                      const count = energyAvailability[level];
                      const label = level === 'low' ? 'Low' : level === 'steady' ? 'Steady' : 'Wired';
                      return `${count} at ${label}`;
                    });
                    return (
                      <Text variant="bodyMedium" style={styles.emptySubtitle}>
                        You have {parts.join(' and ')} energy. Try switching.
                      </Text>
                    );
                  }
                  return (
                    <Text variant="bodyMedium" style={styles.emptySubtitle}>
                      Try adding time estimates or difficulty to your tasks.
                    </Text>
                  );
                })()}
                <Button
                  mode="outlined"
                  onPress={handleChangeEnergy}
                  style={styles.changeButton}
                  textColor={palette.sage}
                >
                  Change energy
                </Button>
              </View>
            )}
          </View>

          {/* Today's count */}
          {todayCount > 0 && (
            <Text variant="bodySmall" style={styles.todayCount}>
              {todayCount} task{todayCount !== 1 ? 's' : ''} done today
            </Text>
          )}
        </ScrollView>
      )}

      {/* Quick add FAB */}
      <FAB
        icon="plus"
        style={styles.fab}
        color="#FFFFFF"
        onPress={() => setAddModalVisible(true)}
      />

      <AddTaskModal
        visible={addModalVisible}
        onDismiss={() => setAddModalVisible(false)}
      />

      {/* Celebration snackbar */}
      <Snackbar
        visible={!!celebrationMessage}
        onDismiss={clearCelebration}
        duration={2500}
        style={styles.snackbar}
        action={{ label: 'Nice', onPress: clearCelebration }}
      >
        {celebrationMessage || ''}
      </Snackbar>

      {/* Time comparison snackbar */}
      <Snackbar
        visible={!!timeComparison}
        onDismiss={() => setTimeComparison(null)}
        duration={4000}
        style={styles.timeSnackbar}
      >
        {timeComparison || ''}
      </Snackbar>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  energyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  energyLabel: {
    color: palette.inkLight,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
    fontFamily: fonts.medium,
    fontSize: 11,
  },
  changeEnergyLabel: {
    fontSize: 12,
    color: palette.inkLight,
  },
  focusArea: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: palette.inkDark,
    fontFamily: fonts.bold,
    letterSpacing: -0.3,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: palette.inkLight,
    textAlign: 'center',
    lineHeight: 22,
  },
  changeButton: {
    marginTop: 20,
    borderRadius: 20,
    borderColor: palette.sageLight,
  },
  skipHint: {
    textAlign: 'center',
    color: palette.inkFaint,
    marginTop: 16,
    paddingHorizontal: 40,
  },
  todayCount: {
    textAlign: 'center',
    color: palette.inkLight,
    paddingBottom: 16,
    letterSpacing: 1,
    fontFamily: fonts.medium,
    textTransform: 'uppercase' as const,
    fontSize: 11,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: palette.sage,
  },
  snackbar: {
    backgroundColor: palette.sageDark,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  timeSnackbar: {
    backgroundColor: palette.inkDark,
    borderRadius: 12,
    marginHorizontal: 16,
  },
});
