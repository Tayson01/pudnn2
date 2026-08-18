import { createFileRoute } from "@tanstack/react-router";

import { FAQSection } from "@/components/site/FAQSection";
import { faqs } from "@/lib/site-data";

export const Route = createFileRoute("/intrebari-frecvente")({
  head: () => ({
    meta: [
      { title: "Întrebări frecvente — Vulcanizare mobilă Constanța" },
      {
        name: "description",
        content:
          "Prețuri, timpi de sosire, servicii pe loc, plata cu cardul și intervenții pentru camioane — răspunsuri clare despre vulcanizarea mobilă în Constanța.",
      },
      { property: "og:title", content: "Întrebări frecvente — Vulcanizare mobilă Constanța" },
      {
        property: "og:description",
        content: "Tot ce vrei să știi înainte să suni: prețuri, timpi de sosire și servicii disponibile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <main>
      <FAQSection />
    </main>
  );
}
