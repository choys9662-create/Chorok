// Global singleton loader for Three.js to prevent multiple instances
// Uses window object to ensure only one instance across the entire app

declare global {
  interface Window {
    __THREE_INSTANCE__?: typeof import("three");
    __THREE_LOADING__?: Promise<typeof import("three")>;
    __THREE_LOAD_COUNT__?: number;
  }
}

let internalCache: typeof import("three") | null = null;
let internalLoadingPromise: Promise<typeof import("three")> | null = null;

export async function loadThree(): Promise<typeof import("three")> {
  // SSR safety check
  if (typeof window === 'undefined') {
    // In SSR, just return a fresh import (won't actually execute in browser)
    return import("three");
  }

  // Initialize load counter for debugging
  if (window.__THREE_LOAD_COUNT__ === undefined) {
    window.__THREE_LOAD_COUNT__ = 0;
  }

  // Return cached instance if available (fastest path)
  if (internalCache) {
    return Promise.resolve(internalCache);
  }

  // Check window cache
  if (window.__THREE_INSTANCE__) {
    internalCache = window.__THREE_INSTANCE__;
    return Promise.resolve(window.__THREE_INSTANCE__);
  }

  // Wait for existing loading promise (deduplication)
  if (internalLoadingPromise) {
    return internalLoadingPromise;
  }

  if (window.__THREE_LOADING__) {
    internalLoadingPromise = window.__THREE_LOADING__;
    return window.__THREE_LOADING__;
  }

  // Increment load counter (should only be 1 in production)
  window.__THREE_LOAD_COUNT__++;
  
  if (window.__THREE_LOAD_COUNT__ > 1) {
    console.warn(`[Three.js Singleton] Multiple load attempts detected (${window.__THREE_LOAD_COUNT__}). Using singleton pattern to prevent duplication.`);
  }

  // Start loading and cache on window object
  const loadingPromise = import("three").then((THREE) => {
    internalCache = THREE;
    window.__THREE_INSTANCE__ = THREE;
    window.__THREE_LOADING__ = undefined;
    internalLoadingPromise = null;
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Three.js Singleton] ✅ Three.js loaded and cached successfully');
    }
    
    return THREE;
  }).catch((error) => {
    // Reset on error
    internalLoadingPromise = null;
    window.__THREE_LOADING__ = undefined;
    console.error('[Three.js Singleton] ❌ Failed to load Three.js:', error);
    throw error;
  });

  internalLoadingPromise = loadingPromise;
  window.__THREE_LOADING__ = loadingPromise;

  return loadingPromise;
}

// Export function to check if Three.js is loaded
export function isThreeLoaded(): boolean {
  return internalCache !== null || (typeof window !== 'undefined' && !!window.__THREE_INSTANCE__);
}

// Export function to get cached instance synchronously (returns null if not loaded)
export function getThreeSync(): typeof import("three") | null {
  return internalCache || (typeof window !== 'undefined' ? window.__THREE_INSTANCE__ || null : null);
}

// Export function to reset cache (useful for testing or hot reload)
export function resetThreeCache(): void {
  internalCache = null;
  internalLoadingPromise = null;
  if (typeof window !== 'undefined') {
    window.__THREE_INSTANCE__ = undefined;
    window.__THREE_LOADING__ = undefined;
    window.__THREE_LOAD_COUNT__ = 0;
  }
}