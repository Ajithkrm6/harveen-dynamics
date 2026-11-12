import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { HERO_SLIDES } from "../lib/site";

const INTERVAL_MS = 4500;

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div
      data-testid="hero-carousel"
      className="relative w-full"
      aria-roledescription="carousel"
      aria-label="Harveen Dynamics training highlights"
    >
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: INTERVAL_MS,
            stopOnInteraction: true,
          }),
        ]}
      >
        <div className="rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <CarouselContent>
            {HERO_SLIDES.map((slide, index) => (
              <CarouselItem key={slide.src}>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    data-testid={`hero-carousel-slide-${index + 1}`}
                    className="size-full object-cover"
                  />

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#0B1528]/85 to-transparent" />

                  <p
                    data-testid="hero-carousel-caption"
                    className="absolute top-5 left-5 right-5 font-heading text-lg font-semibold text-white"
                  >
                    {slide.caption}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        <div className="absolute top-14 left-5 flex gap-2 z-10">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === current}
              data-testid={`hero-carousel-dot-${i + 1}`}
              onClick={() => goToSlide(i)}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                i === current ? "w-8 bg-sky-300" : "w-3 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <div className="absolute right-4 bottom-4 flex gap-2 z-10">
          <CarouselPrevious
            className="relative inset-0 size-9 bg-white/15 hover:bg-white/30 text-white"
            variant="ghost"
          >
            <ChevronLeft className="size-4" />
          </CarouselPrevious>
          <CarouselNext
            className="relative inset-0 size-9 bg-white/15 hover:bg-white/30 text-white"
            variant="ghost"
          >
            <ChevronRight className="size-4" />
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
}
