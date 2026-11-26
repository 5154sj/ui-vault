import React, { useEffect, useRef } from 'react';

export interface PixelEdgeMascotsProps {
  showCactus?: boolean;
  onAction?: (petName: string, actionLabel: string) => void;
}

/**
 * Fine-grained 28x24 pixel-art mascots (Coral Crab + Lavender Cat + 20x24 Potted Cactus)
 * with subtle landing squash and zero floating text bubbles.
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
            { transform: 'translateY(2px) scale(1.22, 0.78)', offset: 0.14 },
            { transform: 'translateY(-32px) scale(0.84, 1.18)', offset: 0.48 },
            { transform: 'translateY(0) scale(1.20, 0.82)', offset: 0.78 },
            { transform: 'translateY(0) scale(0.94, 1.07)', offset: 0.9 },
            { transform: 'translateY(0) scale(1, 1)' },
          ],
          { duration: 640, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        );
      } else if (act === 'flip') {
        el.animate(
          [
            { transform: 'translateY(0) rotate(0deg) scale(1, 1)' },
            { transform: 'translateY(2px) rotate(0deg) scale(1.18, 0.82)', offset: 0.12 },
            { transform: 'translateY(-36px) rotate(180deg) scale(0.88, 1.14)', offset: 0.5 },
            { transform: 'translateY(0) rotate(360deg) scale(1.18, 0.84)', offset: 0.82 },
            { transform: 'translateY(0) rotate(360deg) scale(1, 1)' },
          ],
          { duration: 660, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        );
      } else if (act === 'dance') {
        el.animate(
          [
            { transform: 'rotate(0deg) scale(1, 1)' },
            { transform: 'rotate(-13deg) scale(1.14, 0.88)' },
            { transform: 'rotate(13deg) scale(0.9, 1.12)' },
            { transform: 'rotate(-10deg) scale(1.12, 0.9)' },
            { transform: 'rotate(10deg) scale(0.92, 1.09)' },
            { transform: 'rotate(0deg) scale(1, 1)' },
          ],
          { duration: 760, easing: 'ease-in-out' },
        );
      } else {
        el.animate(
          [
            { transform: 'scale(1, 1)' },
            { transform: 'scale(1.22, 0.80)' },
            { transform: 'scale(0.90, 1.12)' },
            { transform: 'scale(1.06, 0.95)' },
            { transform: 'scale(1, 1)' },
          ],
          { duration: 540, easing: 'ease-out' },
        );
      }
    };

    const onCoralClick = () => trigger(coralRef.current, 'coral', cIdx++);
    const onCatClick = () => trigger(catRef.current, 'lavender', lIdx++);
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
        style={{
          position: 'absolute',
          right: 120,
          top: -45,
          width: 56,
          height: 48,
          pointerEvents: 'auto',
          cursor: 'pointer',
          transformOrigin: '50% 94%',
        }}
      >
        <svg viewBox="0 0 28 24" style={{ width: '100%', height: '100%', shapeRendering: 'crispEdges' }}>
          <rect x="4" y="5" width="20" height="1" fill="#E89070" />
          <rect x="4" y="6" width="20" height="12" fill="#DC7A58" />
          <rect x="4" y="17" width="20" height="1" fill="#BD5F40" />
          <rect x="23" y="6" width="1" height="12" fill="#C96A4A" />
          <rect x="1" y="12" width="3" height="4" fill="#DC7A58" />
          <rect x="1" y="12" width="3" height="1" fill="#E89070" />
          <rect x="1" y="15" width="3" height="1" fill="#BD5F40" />
          <rect x="24" y="12" width="3" height="4" fill="#DC7A58" />
          <rect x="24" y="12" width="3" height="1" fill="#E89070" />
          <rect x="24" y="15" width="3" height="1" fill="#BD5F40" />
          <rect x="6" y="18" width="2" height="5" fill="#DC7A58" />
          <rect x="10" y="18" width="2" height="4" fill="#C46444" />
          <rect x="16" y="18" width="2" height="4" fill="#C46444" />
          <rect x="20" y="18" width="2" height="5" fill="#DC7A58" />
          <rect x="8" y="10" width="2" height="4" fill="#161518" />
          <rect x="18" y="10" width="2" height="4" fill="#161518" />
        </svg>
      </div>

      <div
        ref={catRef}
        style={{
          position: 'absolute',
          right: 46,
          top: -45,
          width: 56,
          height: 48,
          pointerEvents: 'auto',
          cursor: 'pointer',
          transformOrigin: '50% 94%',
        }}
      >
        <svg viewBox="0 0 28 24" style={{ width: '100%', height: '100%', shapeRendering: 'crispEdges' }}>
          <rect x="3" y="2" width="2" height="4" fill="#9B86F2" />
          <rect x="5" y="4" width="2" height="2" fill="#9B86F2" />
          <rect x="4" y="4" width="1" height="2" fill="#C4B5FD" />
          <rect x="20" y="2" width="2" height="4" fill="#9B86F2" />
          <rect x="18" y="4" width="2" height="2" fill="#9B86F2" />
          <rect x="20" y="4" width="1" height="2" fill="#C4B5FD" />
          <rect x="3" y="6" width="19" height="1" fill="#B4A2FB" />
          <rect x="3" y="7" width="19" height="11" fill="#9B86F2" />
          <rect x="3" y="17" width="19" height="1" fill="#7B66D6" />
          <rect x="21" y="7" width="1" height="11" fill="#8873E3" />
          <rect x="22" y="13" width="2" height="3" fill="#9B86F2" />
          <rect x="24" y="10" width="2" height="5" fill="#9B86F2" />
          <rect x="25" y="8" width="2" height="3" fill="#B4A2FB" />
          <rect x="5" y="18" width="2" height="5" fill="#9B86F2" />
          <rect x="9" y="18" width="2" height="4" fill="#826DDB" />
          <rect x="15" y="18" width="2" height="4" fill="#826DDB" />
          <rect x="19" y="18" width="2" height="5" fill="#9B86F2" />
          <rect x="7" y="10" width="2" height="4" fill="#161518" />
          <rect x="16" y="10" width="2" height="4" fill="#161518" />
        </svg>
      </div>

      {showCactus && (
        <div
          style={{
            position: 'absolute',
            right: 2,
            top: -33,
            width: 30,
            height: 36,
            pointerEvents: 'none',
          }}
        >
          <svg viewBox="0 0 20 24" style={{ width: '100%', height: '100%', shapeRendering: 'crispEdges' }}>
            <rect x="9" y="1" width="2" height="1" fill="#F08A64" />
            <rect x="8" y="2" width="4" height="2" fill="#E87D55" />
            <rect x="9" y="2" width="2" height="1" fill="#FCD34D" />
            <rect x="8" y="4" width="4" height="13" fill="#73A98E" />
            <rect x="8" y="5" width="1" height="11" fill="#8EC4A9" />
            <rect x="11" y="5" width="1" height="12" fill="#53846C" />
            <rect x="3" y="8" width="2" height="5" fill="#73A98E" />
            <rect x="5" y="11" width="3" height="2" fill="#73A98E" />
            <rect x="15" y="6" width="2" height="5" fill="#53846C" />
            <rect x="12" y="9" width="3" height="2" fill="#53846C" />
            <rect x="5" y="17" width="10" height="2" fill="#9D7B68" />
            <rect x="6" y="19" width="8" height="4" fill="#7C5E4D" />
            <rect x="7" y="23" width="6" height="1" fill="#63493B" />
          </svg>
        </div>
      )}
    </div>
  );
};
