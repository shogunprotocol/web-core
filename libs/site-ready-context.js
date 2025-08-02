'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { preloadResources } from './preload-resources';
import { startMeasure, endMeasure } from './performance-monitor';

const SiteReadyContext = createContext();

export function SiteReadyProvider({ children }) {
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const initializeSite = async () => {
      startMeasure('SiteInitialization');
      
      try {
        console.log('🚀 Starting site initialization');
        
        // Preload all resources
        startMeasure('ResourcePreload');
        await preloadResources();
        endMeasure('ResourcePreload');
        
        // Simulate additional loading time for smooth experience
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setLoadingProgress(100);
        setIsFullyLoaded(true);
        
        // Enable animations after a short delay
        setTimeout(() => {
          setAnimationsEnabled(true);
          console.log('✅ Animations enabled');
        }, 200);
        
        endMeasure('SiteInitialization');
        console.log('🎉 Site fully initialized');
        
      } catch (error) {
        console.warn('⚠️ Site initialization completed with warnings:', error);
        setIsFullyLoaded(true);
        setAnimationsEnabled(true);
        endMeasure('SiteInitialization');
      }
    };

    initializeSite();
  }, []);

  const value = {
    isFullyLoaded,
    animationsEnabled,
    loadingProgress
  };

  return (
    <SiteReadyContext.Provider value={value}>
      {children}
    </SiteReadyContext.Provider>
  );
}

export function useSiteReady() {
  const context = useContext(SiteReadyContext);
  if (!context) {
    throw new Error('useSiteReady must be used within a SiteReadyProvider');
  }
  return context;
}
