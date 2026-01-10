import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

// 1. FIX: Correct Path (added /ui/) and use Named Import (added { })
import { BlogCarousel } from "@/components/BlogCarousel"; 

// Interface (Matching Schema)
interface BlogPost {
  title: string;
  slug: { current: string };
  excerpt: string;
  category?: string;
  tags?: string[];
  publishedAt: string;
  readTime?: number;
  featuredImage?: any;
}

const BLOG_QUERY = defineQuery(`
  *[_type == "blog"] | order(publishedAt desc){
    title,
    slug,
    excerpt,
    category,
    tags,
    publishedAt,
    readTime,
    featuredImage
  }
`);

export async function BlogSection() {
  // Fetch Data
  const { data: posts } = await sanityFetch({ query: BLOG_QUERY });
  const blogPosts = posts as unknown as BlogPost[];

  if (!blogPosts || blogPosts.length === 0) {
    return null;
  }

  return (
    <section 
      id="blog" 
      aria-labelledby="blog-heading"
      className="py-24 px-6 relative bg-background"
      itemScope
      itemType="http://schema.org/Blog"
    >
      <div className="container mx-auto">
        
        {/* SEMANTIC HEADER */}
        <header className="text-center mb-16 space-y-4">
          <h2 
            id="blog-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            itemProp="name"
          >
            Latest <span className="text-[var(--color-primary)]">Insights</span>
          </h2>
          
          {/* Decorative element hidden from screen readers */}
          <div 
            className="h-1 w-20 bg-[var(--color-accent)] mx-auto rounded-full" 
            role="presentation"
          />
          
          <p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto pt-4"
            itemProp="description"
          >
            Thoughts, tutorials, and deep dives into technology.
          </p>
        </header>

        {/* Carousel Component */}
        <div itemProp="blogPosts">
            <BlogCarousel data={blogPosts} />
        </div>
        
      </div>
    </section>
  );
}