import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      disabled={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-surface/90 text-primary shadow-lg shadow-primary/20 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-on-primary hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
