import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
// import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";

export default function Navbar() {
  const { pathname } = useLocation();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-testid="navbar"
      className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-gray-200 shadow-xs backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" data-testid="navbar-brand-link" className="flex items-center gap-2.5">
          <img
            src={SITE.logoUrl}
            alt={`${SITE.name} logo`}
            data-testid="navbar-brand-logo"
            className="size-11 object-contain"
          />
          <span className="leading-tight">
            <span className="block font-heading text-base font-bold tracking-tight text-slate-900">
              {SITE.name}
            </span>
            <span
              data-testid="navbar-logo-tagline"
              className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#0078D4]"
            >
              {SITE.logoTagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" data-testid="navbar-links-desktop">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-[#0078D4]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with ${SITE.name} on WhatsApp`}
            data-testid="navbar-whatsapp-button"
            className="grid size-9 place-items-center rounded-full text-[#25D366] transition-colors duration-200 hover:bg-[#25D366]/10 hover:text-[#1EBE5D]"
          >
            {/* <SiWhatsapp className="size-5" /> */}
          </a>
          <Link
            to="/contact"
            data-testid="navbar-enroll-button"
            className={buttonVariants({ size: "sm" })}
          >
            Enroll Now
          </Link>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              data-testid="navbar-mobile-menu-button"
              className="group/button inline-flex shrink-0 items-center justify-center rounded-lg bg-transparent px-3 py-2 text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="flex items-center gap-2.5 font-heading font-bold">
                <img src={SITE.logoUrl} alt="" className="size-10 object-contain" />
                <span className="leading-tight">
                  <span className="block">{SITE.name}</span>
                  <span className="block font-mono text-[10px] font-normal uppercase tracking-[0.22em] text-[#0078D4]">
                    {SITE.logoTagline}
                  </span>
                </span>
              </SheetTitle>
              <nav className="mt-4 flex flex-col gap-1" data-testid="navbar-links-mobile">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(link.href)
                        ? "bg-[#EFF6FF] text-[#0078D4]"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  data-testid="mobile-nav-enroll-button"
                  className={`${buttonVariants()} mt-3`}
                >
                  Enroll Now
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="mobile-nav-whatsapp-button"
                  className={`${buttonVariants({ variant: "outline" })} mt-2 text-[#1EBE5D]`}
                >
                  {/* <SiWhatsapp className="size-4" /> WhatsApp Us */}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
