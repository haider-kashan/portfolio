"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface HorizontalSlideProps {
    children: ReactNode;
    direction?: "left" | "right";
    delay?: number;
    duration?: number;
    className?: string;
    distance?: number; // Distance to slide in pixels
}

export function HorizontalSlide({
    children,
    direction = "left",
    delay = 0,
    duration = 0.8,
    className = "",
    distance = 100,
}: HorizontalSlideProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const slideX = direction === "left" ? -distance : distance;

    return (
        <div ref={ref} className={className}>
            <motion.div
                initial={{ opacity: 0, x: slideX }}
                animate={
                    isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: slideX }
                }
                transition={{
                    duration,
                    delay,
                    ease: [0.25, 0.1, 0.25, 1.0],
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
