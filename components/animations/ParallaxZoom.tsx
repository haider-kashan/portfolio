"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxZoomProps {
    children: ReactNode;
    speed?: number; // Multiplier for parallax effect (0.5 = half speed, 2 = double speed)
    scale?: [number, number]; // [min scale, max scale]
    className?: string;
}

export function ParallaxZoom({
    children,
    speed = 0.5,
    scale = [1, 1.2],
    className = "",
}: ParallaxZoomProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Track scroll progress of the element
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"], // Track from when element enters viewport to when it exits
    });

    // Transform scale based on scroll progress
    const scaleValue = useTransform(scrollYProgress, [0, 1], scale);

    // Transform Y position for parallax effect
    const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div
                style={{
                    scale: scaleValue,
                    y,
                }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </div>
    );
}
