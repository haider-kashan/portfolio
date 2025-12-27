import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { FloatingDockClient } from "./FloatingDockClient";

const NAVIGATION_QUERY = defineQuery(`*[_type == "navigation"] | order(order asc){
  title,
  href,
  icon,
  isExternal
}`);

const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  showBlog,
  showServices,
  showTestimonials,
  showAchievements,
  showExperience,
  showEducation,
  showSkills,
  showCertifications,
  showProjects
}`);

export async function FloatingDock() {
  const [{ data: navItems }, { data: settings }] = await Promise.all([
    sanityFetch({ query: NAVIGATION_QUERY }),
    sanityFetch({ query: SETTINGS_QUERY }),
  ]);

  // If no navigation items, don't render anything
  if (!navItems || navItems.length === 0) {
    return null;
  }

  // Safe fallback for settings
  const safeSettings = settings || {};

  return (
    <nav aria-label="Quick actions" className="pointer-events-none">
      <FloatingDockClient navItems={navItems} settings={safeSettings} />
    </nav>
  );
}