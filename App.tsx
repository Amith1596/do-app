import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { lightTheme } from './src/theme';
import { AuthProvider } from './src/contexts/AuthContext';
import { GoalsProvider } from './src/contexts/GoalsContext';
import { TasksProvider } from './src/contexts/TasksContext';
import AppNavigator from './src/navigation/AppNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Satoshi-Light': require('./assets/fonts/Satoshi-Light.otf'),
    'Satoshi-Regular': require('./assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Medium': require('./assets/fonts/Satoshi-Medium.otf'),
    'Satoshi-Bold': require('./assets/fonts/Satoshi-Bold.otf'),
    'Satoshi-Black': require('./assets/fonts/Satoshi-Black.otf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={lightTheme}>
        <AuthProvider>
          <GoalsProvider>
            <TasksProvider>
              <AppNavigator />
              <StatusBar style="auto" />
            </TasksProvider>
          </GoalsProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
