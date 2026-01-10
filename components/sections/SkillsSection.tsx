import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { SkillsChart } from "./SkillsChart";

const SKILLS_QUERY =
  defineQuery(`*[_type == "skill"] | order(category asc, order asc){
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
      className="py-24 px-6 relative"
    >
      <div className="container mx-auto max-w-7xl">
        
        {/* SEMANTIC HEADER */}
        <header className="text-center mb-16 space-y-4">
          <h2 
            id="skills-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            Skills & <span className="text-[var(--color-primary)]">Expertise</span>
          </h2>
          
          {/* Decorative element hidden from screen readers */}
          <div 
            className="h-1 w-20 bg-[var(--color-accent)] mx-auto rounded-full" 
            role="presentation" 
          />
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto pt-4">
            A comprehensive overview of my technical proficiencies and the tools I work with daily.
          </p>
        </header>

        {/* Chart Component (already optimized internally) */}
        <SkillsChart skills={skills} />
      </div>
    </section>
  );
}