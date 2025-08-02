import { startMeasure, endMeasure } from './performance-monitor';

export async function preloadResources() {
  console.log('📋 Starting optimized resource preloading');
  return new Promise(async (resolve) => {
    try {
      // Solo precargar recursos críticos para el primer render
      console.log('🖼️ Preloading critical images');
      startMeasure('CriticalImagePreload');
      const criticalImages = [
        '/images/logo/shogun_logo.png',
        '/images/placeholder-video.png'
      ];
      
      const imagePromises = criticalImages.map(imagePath => {
        return new Promise((resolveImage) => {
          const img = new Image();
          img.onload = () => {
            console.log(`✅ Critical image loaded: ${imagePath}`);
            resolveImage();
          };
          img.onerror = () => {
            console.warn(`⚠️ Critical image warning: ${imagePath}`);
            resolveImage();
          };
          img.src = imagePath;
        });
      });
      
      await Promise.allSettled(imagePromises);
      endMeasure('CriticalImagePreload');

      // Solo verificar fuentes sin precargar componentes pesados
      if (document.fonts) {
        console.log('🔤 Checking font loading');
        startMeasure('FontsCheck');
        try {
          const fontTimeoutPromise = new Promise(resolve => setTimeout(resolve, 800));
          await Promise.race([document.fonts.ready, fontTimeoutPromise]);
        } catch (fontError) {
          console.warn('⚠️ Font loading warning:', fontError);
        }
        endMeasure('FontsCheck');
        console.log('✅ Fonts checked');
      }

      console.log('🎉 Critical resources loaded - ready to show app');
      resolve();
      
    } catch (error) {
      console.error('❌ Error in preloadResources:', error);
      resolve(); // Resolve anyway to prevent blocking
    }
  });
} 