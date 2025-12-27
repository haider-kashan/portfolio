import React from "react";
import Link from "next/link";
import { IconArrowLeft, IconMail } from "@tabler/icons-react";
import { client } from "@/sanity/lib/client";

export const metadata = {
  title: "Terms of Service | Kashan Haider",
  description: "Terms of Service for using Kashan Haider's portfolio website.",
  // SEO: Prevents duplicate content issues
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service",
    description: "Read our terms of service.",
    type: "website",
  },
};

// Query to fetch dynamic data
const TERMS_DATA_QUERY = `{
  "profile": *[_id == "singleton-profile"][0]{ email }
}`;

export default async function TermsOfServicePage() {
  // Fetch data from Sanity
  const { profile } = await client.fetch(TERMS_DATA_QUERY);
  
  // Use fetched email or fallback
  const contactEmail = profile?.email || "kashanhaider0209@gmail.com";
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main className="min-h-screen bg-background pt-28 pb-20 px-6">
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

        {/* Semantic Header */}
        <header className="mb-12 border-b border-border/50 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                    Terms of <span className="text-[var(--color-primary)]">Service</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                    Please read these terms carefully before using our website.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Last Updated: {currentDate}
                    </p>
                </div>
            </div>
        </header>

        {/* Content - Wrapped in Article for Semantics */}
        <article className="space-y-12 text-muted-foreground leading-relaxed">
            
            <section aria-labelledby="terms-1">
                <h2 id="terms-1" className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                    1. Acceptance of Terms
                </h2>
                <p>
                    By accessing and using <strong>Kashan Haider&apos;s Portfolio</strong> (the &quot;Website&quot;), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this Website&apos;s particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </p>
            </section>

            <section aria-labelledby="terms-2">
                <h2 id="terms-2" className="text-2xl font-semibold text-foreground mb-4">
                    2. Intellectual Property
                </h2>
                <p className="mb-4">
                    The Site and its original content, features, and functionality are owned by Kashan Haider and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
                <div className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-medium text-foreground">Usage License</h3>
                    <p>Permission is granted to temporarily download one copy of the materials (information or software) on Kashan Haider&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                        <li>Modify or copy the materials;</li>
                        <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                        <li>Attempt to decompile or reverse engineer any software contained on the website;</li>
                        <li>Remove any copyright or other proprietary notations from the materials; or</li>
                        <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
                    </ul>
                </div>
            </section>

            <section aria-labelledby="terms-3">
                <h2 id="terms-3" className="text-2xl font-semibold text-foreground mb-4">
                    3. Disclaimer
                </h2>
                <p>
                    The materials on Kashan Haider&apos;s website are provided on an &apos;as is&apos; basis. Kashan Haider makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
            </section>

            <section aria-labelledby="terms-4">
                <h2 id="terms-4" className="text-2xl font-semibold text-foreground mb-4">
                    4. Limitations
                </h2>
                <p>
                    In no event shall Kashan Haider or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Kashan Haider&apos;s website, even if Kashan Haider or a Kashan Haider authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
            </section>

            <section aria-labelledby="terms-5">
                <h2 id="terms-5" className="text-2xl font-semibold text-foreground mb-4">
                    5. Accuracy of Materials
                </h2>
                <p>
                    The materials appearing on the website could include technical, typographical, or photographic errors. Kashan Haider does not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice. However, we do not make any commitment to update the materials.
                </p>
            </section>

            <section aria-labelledby="terms-6">
                <h2 id="terms-6" className="text-2xl font-semibold text-foreground mb-4">
                    6. Modifications
                </h2>
                <p>
                    We may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                </p>
            </section>

            <section aria-labelledby="terms-7">
                <h2 id="terms-7" className="text-2xl font-semibold text-foreground mb-4">
                    7. Contact Us
                </h2>
                <p className="mb-6">
                    If you have questions about these Terms, please contact us.
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