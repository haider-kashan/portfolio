"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        
        {/* The Animated Logo Container */}
        <motion.div
          className="relative w-full h-full"
          // 1. Initial State: Fully clipped from the right (Invisible)
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          // 2. The Animation Cycle
          animate={{ 
            clipPath: [
              "inset(0 100% 0 0)", // Start: Hidden
              "inset(0 0% 0 0)",   // Middle: Fully Visible (Written)
              "inset(0 0% 0 0)",   // Pause: Stay Visible
              "inset(0 100% 0 0)"  // End: Hidden Again (Unwritten/Erased)
            ] 
          }}
          transition={{
            duration: 2.5,        // Total cycle time
            ease: "easeInOut",    // Smooth acceleration/deceleration
            times: [0, 0.4, 0.6, 1], // The timeline (40% writing, 20% hold, 40% unwriting)
            repeat: Infinity,     // Loop forever
            repeatDelay: 0.5      // Tiny pause before restarting
          }}
        >
          <Image
            src="/logo.png"
            alt="Loading..."
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Optional: A very faint "guide" logo behind it.
           If you want it completely purely "appearing from nothing", remove this block.
           Keeping it at 5% opacity usually helps visually anchor the center point.
        */}
        <div className="absolute inset-0 opacity-5 grayscale pointer-events-none">
           <Image
            src="/logo.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

      </div>
    </div>
  );
}