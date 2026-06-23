import { useRef, useCallback, useEffect } from 'react';

export default function useCardHover() {
  const cardRectsRef = useRef(new WeakMap());

  useEffect(() => {
    const invalidateCache = () => {
      cardRectsRef.current = new WeakMap();
    };
    window.addEventListener('scroll', invalidateCache, { passive: true });
    window.addEventListener('resize', invalidateCache, { passive: true });
    return () => {
      window.removeEventListener('scroll', invalidateCache);
      window.removeEventListener('resize', invalidateCache);
    };
  }, []);

  const handleCardMouseMove = useCallback((e) => {
    const card = e.currentTarget;

    let rect = cardRectsRef.current.get(card);
    if (!rect) {
      rect = card.getBoundingClientRect();
      cardRectsRef.current.set(card, rect);
    }

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    const rotateX = (-deltaY * 7).toFixed(2);
    const rotateY = (deltaX * 7).toFixed(2);

    card.style.transition = 'none';
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleCardMouseLeave = useCallback((e) => {
    const card = e.currentTarget;
    cardRectsRef.current.delete(card);

    card.style.removeProperty('--mouse-x');
    card.style.removeProperty('--mouse-y');

    card.style.transition = 'transform 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.4s ease, box-shadow 0.4s ease';
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, []);

  const cardHoverProps = {
    onMouseMove: handleCardMouseMove,
    onMouseLeave: handleCardMouseLeave
  };

  return { handleCardMouseMove, handleCardMouseLeave, cardHoverProps };
}
