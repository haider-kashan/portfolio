"use client";

import { useState } from "react";
import Image from "next/image";

interface ProfileImageProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export function ProfileImage({
  imageUrl,
  firstName,
  lastName,
  role = "Software Engineer",
}: ProfileImageProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const handleToggle = () => setIsRevealed(!isRevealed);

  return (
    <button 
      onClick={handleToggle}
      type="button"
      // ACCESSIBILITY: Indicates the state of the toggle
      aria-pressed={isRevealed}
      aria-label={`View profile details for ${firstName} ${lastName}`}
      className="relative w-full max-w-[500px] mx-auto group select-none my-10 cursor-pointer font-sans outline-none block border-none bg-transparent p-0"
    >
      
      {/* AMBIENT GLOW - Decorative, hidden from screen readers */}
      <div 
        className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-primary)]/40 via-transparent to-[var(--color-accent)]/40 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-700 ease-out pointer-events-none" 
        aria-hidden="true"
      />
      
      {/* RIM GLOW - Decorative */}
      <div 
        className="absolute -inset-[1px] bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] rounded-[2.5rem] blur-sm opacity-30 group-hover:opacity-80 transition duration-500 ease-out will-change-[opacity] pointer-events-none" 
        aria-hidden="true"
      />

      {/* --- MAIN CARD --- */}
      <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden bg-gray-950 ring-1 ring-white/10 isolate z-10 shadow-2xl">
        
        {/* IMAGE */}
        {/* SEO: itemProp="image" identifies this as the Person's photo */}
        <Image
          src={imageUrl}
          alt={`${firstName} ${lastName}`}
          fill
          // PERFORMANCE: Added sizes to help browser load correct resolution
          sizes="(max-width: 768px) 100vw, 500px"
          className={`object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform 
            ${isRevealed ? 'scale-105' : 'scale-100 group-hover:scale-105'}`}
          priority
          itemProp="image"
        />

        {/* DARK GRADIENT OVERLAY */}
        <div 
          className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 pointer-events-none transition-opacity duration-500 ease-in-out
          ${isRevealed ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} 
          aria-hidden="true"
        />

        {/* --- TEXT CONTENT --- */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col items-center justify-end transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${isRevealed 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
            
            {/* NAME */}
            <h3 className="text-white text-center mb-2 leading-none drop-shadow-xl whitespace-nowrap flex gap-2 items-baseline justify-center">
              {/* SEO: Explicitly tagging first and last name */}
              <span className="font-extrabold tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl" itemProp="givenName">
                {firstName}
              </span>
              <span className="font-extrabold tracking-tight text-[var(--color-accent)] text-xl sm:text-2xl md:text-3xl lg:text-4xl" itemProp="familyName">
                {lastName}
              </span>
            </h3>

            {/* ROLE */}
            <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mt-1">
              {/* SEO: Tagging the job title */}
              <p 
                className="text-[8px] sm:text-[10px] font-bold text-gray-300 tracking-[0.2em] uppercase text-center"
                itemProp="jobTitle"
              >
                {role}
              </p>
            </div>

        </div>

      </div>
    </button>
  );
}