import React from 'react';
import clsx from 'clsx';
import { ContainerProps } from './types';

const MDBContainer: React.FC<ContainerProps> = React.forwardRef<HTMLAllCollection, ContainerProps>(
  ({ breakpoint, fluid, children, className, tag: Tag = 'div', ...props }, ref) => {
    const classes = clsx(`${fluid ? 'container-fluid' : `container${breakpoint ? '-' + breakpoint : ''}`}`, className);

    return (
      <Tag className={classes} {...props} ref={ref}>
        {children}
      </Tag>
    );
  }
);

export default MDBContainer;
