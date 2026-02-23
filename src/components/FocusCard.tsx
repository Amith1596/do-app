import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { TaskRecommendation } from '../types';
import { palette, fonts, shadows } from '../theme';
import { useEntranceAnimation } from '../utils/animations';

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string }> = {
  easy: { bg: palette.diffEasy, text: palette.diffEasyText },
  medium: { bg: palette.diffMedium, text: palette.diffMediumText },
  hard: { bg: palette.diffHard, text: palette.diffHardText },
};

interface FocusCardProps {
  recommendation: TaskRecommendation;
  goalName?: string;
  onDoIt: () => void;
  onNotThis: () => void;
}

export default function FocusCard({
  recommendation,
  goalName,
  onDoIt,
  onNotThis,
}: FocusCardProps) {
  const { task, rationale } = recommendation;
  const { opacity, translateY } = useEntranceAnimation(task.id);

  const badges: React.ReactNode[] = [];

  if (task.estimatedMinutes) {
    badges.push(
      <View key="time" style={[styles.badge, { backgroundColor: palette.sand }]}>
        <Text style={[styles.badgeText, { color: palette.inkMedium }]}>
          ~{task.estimatedMinutes}m
        </Text>
      </View>
    );
  }

  if (task.difficulty) {
    const colors = DIFFICULTY_COLORS[task.difficulty];
    badges.push(
      <View key="diff" style={[styles.badge, { backgroundColor: colors.bg }]}>
        <Text style={[styles.badgeText, { color: colors.text }]}>
          {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
        </Text>
      </View>
    );
  }

  if (goalName) {
    badges.push(
      <View key="goal" style={[styles.badge, { backgroundColor: palette.sageSurface }]}>
        <Text style={[styles.badgeText, { color: palette.sageDark }]}>
          {goalName}
        </Text>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      {badges.length > 0 && (
        <View style={styles.badgeRow}>{badges}</View>
      )}

      <Text variant="headlineSmall" style={styles.title}>
        {task.title}
      </Text>

      {task.description ? (
        <Text
          variant="bodyMedium"
          style={styles.description}
          numberOfLines={2}
        >
          {task.description}
        </Text>
      ) : null}

      <Text variant="bodySmall" style={styles.rationale}>
        {rationale}
      </Text>

      <View style={styles.buttonRow}>
        <Button
          mode="outlined"
          onPress={onNotThis}
          style={styles.buttonNotThis}
          labelStyle={styles.buttonNotThisLabel}
          contentStyle={styles.buttonContent}
        >
          Not this
        </Button>
        <Button
          mode="contained"
          onPress={onDoIt}
          style={styles.buttonDoIt}
          labelStyle={styles.buttonDoItLabel}
          contentStyle={styles.buttonContent}
          buttonColor={palette.sage}
        >
          Do it
        </Button>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: palette.warmWhite,
    padding: 28,
    ...shadows.lifted,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: fonts.medium,
    letterSpacing: 0.3,
    textTransform: 'uppercase' as const,
  },
  title: {
    color: palette.inkDark,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginVertical: 20,
    letterSpacing: -0.5,
  },
  description: {
    color: palette.inkLight,
    textAlign: 'center',
  },
  rationale: {
    color: palette.inkFaint,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: fonts.regular,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
  },
  buttonNotThis: {
    flex: 1,
    borderRadius: 24,
    borderColor: palette.sandDark,
  },
  buttonNotThisLabel: {
    color: palette.inkLight,
  },
  buttonDoIt: {
    flex: 1,
    borderRadius: 24,
  },
  buttonDoItLabel: {
    color: '#FFFFFF',
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
