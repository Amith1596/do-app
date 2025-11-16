import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { signOut, session } = useAuth();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Profile</Text>
      <Text variant="bodyMedium" style={styles.email}>
        {session?.user?.email}
      </Text>
      <Button mode="contained" onPress={signOut}>
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
  email: {
    marginVertical: 16,
    opacity: 0.7,
  },
});
