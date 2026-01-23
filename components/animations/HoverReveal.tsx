"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface HoverRevealProps {
    defaultContent: ReactNode;
    hoverContent: ReactNode;
    className?: string;
}

export function HoverReveal({
    defaultContent,
    hoverContent,
    className = "",
}: HoverRevealProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative overflow-hidden cursor-pointer ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Default Content */}
            <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                    opacity: isHovered ? 0 : 1,
                    scale: isHovered ? 0.9 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
            >
                {defaultContent}
            </motion.div>

            {/* Hover Content */}
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 1.1,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full"
            >
                {hoverContent}
            </motion.div>
        </div>
    );
}
