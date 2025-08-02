'use client';

import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

interface SplineCanvasProps {
  splineUrl: string;
}

export default function SplineCanvas({ splineUrl }: SplineCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // 1. Carga la escena
    const app = new Application(canvasRef.current);
    appRef.current = app;

    app.load(splineUrl).then(() => {
      // Camera control removed to prevent TypeScript errors
      // The manual camera controls are blocked via CSS and event handlers instead
      console.log('Spline scene loaded successfully');
    });

    // 2. Scroll horizontal mejorado
    const container = containerRef.current;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Solo permitir scroll horizontal
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        container.scrollLeft += e.deltaX;
      } else {
        container.scrollLeft += e.deltaY;
      }
    };
    container.addEventListener('wheel', onWheel, { passive: false });

    // 3. Bloquea cualquier drag vertical y controla el horizontal
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      e.stopPropagation();

      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Multiplica por 2 para hacer el scroll más sensible
      container.scrollLeft = scrollLeft - walk;
    };

    const onPointerUp = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      isDragging = false;
      container.style.cursor = 'grab';
    };

    // Prevenir todos los eventos de mouse/touch en el canvas para evitar rotación 3D
    const preventAll3DInteraction = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    };

    const canvas = canvasRef.current;

    // Eventos de pointer para scroll horizontal
    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);

    // Bloquear completamente la interacción 3D en el canvas
    canvas.addEventListener('mousedown', preventAll3DInteraction, {
      capture: true,
    });
    canvas.addEventListener('mousemove', preventAll3DInteraction, {
      capture: true,
    });
    canvas.addEventListener('mouseup', preventAll3DInteraction, {
      capture: true,
    });
    canvas.addEventListener('touchstart', preventAll3DInteraction, {
      capture: true,
    });
    canvas.addEventListener('touchmove', preventAll3DInteraction, {
      capture: true,
    });
    canvas.addEventListener('touchend', preventAll3DInteraction, {
      capture: true,
    });
    canvas.addEventListener('pointerdown', preventAll3DInteraction, {
      capture: true,
    });
    canvas.addEventListener('pointermove', preventAll3DInteraction, {
      capture: true,
    });
    canvas.addEventListener('pointerup', preventAll3DInteraction, {
      capture: true,
    });

    return () => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);

      canvas.removeEventListener('mousedown', preventAll3DInteraction, {
        capture: true,
      });
      canvas.removeEventListener('mousemove', preventAll3DInteraction, {
        capture: true,
      });
      canvas.removeEventListener('mouseup', preventAll3DInteraction, {
        capture: true,
      });
      canvas.removeEventListener('touchstart', preventAll3DInteraction, {
        capture: true,
      });
      canvas.removeEventListener('touchmove', preventAll3DInteraction, {
        capture: true,
      });
      canvas.removeEventListener('touchend', preventAll3DInteraction, {
        capture: true,
      });
      canvas.removeEventListener('pointerdown', preventAll3DInteraction, {
        capture: true,
      });
      canvas.removeEventListener('pointermove', preventAll3DInteraction, {
        capture: true,
      });
      canvas.removeEventListener('pointerup', preventAll3DInteraction, {
        capture: true,
      });
    };
  }, [splineUrl]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '400px',
        overflowX: 'auto',
        overflowY: 'hidden',
        overscrollBehavior: 'contain',
        cursor: 'grab',
        userSelect: 'none', // Prevenir selección de texto
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        id="spline-canvas"
        data-spline-url={splineUrl}
        data-spline-auto-rotate="false"
        data-spline-auto-rotate-delay="0"
        style={{
          pointerEvents: 'none', // Desactiva completamente la interacción del canvas
          touchAction: 'pan-x', // Solo permite pan horizontal en touch devices
        }}
      />
    </div>
  );
}
