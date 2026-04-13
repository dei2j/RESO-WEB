import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isTouchDevice = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const shouldHide = el && (el.tagName === 'IFRAME' || el.closest('.video-embed-wrapper') || el.closest('.next-project-section'));
      if (shouldHide) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverCheck = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      setIsHovering(!!target);
    };

    // 드래그 중에도 커스텀 커서 유지
    const handleDragOver = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleHoverCheck);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drag', handleDragOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleHoverCheck);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drag', handleDragOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice.current) return null;

  const dotSize = 22;
  const ringSize = 50;

  return (
    <>
      {/* 내부 점 - 항상 표시 */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          pointerEvents: 'none',
          zIndex: 99999,
        }}
        animate={{
          width: isClicking ? 6 : dotSize,
          height: isClicking ? 6 : dotSize,
          opacity: isVisible ? 1 : 0,
          marginLeft: isClicking ? -3 : -dotSize / 2,
          marginTop: isClicking ? -3 : -dotSize / 2,
        }}
        transition={{ duration: 0.15 }}
        className="rounded-full bg-white mix-blend-difference"
      />

      {/* 외부 링 - 호버 시 커지며 표시 */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          pointerEvents: 'none',
          zIndex: 99998,
          border: '1.5px solid white',
          borderRadius: '50%',
          mixBlendMode: 'difference',
        }}
        animate={{
          width: isHovering ? ringSize : 0,
          height: isHovering ? ringSize : 0,
          opacity: isVisible && isHovering ? 1 : 0,
          marginLeft: isHovering ? -ringSize / 2 : 0,
          marginTop: isHovering ? -ringSize / 2 : 0,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </>
  );
};

export default CustomCursor;
