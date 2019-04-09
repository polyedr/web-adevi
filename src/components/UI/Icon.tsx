import * as React from 'react';

interface IProps {
  icon: string,
  size?: number,
}

export const Icon: React.FunctionComponent<IProps> = ({ icon, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <mask id={`icon-mask-${icon}`}>
        <use xlinkHref={`${require('$sprites/icons.svg')}#icon-${icon}`} x={0} y={0} />
      </mask>
    </defs>
    <rect x="0" y="0" width="24" height="24" stroke="none" mask={`url(#icon-mask-${icon})`} />
  </svg>
);
