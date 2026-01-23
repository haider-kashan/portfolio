'use client'

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

type AnimationType = 'fadeUp' | 'slideFromLeft' | 'slideFromRight' | 'blurIn' | 'scaleUp';

interface ScrollAnimationProps {
  children: React.ReactNode;
  variant?: AnimationType;
  delay?: number;
  className?: string;
  autoStart?: boolean; // If true, ignores scroll position and runs instantly
}

export const ScrollAnimation = ({ 
  children, 
  variant = 'fadeUp', 
  delay = 0,
  className = "",
  autoStart = false 
}: ScrollAnimationProps) => {
  const ref = useRef(null);
  
  // margin: "-10%" ensures the element is slightly inside the screen before triggering
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // LOGIC FIX:
  // If autoStart is true, we force "true" immediately. 
  // We do NOT wait for 'isInView' or 'useEffect'.
  const shouldAnimate = autoStart || isInView;

  const getVariants = (): Variants => {
    switch (variant) {
      case 'slideFromLeft':
        return {
          hidden: { opacity: 0, x: -60 }, // Increased distance for drama
          visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0], delay } }
        };
      case 'slideFromRight':
        return {
          hidden: { opacity: 0, x: 60 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0], delay } }
        };
      case 'blurIn':
        return {
          hidden: { opacity: 0, filter: "blur(20px)" },
          visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut", delay } }
        };
      case 'scaleUp':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay } } // "Pop" effect
        };
      case 'fadeUp':
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay } }
        };
    }
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        // INSTANT TRIGGER:
        // We bind the state directly to the prop. No waiting for effects.
        animate={shouldAnimate ? "visible" : "hidden"}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </div>
  );
};