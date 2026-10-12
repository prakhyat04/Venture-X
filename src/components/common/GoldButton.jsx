import React from 'react';
import { triggerGoldParticles } from '../../utils/particleEffect';

export default function GoldButton({
  children,
  onClick,
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  icon = null,
  disabled = false,
  type = 'button',
  particleOptions = {},
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    triggerGoldParticles(e, particleOptions);
    if (onClick) {
      onClick(e);
    }
  };

  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';

  return (
    <button
      type={type}
      className={`btn btn-gold ${sizeClass} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
