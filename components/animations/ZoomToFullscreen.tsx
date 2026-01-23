"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ZoomToFullscreenProps {
    children: ReactNode;
    className?: string;
    triggerPoint?: number; // 0-1, when to trigger the zoom effect
}

export function ZoomToFullscreen({
    children,
    className = "",
    triggerPoint = 0.5,
}: ZoomToFullscreenProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Track scroll progress of the element
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Calculate scale: starts at 0.9, goes to 1 at center, then to 1.1
    const scale = useTransform(
        scrollYProgress,
        [0, triggerPoint, 1],
        [0.85, 1, 1.05]
    );

    // Calculate opacity for fade effect
    const opacity = useTransform(
        scrollYProgress,
        [0, triggerPoint - 0.1, triggerPoint + 0.1, 1],
        [0.5, 1, 1, 0.8]
    );

    return (
        <motion.div
            ref={ref}
            style={{
                scale,
                opacity,
            }}
            className={`transition-all ${className}`}
        >
            {children}
        </motion.div>
    );
}
