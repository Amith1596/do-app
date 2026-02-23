import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Portal, Modal, TextInput, Button, Text } from 'react-native-paper';
import { useGoals } from '../contexts/GoalsContext';
import { Goal } from '../types';
import { palette, fonts } from '../theme';

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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text variant="titleLarge" style={styles.title}>
            Edit goal
          </Text>

          <TextInput
            label="Goal title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
            outlineStyle={styles.inputOutline}
            autoFocus
          />

          <TextInput
            label="Description (optional)"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
            outlineStyle={styles.inputOutline}
          />

          <View style={styles.buttons}>
            <Button
              mode="text"
              onPress={onDismiss}
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
              style={styles.saveButton}
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
    backgroundColor: palette.cream,
    padding: 24,
    margin: 20,
    borderRadius: 24,
  },
  title: {
    marginBottom: 16,
    color: palette.inkDark,
    fontFamily: fonts.bold,
    letterSpacing: -0.3,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  inputOutline: {
    borderRadius: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  saveButton: {
    borderRadius: 20,
  },
});
