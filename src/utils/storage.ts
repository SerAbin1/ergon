
// Initialize MMKV storage instance
export const storage = new MMKV({
    id: 'ergon-storage',
});

// Helper functions for typed storage access
export const storageUtils = {
    getString: (key: string): string | undefined => {
        return storage.getString(key);
    },

    setString: (key: string, value: string): void => {
        storage.set(key, value);
    },

    getNumber: (key: string): number | undefined => {
        return storage.getNumber(key);
    },

    setNumber: (key: string, value: number): void => {
        storage.set(key, value);
    },

    getBoolean: (key: string): boolean | undefined => {
        return storage.getBoolean(key);
    },

    setBoolean: (key: string, value: boolean): void => {
        storage.set(key, value);
    },

    getObject: <T>(key: string): T | undefined => {
        const value = storage.getString(key);
        if (value) {
            try {
                return JSON.parse(value) as T;
            } catch {
                return undefined;
            }
        }
        return undefined;
    },

    setObject: <T>(key: string, value: T): void => {
        storage.set(key, JSON.stringify(value));
    },

    delete: (key: string): void => {
        storage.delete(key);
    },

    clearAll: (): void => {
        storage.clearAll();
    },
};
