import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/appStore';
import { SafeAreaView } from 'react-native-safe-area-context';

const SLIDES = [
  { id: 1, title: 'Welcome to the MyStudyLab', desc: 'Practice real AL questions.', color: 'bg-blue-500' },
  { id: 2, title: 'Master Your Exams', desc: 'Practice real AL questions.', color: 'bg-blue-500' },
  { id: 3, title: 'Track Progress', desc: 'Identify your weak areas.', color: 'bg-indigo-600' },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);

  const handleNext = () => {
    if (step < SLIDES.length - 1) setStep(step + 1);
    else completeOnboarding();
  };

  const slide = SLIDES[step];

  return (
    <SafeAreaView className={`flex-1 ${slide.color} justify-between p-6`}>
      <View className="mt-20">
        <Text className="text-4xl font-bold text-white mb-4">{slide.title}</Text>
        <Text className="text-xl text-blue-100">{slide.desc}</Text>
      </View>
      
      <View className="flex-row justify-end mb-4">
        <TouchableOpacity onPress={handleNext} className="bg-white px-8 py-4 rounded-full">
          <Text className="font-bold text-blue-600">
            {step === SLIDES.length - 1 ? 'Start' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}