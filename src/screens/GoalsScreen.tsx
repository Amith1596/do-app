import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FAB, Text, ActivityIndicator } from 'react-native-paper';
import { useGoals } from '../contexts/GoalsContext';
import { useGoalProgress } from '../hooks/useGoalProgress';
import { Goal } from '../types';
import { palette, fonts } from '../theme';
import GoalItem from '../components/GoalItem';
import AddGoalModal from '../components/AddGoalModal';
import EditGoalModal from '../components/EditGoalModal';

export default function GoalsScreen() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const { goals, loading, deleteGoal } = useGoals();
  const { getProgress } = useGoalProgress();

  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setEditModalVisible(true);
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: palette.cream }]}>
        <ActivityIndicator size="large" color={palette.sage} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: palette.cream }]}>
      {goals.length === 0 ? (
        <View style={styles.centered}>
          <Text variant="titleMedium" style={styles.emptyTitle}>
            No goals yet
          </Text>
          <Text variant="bodyMedium" style={styles.emptyText}>
            Goals give your tasks meaning.{'\n'}Tap + to set your first one.
          </Text>
        </View>
      ) : (
        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const progress = getProgress(item.id);
            return (
              <GoalItem
                goal={item}
                taskCount={progress.total}
                completedCount={progress.completed}
                onDelete={() => deleteGoal(item.id)}
                onEdit={() => handleEditGoal(item)}
              />
            );
          }}
          contentContainerStyle={styles.listContent}
        />
      )}

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: palette.sage }]}
        color="#FFFFFF"
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
    padding: 32,
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
    lineHeight: 22,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
});
