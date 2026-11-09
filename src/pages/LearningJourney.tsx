import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { METHODOLOGY } from "@/lib/site";
import { SectionHeading, Reveal } from "@/components/SectionHeading";
import { buttonVariants } from "@/components/ui/button";

export default function LearningJourney() {
  return (
    <div data-testid="page-learning-journey">
      <section className="bg-hero pt-28 pb-16 text-white md:pt-36 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="Our training methodology"
            title="Our Learning Journey"
            description="Every program follows a six-stage methodology that connects concepts to real-world implementation — so you learn, build and advance with confidence."
            dark
          />
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ol className="relative space-y-8 border-l-2 border-slate-200 pl-8" data-testid="journey-timeline">
            {METHODOLOGY.map((step, i) => (
              <li key={step.step} className="relative">
                <span
                  aria-hidden
                  className="absolute top-1 -left-[45px] grid size-9 place-items-center rounded-full bg-[#0078D4] font-mono text-xs font-bold text-white"
                >
                  {step.step}
                </span>
                <Reveal delay={i * 0.05}>
                  <div
                    data-testid={`journey-step-${step.step}`}
                    className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow duration-300 hover:shadow-md"
                  >
                    <h2 className="font-heading text-lg font-bold tracking-tight text-slate-900">
                      {step.name}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="mt-12 rounded-2xl bg-hero p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-white">
              Ready to make the journey your own?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Enroll today and move from fundamentals to end-to-end implementation projects.
            </p>
            <Link
              to="/contact"
              data-testid="journey-cta-button"
              className={`${buttonVariants({ size: "lg" })} mt-6`}
            >
              Enroll Now <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
