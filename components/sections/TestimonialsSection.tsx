import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

// Define Interface matching schema
interface Testimonial {
  name: string;
  position?: string;
  company?: string;
  testimonial: string;
  rating?: number;
  date?: string;
  avatar?: any;
  companyLogo?: any;
  linkedinUrl?: string;
}

const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial" && featured == true] | order(order asc){
    name,
    position,
    company,
    testimonial,
    rating,
    date,
    avatar,
    companyLogo,
    linkedinUrl
  }
`);

export async function TestimonialsSection() {
  const { data: testimonialsData } = await sanityFetch({
    query: TESTIMONIALS_QUERY,
  });

  const testimonials = testimonialsData as Testimonial[];

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section 
      id="testimonials" 
      aria-labelledby="testimonials-heading"
      className="py-24 px-6 relative bg-background"
    >
      <div className="container mx-auto">
        
        {/* SEMANTIC HEADER */}
        <header className="text-center mb-16 space-y-4">
          <h2 
            id="testimonials-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            Client <span className="text-[var(--color-primary)]">Testimonials</span>
          </h2>
          
          {/* Decorative element hidden from screen readers */}
          <div 
            className="h-1 w-20 bg-[var(--color-accent)] mx-auto rounded-full" 
            role="presentation" 
          />
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto pt-4">
            Feedback from teams and clients I&apos;ve collaborated with.
          </p>
        </header>

        {/* New Glass Carousel */}
        <TestimonialCarousel data={testimonials} />
        
      </div>
    </section>
  );
}