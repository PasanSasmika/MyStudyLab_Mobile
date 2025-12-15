import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      // 1. Call Backend
      const res = await api.post('/auth/login', { email, password });
      
      // 2. Security Check (Student Only)
      if (res.data.user.role !== 'STUDENT') {
        Alert.alert('Access Denied', 'Teacher accounts must use the Web Dashboard.');
        setLoading(false);
        return;
      }

      // 3. Save to Store (Global State)
      login(res.data.access_token, res.data.user);
      
      // Navigation will happen automatically because App.tsx listens to the store
    } catch (error: any) {
      console.error(error);
      Alert.alert('Login Failed', 'Invalid credentials or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-6 justify-center">
      <View className="mb-10">
        <Text className="text-3xl font-bold text-blue-900">Welcome Back</Text>
        <Text className="text-gray-500 mt-2">Sign in to continue learning</Text>
      </View>

      <View className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
        <View>
          <Text className="text-gray-700 font-medium mb-1">Email</Text>
          <TextInput 
            className="w-full bg-gray-100 p-4 rounded-xl text-gray-800"
            placeholder="student@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="mt-4">
          <Text className="text-gray-700 font-medium mb-1">Password</Text>
          <TextInput 
            className="w-full bg-gray-100 p-4 rounded-xl text-gray-800"
            placeholder="••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          onPress={handleLogin}
          disabled={loading}
          className={`mt-6 p-4 rounded-xl items-center ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-lg">Login</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="mt-6 items-center">
        <Text className="text-gray-500">Don't have an account? <Text className="text-blue-600 font-bold">Register</Text></Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}