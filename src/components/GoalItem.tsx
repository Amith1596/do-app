import React from 'react';
import { StyleSheet } from 'react-native';
import { List, IconButton, useTheme, Chip } from 'react-native-paper';
import { Goal } from '../types';

interface GoalItemProps {
  goal: Goal;
  taskCount?: number;
  onDelete: () => void;
  onPress?: () => void;
}

export default function GoalItem({ goal, taskCount = 0, onDelete, onPress }: GoalItemProps) {
  const theme = useTheme();

  return (
    <List.Item
      title={goal.title}
      description={goal.description}
      onPress={onPress}
      left={(props) => (
        <List.Icon
          {...props}
          icon="target"
          color={goal.color || theme.colors.primary}
        />
      )}
      right={() => (
        <>
          {taskCount > 0 && (
            <Chip style={styles.chip}>{taskCount} tasks</Chip>
          )}
          <IconButton
            icon="delete"
            iconColor={theme.colors.error}
            onPress={onDelete}
          />
        </>
      )}
      style={styles.item}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 8,
  },
  chip: {
    alignSelf: 'center',
    marginRight: 8,
  },
});
