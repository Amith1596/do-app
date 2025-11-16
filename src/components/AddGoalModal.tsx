import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Portal, Modal, TextInput, Button, Text } from 'react-native-paper';
import { useGoals } from '../contexts/GoalsContext';

interface AddGoalModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function AddGoalModal({ visible, onDismiss }: AddGoalModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { createGoal } = useGoals();

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      await createGoal({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      setTitle('');
      setDescription('');
      onDismiss();
    } catch (error) {
      console.error('Error creating goal:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <ScrollView>
          <Text variant="headlineSmall" style={styles.title}>
            New Goal
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
              Create
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
