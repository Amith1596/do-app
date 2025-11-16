import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FAB, Text, ActivityIndicator, Divider } from 'react-native-paper';
import { useGoals } from '../contexts/GoalsContext';
import { useTasks } from '../contexts/TasksContext';
import { Goal } from '../types';
import GoalItem from '../components/GoalItem';
import AddGoalModal from '../components/AddGoalModal';
import EditGoalModal from '../components/EditGoalModal';

export default function GoalsScreen() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const { goals, loading, deleteGoal } = useGoals();
  const { tasks } = useTasks();

  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setEditModalVisible(true);
  };

  const getTaskCount = (goalId: string) => {
    return tasks.filter((task) => task.goalId === goalId).length;
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
      {goals.length === 0 ? (
        <View style={styles.centered}>
          <Text variant="bodyLarge" style={styles.emptyText}>
            No goals yet. Tap + to create one!
          </Text>
        </View>
      ) : (
        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GoalItem
              goal={item}
              taskCount={getTaskCount(item.id)}
              onDelete={() => deleteGoal(item.id)}
              onEdit={() => handleEditGoal(item)}
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

      <AddGoalModal
        visible={addModalVisible}
        onDismiss={() => setAddModalVisible(false)}
      />

      <EditGoalModal
        visible={editModalVisible}
        goal={selectedGoal}
        onDismiss={() => {
          setEditModalVisible(false);
          setSelectedGoal(null);
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
