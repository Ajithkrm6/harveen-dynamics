import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Compass, FolderKanban, MessagesSquare } from "lucide-react";
import { CAREER_ROLES } from "@/lib/site";
import { SectionHeading, Reveal } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

const SUPPORT = [
  {
    icon: Compass,
    title: "Career-oriented guidance",
    description: "Direction on which roles fit your background and how to prepare for them.",
  },
  {
    icon: FolderKanban,
    title: "Practical project exposure",
    description: "Implementation-based assignments you can present to interviewers with confidence.",
  },
  {
    icon: MessagesSquare,
    title: "Interview preparation",
    description: "Technical interview preparation and project explanation sessions.",
  },
];

export default function Careers() {
  return (
    <div data-testid="page-careers">
      <section className="bg-hero pt-28 pb-16 text-white md:pt-36 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="Career opportunities"
            title="Build Skills for Tomorrow's Technology Careers"
            description="Microsoft Dynamics 365 and Power Platform offer opportunities across business applications, CRM consulting, configuration and automation."
            dark
          />
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="Roles you can aim for"
            title="Our training programs aim to help learners develop skills relevant to roles such as:"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAREER_ROLES.map((role, i) => (
              <Reveal key={role} delay={(i % 3) * 0.06}>
                <Card
                  data-testid={`career-role-card-${i + 1}`}
                  className="h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardContent className="flex h-full flex-col gap-3 p-6">
                    <span className="grid size-10 place-items-center rounded-lg bg-[#EFF6FF] text-[#0078D4]">
                      <Briefcase className="size-5" />
                    </span>
                    <h3 className="font-heading text-base font-bold tracking-tight text-slate-900">
                      {role}
                    </h3>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="Beyond the classroom"
            title="Career support at every step"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SUPPORT.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="h-full rounded-xl border border-slate-200 bg-white p-6">
                    <span className="grid size-10 place-items-center rounded-lg bg-[#EFF6FF] text-[#0078D4]">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-heading text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-12">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600">
                We also provide career-oriented guidance, practical project exposure and interview
                preparation to help learners take their next professional step.{" "}
                <span className="font-semibold text-slate-900">
                  Your next career opportunity starts with the right skills.
                </span>
              </p>
              <Link
                to="/contact"
                data-testid="careers-cta-button"
                className={`${buttonVariants({ size: "lg" })} mt-6`}
              >
                Start Your Journey <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
