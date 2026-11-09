import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  MessageCircle,
  MessageSquare,
  Settings2,
  Workflow,
} from "lucide-react";
import { CAREER_ROLES, FAQS, HERO, METHODOLOGY, PROGRAMS, SITE, STATS, WHY_US, whatsappLink } from "@/lib/site";
import { SectionHeading, Reveal } from "@/components/SectionHeading";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "../components/Contact";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

const PROGRAM_ICONS = [BookOpen, Workflow, Settings2];

export default function Home() {
  return (
    <div data-testid="page-home">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero pt-28 pb-20 text-white md:pt-36 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-[#0078D4]/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 size-80 rounded-full bg-[#008272]/20 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <Reveal>
            <p className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
              {HERO.badge}
            </p>
            <h1 className="mt-6 font-heading text-4xl leading-[1.12] font-bold tracking-tight md:text-5xl lg:text-[52px]">
              Kickstart your career in Microsoft CRM Dynamics&nbsp;365 with{" "}
              <span className="text-sky-300">Harveen Dynamics</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300">{HERO.body}</p>
            <p className="mt-6 font-heading text-lg font-semibold text-sky-200">{SITE.tagline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                data-testid="hero-enroll-button"
                className={buttonVariants({ size: "lg" })}
              >
                Enroll Now <ArrowRight className="size-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-whatsapp-button"
                className={`${buttonVariants({
                  variant: "outline",
                  size: "lg",
                })} text-slate-900 hover:text-slate-900`}
              >
                <MessageCircle className="size-4 text-[#25D366]" /> WhatsApp Us
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <HeroCarousel />
            <div className="absolute -bottom-6 -left-6 hidden lg:flex items-center gap-3 rounded-xl border border-white/10 bg-card-dark/95 px-4 py-3 shadow-xl backdrop-blur">
              <span className="grid size-10 place-items-center rounded-lg bg-[#0078D4]/20 text-sky-300">
                <Award className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">
                  Hands-on, implementation-based learning
                </span>
                <span className="block text-xs text-slate-400">
                  Real-world projects in every program
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats strip */}
      <section data-testid="stats-strip" className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="font-heading text-3xl font-bold text-[#0078D4]">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs preview */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="What we teach — Core expertise"
            title="Our Training Programs"
            description="Structured programs that take you from CRM fundamentals to advanced configurations and automation."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((program, i) => {
              const Icon = PROGRAM_ICONS[i] ?? BookOpen;
              const preview = program.topics.slice(0, 4);
              return (
                <Reveal key={program.id} delay={i * 0.08}>
                  <Card
                    data-testid={`program-card-${program.id}`}
                    className="h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <CardContent className="flex h-full flex-col gap-4 p-6">
                      <span className="grid size-11 place-items-center rounded-lg bg-[#EFF6FF] text-[#0078D4]">
                        <Icon className="size-5" />
                      </span>
                      <h3 className="font-heading text-lg font-bold tracking-tight text-slate-900">
                        {program.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">{program.summary}</p>
                      <ul className="flex-1 space-y-2">
                        {preview.map((topic) => (
                          <li key={topic} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#008272]" />
                            {topic}
                          </li>
                        ))}
                        {program.topics.length > preview.length ? (
                          <li className="pl-6 text-xs font-medium text-slate-500">
                            +{program.topics.length - preview.length} more topics
                          </li>
                        ) : null}
                      </ul>
                      <Link
                        to="/programs"
                        data-testid={`program-card-link-${program.id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#0078D4] transition-colors duration-200 hover:text-[#005A9E]"
                      >
                        View program details <ArrowRight className="size-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="Why choose Harveen Dynamics?"
            title="Why Learn With Harveen Dynamics?"
            description="Learning That Goes Beyond Theory. We focus on helping learners understand how technology works in real business environments."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.08}>
                <div className="flex h-full gap-4 rounded-xl border border-slate-200 bg-white p-6 transition-shadow duration-300 hover:shadow-md">
                  <span className="font-mono text-sm font-bold text-[#0078D4]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology preview */}
      <section className="relative overflow-hidden bg-hero py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="Our training methodology"
            title="Our Learning Journey"
            description="Six structured stages that connect concepts to real-world implementation."
            dark
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {METHODOLOGY.map((step, i) => (
              <Reveal key={step.step} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-xl border border-white/10 bg-white/5 p-6 transition-colors duration-200 hover:bg-white/10">
                  <p className="font-mono text-sm font-bold text-sky-300">{step.step}</p>
                  <h3 className="mt-2 font-heading text-lg font-bold">{step.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/learning-journey"
              data-testid="home-methodology-link"
              className="inline-flex items-center gap-1 text-sm font-semibold text-sky-300 transition-colors duration-200 hover:text-sky-200"
            >
              Explore the full journey <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials (live from backend) */}
      <TestimonialsSection />

      {/* Careers preview */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="Career opportunities"
            title="Build Skills for Tomorrow's Technology Careers"
            description="Microsoft Dynamics 365 and Power Platform offer opportunities across business applications, CRM consulting, configuration and automation."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAREER_ROLES.map((role, i) => (
              <Reveal key={role} delay={(i % 3) * 0.06}>
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 transition-shadow duration-300 hover:shadow-md">
                  <Briefcase className="size-4 shrink-0 text-[#0078D4]" />
                  <span className="text-sm font-medium text-slate-800">{role}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link
              to="/careers"
              data-testid="home-careers-link"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#0078D4] transition-colors duration-200 hover:text-[#005A9E]"
            >
              Explore career paths <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="Frequently Asked Questions"
            title="Have Questions? We Have Answers."
            align="center"
          />
          <div className="mt-10">
            <FaqAccordion items={FAQS} />
          </div>
          <p className="mt-8 text-center text-sm text-slate-600">
            Still have questions?{" "}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="home-faq-whatsapp-link"
              className="inline-flex items-center gap-1 font-semibold text-[#0078D4] hover:text-[#005A9E]"
            >
              <MessageSquare className="size-4" /> Message us on WhatsApp
            </a>{" "}
            or <Link to="/contact" className="font-semibold text-[#0078D4] hover:text-[#005A9E]">send an enquiry</Link>.
          </p>
        </div>
      </section>

      {/* Contact + enquiry */}
      <ContactSection />
    </div>
  );
}
