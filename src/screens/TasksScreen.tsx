import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FAB, Text, ActivityIndicator, Divider } from 'react-native-paper';
import { useTasks } from '../contexts/TasksContext';
import { Task } from '../types';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';

export default function TasksScreen() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { tasks, loading, toggleTask, deleteTask } = useTasks();

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <View style={styles.centered}>
          <Text variant="bodyLarge" style={styles.emptyText}>
            No tasks yet. Tap + to create one!
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => toggleTask(item.id)}
              onDelete={() => deleteTask(item.id)}
              onEdit={() => handleEditTask(item)}
            />
          )}
          ItemSeparatorComponent={() => <Divider />}
        />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
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
    padding: 16,
  },
  emptyText: {
    opacity: 0.6,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
