// Simple cache utility to reduce RSS feed API calls
interface CacheItem {
    data: any;
    timestamp: number;
}

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export const newsCache = {
    get: (key: string): any | null => {
        try {
            const cached = localStorage.getItem(`news_cache_${key}`);
            if (!cached) return null;

            const item: CacheItem = JSON.parse(cached);
            const now = Date.now();

            // Check if cache is still valid
            if (now - item.timestamp < CACHE_DURATION) {
                return item.data;
            } else {
                // Cache expired, remove it
                localStorage.removeItem(`news_cache_${key}`);
                return null;
            }
        } catch (error) {
            console.error('Error reading from cache:', error);
            return null;
        }
    },

    set: (key: string, data: any): void => {
        try {
            const item: CacheItem = {
                data,
                timestamp: Date.now()
            };
            localStorage.setItem(`news_cache_${key}`, JSON.stringify(item));
        } catch (error) {
            console.error('Error writing to cache:', error);
        }
    },

    clear: (key?: string): void => {
        try {
            if (key) {
                localStorage.removeItem(`news_cache_${key}`);
            } else {
                // Clear all news caches
                Object.keys(localStorage)
                    .filter(k => k.startsWith('news_cache_'))
                    .forEach(k => localStorage.removeItem(k));
            }
        } catch (error) {
            console.error('Error clearing cache:', error);
        }
    }
};
