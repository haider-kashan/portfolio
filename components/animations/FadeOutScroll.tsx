"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ReactNode, useRef } from "react";

interface FadeOutScrollProps {
    children: ReactNode;
    className?: string;
    fadeRange?: [number, number];
}

export function FadeOutScroll({
    children,
    className = "",
    fadeRange = [1, 0],
}: FadeOutScrollProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.5", "start 0.2"] as any,
    });

    const opacity = useTransform(scrollYProgress, [0, 1], fadeRange);

    return (
        <motion.div ref={ref} style={{ opacity }} className={className}>
            {children}
        </motion.div>
    );
}
