import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Înapoi sus"
      title="Înapoi sus ⬆️"
      className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-4 z-40 flex size-11 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-float transition-transform hover:-translate-y-1 lg:bottom-6 lg:right-6 lg:size-12"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
