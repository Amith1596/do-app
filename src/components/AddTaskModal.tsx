import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Portal,
  Modal,
  TextInput,
  Button,
  Text,
  Chip,
  Banner,
  Menu,
} from 'react-native-paper';
import { useTasks } from '../contexts/TasksContext';
import { useGoals } from '../contexts/GoalsContext';
import { Task } from '../types';
import { palette, fonts, shadows } from '../theme';

interface AddTaskModalProps {
  visible: boolean;
  onDismiss: () => void;
  parentTask?: Task;
  prefilledGoalId?: string;
}

const TIME_CHIPS = [5, 15, 30, 60];
const DIFFICULTIES: Array<{ label: string; value: NonNullable<Task['difficulty']>; color: string }> = [
  { label: 'Easy', value: 'easy', color: palette.diffEasy },
  { label: 'Medium', value: 'medium', color: palette.diffMedium },
  { label: 'Hard', value: 'hard', color: palette.diffHard },
];

export default function AddTaskModal({
  visible,
  onDismiss,
  parentTask,
  prefilledGoalId,
}: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState<string | undefined>(prefilledGoalId);
  const [estimatedMinutes, setEstimatedMinutes] = useState<number | undefined>();
  const [customMinutes, setCustomMinutes] = useState('');
  const [difficulty, setDifficulty] = useState<Task['difficulty']>();
  const [priority, setPriority] = useState<Task['priority']>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSubTaskCreator, setShowSubTaskCreator] = useState(false);
  const { createTask } = useTasks();
  const { goals } = useGoals();

  const selectedGoal = goals.find((g) => g.id === selectedGoalId);
  const showMakeItTiny = estimatedMinutes !== undefined && estimatedMinutes > 30 && !parentTask;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedGoalId(prefilledGoalId);
    setEstimatedMinutes(undefined);
    setCustomMinutes('');
    setDifficulty(undefined);
    setPriority(undefined);
    setShowSubTaskCreator(false);
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      await createTask({
        title: title.trim(),
        description: description.trim() || undefined,
        goalId: selectedGoalId,
        parentTaskId: parentTask?.id,
        completed: false,
        estimatedMinutes,
        difficulty,
        priority,
      });
      resetForm();
      onDismiss();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBreakDown = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      await createTask({
        title: title.trim(),
        description: description.trim() || undefined,
        goalId: selectedGoalId,
        completed: false,
        estimatedMinutes,
        difficulty,
        priority,
      });
      setShowSubTaskCreator(true);
    } catch (error) {
      console.error('Error creating parent task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChipPress = (minutes: number) => {
    setEstimatedMinutes(estimatedMinutes === minutes ? undefined : minutes);
    setCustomMinutes('');
  };

  const handleCustomMinutes = (text: string) => {
    setCustomMinutes(text);
    const parsed = parseInt(text, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setEstimatedMinutes(parsed);
    } else if (text === '') {
      setEstimatedMinutes(undefined);
    }
  };

  if (showSubTaskCreator) {
    return (
      <SubTaskCreatorInline
        visible={visible}
        goalId={selectedGoalId}
        onDismiss={() => {
          setShowSubTaskCreator(false);
          resetForm();
          onDismiss();
        }}
      />
    );
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text variant="titleLarge" style={styles.heading}>
            {parentTask ? 'Add a step' : 'New task'}
          </Text>

          <TextInput
            label="What do you need to do?"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
            outlineStyle={styles.inputOutline}
            autoFocus
          />

          {/* Time estimate */}
          <Text variant="labelMedium" style={styles.sectionLabel}>
            How long will it take?
          </Text>
          <View style={styles.chipRow}>
            {TIME_CHIPS.map((min) => (
              <Chip
                key={min}
                selected={estimatedMinutes === min}
                onPress={() => handleTimeChipPress(min)}
                style={styles.chip}
                selectedColor={palette.sageDark}
              >
                {min}m
              </Chip>
            ))}
            <TextInput
              label="Other"
              value={customMinutes}
              onChangeText={handleCustomMinutes}
              mode="outlined"
              keyboardType="numeric"
              style={styles.customTimeInput}
              outlineStyle={styles.inputOutline}
              dense
            />
          </View>

          {/* Difficulty */}
          <Text variant="labelMedium" style={styles.sectionLabel}>
            How hard is it?
          </Text>
          <View style={styles.chipRow}>
            {DIFFICULTIES.map((d) => (
              <Chip
                key={d.value}
                selected={difficulty === d.value}
                onPress={() => setDifficulty(difficulty === d.value ? undefined : d.value)}
                style={[styles.chip, difficulty === d.value && { backgroundColor: d.color }]}
                selectedColor={palette.inkDark}
              >
                {d.label}
              </Chip>
            ))}
          </View>

          {/* Priority */}
          <Text variant="labelMedium" style={styles.sectionLabel}>
            Priority
          </Text>
          <View style={styles.chipRow}>
            {(['low', 'medium', 'high'] as const).map((p) => (
              <Chip
                key={p}
                selected={priority === p}
                onPress={() => setPriority(priority === p ? undefined : p)}
                style={styles.chip}
                selectedColor={palette.sageDark}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Chip>
            ))}
          </View>

          {/* Goal picker */}
          <Text variant="labelMedium" style={styles.sectionLabel}>
            Link to a goal
          </Text>
          {goals.length === 0 ? (
            <Text variant="bodySmall" style={styles.noGoals}>
              Create a goal first to link tasks to it.
            </Text>
          ) : (
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setMenuVisible(true)}
                  style={styles.goalButton}
                  icon={selectedGoal ? 'target' : 'plus'}
                  textColor={selectedGoal ? palette.sage : palette.inkLight}
                >
                  {selectedGoal ? selectedGoal.title : 'Choose a goal'}
                </Button>
              }
            >
              <Menu.Item
                onPress={() => {
                  setSelectedGoalId(undefined);
                  setMenuVisible(false);
                }}
                title="No Goal"
              />
              {goals.map((goal) => (
                <Menu.Item
                  key={goal.id}
                  onPress={() => {
                    setSelectedGoalId(goal.id);
                    setMenuVisible(false);
                  }}
                  title={goal.title}
                />
              ))}
            </Menu>
          )}

          <TextInput
            label="Notes (optional)"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={2}
            style={styles.input}
            outlineStyle={styles.inputOutline}
          />

          {/* "Make it tiny" prompt */}
          {showMakeItTiny && (
            <Banner
              visible
              actions={[
                {
                  label: 'Break it down',
                  onPress: handleBreakDown,
                },
              ]}
              icon="leaf"
              style={styles.banner}
            >
              Tasks over 30 minutes are harder to start. Break this into smaller, gentler steps?
            </Banner>
          )}

          <View style={styles.buttons}>
            <Button
              mode="text"
              onPress={() => {
                resetForm();
                onDismiss();
              }}
              disabled={loading}
              textColor={palette.inkLight}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading || !title.trim()}
              style={styles.createButton}
            >
              Create
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

function SubTaskCreatorInline({
  visible,
  goalId,
  onDismiss,
}: {
  visible: boolean;
  goalId?: string;
  onDismiss: () => void;
}) {
  const [subTitle, setSubTitle] = useState('');
  const [subMinutes, setSubMinutes] = useState<number | undefined>();
  const [subTasks, setSubTasks] = useState<Array<{ title: string; minutes?: number }>>([]);
  const [loading, setLoading] = useState(false);
  const { createTask, tasks } = useTasks();

  const parentTask = tasks[0];

  const handleAddSubTask = () => {
    if (!subTitle.trim()) return;
    setSubTasks((prev) => [...prev, { title: subTitle.trim(), minutes: subMinutes }]);
    setSubTitle('');
    setSubMinutes(undefined);
  };

  const handleDone = async () => {
    const allSubTasks = [...subTasks];
    if (subTitle.trim()) {
      allSubTasks.push({ title: subTitle.trim(), minutes: subMinutes });
    }

    if (allSubTasks.length === 0) {
      onDismiss();
      return;
    }

    setLoading(true);
    try {
      for (const st of allSubTasks) {
        await createTask({
          title: st.title,
          completed: false,
          estimatedMinutes: st.minutes,
          goalId,
          parentTaskId: parentTask?.id,
        });
      }
      onDismiss();
    } catch (error) {
      console.error('Error creating sub-tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text variant="titleLarge" style={styles.heading}>
            Break it down
          </Text>
          <Text variant="bodyMedium" style={styles.subHeading}>
            Smaller steps for: {parentTask?.title}
          </Text>

          {subTasks.map((st, i) => (
            <View key={i} style={styles.subTaskRow}>
              <View style={styles.subTaskDot} />
              <Text variant="bodyMedium" style={styles.subTaskText}>
                {st.title} {st.minutes ? `(${st.minutes}m)` : ''}
              </Text>
            </View>
          ))}

          <TextInput
            label="Step title"
            value={subTitle}
            onChangeText={setSubTitle}
            mode="outlined"
            style={styles.input}
            outlineStyle={styles.inputOutline}
            autoFocus
          />

          <View style={styles.chipRow}>
            {TIME_CHIPS.map((min) => (
              <Chip
                key={min}
                selected={subMinutes === min}
                onPress={() => setSubMinutes(subMinutes === min ? undefined : min)}
                style={styles.chip}
                selectedColor={palette.sageDark}
              >
                {min}m
              </Chip>
            ))}
          </View>

          <View style={styles.buttons}>
            <Button
              mode="outlined"
              onPress={handleAddSubTask}
              disabled={!subTitle.trim()}
              style={styles.addAnotherButton}
              textColor={palette.sage}
            >
              + Add another
            </Button>
            <Button mode="contained" onPress={handleDone} loading={loading} style={styles.createButton}>
              Done
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: palette.warmWhite,
    padding: 24,
    margin: 20,
    borderRadius: 24,
    maxHeight: '85%',
    ...shadows.lifted,
  },
  heading: {
    marginBottom: 16,
    color: palette.inkDark,
    fontFamily: fonts.bold,
    letterSpacing: -0.3,
  },
  subHeading: {
    marginBottom: 16,
    color: palette.inkLight,
  },
  sectionLabel: {
    marginBottom: 8,
    marginTop: 4,
    color: palette.inkLight,
    letterSpacing: 1.2,
    fontFamily: fonts.medium,
    textTransform: 'uppercase' as const,
    fontSize: 11,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  inputOutline: {
    borderRadius: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  chip: {
    borderRadius: 16,
  },
  customTimeInput: {
    width: 80,
    height: 36,
    backgroundColor: 'transparent',
  },
  goalButton: {
    marginBottom: 12,
    alignSelf: 'flex-start',
    borderRadius: 16,
    borderColor: palette.sandDark,
  },
  noGoals: {
    color: palette.inkFaint,
    marginBottom: 12,
  },
  banner: {
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: palette.sageSurface,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  createButton: {
    borderRadius: 20,
  },
  addAnotherButton: {
    borderRadius: 20,
    borderColor: palette.sageLight,
  },
  subTaskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.sand,
  },
  subTaskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.sage,
    marginRight: 10,
  },
  subTaskText: {
    color: palette.inkDark,
  },
});
