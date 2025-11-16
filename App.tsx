import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { lightTheme } from './src/theme';
import { AuthProvider } from './src/contexts/AuthContext';
import { TasksProvider } from './src/contexts/TasksContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={lightTheme}>
        <AuthProvider>
          <TasksProvider>
            <AppNavigator />
            <StatusBar style="auto" />
          </TasksProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
