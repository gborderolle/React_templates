import React from 'react';
import clsx from 'clsx';
import type { ProgressBarProps } from './types';

const MDBProgressBar: React.FC<ProgressBarProps> = React.forwardRef<HTMLAllCollection, ProgressBarProps>(
  (
    {
      animated,
      children,
      className,
      style,
      tag: Tag = 'div',
      valuenow,
      valuemax,
      striped,
      bgColor,
      valuemin,
      width,
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      'progress-bar',
      bgColor && `bg-${bgColor}`,
      striped && 'progress-bar-striped',
      animated && 'progress-bar-animated',
      className
    );
    const styles = { width: `${width}%`, ...style };

    return (
      <Tag
        className={classes}
        style={styles}
        ref={ref}
        role='progressbar'
        {...props}
        aria-valuenow={Number(width) ?? valuenow}
        aria-valuemin={Number(valuemin)}
        aria-valuemax={Number(valuemax)}
      >
        {children}
      </Tag>
    );
  }
);

export default MDBProgressBar;
