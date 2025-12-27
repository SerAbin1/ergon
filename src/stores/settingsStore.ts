import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { storage } from '../utils/storage';

// Custom storage adapter for Zustand persistence with MMKV
const mmkvStorage = {
    getItem: (name: string) => {
        const value = storage.getString(name);
        return value ?? null;
    },
    setItem: (name: string, value: string) => {
        storage.set(name, value);
    },
    removeItem: (name: string) => {
        storage.delete(name);
    },
};

export type ThemeMode = 'light' | 'dark' | 'system';

interface SettingsState {
    // Appearance
    themeMode: ThemeMode;
    hapticFeedback: boolean;
    soundEnabled: boolean;

    // Notifications
    focusReminders: boolean;
    breakReminders: boolean;
    dailySummary: boolean;
    dailySummaryTime: string; // HH:mm format

    // Focus settings
    autoStartBreaks: boolean;
    autoStartWork: boolean;

    // Actions
    setThemeMode: (mode: ThemeMode) => void;
    toggleHapticFeedback: () => void;
    toggleSoundEnabled: () => void;
    toggleFocusReminders: () => void;
    toggleBreakReminders: () => void;
    toggleDailySummary: () => void;
    setDailySummaryTime: (time: string) => void;
    toggleAutoStartBreaks: () => void;
    toggleAutoStartWork: () => void;
    resetSettings: () => void;
}

const defaultSettings = {
    themeMode: 'system' as ThemeMode,
    hapticFeedback: true,
    soundEnabled: true,
    focusReminders: true,
    breakReminders: true,
    dailySummary: false,
    dailySummaryTime: '20:00',
    autoStartBreaks: false,
    autoStartWork: false,
};

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            ...defaultSettings,

            setThemeMode: (mode) => set({ themeMode: mode }),

            toggleHapticFeedback: () =>
                set((state) => ({ hapticFeedback: !state.hapticFeedback })),

            toggleSoundEnabled: () =>
                set((state) => ({ soundEnabled: !state.soundEnabled })),

            toggleFocusReminders: () =>
                set((state) => ({ focusReminders: !state.focusReminders })),

            toggleBreakReminders: () =>
                set((state) => ({ breakReminders: !state.breakReminders })),

            toggleDailySummary: () =>
                set((state) => ({ dailySummary: !state.dailySummary })),

            setDailySummaryTime: (time) => set({ dailySummaryTime: time }),

            toggleAutoStartBreaks: () =>
                set((state) => ({ autoStartBreaks: !state.autoStartBreaks })),

            toggleAutoStartWork: () =>
                set((state) => ({ autoStartWork: !state.autoStartWork })),

            resetSettings: () => set(defaultSettings),
        }),
        {
            name: 'settings-storage',
            storage: createJSONStorage(() => mmkvStorage),
        }
    )
);
