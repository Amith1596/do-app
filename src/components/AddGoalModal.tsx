import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Portal, Modal, TextInput, Button, Text } from 'react-native-paper';
import { useGoals } from '../contexts/GoalsContext';
import { palette, fonts } from '../theme';

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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text variant="titleLarge" style={styles.title}>
            New goal
          </Text>

          <TextInput
            label="What's your goal?"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
            outlineStyle={styles.inputOutline}
            autoFocus
          />

          <TextInput
            label="Why does it matter? (optional)"
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
              style={styles.createButton}
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
  createButton: {
    borderRadius: 20,
  },
});
