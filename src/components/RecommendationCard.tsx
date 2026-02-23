import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper';
import { TaskRecommendation, Goal } from '../types';
import { palette, shadows } from '../theme';

interface RecommendationCardProps {
  recommendation: TaskRecommendation;
  goal?: Goal;
  onStart: () => void;
  onSkip: () => void;
  onDismiss: () => void;
}

export default function RecommendationCard({
  recommendation,
  goal,
  onStart,
  onSkip,
  onDismiss,
}: RecommendationCardProps) {
  const { task, rationale } = recommendation;

  return (
    <Surface style={styles.card} elevation={0}>
      <Text variant="labelSmall" style={styles.label}>
        PICKED FOR YOU
      </Text>
      <Text variant="titleLarge" style={styles.taskTitle}>
        {task.title}
      </Text>
      {goal && (
        <Text variant="bodySmall" style={styles.goalName}>
          {goal.title}
        </Text>
      )}
      {task.estimatedMinutes && (
        <Text variant="bodySmall" style={styles.time}>
          ~{task.estimatedMinutes} min
        </Text>
      )}
      <Text variant="bodyMedium" style={styles.rationale}>
        {rationale}
      </Text>
      <View style={styles.actions}>
        <Button
          onPress={onDismiss}
          compact
          textColor={palette.inkFaint}
          style={styles.actionButton}
        >
          Close
        </Button>
        <Button
          onPress={onSkip}
          compact
          textColor={palette.terracotta}
          style={styles.actionButton}
        >
          Not this one
        </Button>
        <Button
          mode="contained"
          onPress={onStart}
          compact
          style={styles.startButton}
        >
          Let's go
        </Button>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 20,
    backgroundColor: palette.warmWhite,
    padding: 20,
    ...shadows.medium,
  },
  label: {
    color: palette.sage,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 10,
    fontSize: 10,
  },
  taskTitle: {
    color: palette.inkDark,
    fontWeight: '500',
    marginBottom: 4,
  },
  goalName: {
    color: palette.inkLight,
    marginBottom: 2,
  },
  time: {
    color: palette.inkFaint,
    marginBottom: 10,
  },
  rationale: {
    color: palette.inkMedium,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
    gap: 4,
  },
  actionButton: {
    borderRadius: 16,
  },
  startButton: {
    borderRadius: 16,
  },
});
