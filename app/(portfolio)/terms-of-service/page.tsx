import React from "react";
import Link from "next/link";
import { IconArrowLeft, IconMail } from "@tabler/icons-react";
import { client } from "@/sanity/lib/client";

export const metadata = {
  title: "Terms of Service | Kashan Haider",
  description: "Terms of Service for using Kashan Haider's portfolio website.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service",
    description: "Read our terms of service.",
    type: "website",
  },
};

const TERMS_DATA_QUERY = `{
  "profile": *[_id == "singleton-profile"][0]{ email }
}`;

export default async function TermsOfServicePage() {
  const { profile } = await client.fetch(TERMS_DATA_QUERY);
  const contactEmail = profile?.email || "kashanhaider0209@gmail.com";
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-background pt-28 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--color-primary)] transition-colors mb-8 group"
          aria-label="Return to homepage"
        >
          <IconArrowLeft
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            aria-hidden="true"
          />
          Back to Home
        </Link>

        <header className="mb-12 border-b border-border/50 pb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Terms of <span className="text-[var(--color-primary)]">Service</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Please read these terms carefully before using this website.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Last Updated: {currentDate}
              </p>
            </div>
          </div>
        </header>

        <article className="space-y-12 text-muted-foreground leading-relaxed">
          <section aria-labelledby="terms-1">
            <h2 id="terms-1" className="text-2xl font-semibold text-foreground mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using <strong>Kashan Haider&apos;s Portfolio</strong> (the
              &quot;Website&quot;), you agree to be bound by these Terms of Service and all
              applicable laws and regulations. If you do not agree with any of these
              terms, you should not use this Website.
            </p>
          </section>

          <section aria-labelledby="terms-2">
            <h2 id="terms-2" className="text-2xl font-semibold text-foreground mb-4">
              2. Intellectual Property
            </h2>
            <p className="mb-4">
              All content on this Website, including text, graphics, logos, projects,
              and code samples, is owned by Kashan Haider unless otherwise stated and is
              protected by applicable copyright and trademark laws.
            </p>
            <div className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-medium text-foreground">Usage License</h3>
              <p>
                You are granted a limited, non-exclusive, non-transferable license to
                view and download materials from this Website for personal,
                non-commercial use only. This is a license, not a transfer of ownership.
                Under this license, you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Modify or redistribute the materials;</li>
                <li>Use the materials for any commercial purpose;</li>
                <li>Attempt to reverse engineer any software on this Website;</li>
                <li>Remove copyright or proprietary notices; or</li>
                <li>Mirror the materials on another server or platform.</li>
              </ul>
            </div>
          </section>

          <section aria-labelledby="terms-3">
            <h2 id="terms-3" className="text-2xl font-semibold text-foreground mb-4">
              3. Disclaimer
            </h2>
            <p>
              The content on this Website is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis. Kashan Haider makes no warranties, express or
              implied, and disclaims all warranties including implied warranties of
              merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section aria-labelledby="terms-4">
            <h2 id="terms-4" className="text-2xl font-semibold text-foreground mb-4">
              4. Limitations of Liability
            </h2>
            <p>
              In no event shall Kashan Haider be liable for any damages arising out of the
              use or inability to use this Website, including loss of data, profit, or
              business interruption, even if advised of the possibility of such damages.
            </p>
          </section>

          <section aria-labelledby="terms-5">
            <h2 id="terms-5" className="text-2xl font-semibold text-foreground mb-4">
              5. Accuracy of Information
            </h2>
            <p>
              While efforts are made to keep the content up to date, Kashan Haider does
              not guarantee that the materials on this Website are accurate, complete, or
              current. Content may be changed at any time without notice.
            </p>
          </section>

          <section aria-labelledby="terms-6">
            <h2 id="terms-6" className="text-2xl font-semibold text-foreground mb-4">
              6. Modifications
            </h2>
            <p>
              These Terms of Service may be updated from time to time. Any changes will
              be posted on this page, and your continued use of the Website means you
              accept the updated terms.
            </p>
          </section>

          <section aria-labelledby="terms-7">
            <h2 id="terms-7" className="text-2xl font-semibold text-foreground mb-4">
              7. Contact
            </h2>
            <p className="mb-6">
              If you have any questions about these Terms, feel free to reach out.
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
