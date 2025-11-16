import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Portal, Modal, TextInput, Button, Text } from 'react-native-paper';
import { useGoals } from '../contexts/GoalsContext';
import { Goal } from '../types';

interface EditGoalModalProps {
  visible: boolean;
  goal: Goal | null;
  onDismiss: () => void;
}

export default function EditGoalModal({ visible, goal, onDismiss }: EditGoalModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateGoal } = useGoals();

  useEffect(() => {
    if (goal) {
      setTitle(goal.title);
      setDescription(goal.description || '');
    }
  }, [goal]);

  const handleSubmit = async () => {
    if (!goal || !title.trim()) return;

    setLoading(true);
    try {
      await updateGoal(goal.id, {
        title: title.trim(),
        description: description.trim() || undefined,
      });
      onDismiss();
    } catch (error) {
      console.error('Error updating goal:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!goal) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <ScrollView>
          <Text variant="headlineSmall" style={styles.title}>
            Edit Goal
          </Text>

          <TextInput
            label="Goal Title"
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
