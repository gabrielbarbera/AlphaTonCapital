'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [useFallback, setUseFallback] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

    const testCursor = () => {
      const testElement = document.createElement('div');
      testElement.style.position = 'absolute';
      testElement.style.top = '-9999px';
      testElement.style.left = '-9999px';
      testElement.style.width = '1px';
      testElement.style.height = '1px';
      testElement.style.cursor = `url('/assets/cursor_pointer.svg') 12.5 13, pointer`;
      document.body.appendChild(testElement);
      
      void testElement.offsetWidth;
      
      const computedStyle = window.getComputedStyle(testElement);
      const cursorValue = computedStyle.cursor;
      
      document.body.removeChild(testElement);
      
      const needsFallback = !cursorValue || 
                           cursorValue === 'auto' || 
                           cursorValue === 'default' ||
                           !cursorValue.includes('url');
      
      if (needsFallback) {
        setUseFallback(true);
        document.documentElement.classList.add('custom-cursor-fallback');
      }
    };

    const timeoutId = setTimeout(testCursor, 100);

    return () => {
      clearTimeout(timeoutId);
      document.documentElement.classList.remove('custom-cursor-fallback');
    };
  }, []);

  useEffect(() => {
    if (!useFallback || !isVisible) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [useFallback, isVisible]);

  if (!isVisible || !useFallback) {
    return null;
  }

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-12.5px, -13px)',
        willChange: 'transform',
      }}
    >
      <svg 
        width="25" 
        height="26" 
        viewBox="0 0 25 26" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <path d="M12.2821 17.9434C12.3546 18.5174 12.7186 19.0132 13.2446 19.2542L18.8102 21.8045L17.85 15.7581C17.7593 15.1867 17.3796 14.7028 16.8462 14.4787L16.1624 14.1914C16.0706 14.1528 15.9652 14.1662 15.8859 14.2264L12.2972 16.9507C12.2179 17.0109 12.1767 17.1088 12.1892 17.2076L12.2821 17.9434Z" fill="url(#paint0_linear_2144_852)"/>
        <path d="M12.2821 17.9434C12.3546 18.5174 12.7186 19.0132 13.2446 19.2542L18.8102 21.8045L17.85 15.7581C17.7593 15.1867 17.3796 14.7028 16.8462 14.4787L16.1624 14.1914C16.0706 14.1528 15.9652 14.1662 15.8859 14.2264L12.2972 16.9507C12.2179 17.0109 12.1767 17.1088 12.1892 17.2076L12.2821 17.9434Z" fill="url(#paint1_linear_2144_852)"/>
        <path d="M11.9471 15.2918C11.974 15.5047 12.2212 15.6086 12.3921 15.4789L14.4428 13.9222C14.6137 13.7925 14.58 13.5264 14.3822 13.4432L12.0087 12.4456C11.8109 12.3625 11.5973 12.5246 11.6242 12.7375L11.9471 15.2918Z" fill="url(#paint2_linear_2144_852)"/>
        <path d="M11.9471 15.2918C11.974 15.5047 12.2212 15.6086 12.3921 15.4789L14.4428 13.9222C14.6137 13.7925 14.58 13.5264 14.3822 13.4432L12.0087 12.4456C11.8109 12.3625 11.5973 12.5246 11.6242 12.7375L11.9471 15.2918Z" fill="url(#paint3_linear_2144_852)"/>
        <path d="M5.32828 4.04459C5.07408 4.23742 4.91491 4.55585 4.96072 4.91719L6.36306 15.986C6.57368 17.6458 8.49538 18.4364 9.81848 17.4322L10.7257 16.7435C10.805 16.6833 10.8462 16.5854 10.8337 16.4866L10.1075 10.7395C10.0806 10.5266 10.2942 10.3645 10.492 10.4476L15.8323 12.692C15.9241 12.7306 16.0295 12.7173 16.1088 12.6571L17.0161 11.9684C18.3389 10.9639 18.094 8.90041 16.552 8.25137L6.26757 3.92514C5.93185 3.78387 5.58234 3.85159 5.32828 4.04459Z" fill="url(#paint4_linear_2144_852)"/>
        <path d="M5.32828 4.04459C5.07408 4.23742 4.91491 4.55585 4.96072 4.91719L6.36306 15.986C6.57368 17.6458 8.49538 18.4364 9.81848 17.4322L10.7257 16.7435C10.805 16.6833 10.8462 16.5854 10.8337 16.4866L10.1075 10.7395C10.0806 10.5266 10.2942 10.3645 10.492 10.4476L15.8323 12.692C15.9241 12.7306 16.0295 12.7173 16.1088 12.6571L17.0161 11.9684C18.3389 10.9639 18.094 8.90041 16.552 8.25137L6.26757 3.92514C5.93185 3.78387 5.58234 3.85159 5.32828 4.04459Z" fill="url(#paint5_linear_2144_852)"/>
        <defs>
          <linearGradient id="paint0_linear_2144_852" x1="6.74128" y1="16.9691" x2="17.3972" y2="8.87994" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="#999999"/>
          </linearGradient>
          <linearGradient id="paint1_linear_2144_852" x1="5.35478" y1="4.02447" x2="18.6889" y2="21.8954" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff4aae">
              <animate attributeName="stop-color" values="#ff4aae;#ffd149;#6e45e2;#3e7bfa;#ff4aae" dur="4s" repeatCount="indefinite"/>
            </stop>
            <stop offset="1" stopColor="#3e7bfa">
              <animate attributeName="stop-color" values="#3e7bfa;#6e45e2;#ff4aae;#ffd149;#3e7bfa" dur="4s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>
          <linearGradient id="paint2_linear_2144_852" x1="6.74128" y1="16.9691" x2="17.3972" y2="8.87994" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="#999999"/>
          </linearGradient>
          <linearGradient id="paint3_linear_2144_852" x1="5.35478" y1="4.02447" x2="18.6889" y2="21.8954" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff4aae">
              <animate attributeName="stop-color" values="#ff4aae;#ffd149;#6e45e2;#3e7bfa;#ff4aae" dur="4s" repeatCount="indefinite"/>
            </stop>
            <stop offset="1" stopColor="#3e7bfa">
              <animate attributeName="stop-color" values="#3e7bfa;#6e45e2;#ff4aae;#ffd149;#3e7bfa" dur="4s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>
          <linearGradient id="paint4_linear_2144_852" x1="6.74128" y1="16.9691" x2="17.3972" y2="8.87994" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="#999999"/>
          </linearGradient>
          <linearGradient id="paint5_linear_2144_852" x1="5.35478" y1="4.02447" x2="18.6889" y2="21.8954" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff4aae">
              <animate attributeName="stop-color" values="#ff4aae;#ffd149;#6e45e2;#3e7bfa;#ff4aae" dur="4s" repeatCount="indefinite"/>
            </stop>
            <stop offset="1" stopColor="#3e7bfa">
              <animate attributeName="stop-color" values="#3e7bfa;#6e45e2;#ff4aae;#ffd149;#3e7bfa" dur="4s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

