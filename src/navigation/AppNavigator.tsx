import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

import { useAuth } from '../contexts/AuthContext';
import { palette, fonts, shadows } from '../theme';
import WelcomeModal from '../components/WelcomeModal';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import FocusScreen from '../screens/FocusScreen';
import TasksScreen from '../screens/TasksScreen';
import GoalsScreen from '../screens/GoalsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: palette.sage,
        tabBarInactiveTintColor: palette.inkFaint,
        tabBarStyle: {
          backgroundColor: palette.warmWhite,
          borderTopWidth: 0,
          paddingTop: 6,
          height: 60,
          ...shadows.medium,
          shadowOffset: { width: 0, height: -2 },
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: fonts.medium,
          letterSpacing: 0.5,
          textTransform: 'uppercase' as const,
        },
        headerStyle: {
          backgroundColor: palette.cream,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTitleStyle: {
          color: palette.inkDark,
          fontFamily: fonts.bold,
          fontSize: 22,
          letterSpacing: 3,
        },
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="Focus"
        component={FocusScreen}
        options={{
          headerTitle: 'DO',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightning-bolt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          headerTitle: 'All Tasks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-checks" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Goals"
        component={GoalsScreen}
        options={{
          headerTitle: 'Goals',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="target" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { session, loading, showWelcome, dismissWelcome } = useAuth();

  if (loading) {
    return (
      <View style={[styles.loading, { backgroundColor: palette.cream }]}>
        <ActivityIndicator size="large" color={palette.sage} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {session ? (
        <>
          <MainTabs />
          <WelcomeModal
            visible={showWelcome}
            onDismiss={dismissWelcome}
            userName={session.user?.user_metadata?.name}
          />
        </>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
