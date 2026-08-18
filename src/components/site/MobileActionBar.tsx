import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone, Send } from "lucide-react";

import { TEL, WA } from "@/lib/site-data";

export function MobileActionBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div
        aria-hidden
        className="h-8 bg-gradient-to-t from-background to-transparent"
      />
      <nav
        aria-label="Acțiuni rapide"
        className="pointer-events-auto border-t border-border bg-background/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md"
      >
        <div className="grid grid-cols-3 gap-2">
          <a
            href={`tel:${TEL}`}
            className="flex min-h-13 flex-col items-center justify-center gap-1 rounded-2xl bg-brand text-brand-foreground shadow-glow active:scale-[0.97]"
          >
            <Phone className="size-5" />
            <span className="text-[11px] font-bold">Sună acum</span>
          </a>
          <a
            href={WA}
            className="flex min-h-13 flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-card text-foreground active:scale-[0.97]"
          >
            <MessageCircle className="size-5 text-brand" />
            <span className="text-[11px] font-semibold">WhatsApp</span>
          </a>
          <Link
            to="/contact"
            className="flex min-h-13 flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-card text-foreground active:scale-[0.97]"
          >
            <Send className="size-5 text-brand" />
            <span className="text-[11px] font-semibold">Ofertă</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
