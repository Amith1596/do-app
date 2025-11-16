import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Portal, Modal, TextInput, Button, Text, Menu } from 'react-native-paper';
import { useTasks } from '../contexts/TasksContext';
import { useGoals } from '../contexts/GoalsContext';
import { Task } from '../types';

interface EditTaskModalProps {
  visible: boolean;
  task: Task | null;
  onDismiss: () => void;
}

export default function EditTaskModal({ visible, task, onDismiss }: EditTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState<string | undefined>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateTask } = useTasks();
  const { goals } = useGoals();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setSelectedGoalId(task.goalId);
    }
  }, [task]);

  const selectedGoal = goals.find((g) => g.id === selectedGoalId);

  const handleSubmit = async () => {
    if (!task || !title.trim()) return;

    setLoading(true);
    try {
      await updateTask(task.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        goalId: selectedGoalId,
      });
      onDismiss();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!task) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <ScrollView>
          <Text variant="headlineSmall" style={styles.title}>
            Edit Task
          </Text>

          <TextInput
            label="Task Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
            autoFocus
          />

          <TextInput
            label="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
          />

          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setMenuVisible(true)}
                style={styles.input}
              >
                {selectedGoal ? `Goal: ${selectedGoal.title}` : 'Link to Goal (Optional)'}
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

          <View style={styles.buttons}>
            <Button
              mode="outlined"
              onPress={onDismiss}
              disabled={loading}
              style={styles.button}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading || !title.trim()}
              style={styles.button}
            >
              Save
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 24,
    margin: 20,
    borderRadius: 8,
  },
  title: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    flex: 1,
  },
});
