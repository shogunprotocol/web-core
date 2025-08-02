'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSiteReady } from '@/libs/site-ready-context';
import s from '@/components/home-page/home.module.scss';

const VideoContainer = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [hasVideoError, setHasVideoError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const videoRef = useRef(null);
    const { animationsEnabled } = useSiteReady();
    
    // Simplified video sources - usar solo videos locales que sabemos que existen
    const videoSrc = {
        desktop: "/video/720p_belt.mp4",
        mobile: "/video/540p_belt.mp4"
    };
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const currentSrc = isMobile ? videoSrc.mobile : videoSrc.desktop;

    const handleVideoLoad = () => {
        setIsVideoLoaded(true);
        setHasVideoError(false);
    };

    const handleVideoError = (e) => {
        console.warn('Video failed to load:', e);
        setHasVideoError(true);
        setIsVideoLoaded(false);
    };

    const handleVideoPlay = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => {
                console.warn('Video autoplay prevented:', e);
            });
        }
    };

    // Intentar reproducir el video cuando las animaciones estén habilitadas
    useEffect(() => {
        if (animationsEnabled && videoRef.current && !hasVideoError) {
            handleVideoPlay();
        }
    }, [animationsEnabled, hasVideoError]);

    return (
        <div className="relative w-full h-full">
            {/* Fallback background si el video falla */}
            {(hasVideoError || !isVideoLoaded) && (
                <div 
                    className={`${s.backgroundVideo} bg-gradient-to-br from-black via-gray-900 to-black`}
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 20% 20%, rgba(68, 251, 222, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(68, 251, 222, 0.1) 0%, transparent 50%)
                        `
                    }}
                >
                    {/* Pattern overlay for visual interest */}
                    <div 
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: `
                                linear-gradient(45deg, transparent 40%, rgba(68, 251, 222, 0.1) 50%, transparent 60%),
                                linear-gradient(-45deg, transparent 40%, rgba(255, 255, 255, 0.05) 50%, transparent 60%)
                            `,
                            backgroundSize: '60px 60px'
                        }}
                    />
                </div>
            )}
            
            {/* Video element */}
            <video
                ref={videoRef}
                className={`${s.backgroundVideo} transition-opacity duration-1000 ${
                    isVideoLoaded && !hasVideoError ? 'opacity-100' : 'opacity-0'
                }`}
                muted 
                loop 
                preload="metadata"
                poster="/images/placeholder-video.png"
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                playsInline
                webkit-playsinline="true"
            >
                <source src={currentSrc} type="video/mp4" />
                {/* Fallback text */}
                Your browser does not support the video tag.
            </video>

            {/* Loading overlay mientras carga el video */}
            {!isVideoLoaded && !hasVideoError && (
                <div className={`${s.backgroundVideo} bg-black/50 flex items-center justify-center`}>
                    <div className="text-basement-cyan text-sm animate-pulse">
                        Loading background...
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoContainer;
