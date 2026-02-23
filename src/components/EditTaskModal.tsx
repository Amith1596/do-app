import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Portal,
  Modal,
  TextInput,
  Button,
  Text,
  Chip,
  Menu,
} from 'react-native-paper';
import { useTasks } from '../contexts/TasksContext';
import { useGoals } from '../contexts/GoalsContext';
import { Task } from '../types';
import { palette, fonts } from '../theme';

interface EditTaskModalProps {
  visible: boolean;
  task: Task | null;
  onDismiss: () => void;
}

const TIME_CHIPS = [5, 15, 30, 60];
const DIFFICULTIES: Array<{ label: string; value: NonNullable<Task['difficulty']>; color: string }> = [
  { label: 'Easy', value: 'easy', color: palette.diffEasy },
  { label: 'Medium', value: 'medium', color: palette.diffMedium },
  { label: 'Hard', value: 'hard', color: palette.diffHard },
];

export default function EditTaskModal({ visible, task, onDismiss }: EditTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState<string | undefined>();
  const [estimatedMinutes, setEstimatedMinutes] = useState<number | undefined>();
  const [customMinutes, setCustomMinutes] = useState('');
  const [difficulty, setDifficulty] = useState<Task['difficulty']>();
  const [priority, setPriority] = useState<Task['priority']>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateTask } = useTasks();
  const { goals } = useGoals();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setSelectedGoalId(task.goalId);
      setEstimatedMinutes(task.estimatedMinutes);
      setCustomMinutes(
        task.estimatedMinutes && !TIME_CHIPS.includes(task.estimatedMinutes)
          ? String(task.estimatedMinutes)
          : ''
      );
      setDifficulty(task.difficulty);
      setPriority(task.priority);
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
        estimatedMinutes,
        difficulty,
        priority,
      });
      onDismiss();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChipPress = (minutes: number) => {
    setEstimatedMinutes(estimatedMinutes === minutes ? undefined : minutes);
    setCustomMinutes('');
  };

  const handleCustomMinutes = (text: string) => {
    setCustomMinutes(text);
    const parsed = parseInt(text, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setEstimatedMinutes(parsed);
    } else if (text === '') {
      setEstimatedMinutes(undefined);
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text variant="titleLarge" style={styles.heading}>
            Edit task
          </Text>

          <TextInput
            label="Task title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
            outlineStyle={styles.inputOutline}
            autoFocus
          />

          {/* Time estimate */}
          <Text variant="labelMedium" style={styles.sectionLabel}>
            Time estimate
          </Text>
          <View style={styles.chipRow}>
            {TIME_CHIPS.map((min) => (
              <Chip
                key={min}
                selected={estimatedMinutes === min}
                onPress={() => handleTimeChipPress(min)}
                style={styles.chip}
                selectedColor={palette.sageDark}
              >
                {min}m
              </Chip>
            ))}
            <TextInput
              label="Other"
              value={customMinutes}
              onChangeText={handleCustomMinutes}
              mode="outlined"
              keyboardType="numeric"
              style={styles.customTimeInput}
              outlineStyle={styles.inputOutline}
              dense
            />
          </View>

          {/* Difficulty */}
          <Text variant="labelMedium" style={styles.sectionLabel}>
            Difficulty
          </Text>
          <View style={styles.chipRow}>
            {DIFFICULTIES.map((d) => (
              <Chip
                key={d.value}
                selected={difficulty === d.value}
                onPress={() => setDifficulty(difficulty === d.value ? undefined : d.value)}
                style={[styles.chip, difficulty === d.value && { backgroundColor: d.color }]}
                selectedColor={palette.inkDark}
              >
                {d.label}
              </Chip>
            ))}
          </View>

          {/* Priority */}
          <Text variant="labelMedium" style={styles.sectionLabel}>
            Priority
          </Text>
          <View style={styles.chipRow}>
            {(['low', 'medium', 'high'] as const).map((p) => (
              <Chip
                key={p}
                selected={priority === p}
                onPress={() => setPriority(priority === p ? undefined : p)}
                style={styles.chip}
                selectedColor={palette.sageDark}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Chip>
            ))}
          </View>

          {/* Goal picker */}
          <Text variant="labelMedium" style={styles.sectionLabel}>
            Goal
          </Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setMenuVisible(true)}
                style={styles.goalButton}
                icon={selectedGoal ? 'target' : 'plus'}
                textColor={selectedGoal ? palette.sage : palette.inkLight}
              >
                {selectedGoal ? selectedGoal.title : 'Choose a goal'}
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

          <TextInput
            label="Notes (optional)"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={2}
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
    maxHeight: '85%',
  },
  heading: {
    marginBottom: 16,
    color: palette.inkDark,
    fontFamily: fonts.bold,
    letterSpacing: -0.3,
  },
  sectionLabel: {
    marginBottom: 8,
    marginTop: 4,
    color: palette.inkLight,
    letterSpacing: 1.2,
    fontFamily: fonts.medium,
    textTransform: 'uppercase' as const,
    fontSize: 11,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  inputOutline: {
    borderRadius: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  chip: {
    borderRadius: 16,
  },
  customTimeInput: {
    width: 80,
    height: 36,
    backgroundColor: 'transparent',
  },
  goalButton: {
    marginBottom: 12,
    alignSelf: 'flex-start',
    borderRadius: 16,
    borderColor: palette.sandDark,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  saveButton: {
    borderRadius: 20,
  },
});
