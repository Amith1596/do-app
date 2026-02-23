import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Checkbox, IconButton, Text, Surface } from 'react-native-paper';
import { Task } from '../types';
import { palette, fonts } from '../theme';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onPress?: () => void;
  hasSubTasks?: boolean;
}

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string }> = {
  easy: { bg: palette.diffEasy, text: palette.diffEasyText },
  medium: { bg: palette.diffMedium, text: palette.diffMediumText },
  hard: { bg: palette.diffHard, text: palette.diffHardText },
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
  hasSubTasks,
}: TaskItemProps) {
  const badges: React.ReactNode[] = [];

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

  if (task.estimatedMinutes) {
    badges.push(
      <View key="time" style={[styles.badge, { backgroundColor: palette.sand }]}>
        <Text style={[styles.badgeText, { color: palette.inkMedium }]}>
          {task.estimatedMinutes}m
        </Text>
      </View>
    );
  }

  if (hasSubTasks) {
    badges.push(
      <View key="sub" style={[styles.badge, { backgroundColor: palette.energyLowBg }]}>
        <Text style={[styles.badgeText, { color: palette.energyLowText }]}>
          Has steps
        </Text>
      </View>
    );
  }

  return (
    <Pressable onPress={onEdit}>
      <Surface style={[styles.card, task.completed && styles.cardCompleted]} elevation={0}>
        <View style={styles.row}>
          <Checkbox
            status={task.completed ? 'checked' : 'unchecked'}
            onPress={onToggle}
            color={palette.sage}
            uncheckedColor={palette.inkFaint}
          />
          <View style={styles.content}>
            <Text
              variant="bodyLarge"
              style={[styles.title, task.completed && styles.titleCompleted]}
              numberOfLines={2}
            >
              {task.title}
            </Text>
            {task.description ? (
              <Text variant="bodySmall" style={styles.description} numberOfLines={1}>
                {task.description}
              </Text>
            ) : null}
            {badges.length > 0 && <View style={styles.badgeRow}>{badges}</View>}
          </View>
          <View style={styles.actions}>
            <IconButton
              icon="delete-outline"
              iconColor={palette.inkFaint}
              onPress={onDelete}
              size={18}
            />
          </View>
        </View>
      </Surface>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 16,
    backgroundColor: palette.warmWhite,
    padding: 4,
    borderWidth: 1,
    borderColor: palette.border,
  },
  cardCompleted: {
    opacity: 0.55,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  content: {
    flex: 1,
    paddingTop: 6,
    paddingRight: 4,
  },
  title: {
    color: palette.inkDark,
    fontFamily: fonts.medium,
    lineHeight: 22,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: palette.inkLight,
  },
  description: {
    color: palette.inkLight,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  actions: {
    paddingTop: 2,
  },
});
