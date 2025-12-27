// App usage statistics types
export interface AppUsage {
    packageName: string;
    appName: string;
    usageTime: number; // in milliseconds
    lastUsed: number; // Unix timestamp
    icon?: string; // Base64 encoded icon
}

// Daily usage summary
export interface DailyUsage {
    date: string; // YYYY-MM-DD format
    totalScreenTime: number; // in milliseconds
    appUsages: AppUsage[];
    unlockCount: number;
}

// Blocked app configuration
export interface BlockedApp {
    packageName: string;
    appName: string;
    isBlocked: boolean;
    schedule?: BlockSchedule;
}

// Block schedule
export interface BlockSchedule {
    enabled: boolean;
    startTime: string; // HH:mm format
    endTime: string; // HH:mm format
    days: number[]; // 0-6 (Sunday-Saturday)
}
