// import { Spinner } from "@/components/ui/spinner";

// function Loading() {
//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <Spinner className="size-8" />
//     </div>
//   );
// }

// export default Loading;


import LogoLoader from "@/components/LogoLoader";

export default function Loading() {
  return (
    // ACCESSIBILITY: role="status" alerts screen readers that a process is active
    <div 
      className="flex min-h-screen items-center justify-center bg-background"
      role="status"
      aria-label="Loading content"
    >
      <LogoLoader />
      
      {/* SCREEN READERS ONLY: Text fallback for the visual loader */}
      <span className="sr-only">Loading...</span>
    </div>
  );
}