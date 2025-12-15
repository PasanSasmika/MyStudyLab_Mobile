import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppState {
  hasSeenOnboarding: boolean;
  completeOnboarding: () => void;
  reset: () => void; 
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      completeOnboarding: () => set({ hasSeenOnboarding: true }),
      reset: () => set({ hasSeenOnboarding: false }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);