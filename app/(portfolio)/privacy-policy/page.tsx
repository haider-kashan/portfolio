import React from "react";
import Link from "next/link";
import { IconArrowLeft, IconMail } from "@tabler/icons-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";

const PRIVACY_DATA_QUERY = `{
  "profile": *[_id == "singleton-profile"][0]{ email, firstName, lastName },
  "settings": *[_type == "siteSettings"][0]{ favicon, siteName }
}`;

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await client.fetch(PRIVACY_DATA_QUERY);
  const faviconUrl = settings?.favicon 
    ? urlFor(settings.favicon).width(32).height(32).url() 
    : '/favicon.ico';
  const siteName = settings?.siteName || "Kashan Haider";

  return {
    title: "Privacy Policy | Kashan Haider",
    description: "Transparency about how we collect, use, and protect your data.",
    icons: {
      icon: faviconUrl,
    },
    // SEO: Prevents duplicate content issues
    alternates: {
      canonical: "/privacy-policy",
    },
    // Social Sharing
    openGraph: {
      title: "Privacy Policy",
      description: "Read about our data protection practices.",
      type: "website",
      siteName: siteName,
    },
  };
}

export default async function PrivacyPolicyPage() {
  // Fetch data from Sanity
  const { profile } = await client.fetch(PRIVACY_DATA_QUERY);
  
  // Use fetched email or fallback
  const contactEmail = profile?.email || "kashanhaider0209@gmail.com";
  const fullName = profile?.firstName ? `${profile.firstName} ${profile.lastName}` : "Kashan Haider";

  // --- SEO: JSON-LD for Legal Documents ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    "name": "Privacy Policy",
    "url": "https://kashanhaider.com/privacy-policy", // Replace with your actual domain
    "publisher": {
      "@type": "Person",
      "name": fullName
    },
    "datePublished": "2024-01-01", // Ideally fetch _createdAt from Sanity
    "dateModified": new Date().toISOString().split('T')[0] // Shows content is fresh
  };

  return (
    <main className="min-h-screen bg-background pt-28 pb-20 px-6">
      
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--color-primary)] transition-colors mb-8 group"
            aria-label="Return to homepage"
        >
            <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to Home
        </Link>

        {/* Header */}
        <header className="mb-12 border-b border-border/50 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Privacy <span className="text-[var(--color-primary)]">Policy</span>
            </h1>
            <p className="text-muted-foreground text-lg">
            Transparency about how we handle your data.
            </p>
        </header>

        {/* Content - Wrapped in Article for Semantics */}
        <article className="space-y-12 text-muted-foreground leading-relaxed">
            
            <section aria-labelledby="intro-heading">
                <h2 id="intro-heading" className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                    1. Introduction
                </h2>
                <p>
                    Welcome to <strong>{fullName}&apos;s Portfolio</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this policy, or our practices with regards to your personal information, please contact us via the contact information provided below.
                </p>
                <p className="mt-4">
                    This Privacy Policy governs the privacy policies and practices of our website. Please read our Privacy Policy carefully as it will help you make informed decisions about sharing your personal information with us.
                </p>
            </section>

            <section aria-labelledby="collection-heading">
                <h2 id="collection-heading" className="text-2xl font-semibold text-foreground mb-4">
                    2. Information We Collect
                </h2>
                <p className="mb-4">
                    We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the website (such as using our contact form), or otherwise when you contact us.
                </p>
                <div className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-medium text-foreground">A. Personal Data Provided by You</h3>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                        <li><strong>Contact Data:</strong> We collect names, email addresses, and other similar contact data when you fill out the contact form.</li>
                        <li><strong>Message Content:</strong> Any information you choose to provide in the &quot;Message&quot; field of our contact forms.</li>
                    </ul>
                </div>
            </section>

            <section aria-labelledby="usage-heading">
                <h2 id="usage-heading" className="text-2xl font-semibold text-foreground mb-4">
                    3. How We Use Your Information
                </h2>
                <p>
                    We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                </p>
                <ul className="mt-4 list-disc list-inside space-y-2 ml-2">
                    <li>To facilitate account creation and logon process (if applicable).</li>
                    <li>To send you marketing and promotional communications (only with your consent).</li>
                    <li>To respond to user inquiries/offer support to users.</li>
                    <li>To request feedback and to contact you about your use of our website.</li>
                </ul>
            </section>

            <section aria-labelledby="technology-heading">
                <h2 id="technology-heading" className="text-2xl font-semibold text-foreground mb-4">
                    4. Technology & Third-Party Services
                </h2>
                <p className="mb-4">
                    We generally do not share the information we collect with third parties, except as described below:
                </p>
                
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="p-5 rounded-lg bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
                        <h4 className="font-semibold text-foreground mb-2">Google Analytics</h4>
                        <p className="text-sm">
                            We use Google Analytics to analyze the use of our website. Google Analytics gathers information about website use by means of cookies. The information gathered relating to our website is used to create reports about the use of our website.
                        </p>
                    </div>
                    <div className="p-5 rounded-lg bg-[var(--color-secondary)]/5 border border-[var(--color-secondary)]/10">
                        <h4 className="font-semibold text-foreground mb-2">Sanity.io</h4>
                        <p className="text-sm">
                            Our content is managed via Sanity.io. While they host our content, they do not have access to personal user data submitted via our contact forms unless explicitly stated.
                        </p>
                    </div>
                    <div className="p-5 rounded-lg bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/10">
                        <h4 className="font-semibold text-foreground mb-2">Vercel</h4>
                        <p className="text-sm">
                            This website is hosted on Vercel. Vercel may collect anonymous usage data to ensure the performance and security of the deployment infrastructure.
                        </p>
                    </div>
                </div>
            </section>

            <section aria-labelledby="cookies-heading">
                <h2 id="cookies-heading" className="text-2xl font-semibold text-foreground mb-4">
                    5. Cookies and Tracking Technologies
                </h2>
                <p>
                    We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
                </p>
            </section>

            <section aria-labelledby="rights-heading">
                <h2 id="rights-heading" className="text-2xl font-semibold text-foreground mb-4">
                    6. Your Privacy Rights
                </h2>
                <p>
                    In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.
                </p>
            </section>

            <section aria-labelledby="contact-heading">
                <h2 id="contact-heading" className="text-2xl font-semibold text-foreground mb-4">
                    7. Contact Us
                </h2>
                <p className="mb-6">
                    If you have questions or comments about this policy, you may contact us by email or through the contact form on our website.
                </p>
                <a 
                    href={`mailto:${contactEmail}`} 
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-muted/30 border border-border/50 hover:border-[var(--color-primary)]/50 transition-all duration-300 group"
                    aria-label={`Email us at ${contactEmail}`}
                >
                    <div className="p-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                        <IconMail className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {contactEmail}
                    </span>
                </a>
            </section>

        </article>
      </div>
    </main>
  );
}