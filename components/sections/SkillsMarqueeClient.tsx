"use client";

import { Marquee, MarqueeItem } from "@/components/animations/Marquee";
import { DynamicIcon } from "@/components/DynamicIcon";

interface Skill {
    name: string;
    category?: string;
    color?: string;
    icon?: string;
    proficiency?: number;
}

interface SkillsMarqueeClientProps {
    skills: Skill[];
}

export function SkillsMarqueeClient({ skills }: SkillsMarqueeClientProps) {
    if (!skills || skills.length === 0) return null;

    // Split skills into two rows for dual marquee effect
    const halfLength = Math.ceil(skills.length / 2);
    const topRowSkills = skills.slice(0, halfLength);
    const bottomRowSkills = skills.slice(halfLength);

    return (
        <section
            className="py-12 md:py-16 relative overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background"
            aria-label="Skills showcase"
        >
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,transparent_50%)] opacity-5 pointer-events-none" />

            <div className="space-y-6 md:space-y-8">
                {/* Top Row - Left to Right */}
                <Marquee speed={40} direction="left" className="py-4">
                    {topRowSkills.map((skill, index) => (
                        <MarqueeItem key={`top-${skill.name}-${index}`}>
                            <div className="group flex items-center gap-3 px-6 py-3 rounded-full bg-background/80 dark:bg-card/40 border border-border/50 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-[var(--color-primary)]/40 transition-all duration-300 hover:scale-105">
                                {skill.icon && (
                                    <DynamicIcon
                                        iconName={skill.icon}
                                        className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-accent)]"
                                    />
                                )}
                                <span className="text-sm md:text-base font-semibold text-foreground whitespace-nowrap">
                                    {skill.name}
                                </span>
                                {skill.proficiency && skill.proficiency >= 80 && (
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Expert level" />
                                )}
                            </div>
                        </MarqueeItem>
                    ))}
                </Marquee>

                {/* Bottom Row - Right to Left */}
                <Marquee speed={35} direction="right" className="py-4">
                    {bottomRowSkills.map((skill, index) => (
                        <MarqueeItem key={`bottom-${skill.name}-${index}`}>
                            <div className="group flex items-center gap-3 px-6 py-3 rounded-full bg-background/80 dark:bg-card/40 border border-border/50 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-[var(--color-primary)]/40 transition-all duration-300 hover:scale-105">
                                {skill.icon && (
                                    <DynamicIcon
                                        iconName={skill.icon}
                                        className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-accent)]"
                                    />
                                )}
                                <span className="text-sm md:text-base font-semibold text-foreground whitespace-nowrap">
                                    {skill.name}
                                </span>
                                {skill.proficiency && skill.proficiency >= 80 && (
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Expert level" />
                                )}
                            </div>
                        </MarqueeItem>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
