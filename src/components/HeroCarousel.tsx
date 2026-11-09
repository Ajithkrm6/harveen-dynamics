import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "../lib/site";

const INTERVAL_MS = 4500;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = HERO_SLIDES.length;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const go = (next: number) => setIndex((next + count) % count);
  const slide = HERO_SLIDES[index];

  return (
    <div
      data-testid="hero-carousel"
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-card-dark shadow-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Harveen Dynamics training highlights"
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          data-testid={`hero-carousel-slide-${index + 1}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 size-full object-cover"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#0B1528]/85 to-transparent" />

      <p
        data-testid="hero-carousel-caption"
        className="absolute top-5 left-5 right-5 font-heading text-lg font-semibold text-white"
      >
        {slide.caption}
      </p>

      <div className="absolute top-14 left-5 flex gap-2">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            data-testid={`hero-carousel-dot-${i + 1}`}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
              i === index ? "w-8 bg-sky-300" : "w-3 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      <div className="absolute right-4 bottom-4 flex gap-2">
        <button
          type="button"
          aria-label="Previous slide"
          data-testid="hero-carousel-prev"
          onClick={() => go(index - 1)}
          className="grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors duration-200 hover:bg-white/30"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          data-testid="hero-carousel-next"
          onClick={() => go(index + 1)}
          className="grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors duration-200 hover:bg-white/30"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
