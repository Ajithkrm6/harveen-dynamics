import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FAQS } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqAccordion } from "@/components/FaqAccordion";
import { buttonVariants } from "@/components/ui/button";

export default function Faqs() {
  return (
    <div data-testid="page-faqs">
      <section className="bg-hero pt-28 pb-16 text-white md:pt-36 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="Frequently Asked Questions"
            title="Everything You're Wondering, Answered"
            description="Quick answers about backgrounds, class format, hands-on practice, certificates and more."
            dark
          />
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FaqAccordion items={FAQS} />
          <div className="mt-12 rounded-2xl border border-slate-200 bg-muted/50 p-8 text-center">
            <h2 className="font-heading text-xl font-bold text-slate-900">
              Ready to explore a program?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Send us an enquiry and we&rsquo;ll walk you through the details.
            </p>
            <Link to="/contact" data-testid="faqs-cta-button" className={`${buttonVariants} mt-6`}>
              Enroll Now <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
