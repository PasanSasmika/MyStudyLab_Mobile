import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/appStore';

export default function Login() {
  const reset = useAppStore((state) => state.reset);
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Student Login</Text>
      <TouchableOpacity onPress={reset} className="p-2 bg-red-200 rounded">
        <Text className="text-red-800">Reset Onboarding (Dev Only)</Text>
      </TouchableOpacity>
    </View>
  );
}