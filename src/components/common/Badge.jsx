import React from 'react';

export default function Badge({
  type = 'gold', // 'live' | 'gold' | 'open' | 'soon' | 'full' | 'completed'
  children,
  className = '',
  withPulse = false
}) {
  let badgeClass = 'badge-gold';

  if (type === 'live') badgeClass = 'badge-live';
  else if (type === 'open' || type === 'REGISTRATION OPEN') badgeClass = 'badge-open';
  else if (type === 'soon' || type === 'STARTING SOON') badgeClass = 'badge-soon';
  else if (type === 'full' || type === 'FULL') badgeClass = 'badge-full';
  else if (type === 'completed' || type === 'COMPLETED') badgeClass = 'badge-completed';

  return (
    <span className={`badge ${badgeClass} ${className}`}>
      {(type === 'live' || withPulse) && <span className="live-dot" />}
      <span>{children}</span>
    </span>
  );
}
