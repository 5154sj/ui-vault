import React, { useEffect, useRef } from 'react';

export interface RgbPrismRimProps {
  children: React.ReactNode;
  className?: string;
  proximityRadius?: number;
  mode?: 'hybrid' | 'proximity';
  borderRadius?: number;
}

/**
 * Reusable cursor-proximity & hover flowing RGB prism rim light wrapper.
 * Requires the CSS rules from `preview.html` (`.rgb-rim`, `.rgb-rim-border`, `.rgb-rim-inner`, `@property --rgb-angle`).
 */
export const RgbPrismRim: React.FC<RgbPrismRimProps> = ({
  children,
  className = '',
  proximityRadius = 230,
  mode = 'hybrid',
  borderRadius = 16,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let rafId = 0;
    let prox = 0;
    let targetProx = 0;
    let active = false;
    let px = -9999;
    let py = -9999;

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      active = true;
    };
    const onLeave = () => {
      active = false;
    };

    const tick = () => {
      if (!active) {
        targetProx = 0;
        el.dataset.hovered = '0';
        el.style.setProperty('--hovered', '0');
      } else {
        const rect = el.getBoundingClientRect();
        const dx = Math.max(rect.left - px, 0, px - rect.right);
        const dy = Math.max(rect.top - py, 0, py - rect.bottom);
        const dist = Math.hypot(dx, dy);
        const inside = dist === 0;
        el.style.setProperty('--mx', `${(px - rect.left).toFixed(1)}px`);
        el.style.setProperty('--my', `${(py - rect.top).toFixed(1)}px`);
        el.dataset.hovered = inside ? '1' : '0';
        el.style.setProperty('--hovered', inside ? '1' : '0');
        const norm = Math.max(0, 1 - dist / proximityRadius);
        targetProx = inside ? 1 : Math.pow(norm, 1.45);
      }

      prox += (targetProx - prox) * 0.22;
      if (prox < 0.002) prox = 0;
      el.style.setProperty('--prox', prox.toFixed(3));
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [proximityRadius]);

  return (
    <div
      ref={ref}
      data-hovered="0"
      className={`rgb-rim ${mode === 'hybrid' ? 'mode-hybrid' : 'mode-proximity'} ${className}`}
      style={{ '--card-radius': `${borderRadius}px` } as React.CSSProperties}
    >
      <div className="rgb-rim-border" />
      <div className="rgb-rim-inner">{children}</div>
    </div>
  );
};
