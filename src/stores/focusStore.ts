import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { FocusPreset, FocusSession, TimerState } from '../types/focus';
import { DEFAULT_POMODORO_PRESET } from '../types/focus';
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

interface FocusState {
    // Timer state
    timerState: TimerState;
    timeRemaining: number; // in seconds
    currentSessionType: 'work' | 'break' | 'longBreak';
    completedSessions: number; // sessions completed in current cycle

    // Configuration
    activePreset: FocusPreset;
    customPresets: FocusPreset[];

    // History
    sessions: FocusSession[];
    todaysTotalFocusTime: number; // in seconds

    // Actions
    startTimer: () => void;
    pauseTimer: () => void;
    resumeTimer: () => void;
    resetTimer: () => void;
    skipToBreak: () => void;
    skipToWork: () => void;
    tick: () => void;
    completeSession: () => void;
    setActivePreset: (preset: FocusPreset) => void;
    addCustomPreset: (preset: FocusPreset) => void;
    clearHistory: () => void;
}

export const useFocusStore = create<FocusState>()(
    persist(
        (set, get) => ({
            // Initial state
            timerState: 'idle',
            timeRemaining: DEFAULT_POMODORO_PRESET.workDuration * 60,
            currentSessionType: 'work',
            completedSessions: 0,
            activePreset: DEFAULT_POMODORO_PRESET,
            customPresets: [],
            sessions: [],
            todaysTotalFocusTime: 0,

            // Actions
            startTimer: () => {
                const { timerState, activePreset, currentSessionType } = get();
                if (timerState === 'idle') {
                    const duration =
                        currentSessionType === 'work'
                            ? activePreset.workDuration
                            : currentSessionType === 'break'
                                ? activePreset.breakDuration
                                : activePreset.longBreakDuration;

                    set({
                        timerState: 'running',
                        timeRemaining: duration * 60,
                    });
                }
            },

            pauseTimer: () => {
                set({ timerState: 'paused' });
            },

            resumeTimer: () => {
                set({ timerState: 'running' });
            },

            resetTimer: () => {
                const { activePreset } = get();
                set({
                    timerState: 'idle',
                    timeRemaining: activePreset.workDuration * 60,
                    currentSessionType: 'work',
                });
            },

            skipToBreak: () => {
                const { activePreset, completedSessions } = get();
                const isLongBreak =
                    (completedSessions + 1) % activePreset.sessionsBeforeLongBreak === 0;
                const breakType = isLongBreak ? 'longBreak' : 'break';
                const breakDuration = isLongBreak
                    ? activePreset.longBreakDuration
                    : activePreset.breakDuration;

                set({
                    timerState: 'idle',
                    currentSessionType: breakType,
                    timeRemaining: breakDuration * 60,
                });
            },

            skipToWork: () => {
                const { activePreset } = get();
                set({
                    timerState: 'idle',
                    currentSessionType: 'work',
                    timeRemaining: activePreset.workDuration * 60,
                });
            },

            tick: () => {
                const { timeRemaining, timerState, currentSessionType } = get();
                if (timerState !== 'running') return;

                if (timeRemaining <= 1) {
                    get().completeSession();
                } else {
                    set({ timeRemaining: timeRemaining - 1 });
                    // Update focus time if in work session
                    if (currentSessionType === 'work') {
                        set((state) => ({
                            todaysTotalFocusTime: state.todaysTotalFocusTime + 1,
                        }));
                    }
                }
            },

            completeSession: () => {
                const {
                    activePreset,
                    completedSessions,
                    currentSessionType,
                    sessions,
                } = get();

                // Record session if it was a work session
                if (currentSessionType === 'work') {
                    const newSession: FocusSession = {
                        id: Date.now().toString(),
                        startTime: Date.now() - activePreset.workDuration * 60 * 1000,
                        endTime: Date.now(),
                        duration: activePreset.workDuration * 60,
                        type: 'pomodoro',
                        completed: true,
                    };

                    const newCompletedSessions = completedSessions + 1;
                    const isLongBreak =
                        newCompletedSessions % activePreset.sessionsBeforeLongBreak === 0;

                    set({
                        timerState: 'completed',
                        sessions: [...sessions, newSession],
                        completedSessions: newCompletedSessions,
                        currentSessionType: isLongBreak ? 'longBreak' : 'break',
                        timeRemaining: isLongBreak
                            ? activePreset.longBreakDuration * 60
                            : activePreset.breakDuration * 60,
                    });
                } else {
                    // Break completed, switch to work
                    set({
                        timerState: 'completed',
                        currentSessionType: 'work',
                        timeRemaining: activePreset.workDuration * 60,
                    });
                }
            },

            setActivePreset: (preset) => {
                set({
                    activePreset: preset,
                    timeRemaining: preset.workDuration * 60,
                    timerState: 'idle',
                    currentSessionType: 'work',
                });
            },

            addCustomPreset: (preset) => {
                set((state) => ({
                    customPresets: [...state.customPresets, preset],
                }));
            },

            clearHistory: () => {
                set({ sessions: [], todaysTotalFocusTime: 0 });
            },
        }),
        {
            name: 'focus-storage',
            storage: createJSONStorage(() => mmkvStorage),
            partialize: (state) => ({
                activePreset: state.activePreset,
                customPresets: state.customPresets,
                sessions: state.sessions,
                todaysTotalFocusTime: state.todaysTotalFocusTime,
                completedSessions: state.completedSessions,
            }),
        }
    )
);
