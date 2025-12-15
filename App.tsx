import './global.css'; // <--- CRITICAL FOR NATIVEWIND V4
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useAppStore } from './src/store/appStore';

import Onboarding from './src/screens/Onboarding';
import Login from './src/screens/Login';

const Stack = createStackNavigator();

export default function App() {
  const hasSeenOnboarding = useAppStore((state) => state.hasSeenOnboarding);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasSeenOnboarding ? (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}