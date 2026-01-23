"use client";

import { motion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

interface MarqueeProps {
    children: ReactNode;
    speed?: number; // Duration in seconds for one complete loop
    direction?: "left" | "right";
    pauseOnHover?: boolean;
    className?: string;
    gradient?: boolean;
    gradientColor?: string;
}

export function Marquee({
    children,
    speed = 30,
    direction = "left",
    pauseOnHover = true,
    className = "",
    gradient = true,
    gradientColor = "background",
}: MarqueeProps) {
    const isLeft = direction === "left";

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Gradient overlays for smooth edges */}
            {gradient && (
                <>
                    <div
                        className="absolute left-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none"
                        style={{
                            background: `linear-gradient(to right, var(--color-${gradientColor}), transparent)`,
                        }}
                    />
                    <div
                        className="absolute right-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none"
                        style={{
                            background: `linear-gradient(to left, var(--color-${gradientColor}), transparent)`,
                        }}
                    />
                </>
            )}

            {/* Marquee container */}
            <motion.div
                className="flex gap-8 md:gap-12"
                animate={{
                    x: isLeft ? [0, "-50%"] : ["-50%", 0],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                whileHover={
                    pauseOnHover
                        ? {
                            animationPlayState: "paused",
                        }
                        : undefined
                }
            >
                {/* First set of children */}
                <div className="flex gap-8 md:gap-12 shrink-0">{children}</div>

                {/* Duplicate for seamless loop */}
                <div className="flex gap-8 md:gap-12 shrink-0" aria-hidden="true">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}

interface MarqueeItemProps {
    children: ReactNode;
    className?: string;
}

export function MarqueeItem({ children, className = "" }: MarqueeItemProps) {
    return (
        <div
            className={`flex items-center justify-center shrink-0 ${className}`}
        >
            {children}
        </div>
    );
}
