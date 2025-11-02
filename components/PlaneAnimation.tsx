'use client';

import { useEffect, useRef } from 'react';

interface PlaneGradient {
  from: string;
  to: string;
}

const planeGradients: PlaneGradient[] = [
  { from: '#ff4aae', to: '#ffd149' },
  { from: '#6e45e2', to: '#3e7bfa' },
  { from: '#ffd149', to: '#6e45e2' },
  { from: '#ff4aae', to: '#3e7bfa' },
  { from: '#3e7bfa', to: '#6e45e2' },
  { from: '#ffd149', to: '#ff4aae' },
  { from: '#6e45e2', to: '#ff4aae' },
  { from: '#3e7bfa', to: '#ffd149' },
];

const planeSVGTemplate = `<svg viewBox="0 0 48 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="planeGrad{INDEX}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{FROM_COLOR}"/>
      <stop offset="100%" style="stop-color:{TO_COLOR}"/>
    </linearGradient>
  </defs>
  <path d="M34.2796 54.8042C35.3178 56.6018 35.3529 58.8084 34.3727 60.6382L24 80L13.6274 60.6382C12.6471 58.8084 12.6823 56.6018 13.7204 54.8042L15.0512 52.4999C15.2298 52.1906 15.5599 52 15.9171 52H32.0829C32.4401 52 32.7702 52.1906 32.9489 52.4999L34.2796 54.8042Z" fill="url(#planeGrad{INDEX})"/>
  <path d="M24 2.31437e-07C25.1448 -0.000417366 26.2904 0.56429 26.9434 1.69629L46.9483 36.3701C49.947 41.5702 46.1704 47.9983 40.211 47.999H36.1242C35.767 47.999 35.4369 47.8084 35.2582 47.499L24.866 29.4999C24.4811 28.8333 23.5189 28.8333 23.134 29.4999L12.7418 47.499C12.5632 47.8084 12.2331 47.999 11.8758 47.999H7.78909C1.82973 47.9983 -1.9469 41.5701 1.05178 36.3701L21.0567 1.69629C21.7096 0.564308 22.8553 -0.000387376 24 2.31437e-07Z" fill="url(#planeGrad{INDEX})"/>
</svg>`;

function getRandomPlaneSVG(index: number): string {
  const gradientIndex = index % planeGradients.length;
  const gradient = planeGradients[gradientIndex];

  return planeSVGTemplate
    .replace(/{INDEX}/g, index.toString())
    .replace(/{FROM_COLOR}/g, gradient.from)
    .replace(/{TO_COLOR}/g, gradient.to);
}

interface PathData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  cp1X: number;
  cp1Y: number;
  cp2X: number;
  cp2Y: number;
}

function getLayerPath(layerIndex: number, width: number, height: number): PathData {
  const startX = width;
  const startY = height;
  const endX = 0;
  const endY = 0;

  let cp1X: number, cp1Y: number, cp2X: number, cp2Y: number;

  if (layerIndex === 1) {
    cp1X = width * 0.8;
    cp1Y = height * 0.2;
    cp2X = width * 0.2;
    cp2Y = height * 0.3;
  } else if (layerIndex === 2) {
    cp1X = width * 0.7;
    cp1Y = height * 0.4;
    cp2X = width * 0.3;
    cp2Y = height * 0.6;
  } else {
    cp1X = width * 0.6;
    cp1Y = height * 0.6;
    cp2X = width * 0.4;
    cp2Y = height * 0.8;
  }

  return { startX, startY, endX, endY, cp1X, cp1Y, cp2X, cp2Y };
}

export default function PlaneAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const planesRef = useRef<Array<{ element: HTMLDivElement; cleanup: () => void; animationId: number | null }>>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const pathDataRef = useRef<Map<number, PathData>>(new Map());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getDimensions = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const cleanupAll = () => {
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current = [];

      planesRef.current.forEach(({ animationId }) => {
        if (animationId !== null) {
          cancelAnimationFrame(animationId);
        }
      });

      planesRef.current.forEach(({ cleanup }) => cleanup());
      planesRef.current = [];

      if (container) {
        container.innerHTML = '';
      }
    };

    const createLayerPlanes = (
      layerIndex: number,
      layerName: string,
      count: number,
      baseScale: number,
      blur: number,
      staggerDelay: number
    ) => {
      for (let i = 0; i < count; i++) {
        const randomDelay = Math.random() * staggerDelay * 0.5;
        const totalDelay = i * staggerDelay + randomDelay;

        const scaleVariation = 0.5 + Math.random() * 1.0;
        const randomizedScale = baseScale * scaleVariation;

        const timeoutId = setTimeout(() => {
          createLayeredPlane(layerIndex, i, layerName, randomizedScale, blur);
        }, totalDelay);
        timeoutsRef.current.push(timeoutId);
      }
    };

    const createLayeredPlane = (
      layerIndex: number,
      planeIndex: number,
      layerName: string,
      scale: number,
      blur: number
    ) => {
      const planeSVG = getRandomPlaneSVG(layerIndex * 10 + planeIndex);

      const plane = document.createElement('div');
      plane.style.position = 'absolute';

      const baseSize = 40;
      const planeSize = baseSize * scale;
      plane.style.width = `${planeSize}px`;
      plane.style.height = `${planeSize}px`;

      plane.style.zIndex = `${100 + layerIndex * 10}`;
      plane.style.opacity = '0';
      plane.style.willChange = 'transform, opacity';
      plane.style.backfaceVisibility = 'hidden';
      plane.style.webkitBackfaceVisibility = 'hidden';

      if (blur > 0) {
        plane.style.filter = `blur(${blur}px)`;
        plane.style.opacity = '0.7';
      }

      const svgWrapper = document.createElement('div');
      svgWrapper.style.width = '100%';
      svgWrapper.style.height = '100%';
      svgWrapper.innerHTML = planeSVG;
      plane.appendChild(svgWrapper);

      container.appendChild(plane);

      const dimensions = getDimensions();
      const pathData = getLayerPath(layerIndex, dimensions.width, dimensions.height);
      pathDataRef.current.set(layerIndex, pathData);

      let progress = -0.1 - Math.random() * 0.2;
      const speed = 0.001 + Math.random() * 0.002;
      let animationId: number | null = null;
      let isRunning = true;

      const animatePlane = () => {
        if (!isRunning) return;

        const currentPathData = pathDataRef.current.get(layerIndex) || pathData;

        progress += speed;
        if (progress > 1.3) progress = -0.1 - Math.random() * 0.2;

        const t = Math.max(0, Math.min(progress, 1));

        const x =
          Math.pow(1 - t, 3) * currentPathData.startX +
          3 * Math.pow(1 - t, 2) * t * currentPathData.cp1X +
          3 * (1 - t) * Math.pow(t, 2) * currentPathData.cp2X +
          Math.pow(t, 3) * currentPathData.endX;

        const y =
          Math.pow(1 - t, 3) * currentPathData.startY +
          3 * Math.pow(1 - t, 2) * t * currentPathData.cp1Y +
          3 * (1 - t) * Math.pow(t, 2) * currentPathData.cp2Y +
          Math.pow(t, 3) * currentPathData.endY;

        plane.style.left = `${x}px`;
        plane.style.top = `${y}px`;

        let opacity = 0;
        if (progress < 0) {
          opacity = 0;
        } else if (progress < 0.15) {
          opacity = progress / 0.15;
        } else if (progress > 0.75) {
          opacity = Math.max(0, (1 - progress) / 0.25);
        } else {
          opacity = 1;
        }

        if (blur > 0) {
          opacity *= 0.6;
        }

        plane.style.opacity = opacity.toString();

        if (progress > 0 && progress < 1) {
          const dt = 0.01;
          const t1 = Math.max(0, t - dt);
          const t2 = Math.min(1, t + dt);

          const x1 =
            Math.pow(1 - t1, 3) * currentPathData.startX +
            3 * Math.pow(1 - t1, 2) * t1 * currentPathData.cp1X +
            3 * (1 - t1) * Math.pow(t1, 2) * currentPathData.cp2X +
            Math.pow(t1, 3) * currentPathData.endX;
          const y1 =
            Math.pow(1 - t1, 3) * currentPathData.startY +
            3 * Math.pow(1 - t1, 2) * t1 * currentPathData.cp1Y +
            3 * (1 - t1) * Math.pow(t1, 2) * currentPathData.cp2Y +
            Math.pow(t1, 3) * currentPathData.endY;

          const x2 =
            Math.pow(1 - t2, 3) * currentPathData.startX +
            3 * Math.pow(1 - t2, 2) * t2 * currentPathData.cp1X +
            3 * (1 - t2) * Math.pow(t2, 2) * currentPathData.cp2X +
            Math.pow(t2, 3) * currentPathData.endX;
          const y2 =
            Math.pow(1 - t2, 3) * currentPathData.startY +
            3 * Math.pow(1 - t2, 2) * t2 * currentPathData.cp1Y +
            3 * (1 - t2) * Math.pow(t2, 2) * currentPathData.cp2Y +
            Math.pow(t2, 3) * currentPathData.endY;

          const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
          plane.style.transform = `rotate(${angle + 90}deg)`;
        }

        animationId = requestAnimationFrame(animatePlane);
      };

      animatePlane();

      const cleanup = () => {
        isRunning = false;
        if (animationId !== null) {
          cancelAnimationFrame(animationId);
        }
        if (plane.parentNode) {
          plane.parentNode.removeChild(plane);
        }
      };

      planesRef.current.push({ element: plane, cleanup, animationId });
    };

    const dimensions = getDimensions();
    for (let layerIndex = 1; layerIndex <= 3; layerIndex++) {
      const pathData = getLayerPath(layerIndex, dimensions.width, dimensions.height);
      pathDataRef.current.set(layerIndex, pathData);
    }

    createLayerPlanes(1, 'background', 4, 0.4, 3, 3000);
    createLayerPlanes(2, 'middle', 3, 0.7, 0, 4000);
    createLayerPlanes(3, 'foreground', 3, 1.2, 0, 5000);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newDimensions = getDimensions();
        for (let layerIndex = 1; layerIndex <= 3; layerIndex++) {
          const newPathData = getLayerPath(layerIndex, newDimensions.width, newDimensions.height);
          pathDataRef.current.set(layerIndex, newPathData);
        }
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cleanupAll();
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div
      className="animation-wrapper"
      style={{
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <div
        ref={containerRef}
        className="animation-container"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          overflow: 'hidden',
        }}
      />
    </div>
  );
}

