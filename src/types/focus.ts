// Focus session type
export interface FocusSession {
    id: string;
    startTime: number; // Unix timestamp
    endTime: number | null;
    duration: number; // in seconds
    type: 'pomodoro' | 'custom';
    completed: boolean;
}

// Timer state
export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

// Focus mode preset
export interface FocusPreset {
    id: string;
    name: string;
    workDuration: number; // in minutes
    breakDuration: number; // in minutes
    longBreakDuration: number; // in minutes
    sessionsBeforeLongBreak: number;
}

// Default Pomodoro preset
export const DEFAULT_POMODORO_PRESET: FocusPreset = {
    id: 'pomodoro',
    name: 'Pomodoro',
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4,
};
