import { IconAlertTriangle } from "@tabler/icons-react";

interface MaintenancePageProps {
  message?: string;
}

export function MaintenancePage({ message }: MaintenancePageProps) {
  return (
    // SEMANTIC: 'main' indicates this is the primary content of the viewport
    <main 
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background text-foreground"
      // ACCESSIBILITY: Explicitly identifying the role
      role="main"
    >
      
      {/* Icon / Graphic */}
      {/* Hidden from screen readers as it is decorative */}
      <div 
        className="mb-8 p-6 rounded-full bg-yellow-500/10 border border-yellow-500/20 animate-pulse"
        aria-hidden="true"
      >
        <IconAlertTriangle className="w-16 h-16 text-yellow-500" />
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Under Maintenance
      </h1>

      {/* Dynamic Message from Sanity */}
      <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
        {message || "We are currently upgrading the system. Please check back shortly."}
      </p>

      {/* Optional: Return Home Button (if you allow navigation) */}
      <div 
        className="mt-10 h-1 w-24 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50" 
        role="presentation"
      />
    </main>
  );
}