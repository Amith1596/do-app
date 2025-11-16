import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Profile</Text>
      <Button mode="contained" onPress={() => console.log('Sign out')}>
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
