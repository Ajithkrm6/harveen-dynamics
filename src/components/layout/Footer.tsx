import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { NAV_LINKS, PROGRAMS, SITE, whatsappLink, Links } from "@/lib/site";


export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-hero text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src={SITE.logoUrl}
                alt={`${SITE.name} logo`}
                data-testid="footer-brand-logo"
                className="size-14 object-contain"
              />
              <span className="leading-tight">
                <span className="block font-heading text-lg font-bold tracking-tight text-white">
                  {SITE.name}
                </span>
                <span
                  data-testid="footer-logo-tagline"
                  className="block font-mono text-[11px] uppercase tracking-[0.22em] text-sky-300"
                >
                  {SITE.logoTagline}
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Online technology training academy for Microsoft Dynamics 365 CRM and Microsoft
              Power Platform. {SITE.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Training Programs
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {PROGRAMS.map((program) => (
                <li key={program.id}>
                  <Link
                    to="/programs"
                    data-testid={`footer-link-program-${program.id}`}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  data-testid="footer-email-link"
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-white"
                >
                  <Mail className="size-4 shrink-0" /> {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.phoneHref}
                  data-testid="footer-phone-link"
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-white"
                >
                  <Phone className="size-4 shrink-0" /> {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-whatsapp-link"
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-white"
                >
                  <MessageCircle className="size-4 shrink-0 text-[#25D366]" /> WhatsApp:{" "}
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" /> {SITE.location}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Social Media
            </h3>
            <ul className="flex mt-4  gap-4 space-y-3">
             {Links.map((icon, index) => (
                <li key={index}>
                  <Link to={icon.href} key={index} className="block">
                    <img src={icon.icon} alt={icon.label} className=" h-10 w-10" />
                  </Link>
                </li>
              ))}
             
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <p data-testid="footer-copyright">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.2em] text-sky-300">
            Start learning. Start building. Start advancing.
          </p>
          <Link
            to="/admin"
            data-testid="footer-admin-link"
            className="transition-colors duration-200 hover:text-white"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
