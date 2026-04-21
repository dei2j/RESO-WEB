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
    if (isTouchDevice.current) {
      document.documentElement.classList.remove('custom-cursor');
      return;
    }

    // 마우스 디바이스에서만 기본 커서 숨김
    document.documentElement.classList.add('custom-cursor');

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverCheck = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      setIsHovering(!!target);
    };

    const handleDragOver = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // hide zone(iframe, video-embed-wrapper, next-project-section)에 진입/이탈만 감지
    const hideZoneEnter = () => setIsVisible(false);
    const hideZoneLeave = () => setIsVisible(true);

    const attachHideZone = (el) => {
      el.addEventListener('mouseenter', hideZoneEnter);
      el.addEventListener('mouseleave', hideZoneLeave);
    };
    const detachHideZone = (el) => {
      el.removeEventListener('mouseenter', hideZoneEnter);
      el.removeEventListener('mouseleave', hideZoneLeave);
    };

    const HIDE_SELECTOR = 'iframe, .video-embed-wrapper, .next-project-section';
    document.querySelectorAll(HIDE_SELECTOR).forEach(attachHideZone);

    // ��적으로 추가되는 요소도 감지 (직속 자식만 감시하여 부하 최소화)
    const mo = new MutationObserver(() => {
      document.querySelectorAll(HIDE_SELECTOR).forEach((el) => {
        if (!el._hideZoneAttached) {
          el._hideZoneAttached = true;
          attachHideZone(el);
        }
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleHoverCheck);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drag', handleDragOver);

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      mo.disconnect();
      document.querySelectorAll(HIDE_SELECTOR).forEach(detachHideZone);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleHoverCheck);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drag', handleDragOver);
    };
  }, [mouseX, mouseY]);

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
