import { MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "../lib/site";
    
export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${SITE.name} on WhatsApp`}
      title="Chat with us on WhatsApp"
      data-testid="floating-whatsapp-button"
      className="fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-transform duration-300 hover:scale-105 hover:bg-[#1EBE5D]"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" />
      <MessageCircle className="size-7" />
    </a>
  );
}
