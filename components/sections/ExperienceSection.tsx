import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { ExperienceCarousel } from "@/components/ExperienceCarousel";

// Define Interfaces (Used for Fetching)
interface Technology {
  name: string;
  category?: string;
}

interface Experience {
  company: string;
  position: string;
  employmentType?: string;
  location?: string;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  description?: any; 
  responsibilities?: string[];
  achievements?: string[];
  technologies?: Technology[];
  companyLogo?: any;
  companyWebsite?: string;
}

const EXPERIENCE_QUERY = defineQuery(`
  *[_type == "experience"] | order(startDate desc){
    company,
    position,
    employmentType,
    location,
    startDate,
    endDate,
    current,
    description,
    responsibilities,
    achievements,
    technologies[]->{name, category},
    companyLogo,
    companyWebsite
  }
`);

export async function ExperienceSection() {
  // Fetch Data
  const { data: experiencesData } = await sanityFetch({ query: EXPERIENCE_QUERY });
  const experiences = experiencesData as Experience[];

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section 
      id="experience" 
      // SEO: This attribute links the section to the H2 title, defining the region for screen readers
      aria-labelledby="experience-heading"
      className="py-24 px-6 relative bg-background/50"
    >
      <div className="container mx-auto">
        
        {/* HEADER WRAPPER */}
        {/* Changed to 'div' to fix the syntax error, but kept the semantic H2 inside */}
        <div className="text-center mb-16 space-y-4">
          <h2 
            id="experience-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            Work <span className="text-[var(--color-primary)]">Experience</span>
          </h2>
          
          {/* Decorative element hidden from screen readers */}
          <div 
            className="h-1 w-20 bg-[var(--color-accent)] mx-auto rounded-full" 
            role="presentation"
          />
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto pt-4">
            My professional journey and career milestones.
          </p>
        </div>

        {/* The New Interactive Carousel */}
        <ExperienceCarousel data={experiences} />
        
      </div>
    </section>
  );
}