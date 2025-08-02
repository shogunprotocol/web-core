// useHoverEffect.js - Optimized version
import { colors } from '@/config/variables';
import { useEffect, useRef } from 'react';
import { useSiteReady } from '@/libs/site-ready-context';

const useHoverEffect = (ref, disabled = false) => {
  const { animationsEnabled } = useSiteReady();
  const cleanupRef = useRef(null);

  useEffect(() => {
    // Skip if animations are disabled or explicitly disabled
    if (!animationsEnabled || disabled || !ref.current) {
      return;
    }

    const element = ref.current;
    const text = element.textContent;
    
    // Simple CSS-only hover effect instead of complex DOM manipulation
    element.style.transition = 'color 0.3s ease';
    element.style.cursor = 'pointer';
    
    const handleMouseEnter = () => {
      element.style.color = colors.cyan;
    };
    
    const handleMouseLeave = () => {
      element.style.color = 'inherit';
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Store cleanup function
    cleanupRef.current = () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.style.transition = '';
      element.style.cursor = '';
      element.style.color = '';
    };

    return cleanupRef.current;
  }, [ref, animationsEnabled, disabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);
};

export default useHoverEffect;
