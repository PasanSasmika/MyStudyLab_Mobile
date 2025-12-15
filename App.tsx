import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppStore } from './src/store/appStore';
import { useAuthStore } from './src/store/authStore'; // Import Auth Store
import { StatusBar } from 'expo-status-bar';

import Onboarding from './src/screens/Onboarding';
import Login from './src/screens/Login';
import Home from './src/screens/Home'; // Import Home

const Stack = createStackNavigator();

export default function App() {
  const hasSeenOnboarding = useAppStore((state) => state.hasSeenOnboarding);
  const token = useAuthStore((state) => state.token); // Check if logged in

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* 1. Onboarding Check */}
        {!hasSeenOnboarding ? (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        ) : !token ? (
          // 2. If no token -> Login
          <Stack.Screen name="Login" component={Login} />
        ) : (
          // 3. If token exists -> Home
          <Stack.Screen name="Home" component={Home} />
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}