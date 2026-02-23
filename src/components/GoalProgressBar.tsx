import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { palette, fonts } from '../theme';

interface GoalProgressBarProps {
  completed: number;
  total: number;
}

function getProgressColor(percentage: number): string {
  if (percentage >= 75) return palette.successGreen;
  if (percentage >= 50) return palette.sage;
  if (percentage >= 25) return palette.golden;
  return palette.inkFaint;
}

export default function GoalProgressBar({ completed, total }: GoalProgressBarProps) {
  if (total === 0) {
    return (
      <Text variant="bodySmall" style={styles.noTasks}>
        No tasks linked yet
      </Text>
    );
  }

  const percentage = Math.round((completed / total) * 100);
  const color = getProgressColor(percentage);

  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text variant="bodySmall" style={styles.label}>
        {completed} of {total} done
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
  },
  barBackground: {
    height: 6,
    backgroundColor: palette.sand,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  label: {
    marginTop: 4,
    color: palette.inkLight,
    fontSize: 11,
    fontFamily: fonts.medium,
  },
  noTasks: {
    color: palette.inkFaint,
    marginTop: 2,
    fontSize: 11,
    fontFamily: fonts.regular,
  },
});
