import React from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { Goal } from '../types';
import { palette, fonts, shadows } from '../theme';
import { usePressAnimation } from '../utils/animations';
import GoalProgressBar from './GoalProgressBar';

interface GoalItemProps {
  goal: Goal;
  taskCount?: number;
  completedCount?: number;
  onDelete: () => void;
  onEdit: () => void;
  onPress?: () => void;
}

export default function GoalItem({
  goal,
  taskCount = 0,
  completedCount = 0,
  onDelete,
  onEdit,
}: GoalItemProps) {
  const { scale, onPressIn, onPressOut } = usePressAnimation();

  return (
    <Pressable onPress={onEdit} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View style={styles.header}>
          <View
            style={[
              styles.colorDot,
              { backgroundColor: goal.color || palette.sage },
            ]}
          />
          <View style={styles.titleArea}>
            <Text variant="titleMedium" style={styles.title}>
              {goal.title}
            </Text>
            {goal.description ? (
              <Text variant="bodySmall" style={styles.description} numberOfLines={2}>
                {goal.description}
              </Text>
            ) : null}
          </View>
          <IconButton
            icon="delete-outline"
            iconColor={palette.inkFaint}
            onPress={onDelete}
            size={18}
          />
        </View>
        <View style={styles.progressArea}>
          <GoalProgressBar completed={completedCount} total={taskCount} />
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 16,
    backgroundColor: palette.warmWhite,
    padding: 16,
    ...shadows.soft,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 6,
    marginRight: 12,
  },
  titleArea: {
    flex: 1,
  },
  title: {
    color: palette.inkDark,
    fontFamily: fonts.bold,
  },
  description: {
    color: palette.inkLight,
    marginTop: 2,
  },
  progressArea: {
    marginTop: 12,
    paddingLeft: 24,
  },
});
