/**
 * Storage utilities (storage.ts)
 *
 * Provides a storage interface for the app.
 * Uses a simple in-memory storage for development.
 * In production native builds, this would use MMKV.
 *
 * Note: MMKV requires native code and won't work in Expo Go.
 * For development, we use a simple Map-based storage.
 */

// Simple storage interface matching MMKV's API
interface StorageInterface {
    getString(key: string): string | undefined;
    set(key: string, value: string | number | boolean): void;
    getNumber(key: string): number | undefined;
    getBoolean(key: string): boolean | undefined;
    delete(key: string): void;
    clearAll(): void;
}

// Simple in-memory storage for development
// In production, this would be replaced with MMKV
class InMemoryStorage implements StorageInterface {
    private store = new Map<string, string | number | boolean>();

    getString(key: string): string | undefined {
        const value = this.store.get(key);
        return typeof value === 'string' ? value : undefined;
    }

    set(key: string, value: string | number | boolean): void {
        this.store.set(key, value);
    }

    getNumber(key: string): number | undefined {
        const value = this.store.get(key);
        return typeof value === 'number' ? value : undefined;
    }

    getBoolean(key: string): boolean | undefined {
        const value = this.store.get(key);
        return typeof value === 'boolean' ? value : undefined;
    }

    delete(key: string): void {
        this.store.delete(key);
    }

    clearAll(): void {
        this.store.clear();
    }
}

// Export storage instance
export const storage = new InMemoryStorage();

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
