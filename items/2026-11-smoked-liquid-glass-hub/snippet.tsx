import React from 'react';

export interface LiquidGlassPillProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Smoked Liquid-Glass Pill container with non-uniform diagonal specular rim light.
 * Pairs with the `.glass-pill` rules in `preview.html`.
 */
export const LiquidGlassPill: React.FC<LiquidGlassPillProps> = ({
  children,
  className = '',
  style,
  ...rest
}) => (
  <div
    className={`glass-pill ${className}`}
    style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      height: 36,
      borderRadius: 999,
      background: 'rgba(255, 255, 255, 0.056)',
      backdropFilter: 'blur(24px) saturate(145%)',
      WebkitBackdropFilter: 'blur(24px) saturate(145%)',
      boxShadow:
        '0 10px 26px rgba(0, 0, 0, 0.36), inset 0 1px 0.6px rgba(255, 255, 255, 0.22), inset 0 -1px 0.6px rgba(255, 255, 255, 0.06)',
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);

export interface LiquidGlassDeviceCardProps {
  title: string;
  batteryText?: string;
  connectionText?: string;
  upgradeLabel?: string;
  icon: React.ReactNode;
  accentColor?: string;
  onClick?: () => void;
  onUpgradeClick?: () => void;
}

/**
 * Compact smoked liquid-glass floating device card with top-right folded badge
 * and bottom telemetry strip.
 */
export const LiquidGlassDeviceCard: React.FC<LiquidGlassDeviceCardProps> = ({
  title,
  batteryText = '30%',
  connectionText = '2.4G',
  upgradeLabel,
  icon,
  accentColor = '#F42B65',
  onClick,
  onUpgradeClick,
}) => (
  <article
    className="device-card"
    title={title}
    onClick={onClick}
    style={{
      position: 'relative',
      width: 144,
      height: 164,
      borderRadius: 16,
      background:
        'linear-gradient(165deg, rgba(255,255,255,0.105) 0%, rgba(255,255,255,0.042) 55%, rgba(255,255,255,0.068) 100%)',
      backdropFilter: 'blur(26px) saturate(150%)',
      WebkitBackdropFilter: 'blur(26px) saturate(150%)',
      boxShadow:
        '0 20px 44px rgba(0,0,0,0.48), inset 0 1px 1px rgba(255,255,255,0.28), inset 0 -1px 1px rgba(255,255,255,0.08)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '22px 12px 12px',
      cursor: 'pointer',
      overflow: 'hidden',
    }}
  >
    {upgradeLabel && (
      <span
        className="upgrade-badge"
        onClick={(e) => {
          e.stopPropagation();
          onUpgradeClick?.();
        }}
      >
        {upgradeLabel}
      </span>
    )}
    <div className="product-visual">
      <div className="product-glow" style={{ background: accentColor }} />
      {icon}
    </div>
    <div className="device-telemetry">
      <span>{batteryText}</span>
      <span>{connectionText}</span>
    </div>
  </article>
);
