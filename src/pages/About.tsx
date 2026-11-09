import { Link } from "react-router-dom";
import { ArrowRight, Eye, Target, Sparkles } from "lucide-react";
import { ABOUT_IMAGE } from "@/lib/site";
import { SectionHeading, Reveal } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

const CORE_EXPERTISE = ["Microsoft Dynamics 365 CRM", "Microsoft Power Platform", "Cloud Automation"];

export default function About() {
  return (
    <div data-testid="page-about">
      <section className="bg-hero pt-28 pb-16 text-white md:pt-36 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="About us"
            title="About Harveen Dynamics"
            description="Empowering Professionals Through Technology and Practical Learning."
            dark
          />
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <img
              src={ABOUT_IMAGE}
              alt="Professionals collaborating during practical training"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
              Learning that goes beyond understanding concepts
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              Harveen Dynamics is an online technology training academy focused on Microsoft
              Dynamics 365 CRM and Microsoft Power Platform. We believe that learning technology
              should go beyond understanding concepts. It should empower individuals to configure
              applications, automate business processes, solve practical challenges and build
              confidence in real-world environments.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Our training approach combines structured instruction, practical demonstrations,
              hands-on exercises and implementation-based projects. Whether you are a fresher
              exploring technology careers, a working professional upgrading your skills or someone
              transitioning into the CRM ecosystem, Harveen Dynamics provides a learning environment
              to help you move forward.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <Card className="h-full">
                <CardContent className="p-8">
                  <span className="grid size-11 place-items-center rounded-lg bg-[#EFF6FF] text-[#0078D4]">
                    <Eye className="size-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-slate-900">Our Vision</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    To become a trusted learning destination for professionals seeking expertise in
                    business applications, CRM technologies and cloud-based automation.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.08}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <span className="grid size-11 place-items-center rounded-lg bg-[#EFF6FF] text-[#0078D4]">
                    <Target className="size-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-slate-900">Our Mission</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    To make technology education practical, accessible and career-oriented by
                    connecting learning with real-world business applications.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3">
                  <Sparkles className="size-5 text-[#0078D4]" />
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    What we teach — Core expertise
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {CORE_EXPERTISE.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-slate-200 bg-[#EFF6FF] px-4 py-1.5 text-sm font-medium text-[#005A9E]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-hero px-8 py-10 text-center md:flex-row md:text-left">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Ready to start your learning journey?
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Explore our training programs and take the next step in your career.
              </p>
            </div>
            <Link to="/contact" data-testid="about-cta-button" className={buttonVariants({ size: "lg" })}>
              Enroll Now <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
