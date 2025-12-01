import { type CSSProperties } from 'react';

type AnimationType =
  | 'fade-in'
  | 'slide-in-up'
  | 'slide-in-down'
  | 'slide-in-left'
  | 'slide-in-right'
  | 'scale-in'
  | 'bounce-in';

interface AnimationProps {
  /** Animation type */
  type: AnimationType;
  /** Order for staggered delay (0 = no delay) */
  order?: number;
  /** Custom delay in seconds (overrides order) */
  delay?: number;
  /** Extra CSS classes */
  className?: string;
  /** Extra inline styles */
  style?: CSSProperties;
}

/**
 * Universal animation props generator
 * CSS must be imported once: import '@nc/toolkit/animations.css'
 */
export function animate({ type, order = 0, delay, className = '', style = {} }: AnimationProps) {
  const baseClass = 'animate';
  const animationClass = type;

  const finalDelay = delay !== undefined ? delay : order * 0.04;

  return {
    className: `${baseClass} ${animationClass} ${className}`.trim(),
    style: {
      '--delay': `${finalDelay}s`,
      ...style,
    } as CSSProperties,
  };
}

export const fadeIn = (order?: number, className?: string, style?: CSSProperties) =>
  animate({ type: 'fade-in', order, className, style });

export const slideInUp = (order?: number, className?: string, style?: CSSProperties) =>
  animate({ type: 'slide-in-up', order, className, style });

export const slideInDown = (order?: number, className?: string, style?: CSSProperties) =>
  animate({ type: 'slide-in-down', order, className, style });

export const slideInLeft = (order?: number, className?: string, style?: CSSProperties) =>
  animate({ type: 'slide-in-left', order, className, style });

export const slideInRight = (order?: number, className?: string, style?: CSSProperties) =>
  animate({ type: 'slide-in-right', order, className, style });

export const scaleIn = (order?: number, className?: string, style?: CSSProperties) =>
  animate({ type: 'scale-in', order, className, style });

export const bounceIn = (order?: number, className?: string, style?: CSSProperties) =>
  animate({ type: 'bounce-in', order, className, style });
