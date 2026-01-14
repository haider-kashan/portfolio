'use client'

import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { useRef, useEffect } from 'react';

type AnimationType = 'fadeUp' | 'slideFromLeft' | 'slideFromRight' | 'blurIn' | 'scaleUp';

interface ScrollAnimationProps {
  children: React.ReactNode;
  variant?: AnimationType;
  delay?: number;
  className?: string;
}

export const ScrollAnimation = ({ 
  children, 
  variant = 'fadeUp', 
  delay = 0,
  className = ""
}: ScrollAnimationProps) => {
  const ref = useRef(null);
  // FIX 1: Changed margin to "0px" so it triggers as soon as 1 pixel is visible.
  // This ensures Hero images load immediately.
  const isInView = useInView(ref, { once: true, margin: "0px" }); 
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const getVariants = (): Variants => {
    // FIX 2: Reduced all durations to 0.4s or 0.5s for a "snappy" feel
    switch (variant) {
      case 'slideFromLeft':
        return {
          hidden: { opacity: 0, x: -50 }, // Reduced distance from -100 to -50
          visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", delay } }
        };
      case 'slideFromRight':
        return {
          hidden: { opacity: 0, x: 50 }, // Reduced distance
          visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", delay } }
        };
      case 'blurIn':
        return {
          hidden: { opacity: 0, filter: "blur(10px)" },
          visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut", delay } }
        };
      case 'scaleUp':
        return {
          hidden: { opacity: 0, scale: 0.9 }, // Subtle scale (0.9 instead of 0.8)
          visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "backOut", delay } }
        };
      case 'fadeUp':
      default:
        return {
          hidden: { opacity: 0, y: 20 }, // Reduced distance
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", delay } }
        };
    }
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={controls}
        // Ensuring the div takes full width to prevent layout collapse
        style={{ width: '100%' }} 
      >
        {children}
      </motion.div>
    </div>
  );
};