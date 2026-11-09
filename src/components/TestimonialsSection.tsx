import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Quote, Star, UserRound } from "lucide-react";
import { apiGet } from "../lib/api";
import type { Testimonial } from "../lib/types";
import { SectionHeading } from "../components/SectionHeading";
import { Card, CardContent } from "../components/ui/card";

const SKELETON_ROWS = [0, 1, 2, 3];

export function TestimonialsSection() {
  const { data, isLoading, isError } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const response = await apiGet("/testimonials");
      return response;
    },
  });

  const testimonials = data ?? [];

  return (
    <section data-testid="testimonials-section" className="bg-muted/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Testimonials"
          title="What Our Learners Say"
          description="Feedback from learners who built their CRM skills with Harveen Dynamics."
        />

        <div className="mt-12" data-testid="testimonials-grid">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {SKELETON_ROWS.map((i) => (
                <Card key={i}>
                  <CardContent className="space-y-4 p-6">
                    <div className="size-5 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                    <div className="h-10 w-2/3 animate-pulse rounded bg-slate-200" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : isError || (!isLoading && testimonials.length === 0) ? (
            <p className="text-sm text-slate-500" data-testid="testimonials-empty">
              Learner stories are being updated — check back soon.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((t: Testimonial, i: number) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
                >
                  <Card
                    data-testid={`testimonial-card-${i + 1}`}
                    className="h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <CardContent className="flex h-full flex-col gap-4 p-6">
                      <div className="flex items-center justify-between">
                        <Quote className="size-6 text-[#0078D4]/40" />
                        <span className="flex gap-0.5" aria-label="5 star rating">
                          {[0, 1, 2, 3, 4].map((s) => (
                            <Star key={s} className="size-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </span>
                      </div>
                      <p className="flex-1 text-sm leading-relaxed text-slate-700">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3 border-t pt-4">
                        <span className="grid size-10 place-items-center rounded-full bg-[#EFF6FF] text-[#0078D4]">
                          <UserRound className="size-5" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-slate-900">{t.name}</span>
                          <span className="block text-xs text-slate-500">{t.role}</span>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
