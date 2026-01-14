import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { SkillsChartLoader } from "./SkillsChartLoader"; 
// 1. Import the animation component
import { ScrollAnimation } from "@/components/ScrollAnimation";

const SKILLS_QUERY = defineQuery(`*[_type == "skill"] | order(category asc, order asc){
  name,
  category,
  proficiency,
  percentage,
  yearsOfExperience,
  color
}`);

export async function SkillsSection() {
  const { data: skills } = await sanityFetch({ query: SKILLS_QUERY });

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section 
      id="skills" 
      aria-labelledby="skills-heading"
      // FIX APPLIED HERE:
      // Mobile: py-12 (48px) - prevents the huge gap
      // Desktop: md:py-24 (96px) - keeps the nice breathing room
      className="py-12 md:py-24 px-6 relative bg-background"
    >
      <div className="container mx-auto max-w-7xl">
        
        {/* HEADER - Animated */}
        <header className="text-center mb-10 md:mb-16 space-y-4">
          <ScrollAnimation variant="blurIn">
            <h2 
              id="skills-heading"
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              Skills & <span className="text-[var(--color-primary)]">Expertise</span>
            </h2>
          </ScrollAnimation>
          
          <ScrollAnimation variant="scaleUp" delay={0.2}>
            <div 
              className="h-1 w-20 bg-[var(--color-accent)] mx-auto rounded-full" 
              role="presentation" 
            />
          </ScrollAnimation>
          
          <ScrollAnimation variant="fadeUp" delay={0.3}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto pt-4">
              A comprehensive overview of my technical proficiencies and the tools I work with daily.
            </p>
          </ScrollAnimation>
        </header>

        {/* CHART - Fade Up */}
        <ScrollAnimation variant="fadeUp" delay={0.4}>
            <SkillsChartLoader skills={skills} />
        </ScrollAnimation>
        
      </div>
    </section>
  );
}