import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { SkillsMarqueeClient } from "./SkillsMarqueeClient";

interface Skill {
    name: string;
    category?: string;
    color?: string;
    icon?: string;
    proficiency?: number;
}

const SKILLS_QUERY = defineQuery(`
  *[_type == "skill"] | order(proficiency desc)[0...20]{
    name,
    category,
    color,
    icon,
    proficiency
  }
`);

export async function SkillsMarquee() {
    const { data } = await sanityFetch({ query: SKILLS_QUERY });
    const skills = (data as Skill[]) || [];

    if (!skills || skills.length === 0) return null;

    return <SkillsMarqueeClient skills={skills} />;
}
