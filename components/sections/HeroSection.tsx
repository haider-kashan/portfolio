import Link from "next/link";
import { defineQuery } from "next-sanity";

import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ProfileImage } from "./ProfileImage";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconWorld,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";

// Props
interface HeroSectionProps {
  headline?: string | null;
  subheadline?: string | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
  bgImageUrl?: string | null;
}

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string; // Added label prop for accessibility
}

// Query
const HERO_PROFILE_QUERY = defineQuery(`
  *[_id == "singleton-profile"][0]{
    firstName,
    lastName,
    headline,
    headlineStaticText,
    headlineAnimatedWords,
    headlineAnimationDuration,
    shortBio,
    email,
    phone,
    location,
    availability,
    socialLinks,
    yearsOfExperience,
    profileImage
  }
`);

export async function HeroSection(props: HeroSectionProps) {
  const { data: profile } = await sanityFetch({ query: HERO_PROFILE_QUERY });
  if (!profile) return null;

  const mainCtaText = props.ctaText || "View Work";
  const mainCtaUrl = props.ctaUrl || "#projects";
  const mainHeadline = profile.headlineStaticText; 
  const mainSubheadline = profile.shortBio;

  const backgroundStyle = props.bgImageUrl
    ? {
        backgroundImage: `url(${props.bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  return (
    <section
      id="home"
      // SEO: Mark this as the main profile section
      itemScope
      itemType="http://schema.org/Person"
      className="relative min-h-screen flex items-center justify-center px-6 pt-6 md:pt-10 pb-32 md:pb-40 overflow-hidden"
      style={backgroundStyle}
    >
      {/* BACKGROUND */}
      <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="@container">
          <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8 @lg:gap-16 items-center">

            {/* LEFT CONTENT (Text) */}
            <div className="space-y-6 order-2 @3xl:order-1 flex flex-col items-center text-center @3xl:items-start @3xl:text-left">
              
              <div className="flex flex-col items-center @3xl:items-start w-full">
                {/* Availability Status */}
                {profile.availability === 'available' && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Available for Work
                    </div>
                )}

                {/* NAME */}
                <h1 className="text-5xl @md/hero:text-6xl @lg/hero:text-8xl font-bold tracking-tight mb-2" itemProp="name">
                  <span itemProp="givenName">{profile.firstName}</span>{" "}
                  <span className="text-[var(--color-accent)]" itemProp="familyName">{profile.lastName}</span>
                </h1>

                {/* HEADLINE */}
                <div className="w-full flex justify-center @3xl:justify-start">
                  {profile.headlineAnimatedWords?.length > 0 ? (
                    <div itemProp="jobTitle">
                      <LayoutTextFlip
                        text={mainHeadline}
                        words={profile.headlineAnimatedWords}
                        duration={profile.headlineAnimationDuration || 3000}
                        className="text-2xl @md/hero:text-3xl @lg/hero:text-4xl text-muted-foreground font-medium !whitespace-nowrap inline-flex items-center gap-4"
                      />
                    </div>
                  ) : (
                    <p 
                      className="text-2xl @md/hero:text-3xl @lg/hero:text-4xl text-muted-foreground font-medium whitespace-nowrap"
                      itemProp="jobTitle"
                    >
                      {mainHeadline}
                    </p>
                  )}
                </div>
              </div>

              {/* SUBHEADLINE */}
              <p 
                className="text-lg @md/hero:text-xl text-muted-foreground leading-relaxed max-w-lg"
                itemProp="description"
              >
                {mainSubheadline}
              </p>

              {/* CTA + SOCIALS */}
              <div className="flex flex-wrap items-center justify-center @3xl:justify-start gap-6 pt-2">
                <Link
                  href={mainCtaUrl}
                  className="group relative px-8 py-3.5 rounded-full font-semibold text-black transition-all duration-300 bg-[var(--color-accent)] hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  {mainCtaText}
                </Link>

                {profile.socialLinks && (
                  <div className="flex items-center gap-5">
                    {profile.socialLinks.github && (
                      <SocialIcon href={profile.socialLinks.github} icon={<IconBrandGithub />} label="GitHub" />
                    )}
                    {profile.socialLinks.linkedin && (
                      <SocialIcon href={profile.socialLinks.linkedin} icon={<IconBrandLinkedin />} label="LinkedIn" />
                    )}
                    {profile.socialLinks.twitter && (
                      <SocialIcon href={profile.socialLinks.twitter} icon={<IconBrandTwitter />} label="Twitter" />
                    )}
                    {profile.socialLinks.website && (
                      <SocialIcon href={profile.socialLinks.website} icon={<IconWorld />} label="Website" />
                    )}
                  </div>
                )}
              </div>

              {/* METADATA (Email & Location) */}
              {/* Wrapped in <address> for semantic correctness */}
              <address className="flex flex-row flex-wrap items-center justify-center @3xl:justify-start gap-4 @md:gap-6 pt-6 border-t border-border/40 mt-6 w-full not-italic">
                {profile.email && (
                  <a 
                    href={`mailto:${profile.email}`} 
                    className="group flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-[var(--color-accent)] transition-colors whitespace-nowrap"
                    itemProp="email"
                  >
                    <IconMail className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />
                    <span className="text-base font-medium">
                      {profile.email}
                    </span>
                  </a>
                )}

                {profile.location && (
                  <div 
                    className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 whitespace-nowrap"
                    itemProp="homeLocation"
                    itemScope
                    itemType="http://schema.org/Place"
                  >
                    <IconMapPin className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />
                    <span className="text-base font-medium" itemProp="name">{profile.location}</span>
                  </div>
                )}
              </address>

            </div>

            {/* RIGHT CONTENT: Profile Image */}
            <div className="order-1 @3xl:order-2 flex justify-center @3xl:justify-end">
                <div className="relative w-[50%] @md:w-[60%] @3xl:w-[85%] max-w-md">
                    {profile.profileImage && (
                    <div itemProp="image">
                      <ProfileImage
                          imageUrl={urlFor(profile.profileImage).width(600).height(600).url()}
                          firstName={profile.firstName || ""}
                          lastName={profile.lastName || ""}
                          role={profile.headline || "Software Engineer"}
                      />
                    </div>
                    )}
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// Social Icon Component
function SocialIcon({ href, icon, label }: SocialIconProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-zinc-500 hover:text-[var(--color-accent)] transition-colors transform hover:scale-110"
      aria-label={label} // Added aria-label for accessibility
      itemProp="sameAs" // SEO: Tells Google "this is another profile of the same person"
    >
      <div className="w-6 h-6" aria-hidden="true">{icon}</div>
    </Link>
  );
}