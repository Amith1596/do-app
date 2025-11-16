import React from 'react';
import { StyleSheet } from 'react-native';
import { List, Checkbox, IconButton, useTheme } from 'react-native-paper';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onPress?: () => void;
}

export default function TaskItem({ task, onToggle, onDelete, onPress }: TaskItemProps) {
  const theme = useTheme();

  return (
    <List.Item
      title={task.title}
      description={task.description}
      onPress={onPress}
      left={() => (
        <Checkbox
          status={task.completed ? 'checked' : 'unchecked'}
          onPress={onToggle}
        />
      )}
      right={() => (
        <IconButton
          icon="delete"
          iconColor={theme.colors.error}
          onPress={onDelete}
        />
      )}
      style={[
        styles.item,
        task.completed && styles.completed,
      ]}
      titleStyle={task.completed ? styles.completedText : undefined}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 8,
  },
  completed: {
    opacity: 0.6,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
});
