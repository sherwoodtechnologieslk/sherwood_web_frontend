import React from "react";
import logoImg from "../../../images/logo.png";
import { showClientsSection } from "../../featureFlags";

const sections = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "products", label: "Products" },
  ...(showClientsSection ? [{ id: "clients" as const, label: "Clients" }] : []),
  { id: "about", label: "About us" },
  { id: "our-team", label: "Our team" },
];

/** Matches reffer code marketing-navigation.css: top 1.2rem, width 90%, max 1080px, padding ~0.65rem vertical */
export const Header: React.FC<{
  onNavigateSection?: (id: string) => void;
  onBookConsultation?: () => void;
  /** "light" = always use white bar + dark nav (e.g. product detail on white background). Default uses dark bar over hero until scroll. */
  variant?: "default" | "light";
}> = ({ onNavigateSection, onBookConsultation, variant = "default" }) => {
  const [active, setActive] = React.useState<string>("home");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  /** Past hero — matches reffer code Navigation.jsx (scrollY > innerHeight * 0.7) + marketing-navigation.css nav.scrolled */
  const [scrolled, setScrolled] = React.useState(false);
  const lightBar = variant === "light" || scrolled;

  React.useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    };

    const handleScroll = () => {
      updateScrolled();
      let current = "home";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          current = section.id;
          break;
        }
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const navLinkClass = (id: string) =>
    [
      "rounded-full px-2.5 py-2 text-[0.85rem] font-medium leading-none transition-colors duration-300 md:px-[0.85rem]",
      active === id
        ? lightBar
          ? "text-blue-700"
          : "text-white"
        : lightBar
          ? "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
          : "text-white/75 hover:text-white",
    ].join(" ");

  const barClassName = [
    "pointer-events-auto mx-auto flex w-[90%] max-w-[1080px] min-h-[3.25rem] items-center justify-between gap-2 rounded-full px-4 py-[0.65rem] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] sm:gap-3 md:gap-6 md:px-6",
    lightBar
      ? "border border-blue-600/15 bg-white/[0.92] shadow-[0_12px_48px_rgba(0,0,0,0.12)] backdrop-blur-[16px]"
      : "border border-white/[0.15] bg-slate-950/60 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-[16px]",
  ].join(" ");

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-40">
      <div
        className={[
          "pointer-events-none transition-[padding] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          lightBar
            ? "pt-[max(0.8rem,env(safe-area-inset-top))]"
            : "pt-[max(1.2rem,env(safe-area-inset-top))]",
        ].join(" ")}
      >
        <div className={barClassName}>
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            className={[
              "flex min-h-0 min-w-0 shrink-0 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              lightBar ? "ring-offset-white" : "ring-offset-slate-950",
            ].join(" ")}
            aria-label="Go to home"
          >
            <img
              src={logoImg}
              alt=""
              className="h-7 w-auto max-w-[124px] object-contain object-left md:h-8 md:max-w-[132px]"
            />
          </button>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex"
            aria-label="Page sections"
          >
            {sections.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={navLinkClass(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            {onBookConsultation && (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onBookConsultation();
                }}
                className={[
                  "inline-flex h-8 shrink-0 items-center justify-center rounded-full border-0 bg-gradient-to-r from-[#79C72C] to-[#4c9141] px-3 text-[0.8rem] font-semibold text-white shadow-[0_3px_14px_rgba(121,199,44,0.35)] transition-[filter,transform,box-shadow] hover:brightness-105 hover:shadow-[0_6px_20px_rgba(121,199,44,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-[0.98] md:h-9 md:px-5 md:text-sm",
                  lightBar ? "focus-visible:ring-offset-white" : "focus-visible:ring-offset-slate-950",
                ].join(" ")}
              >
                Book Consultation
              </button>
            )}

            <button
              type="button"
              className={[
                "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors md:hidden",
                lightBar
                  ? "border-slate-200 bg-slate-100/80 text-slate-700 hover:bg-slate-200/80"
                  : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10",
              ].join(" ")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            id="mobile-nav-menu"
            className={[
              "pointer-events-auto mx-auto mt-3 w-[90%] max-w-[1080px] rounded-2xl border p-2 shadow-xl backdrop-blur-xl md:hidden",
              lightBar
                ? "border-slate-200 bg-white/95"
                : "border-white/[0.12] bg-[#05070A]/85",
            ].join(" ")}
          >
            <nav className="flex flex-col" aria-label="Page sections">
              {sections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={[
                    "rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                    active === item.id
                      ? lightBar
                        ? "bg-blue-50 text-blue-700"
                        : "bg-white/10 text-white"
                      : lightBar
                        ? "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                        : "text-slate-400 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
