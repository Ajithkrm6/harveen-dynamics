import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      data-testid="page-not-found"
      className="grid min-h-svh place-items-center bg-background px-4 pt-16 text-center"
    >
      <div>
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[#0078D4]">
          404
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-slate-900">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <Link to="/" data-testid="not-found-home-link" className={`${buttonVariants()} mt-6`}>
          <ArrowLeft className="size-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
