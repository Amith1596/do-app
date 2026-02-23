import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, SectionList } from 'react-native';
import {
  FAB,
  Text,
  ActivityIndicator,
  Snackbar,
  SegmentedButtons,
} from 'react-native-paper';
import { useTasks } from '../contexts/TasksContext';
import { useGoals } from '../contexts/GoalsContext';
import { useGoalProgress } from '../hooks/useGoalProgress';
import { Task } from '../types';
import { palette, fonts } from '../theme';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import GoalProgressBar from '../components/GoalProgressBar';

export default function TasksScreen() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState('all');

  const { tasks, loading, toggleTask, deleteTask, celebrationMessage, clearCelebration } =
    useTasks();
  const { goals } = useGoals();
  const { getProgress } = useGoalProgress();

  const parentTaskIds = useMemo(() => {
    const ids = new Set<string>();
    for (const t of tasks) {
      if (t.parentTaskId) ids.add(t.parentTaskId);
    }
    return ids;
  }, [tasks]);

  const sections = useMemo(() => {
    const goalMap = new Map<string, { title: string; goalId: string; data: Task[] }>();
    const ungrouped: Task[] = [];

    for (const task of tasks) {
      if (task.goalId) {
        const existing = goalMap.get(task.goalId);
        if (existing) {
          existing.data.push(task);
        } else {
          const goal = goals.find((g) => g.id === task.goalId);
          goalMap.set(task.goalId, {
            title: goal?.title || 'Unknown Goal',
            goalId: task.goalId,
            data: [task],
          });
        }
      } else {
        ungrouped.push(task);
      }
    }

    const result = Array.from(goalMap.values());
    if (ungrouped.length > 0) {
      result.push({ title: 'Ungrouped', goalId: '', data: ungrouped });
    }
    return result;
  }, [tasks, goals]);

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggle={() => toggleTask(item.id)}
      onDelete={() => deleteTask(item.id)}
      onEdit={() => handleEditTask(item)}
      hasSubTasks={parentTaskIds.has(item.id)}
    />
  );

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: palette.cream }]}>
        <ActivityIndicator size="large" color={palette.sage} />
      </View>
    );
  }

  const headerContent = (
    <View style={styles.headerContent}>
      {tasks.length > 0 && goals.length > 0 && (
        <SegmentedButtons
          value={viewMode}
          onValueChange={setViewMode}
          buttons={[
            { value: 'all', label: 'All Tasks' },
            { value: 'grouped', label: 'By Goal' },
          ]}
          style={styles.segmentedButtons}
        />
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: palette.cream }]}>
      {tasks.length === 0 ? (
        <>
          {headerContent}
          <View style={styles.centered}>
            <Text variant="titleMedium" style={styles.emptyTitle}>
              A clean slate
            </Text>
            <Text variant="bodyMedium" style={styles.emptyText}>
              Tap + to add your first task
            </Text>
          </View>
        </>
      ) : viewMode === 'grouped' && goals.length > 0 ? (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderTaskItem}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text variant="labelLarge" style={styles.sectionTitle}>
                {section.title}
              </Text>
              {section.goalId ? (
                <View style={styles.sectionProgress}>
                  <GoalProgressBar
                    completed={getProgress(section.goalId).completed}
                    total={getProgress(section.goalId).total}
                  />
                </View>
              ) : null}
            </View>
          )}
          ListHeaderComponent={headerContent}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTaskItem}
          ListHeaderComponent={headerContent}
          contentContainerStyle={styles.listContent}
        />
      )}

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: palette.sage }]}
        color="#FFFFFF"
        onPress={() => setAddModalVisible(true)}
      />

      <AddTaskModal
        visible={addModalVisible}
        onDismiss={() => setAddModalVisible(false)}
      />

      <EditTaskModal
        visible={editModalVisible}
        task={selectedTask}
        onDismiss={() => {
          setEditModalVisible(false);
          setSelectedTask(null);
        }}
      />

      <Snackbar
        visible={!!celebrationMessage}
        onDismiss={clearCelebration}
        duration={2500}
        style={styles.celebrationSnackbar}
        action={{ label: 'Nice', onPress: clearCelebration }}
      >
        {celebrationMessage || ''}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  headerContent: {
    paddingTop: 8,
  },
  emptyTitle: {
    color: palette.inkDark,
    marginBottom: 8,
    fontFamily: fonts.bold,
    letterSpacing: -0.3,
  },
  emptyText: {
    color: palette.inkLight,
    textAlign: 'center',
  },
  segmentedButtons: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    backgroundColor: palette.sand,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 4,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    color: palette.inkDark,
    letterSpacing: -0.2,
  },
  sectionProgress: {
    marginTop: 6,
  },
  listContent: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  celebrationSnackbar: {
    backgroundColor: palette.sageDark,
    borderRadius: 12,
    marginHorizontal: 16,
  },
});
