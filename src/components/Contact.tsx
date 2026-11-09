import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "../lib/site";
import { EnquiryForm } from "./EnquireForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";

const CONTACT_CARDS = [
  {
    icon: Mail,
    title: "Email Us",
    line: SITE.email,
    href: `mailto:${SITE.email}`,
    testid: "contact-email-card",
  },
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    line: SITE.phoneDisplay,
    href: SITE.phoneHref,
    testid: "contact-phone-card",
  },
  {
    icon: MapPin,
    title: "Location",
    line: SITE.location,
    href: null,
    testid: "contact-location-card",
  },
];

export function ContactSection() {
  return (
    <section id="enquiry" data-testid="contact-section" className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#0078D4]">
            Contact us
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Let&rsquo;s Start Your Learning Journey!
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Ready to explore the world of Microsoft Dynamics 365 CRM and Power Platform? Whether
            you&rsquo;re a beginner, a working professional or someone looking to upgrade your
            technology skills, we&rsquo;re here to guide you. Get in touch with Harveen Dynamics to
            learn about our upcoming training programs.
          </p>

          <div className="mt-8 space-y-4">
            {CONTACT_CARDS.map((card) => {
              const Icon = card.icon;
              const body = (
                <Card
                  data-testid={card.testid}
                  className="transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#EFF6FF] text-[#0078D4]">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-900">{card.title}</span>
                      <span className="block text-sm text-slate-600">{card.line}</span>
                    </span>
                  </CardContent>
                </Card>
              );
              return card.href ? (
                <a key={card.title} href={card.href} className="block">
                  {body}
                </a>
              ) : (
                <div key={card.title}>{body}</div>
              );
            })}

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-whatsapp px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-whatsapp-dark"
            >
              <MessageCircle className="size-5" /> Chat with us on WhatsApp — {SITE.phoneDisplay}
            </a>
          </div>

          <p className="mt-8 font-heading text-sm font-semibold text-slate-900">
            Start learning. Start building. Start advancing.
          </p>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="font-heading text-xl font-bold">Enquire Now</CardTitle>
            <CardDescription>
              Share your details and our team will get back to you with batch details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EnquiryForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
