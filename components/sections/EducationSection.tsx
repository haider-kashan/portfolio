import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { EducationCarousel } from "@/components/EducationCarousel"; 

// Define Interface
interface Education {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  gpa?: string;
  description?: string;
  achievements?: string[];
  logo?: any;
  website?: string;
  order?: number;
}

const EDUCATION_QUERY = defineQuery(`
  *[_type == "education"] | order(endDate desc, startDate desc){
    institution,
    degree,
    fieldOfStudy,
    startDate,
    endDate,
    current,
    gpa,
    description,
    achievements,
    logo,
    website,
    order
  }
`);

export async function EducationSection() {
  const { data: educationData } = await sanityFetch({ query: EDUCATION_QUERY });
  const education = educationData as Education[];

  if (!education || education.length === 0) return null;

  return (
    <section 
      id="education" 
      aria-labelledby="education-heading"
      className="relative py-24 px-4 bg-background/50"
    >
      <div className="container mx-auto">
        
        {/* SEMANTIC HEADER */}
        <header className="text-center mb-16 space-y-4">
          <h2 
            id="education-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            My <span className="text-[var(--color-primary)]">Education</span>
          </h2>
          
          {/* Decorative element hidden from screen readers */}
          <div 
            className="h-1 w-20 bg-[var(--color-accent)] mx-auto rounded-full" 
            role="presentation"
          />
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto pt-4">
            The academic foundation behind my technical skills.
          </p>
        </header>

        {/* Carousel Component */}
        <EducationCarousel data={education} />
        
      </div>
    </section>
  );
}