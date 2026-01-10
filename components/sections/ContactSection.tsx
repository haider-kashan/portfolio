import Link from "next/link";
import { defineQuery } from "next-sanity";
import WorldMapDemo from "@/components/world-map-demo";
import { sanityFetch } from "@/sanity/lib/live";
import { ContactForm } from "./ContactForm";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandMedium,
  IconBrandYoutube,
  IconBrandStackoverflow,
  IconWorld,
  IconCode,
  IconMail,
  IconPhone,
  IconMapPin,
} from "@tabler/icons-react";

const PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  email,
  phone,
  location,
  socialLinks
}`);

export async function ContactSection() {
  const { data: profile } = await sanityFetch({ query: PROFILE_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section 
      id="contact" 
      aria-labelledby="contact-section-heading"
      className="py-24 px-6 pb-40 relative overflow-hidden bg-background"
    >
      
      {/* MAP BACKGROUND */}
      {/* Hidden from screen readers as it is purely decorative */}
      <div 
        className="absolute top-0 md:-top-20 left-0 w-full h-[500px] md:h-[800px] pointer-events-none z-0 select-none overflow-hidden"
        aria-hidden="true" 
      >
         <div className="w-full h-full transition-all duration-100 
             opacity-100 dark:opacity-100
             [mask-image:linear-gradient(to_bottom,transparent_5%,black_40%,black_100%,transparent_95%)]
             md:[mask-image:radial-gradient(circle_at_center,black_10%,transparent_70%)]">
            <WorldMapDemo />
         </div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* SEMANTIC HEADER */}
        <header className="text-center mb-12 md:mb-16 space-y-4">
          <h2 
            id="contact-section-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            Get In <span className="text-[var(--color-primary)]">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-[var(--color-accent)] mx-auto rounded-full" role="presentation" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto pt-4">
            Wherever you are in the world, let&apos;s work together on your next project.
          </p>
        </header>

        <div className="@container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Contact Info */}
            {/* 'itemScope' allows us to define specific properties like email/phone within this block */}
            <address 
              className="space-y-8 flex flex-col not-italic"
              itemScope 
              itemType="http://schema.org/Person"
            >
              
              <h3 className="text-2xl font-bold text-foreground text-center lg:text-left">
                  Contact Information
              </h3>
              
              <div className="w-full max-w-[350px] mx-auto lg:mx-0 space-y-6">
                
                {/* Email */}
                {profile.email && (
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                      <IconMail className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 text-left">
                      <h4 className="font-semibold mb-1 text-foreground">Email</h4>
                      <Link
                        href={`mailto:${profile.email}`}
                        className="text-muted-foreground hover:text-[var(--color-accent)] transition-colors text-sm break-all"
                        itemProp="email"
                      >
                        {profile.email}
                      </Link>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {profile.phone && (
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center flex-shrink-0 text-[var(--color-secondary)] group-hover:scale-110 transition-transform">
                      <IconPhone className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 text-left">
                      <h4 className="font-semibold mb-1 text-foreground">Phone</h4>
                      <Link
                        href={`tel:${profile.phone}`}
                        className="text-muted-foreground hover:text-[var(--color-accent)] transition-colors text-sm"
                        itemProp="telephone"
                      >
                        {profile.phone}
                      </Link>
                    </div>
                  </div>
                )}

                {/* Location */}
                {profile.location && (
                  <div 
                    className="flex items-center gap-4 group"
                    itemProp="homeLocation" 
                    itemScope 
                    itemType="http://schema.org/Place"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0 text-[var(--color-accent)] group-hover:scale-110 transition-transform">
                      <IconMapPin className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 text-left">
                      <h4 className="font-semibold mb-1 text-foreground">Location</h4>
                      <p className="text-muted-foreground text-sm" itemProp="name">
                        {profile.location}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {profile.socialLinks && (
                <div className="pt-8 border-t border-border/50 w-full">
                  <h4 className="font-semibold mb-4 text-foreground text-center lg:text-left">Follow Me</h4>
                  {/* Semantic List for Social Links */}
                  <ul className="flex flex-wrap gap-3 justify-center lg:justify-start list-none p-0 m-0">
                    
                    {Object.entries(profile.socialLinks).map(([key, url]) => {
                        if (!url || typeof url !== 'string') return null;
                        
                        let Icon = IconWorld;
                        if (key === 'github') Icon = IconBrandGithub;
                        if (key === 'linkedin') Icon = IconBrandLinkedin;
                        if (key === 'twitter') Icon = IconBrandTwitter;
                        if (key === 'instagram') Icon = IconBrandInstagram;
                        if (key === 'medium') Icon = IconBrandMedium;
                        if (key === 'youtube') Icon = IconBrandYoutube;
                        if (key === 'stackoverflow') Icon = IconBrandStackoverflow;
                        if (key === 'devto') Icon = IconCode;

                        return (
                          <li key={key}>
                            <Link
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-3 rounded-lg border border-border/50 bg-card hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all hover:-translate-y-1 text-muted-foreground"
                              aria-label={`Follow on ${key}`}
                              itemProp="sameAs"
                            >
                              <Icon className="w-5 h-5" aria-hidden="true" />
                            </Link>
                          </li>
                        )
                    })}
                  </ul>
                </div>
              )}
            </address>

            {/* RIGHT COLUMN: Contact Form */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm backdrop-blur-sm bg-opacity-90 dark:bg-opacity-80">
               <ContactForm />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}