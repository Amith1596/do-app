import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB } from 'react-native-paper';

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Tasks</Text>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Add task')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
