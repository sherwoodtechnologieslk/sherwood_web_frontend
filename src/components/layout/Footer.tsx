import React from "react";
import logoImg from "../../../images/logo.png";
import { showClientsSection } from "../../featureFlags";
import { Button } from "../ui/button";

type ProductSlug =
  | "wealth-management"
  | "equity-management"
  | "treasury-management"
  | "mobile-app";

const quickLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "products", label: "Products" },
  ...(showClientsSection ? [{ id: "clients" as const, label: "Clients" }] : []),
  { id: "about", label: "About us" },
];

const productLinks: Array<{ slug: ProductSlug; label: string }> = [
  { slug: "treasury-management", label: "Treasury Management" },
  { slug: "equity-management", label: "Equity Management" },
  { slug: "wealth-management", label: "Wealth Management" },
  { slug: "mobile-app", label: "Financial Reporting" },
];

export const Footer: React.FC<{
  onNavigateSection: (id: string) => void;
  onNavigateContact: () => void;
  onNavigatePrimary: () => void;
  onNavigatePrivacy: () => void;
  onSelectProduct: (slug: ProductSlug) => void;
}> = ({
  onNavigateSection,
  onNavigateContact,
  onNavigatePrimary,
  onNavigatePrivacy,
  onSelectProduct,
}) => {
  const linkClass =
    "text-sm text-slate-600 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md";

  const linkButtonClass =
    "text-left inline-flex w-fit items-center gap-2 " + linkClass;

  const primaryCtaClassName =
    "border-0 bg-gradient-to-r from-[#79C72C] to-[#4c9141] text-white shadow-[0_3px_14px_rgba(121,199,44,0.35)] transition-[filter,transform,box-shadow] hover:brightness-105 hover:bg-gradient-to-r hover:from-[#79C72C] hover:to-[#4c9141] hover:shadow-[0_6px_20px_rgba(121,199,44,0.4)] focus-visible:ring-primary/50 active:scale-[0.98]";

  return (
    <footer className="border-t border-border/60 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-4">
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              onClick={() => onNavigateSection("home")}
              aria-label="Go to home"
            >
              <img
                src={logoImg}
                alt="Sherwood Technologies"
                className="h-8 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </button>

            <p className="max-w-sm text-base leading-relaxed text-slate-600">
              We build secure, scalable fintech software—treasury platforms,
              investment tools, and modern digital experiences for financial
              institutions.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                size="sm"
                className={primaryCtaClassName}
                onClick={onNavigatePrimary}
              >
                Book a demo
              </Button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Head office
              </p>
              <p className="mt-2 text-sm text-slate-700">
                No 100/1, Elvitigala Mawatha, Colombo 08.
              </p>
              <div className="mt-3 flex flex-col gap-1 text-sm">
                <a
                  className={linkClass}
                  href="mailto:info@sherwoodtechnologies.lk"
                >
                  info@sherwoodtechnologies.lk
                </a>
                <a className={linkClass} href="tel:+94777393437">
                  +94 77 739 3437
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:col-span-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.35fr)]">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-slate-900">Quick links</p>
              <ul className="space-y-2">
                {quickLinks.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={linkButtonClass}
                      onClick={() => onNavigateSection(item.id)}
                    >
                      <span aria-hidden="true" className="text-slate-400">
                        →
                      </span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className={linkButtonClass}
                    onClick={onNavigateContact}
                  >
                    <span aria-hidden="true" className="text-slate-400">
                      →
                    </span>
                    <span>Contact</span>
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-slate-900">Products</p>
              <ul className="space-y-2">
                {productLinks.map((item) => (
                  <li key={item.slug}>
                    <button
                      type="button"
                      className={linkButtonClass}
                      onClick={() => onSelectProduct(item.slug)}
                    >
                      <span aria-hidden="true" className="text-slate-400">
                        →
                      </span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className={linkButtonClass}
                    onClick={() => onNavigateSection("products")}
                  >
                    <span aria-hidden="true" className="text-slate-400">
                      →
                    </span>
                    <span>View all products</span>
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-slate-900">Resources</p>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    className={linkButtonClass}
                    onClick={() => onNavigateSection("services")}
                  >
                    <span aria-hidden="true" className="text-slate-400">
                      →
                    </span>
                    <span>What we offer</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={linkButtonClass}
                    onClick={() => onNavigateSection("about")}
                  >
                    <span aria-hidden="true" className="text-slate-400">
                      →
                    </span>
                    <span>Company</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={linkButtonClass}
                    onClick={onNavigateContact}
                  >
                    <span aria-hidden="true" className="text-slate-400">
                      →
                    </span>
                    <span>Support / inquiries</span>
                  </button>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Ready to talk
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Book a consultation or send an inquiry—our team will follow up
                  quickly.
                </p>
                <div className="mt-3">
                  <Button
                    size="sm"
                    className={primaryCtaClassName + " w-full"}
                    onClick={onNavigateContact}
                  >
                    Book consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Sherwood Technologies</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <button type="button" className={linkClass} onClick={onNavigatePrivacy}>
              Privacy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

