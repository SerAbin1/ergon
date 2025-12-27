import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { BlockedApp, DailyUsage } from '../types/usage';
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

interface UsageState {
    // Usage data
    todayUsage: DailyUsage | null;
    weeklyUsage: DailyUsage[];

    // Blocked apps
    blockedApps: BlockedApp[];
    isBlockingEnabled: boolean;

    // Permission status
    hasUsagePermission: boolean;
    hasAccessibilityPermission: boolean;

    // Actions
    setTodayUsage: (usage: DailyUsage) => void;
    addDailyUsage: (usage: DailyUsage) => void;
    setBlockedApps: (apps: BlockedApp[]) => void;
    toggleAppBlock: (packageName: string) => void;
    setBlockingEnabled: (enabled: boolean) => void;
    setUsagePermission: (granted: boolean) => void;
    setAccessibilityPermission: (granted: boolean) => void;
    clearUsageData: () => void;
}

const getToday = (): string => {
    return new Date().toISOString().split('T')[0];
};

export const useUsageStore = create<UsageState>()(
    persist(
        (set, get) => ({
            // Initial state
            todayUsage: null,
            weeklyUsage: [],
            blockedApps: [],
            isBlockingEnabled: false,
            hasUsagePermission: false,
            hasAccessibilityPermission: false,

            // Actions
            setTodayUsage: (usage) => {
                set({ todayUsage: usage });
            },

            addDailyUsage: (usage) => {
                const { weeklyUsage } = get();
                // Keep only last 7 days
                const updatedUsage = [...weeklyUsage, usage].slice(-7);
                set({ weeklyUsage: updatedUsage });
            },

            setBlockedApps: (apps) => {
                set({ blockedApps: apps });
            },

            toggleAppBlock: (packageName) => {
                const { blockedApps } = get();
                const updatedApps = blockedApps.map((app) =>
                    app.packageName === packageName
                        ? { ...app, isBlocked: !app.isBlocked }
                        : app
                );
                set({ blockedApps: updatedApps });
            },

            setBlockingEnabled: (enabled) => {
                set({ isBlockingEnabled: enabled });
            },

            setUsagePermission: (granted) => {
                set({ hasUsagePermission: granted });
            },

            setAccessibilityPermission: (granted) => {
                set({ hasAccessibilityPermission: granted });
            },

            clearUsageData: () => {
                set({
                    todayUsage: null,
                    weeklyUsage: [],
                });
            },
        }),
        {
            name: 'usage-storage',
            storage: createJSONStorage(() => mmkvStorage),
            partialize: (state) => ({
                blockedApps: state.blockedApps,
                isBlockingEnabled: state.isBlockingEnabled,
                weeklyUsage: state.weeklyUsage,
            }),
        }
    )
);
