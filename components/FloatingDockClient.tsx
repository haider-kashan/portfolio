"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"; 
import { DynamicIcon } from "./DynamicIcon";

interface NavItem {
  title?: string | null;
  href?: string | null;
  icon?: string | null;
  isExternal?: boolean | null;
}

// 1. UPDATED INTERFACE to match your Schema
interface SiteSettings {
  showBlog?: boolean;
  showServices?: boolean;
  showTestimonials?: boolean;
  showAchievements?: boolean;
  showExperience?: boolean;
  showEducation?: boolean;
  showSkills?: boolean;
  showCertifications?: boolean;
  showProjects?: boolean;
}

interface FloatingDockClientProps {
  navItems: NavItem[];
  settings: SiteSettings;
}

interface DockLink {
  title: string;
  href?: string;
  icon: React.ReactNode;
  isExternal?: boolean | null;
  onClick?: () => void;
}

const MAX_VISIBLE_ITEMS_DESKTOP = 6;
const MAX_VISIBLE_ITEMS_MOBILE = 8;

const getVisibleLinks = (links: DockLink[], maxItems: number) => {
  const shouldShowMore = links.length > maxItems;
  return {
    shouldShowMore,
    visible: shouldShowMore ? links.slice(0, maxItems) : links,
    hidden: shouldShowMore ? links.slice(maxItems) : [],
  };
};

// 2. UPDATED LOGIC to map URLs to Settings Toggles
const getLinkVisibility = (href: string, settings: SiteSettings): boolean => {
  if (!settings) return true;
  if (!href) return true;

  // Map the URL keyword (e.g., "experience") to the Settings key (e.g., "showExperience")
  const sectionMap: Record<string, keyof SiteSettings> = {
    services: "showServices",
    blog: "showBlog",
    testimonials: "showTestimonials",
    achievements: "showAchievements",
    experience: "showExperience",
    education: "showEducation",
    skills: "showSkills",
    certifications: "showCertifications",
    projects: "showProjects",
    work: "showProjects", // Handle alternate names if necessary
  };

  // Clean the href to find the key (e.g., "/#experience" -> "experience")
  const sectionName = href.toLowerCase().replace("/", "").replace("#", "");
  const settingsKey = sectionMap[sectionName];

  // If the link doesn't match a known toggle (e.g., "Home", "About"), keep it visible
  if (!settingsKey) {
    return true;
  }

  // Return the value of the toggle. 
  return !!settings[settingsKey];
};

export function FloatingDockClient({ navItems, settings }: FloatingDockClientProps) {
  const pathname = usePathname();
  
  // REMOVED: useUser and useClerk hooks

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMoreMenuOpen, setDesktopMoreMenuOpen] = useState(false);
  const [mobileMoreMenuOpen, setMobileMoreMenuOpen] = useState(false);

  // Check if we are on a legal page to hide the dock
  const isLegalPage = pathname === "/privacy-policy" || pathname === "/terms-of-service";

  if (isLegalPage) {
    return null;
  }

  const filteredNavItems = navItems.filter((item) => {
    if (item.isExternal) return true;
    return getLinkVisibility(item.href || "", settings);
  });

  const links: DockLink[] = [
    ...filteredNavItems.map((item) => ({
      title: item.title || "",
      href: item.href || "#",
      icon: <DynamicIcon iconName={item.icon || "IconHome"} />,
      isExternal: item.isExternal,
    })),
    // REMOVED: Sign Out Logic
  ].filter(Boolean) as DockLink[];

  const desktop = getVisibleLinks(links, MAX_VISIBLE_ITEMS_DESKTOP);
  const mobile = getVisibleLinks(links, MAX_VISIBLE_ITEMS_MOBILE);

  return (
    <div className="pointer-events-auto">
      {/* Desktop & Tablet: Horizontal dock */}
      <div className="hidden md:block fixed z-30 bottom-4 left-1/2 -translate-x-1/2">
        <div 
            className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/20 hover:border-white/40 dark:hover:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
            role="menubar"
            aria-label="Desktop Navigation"
        >
          {desktop.visible.map((item) => (
            <DockIcon
              key={`${item.title}-${item.href}`}
              item={item}
              isVertical={false}
            />
          ))}

          {desktop.shouldShowMore && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDesktopMoreMenuOpen(!desktopMoreMenuOpen)}
                className="group relative flex items-center justify-center w-12 h-12 md:w-12 md:h-12"
                aria-label={desktopMoreMenuOpen ? "Close more menu" : "Show more menu items"}
                aria-expanded={desktopMoreMenuOpen}
                aria-haspopup="true"
              >
                <div className="relative flex items-center justify-center w-full h-full rounded-full bg-white/10 dark:bg-white/5 group-hover:bg-white/40 dark:group-hover:bg-white/20 backdrop-blur-md border border-white/20 dark:border-white/10 group-hover:border-white/50 dark:group-hover:border-white/30 transition-all duration-500 ease-out hover:scale-125 hover:-translate-y-2 md:hover:-translate-y-3 hover:!bg-white/50 dark:hover:!bg-white/30 hover:!border-white/70 dark:hover:!border-white/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
                  <div className="w-6 h-6 md:w-6 md:h-6 text-neutral-400/60 group-hover:text-neutral-500 dark:text-neutral-300/60 dark:group-hover:text-neutral-300 group-hover:!text-neutral-600 dark:group-hover:!text-neutral-200 transition-colors duration-300">
                    {desktopMoreMenuOpen ? (
                      <IconX className="w-6 h-6" aria-hidden="true" />
                    ) : (
                      <IconMenu2 className="w-6 h-6" aria-hidden="true" />
                    )}
                  </div>
                </div>
                {/* Tooltip */}
                <div 
                    className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/20 text-sm font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]"
                    aria-hidden="true"
                >
                  More
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-white/90 dark:bg-black/90 border-r border-b border-white/40 dark:border-white/20" />
                </div>
              </button>

              {desktopMoreMenuOpen && (
                <div 
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 z-[100] flex flex-col-reverse gap-2 p-3 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom-2 duration-200"
                    role="menu"
                    aria-label="More items"
                >
                  {desktop.hidden.map((item) => (
                    <DockIcon
                      key={`${item.title}-${item.href}-more`}
                      item={item}
                      isVertical={true}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Hamburger (Only visible below md) */}
      <div className="md:hidden fixed top-4 right-4 z-30">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-12 h-12 rounded-full bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/20 hover:border-white/40 dark:hover:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex items-center justify-center text-neutral-500 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-200 transition-all duration-300"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-haspopup="true"
        >
          {mobileMenuOpen ? (
            <IconX className="w-6 h-6" aria-hidden="true" />
          ) : (
            <IconMenu2 className="w-6 h-6" aria-hidden="true" />
          )}
        </button>

        {mobileMenuOpen && (
          <div 
            className="absolute top-14 right-0 z-[100] flex flex-col gap-2 p-3 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] animate-in slide-in-from-top-2 duration-200"
            role="menu"
            aria-label="Mobile Navigation"
          >
            {mobile.visible.map((item) => (
              <DockIcon
                key={`${item.title}-${item.href}-mobile`}
                item={item}
                isVertical={true}
              />
            ))}

            {mobile.shouldShowMore && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMobileMoreMenuOpen(!mobileMoreMenuOpen)}
                  className="group relative flex items-center justify-center w-12 h-12"
                  aria-label={mobileMoreMenuOpen ? "Close more menu" : "Show more menu items"}
                  aria-expanded={mobileMoreMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="relative flex items-center justify-center w-full h-full rounded-full bg-white/25 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 transition-all duration-300 hover:scale-110 hover:bg-gray-500/10 dark:hover:bg-white/20 hover:border-white/60 dark:hover:border-white/30">
                    <div className="w-6 h-6 text-neutral-500 dark:text-neutral-300">
                      {mobileMoreMenuOpen ? (
                        <IconX className="w-6 h-6" aria-hidden="true" />
                      ) : (
                        <IconMenu2 className="w-6 h-6" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                  <div 
                    className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/20 text-sm font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-1 transition-all duration-300 pointer-events-none shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]"
                    aria-hidden="true"
                  >
                    More
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-white/90 dark:bg-black/90 border-r border-t border-white/40 dark:border-white/20" />
                  </div>
                </button>

                {mobileMoreMenuOpen && (
                  <div 
                    className="absolute top-0 right-16 z-[110] flex flex-row-reverse gap-2 p-3 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] animate-in slide-in-from-right-2 duration-200"
                    role="menu"
                  >
                    {mobile.hidden.map((item) => (
                      <DockIcon
                        key={`${item.title}-${item.href}-mobile-more`}
                        item={item}
                        isVertical={false}
                        onItemClick={() => {
                          setMobileMoreMenuOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DockIcon({
  item,
  isVertical,
  onItemClick,
}: {
  item: DockLink;
  isVertical: boolean;
  onItemClick?: () => void;
}) {
  const baseIconClasses =
    "relative flex items-center justify-center w-full h-full rounded-full backdrop-blur-md transition-all";
  const verticalIconClasses = `${baseIconClasses} bg-white/40 dark:bg-white/20 border border-white/50 dark:border-white/30 duration-300 hover:scale-110 hover:bg-white/50 dark:hover:bg-white/30 hover:border-white/70 dark:hover:border-white/40`;
  const horizontalIconClasses = `${baseIconClasses} bg-white/10 dark:bg-white/5 group-hover:bg-white/40 dark:group-hover:bg-white/20 border border-white/20 dark:border-white/10 group-hover:border-white/50 dark:group-hover:border-white/30 duration-500 ease-out hover:scale-125 hover:-translate-y-2 md:hover:-translate-y-3 hover:!bg-white/50 dark:hover:!bg-white/30 hover:!border-white/70 dark:hover:!border-white/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]`;

  const Tooltip = ({ direction }: { direction: "vertical" | "horizontal" }) => {
    const isHorizontal = direction === "horizontal";
    return (
      <div
        className={`absolute px-3 py-1.5 ${isHorizontal ? "rounded-xl" : "rounded-lg"} bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/20 ${isHorizontal ? "text-xs md:text-sm" : "text-sm"} font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] ${
          isHorizontal
            ? "-top-9 md:-top-12 left-1/2 -translate-x-1/2 group-hover:-translate-y-2"
            : "right-14 top-1/2 -translate-y-1/2 group-hover:-translate-x-1"
        }`}
        aria-hidden="true"
      >
        {item.title}
        <div
          className={`absolute w-2 h-2 rotate-45 bg-white/90 dark:bg-black/90 ${
            isHorizontal
              ? "-bottom-1 left-1/2 -translate-x-1/2 border-r border-b"
              : "-right-1 top-1/2 -translate-y-1/2 border-r border-t"
          } border-white/40 dark:border-white/20`}
        />
      </div>
    );
  };

  const handleClick = (e?: React.MouseEvent) => {
    if (item.onClick) {
      e?.preventDefault();
      item.onClick();
    }
    onItemClick?.();
  };

  const content = (
    <>
      <div className={isVertical ? verticalIconClasses : horizontalIconClasses}>
        <div
          className={`w-6 h-6 md:w-6 md:h-6 ${
            isVertical
              ? "text-neutral-500 dark:text-neutral-300"
              : "text-neutral-400/60 group-hover:text-neutral-500 dark:text-neutral-300/60 dark:group-hover:text-neutral-300 group-hover:!text-neutral-600 dark:group-hover:!text-neutral-200 transition-colors duration-300"
          }`}
          aria-hidden="true"
        >
          {item.icon}
        </div>
      </div>
      <Tooltip direction={isVertical ? "vertical" : "horizontal"} />
    </>
  );

  const wrapperClasses =
    "group relative flex items-center justify-center w-12 h-12 md:w-12 md:h-12";

  return item.onClick ? (
    <button 
        type="button" 
        onClick={handleClick} 
        className={wrapperClasses}
        aria-label={item.title}
        role="menuitem"
    >
      {content}
    </button>
  ) : (
    <Link
      href={item.href || "#"}
      target={item.isExternal ? "_blank" : undefined}
      rel={item.isExternal ? "noopener noreferrer" : undefined}
      className={wrapperClasses}
      scroll={!item.isExternal}
      onClick={onItemClick}
      aria-label={item.title}
      role="menuitem"
    >
      {content}
    </Link>
  );
}