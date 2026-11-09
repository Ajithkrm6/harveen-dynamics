import { Link } from "react-router-dom";
import { BookOpen, CheckCircle2, Settings2, Workflow, ArrowRight } from "lucide-react";
// import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { PROGRAMS, whatsappLink } from "@/lib/site";
import { SectionHeading, Reveal } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

const PROGRAM_ICONS = [BookOpen, Workflow, Settings2];

export default function Programs() {
  return (
    <div data-testid="page-programs">
      <section className="bg-hero pt-28 pb-16 text-white md:pt-36 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="What we teach — Core expertise"
            title="Our Training Programs"
            description="Structured, hands-on tracks across Microsoft Dynamics 365 CRM and the Power Platform — from fundamentals to advanced configuration and customization."
            dark
          />
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
          {PROGRAMS.map((program, i) => {
            const Icon = PROGRAM_ICONS[i] ?? BookOpen;
            return (
              <Reveal key={program.id}>
                <Card data-testid={`program-detail-${program.id}`} className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#EFF6FF] text-[#0078D4]">
                          <Icon className="size-6" />
                        </span>
                        <div>
                          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#0078D4]">
                            Program {String(i + 1).padStart(2, "0")}
                          </p>
                          <h2 className="mt-1 font-heading text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                            {program.title}
                          </h2>
                          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                            {program.summary}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h3 className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      What you&rsquo;ll learn
                    </h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {program.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#008272]" />
                          {topic}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        to={`/contact?program=${program.id}`}
                        data-testid={`program-enroll-${program.id}`}
                        className={buttonVariants({ size: "sm" })}
                      >
                        Enroll for this program <ArrowRight className="size-4" />
                      </Link>
                      <a
                        href={whatsappLink(
                          `Hi Harveen Dynamics, I am interested in the "${program.title}" training program. Please share batch details.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`program-whatsapp-${program.id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        {/* <SiWhatsapp className="size-4 text-[#25D366]" /> */} Ask on WhatsApp
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
