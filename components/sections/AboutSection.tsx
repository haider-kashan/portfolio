import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { IconCheck, IconExternalLink } from "@tabler/icons-react";

const ABOUT_QUERY = defineQuery(`
  *[_id == "singleton-profile"][0]{
    firstName,
    lastName,
    fullBio,
    yearsOfExperience,
    stats,
    email,
    phone,
    location
  }
`);

export async function AboutSection() {
  const { data: profile } = await sanityFetch({ query: ABOUT_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section 
      id="about" 
      aria-labelledby="about-heading"
      className="py-24 px-6 relative bg-background"
    >
      {/* SEO: Schema for Person scope */}
      <div className="container mx-auto max-w-4xl" itemScope itemType="http://schema.org/Person">
        
        {/* SEMANTIC HEADER: Better for SEO structure than a generic div */}
        <header className="text-center mb-16">
          <h2 
            id="about-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground"
          >
            About <span className="text-[var(--color-primary)]">Me</span>
          </h2>
          <div className="h-1 w-24 bg-[var(--color-accent)] mx-auto rounded-full" role="presentation" />
        </header>

        {/* BIO CONTENT */}
        {/* itemProp="description" connects this text to the Person schema */}
        <article 
          className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground"
          itemProp="description"
        >
          {profile.fullBio && (
            <PortableText
              value={profile.fullBio}
              components={{
                block: {
                  normal: ({ children }) => (
                    // TEXT ALIGNMENT: text-justify for the "book" look
                    <p className="leading-relaxed mb-6 text-lg text-justify">
                      {children}
                    </p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-foreground inline-block relative">
                      {children}
                      <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-[var(--color-primary)] to-transparent rounded-full" />
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold mt-8 mb-4 text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[var(--color-primary)] pl-6 py-4 my-8 italic text-foreground/80 bg-muted/30 rounded-r-xl">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold text-foreground">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
                  link: ({ children, value }) => {
                    const href = value?.href || "";
                    const isExternal = href.startsWith("http");
                    return (
                      <Link
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 text-[var(--color-primary)] font-medium hover:underline underline-offset-4 transition-all"
                        aria-label={isExternal ? `Read more about ${children} (opens in new tab)` : undefined}
                      >
                        {children}
                        {isExternal && <IconExternalLink className="w-3 h-3 opacity-70" aria-hidden="true" />}
                      </Link>
                    );
                  },
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="space-y-3 mb-8 ml-1">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-3 mb-8 ml-2 font-medium marker:text-[var(--color-primary)]">
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="flex items-start gap-3 text-justify">
                      <IconCheck className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-1" aria-hidden="true" />
                      <span>{children}</span>
                    </li>
                  )
                }
              }}
            />
          )}
        </article>

        {/* STATS GRID */}
        {/* SEMANTIC CHANGE: Changed from div grid to Unordered List (ul) for better accessibility parsing */}
        {profile.stats && profile.stats.length > 0 && (
          <div className="mt-20 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#ffffff10_1px,transparent_1px)] opacity-50 -z-10 rounded-3xl pointer-events-none" />
            
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 list-none m-0">
              {profile.stats.map((stat: { label: string; value: string }, idx: number) => (
                <li
                  key={`${stat.label}-${idx}`}
                  className="p-6 rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm text-center hover:border-[var(--color-primary)]/40 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] mb-2 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors flex items-center justify-center gap-1">
                    {stat.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}