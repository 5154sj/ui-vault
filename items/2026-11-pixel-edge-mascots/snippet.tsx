import React, { useEffect, useRef } from 'react';

export interface PixelEdgeMascotsProps {
  /** Attach as a child inside any `position: relative` card/prompt container. */
  showCactus?: boolean;
  onAction?: (petName: string, actionLabel: string) => void;
}

/**
 * Lightweight drop-in React overlay for the dual pixel mascots (Coral Crab + Lavender Cat)
 * perched on the top-right edge of a dark card or chat input box.
 * Full standalone interactive playground (including piggyback stacking, treat race,
 * throw physics, and typing bob) lives in `preview.html`.
 */
export const PixelEdgeMascots: React.FC<PixelEdgeMascotsProps> = ({
  showCactus = true,
  onAction,
}) => {
  const coralRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const actions = ['jump', 'flip', 'dance', 'blush'];
    let cIdx = 0;
    let lIdx = 0;

    const trigger = (el: HTMLDivElement | null, name: string, idx: number) => {
      if (!el) return;
      const act = actions[idx % actions.length];
      onAction?.(name, act);
      if (act === 'jump') {
        el.animate(
          [
            { transform: 'translateY(0) scale(1, 1)' },
            { transform: 'translateY(2px) scale(1.18, 0.82)', offset: 0.15 },
            { transform: 'translateY(-34px) scale(0.88, 1.16)', offset: 0.5 },
            { transform: 'translateY(0) scale(1.16, 0.84)', offset: 0.85 },
            { transform: 'translateY(0) scale(1, 1)' },
          ],
          { duration: 560, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        );
      } else if (act === 'flip') {
        el.animate(
          [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: 'translateY(-38px) rotate(180deg)', offset: 0.5 },
            { transform: 'translateY(0) rotate(360deg)' },
          ],
          { duration: 580, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        );
      } else if (act === 'dance') {
        el.animate(
          [
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(-14deg) translateY(-6px)' },
            { transform: 'rotate(14deg) translateY(-6px)' },
            { transform: 'rotate(-10deg) translateY(-4px)' },
            { transform: 'rotate(10deg) translateY(-4px)' },
            { transform: 'rotate(0deg)' },
          ],
          { duration: 760, easing: 'ease-in-out' },
        );
      } else {
        el.animate(
          [
            { transform: 'scale(1)' },
            { transform: 'scale(1.14, 0.88)' },
            { transform: 'scale(0.95, 1.08)' },
            { transform: 'scale(1)' },
          ],
          { duration: 480, easing: 'ease-out' },
        );
      }
    };

    const onCoralClick = () => trigger(coralRef.current, '珊瑚小蟹', cIdx++);
    const onCatClick = () => trigger(catRef.current, '薰衣草小猫', lIdx++);
    const cEl = coralRef.current;
    const lEl = catRef.current;
    cEl?.addEventListener('click', onCoralClick);
    lEl?.addEventListener('click', onCatClick);
    return () => {
      cEl?.removeEventListener('click', onCoralClick);
      lEl?.removeEventListener('click', onCatClick);
    };
  }, [onAction]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 16,
        height: 0,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      <div
        ref={coralRef}
        title="点击互动：珊瑚小蟹"
        style={{
          position: 'absolute',
          right: 108,
          top: -36,
          width: 44,
          height: 38,
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
      >
        <svg viewBox="0 0 16 14" style={{ width: '100%', height: '100%', shapeRendering: 'crispEdges' }}>
          <rect x="2" y="2" width="12" height="8" fill="#D97856" />
          <rect x="0" y="6" width="2" height="2" fill="#D97856" />
          <rect x="14" y="6" width="2" height="2" fill="#D97856" />
          <rect x="3" y="10" width="1.4" height="2.6" fill="#D97856" />
          <rect x="5.2" y="10" width="1.4" height="2.6" fill="#BD6243" />
          <rect x="9.4" y="10" width="1.4" height="2.6" fill="#BD6243" />
          <rect x="11.6" y="10" width="1.4" height="2.6" fill="#D97856" />
          <rect x="4.5" y="5" width="1.3" height="2.6" fill="#18171A" />
          <rect x="10.5" y="5" width="1.3" height="2.6" fill="#18171A" />
        </svg>
      </div>

      <div
        ref={catRef}
        title="点击互动：薰衣草小猫"
        style={{
          position: 'absolute',
          right: 40,
          top: -36,
          width: 44,
          height: 38,
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
      >
        <svg viewBox="0 0 16 14" style={{ width: '100%', height: '100%', shapeRendering: 'crispEdges' }}>
          <rect x="2" y="0" width="2" height="2" fill="#9B87F5" />
          <rect x="11" y="0" width="2" height="2" fill="#9B87F5" />
          <rect x="2" y="2" width="11" height="8" fill="#9B87F5" />
          <rect x="13" y="7" width="1.5" height="2" fill="#9B87F5" />
          <rect x="14" y="4" width="1.5" height="3.5" fill="#9B87F5" />
          <rect x="3" y="10" width="1.4" height="2.6" fill="#9B87F5" />
          <rect x="5" y="10" width="1.4" height="2.6" fill="#7E6AD8" />
          <rect x="8.8" y="10" width="1.4" height="2.6" fill="#7E6AD8" />
          <rect x="10.8" y="10" width="1.4" height="2.6" fill="#9B87F5" />
          <rect x="4.5" y="5" width="1.3" height="2.6" fill="#18171A" />
          <rect x="10.5" y="5" width="1.3" height="2.6" fill="#18171A" />
        </svg>
      </div>

      {showCactus && (
        <div
          style={{
            position: 'absolute',
            right: 4,
            top: -26,
            width: 24,
            height: 28,
            pointerEvents: 'none',
          }}
        >
          <svg viewBox="0 0 12 14" style={{ width: '100%', height: '100%', shapeRendering: 'crispEdges' }}>
            <rect x="5" y="1" width="2" height="2" fill="#E57A54" />
            <rect x="5" y="3" width="2" height="7" fill="#73A98E" />
            <rect x="2" y="5" width="1" height="3" fill="#73A98E" />
            <rect x="3" y="7" width="2" height="1" fill="#73A98E" />
            <rect x="9" y="4" width="1" height="3" fill="#55876F" />
            <rect x="7" y="6" width="2" height="1" fill="#55876F" />
            <rect x="3" y="10" width="6" height="1" fill="#9C7B68" />
            <rect x="4" y="11" width="4" height="3" fill="#7C6253" />
          </svg>
        </div>
      )}
    </div>
  );
};
