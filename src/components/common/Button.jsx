import React from 'react';
import { triggerGoldParticles } from '../../utils/particleEffect';

export default function Button({
  children,
  onClick,
  variant = 'secondary', // 'secondary' | 'outline-gold' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon = null,
  disabled = false,
  type = 'button',
  withParticles = false,
  className = '',
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    if (withParticles) {
      triggerGoldParticles(e);
    }
    if (onClick) {
      onClick(e);
    }
  };

  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const variantClass =
    variant === 'outline-gold'
      ? 'btn-outline-gold'
      : variant === 'danger'
      ? 'btn-danger'
      : variant === 'ghost'
      ? 'btn-ghost'
      : 'btn-secondary';

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
