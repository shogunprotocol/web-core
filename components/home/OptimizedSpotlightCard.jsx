"use client"

import clsx from "clsx"
import { useRef, useState, useMemo } from "react"
import { useSiteReady } from '@/libs/site-ready-context';

export default function OptimizedSpotlightCard({
    as: Component = "div",
    from = "rgba(255,255,255,0.8)",
    via = null,
    to = "transparent",
    size = 350,
    mode = "before",
    children,
    className,
    ...props
}) {
    const { animationsEnabled } = useSiteReady();
    const container = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const spotlightColorStops = useMemo(() => {
        return [from, via, to].filter((value) => !!value).join(",");
    }, [from, via, to]);

    const classes = useMemo(() => {
        if (!animationsEnabled || !isHovered) return '';
        
        return mode === "before"
            ? `before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))] before:transition-opacity before:duration-300`
            : `after:absolute after:inset-0 after:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))] after:transition-opacity after:duration-300`;
    }, [mode, animationsEnabled, isHovered]);

    const handleMouseMove = (e) => {
        if (!animationsEnabled || !container.current) return;
        
        const rect = container.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePosition({ x, y });
    };

    const handleMouseEnter = () => {
        if (animationsEnabled) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Component
            ref={container}
            className={clsx("relative transform-gpu overflow-hidden", classes, className)}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
            style={{
                "--x": `${mousePosition.x}px`,
                "--y": `${mousePosition.y}px`,
                "--spotlight-color-stops": spotlightColorStops,
                "--spotlight-size": `${size}px`,
            }}>
            {children}
        </Component>
    );
}