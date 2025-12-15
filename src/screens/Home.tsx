import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const { user, logout } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-2">Hello, {user?.name}!</Text>
      <Text className="text-gray-500 mb-6">Student ID: {user?.id}</Text>

      <TouchableOpacity onPress={logout} className="bg-red-500 px-6 py-3 rounded-full">
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}