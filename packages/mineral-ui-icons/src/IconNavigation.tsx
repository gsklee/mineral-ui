import React from 'react';
import Icon from 'mineral-ui/Icon';

import { IconProps } from 'mineral-ui/Icon/types';

/* eslint-disable prettier/prettier */
export default function IconNavigation(props: IconProps) {
  const iconProps = {
    rtl: false,
    ...props
  };

  return (
    <Icon {...iconProps}>
      <g>
        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
      </g>
    </Icon>
  );
}

IconNavigation.displayName = 'IconNavigation';
IconNavigation.category = 'maps';