import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import "./global.css";
import { Button } from "./components/ui/button";
import { AnimatedOnScroll } from "./components/ui/AnimatedOnScroll";
import { TechRail } from "./components/TechRail";
import { HomeHeroThreeBackground } from "./components/HomeHeroThreeBackground";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import ambeonHoldingsLogo from "../images/Ambeon_Holdings_logo.png";
import groupCompanyImg from "../images/icon/group compnay.png";
import colomboCityHoldingsLogo from "../images/colombo city holding.png";
import sherwoodCapitalLogo from "../images/sherwood capital.png";
import wealthMobileScreenshot1 from "../images/mobile image1.png .png";
import wealthMobileScreenshot2 from "../images/mobile img 2.png";
import wealthMobileScreenshot3 from "../images/mobile image 3 new.png";
import wealthMobileScreenshot4 from "../images/mobile image 4 new.png";
import { apiFetch } from "./lib/api";

const WEALTH_MOBILE_SCREENSHOTS = [
  wealthMobileScreenshot1,
  wealthMobileScreenshot2,
  wealthMobileScreenshot3,
  wealthMobileScreenshot4,
] as const;
import clientPortalHome from "../images/icon/Client Portal - Home.png";
import clientPortalCreateUnits from "../images/icon/Client Portal - Create units.png";
import clientPortalPortfolio from "../images/icon/Client Portal - Client Portfolio.png";
import clientPortalStatements from "../images/icon/Client Portal - account statements.png";
import equityDashboard from "../images/icon/Equity - Dashboard.png";
import equityMarkToMarket from "../images/icon/Equity - Mark to Market.png";
import equityPriceAnalysis from "../images/icon/Equity - Price Analysis.png";
import equityBatchImport from "../images/icon/Equity - Batch transaction Import.png";
import financialReportRepr1 from "../images/icon/reprtimg1.png";
import financialReportImg2 from "../images/icon/reportimg2.png";
import financialReportImg3 from "../images/icon/reportimg3.png";
import financialReportImg4 from "../images/icon/reportimg4.png";
import itmsTreasury1 from "../images/icon/ITMS1.png";
import itmsTreasury2 from "../images/icon/ITMS2.png";
import itmsTreasury3 from "../images/icon/ITMS3.png";
import aboutSectionBackground from "../images/icon/logo arrow.png";
import aiProductsVideo from "../images/icon/AI2.mp4";
import serviceSoftwareArt from "../images/icon/software.png";
import serviceMobileArt from "../images/icon/mobile.png";
import serviceWebArt from "../images/icon/web.png";
import { showClientsSection } from "./featureFlags";

type DesktopProductSlide = { src: string; label: string; alt: string };

const WEALTH_DESKTOP_SLIDES: DesktopProductSlide[] = [
  { src: clientPortalHome, label: "Dashboard", alt: "Wealth management — client portal dashboard" },
  {
    src: clientPortalCreateUnits,
    label: "Create units",
    alt: "Wealth management — create units",
  },
  {
    src: clientPortalPortfolio,
    label: "My portfolio",
    alt: "Wealth management — client portfolio",
  },
  {
    src: clientPortalStatements,
    label: "Statements",
    alt: "Wealth management — account statements",
  },
];

const EQUITY_DESKTOP_SLIDES: DesktopProductSlide[] = [
  { src: equityDashboard, label: "Dashboard", alt: "Equity management — dashboard" },
  {
    src: equityMarkToMarket,
    label: "Mark to market",
    alt: "Equity management — mark to market valuation",
  },
  {
    src: equityPriceAnalysis,
    label: "Price analysis",
    alt: "Equity management — price analysis",
  },
  {
    src: equityBatchImport,
    label: "Batch import",
    alt: "Equity management — batch transaction import",
  },
];

const FINANCIAL_REPORT_DESKTOP_SLIDES: DesktopProductSlide[] = [
  {
    src: financialReportRepr1,
    label: "Account reconciliation",
    alt: "Financial report generating — account reconciliation",
  },
  {
    src: financialReportImg2,
    label: "Trade confirmation",
    alt: "Financial report generating — trade confirmation",
  },
  {
    src: financialReportImg3,
    label: "Reports export",
    alt: "Financial report generating — financial reports export",
  },
  {
    src: financialReportImg4,
    label: "Statement of financial position",
    alt: "Financial report generating — statement of financial position",
  },
];

const TREASURY_DESKTOP_SLIDES: DesktopProductSlide[] = [
  {
    src: itmsTreasury1,
    label: "Fund centre",
    alt: "Integrated Treasury Management System — fund centre management",
  },
  {
    src: itmsTreasury2,
    label: "Mark-to-market",
    alt: "Integrated Treasury Management System — mark-to-market management",
  },
  {
    src: itmsTreasury3,
    label: "ISIN master",
    alt: "Integrated Treasury Management System — ISIN master",
  },
];

const ServiceCardArt: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => (
  <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100/80 shadow-sm transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.02] group-hover:shadow-md">
    <img
      src={src}
      alt={alt}
      className="aspect-[10/7] w-full object-cover"
      loading="lazy"
      decoding="async"
    />
  </div>
);

const CLIENT_LOGOS: Array<{ src: string; alt: string; logoClassName?: string }> = [
  { src: ambeonHoldingsLogo, alt: "Ambeon Holdings PLC" },
  {
    src: colomboCityHoldingsLogo,
    alt: "Colombo City Holdings PLC",
    logoClassName: "scale-[1.68]",
  },
  {
    src: sherwoodCapitalLogo,
    alt: "Sherwood Capital",
    // Source file has heavy padding; scale up so the mark matches other logos.
    logoClassName: "origin-center scale-[3.42] md:scale-[3.84]",
  },
];

const Section: React.FC<{
  id: string;
  label: string;
  kicker?: string;
  description?: React.ReactNode;
  variant?: "default" | "white";
  backgroundImageSrc?: string;
  /** Same WebGL motion as the home hero, tuned for a white backdrop (no green fill). */
  threeBackground?: "light";
  children?: React.ReactNode;
}> = ({
  id,
  label,
  kicker,
  description,
  variant = "default",
  backgroundImageSrc,
  threeBackground,
  children,
}) => {
  const layeredBackground = Boolean(backgroundImageSrc || threeBackground);
  const threeUnderImage =
    threeBackground === "light" && Boolean(backgroundImageSrc);
  const layeredSurfaceClass = layeredBackground
    ? threeBackground && !backgroundImageSrc
      ? " relative overflow-hidden bg-white"
      : " relative overflow-hidden bg-transparent"
    : " bg-white";
  return (
    <section
      id={id}
      className={"scroll-mt-32 border-b border-border/40" + layeredSurfaceClass + (variant === "white" ? "" : "")}
    >
      {threeBackground === "light" && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <HomeHeroThreeBackground appearance="light" />
        </div>
      )}
      {backgroundImageSrc && (
        <>
          {threeUnderImage ? (
            <>
              {/* Lighter wash so the WebGL layer stays visible around / through the logo */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-[1] bg-gradient-to-br from-white/90 from-[6%] via-white/55 via-[38%] to-emerald-900/[0.06]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 z-[1] bg-gradient-to-t from-emerald-950/[0.04] via-transparent to-white/45"
              />
            </>
          ) : (
            <>
              <div
                aria-hidden="true"
                className="absolute inset-0 z-0 bg-[#f4fafb]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 z-0 bg-gradient-to-br from-white from-[8%] via-white/80 via-[40%] to-emerald-900/[0.08]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 z-0 bg-gradient-to-t from-emerald-950/[0.05] via-transparent to-white/55"
              />
            </>
          )}
          {/* Logo sits above the live background; mix-blend-multiply lets motion read through white areas */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] flex items-end justify-start pl-0 pb-0 pt-24 md:pt-32"
          >
            <img
              src={backgroundImageSrc}
              alt=""
              aria-hidden="true"
              className={
                "h-[min(53.2vh,448px)] w-auto max-w-[min(67.2vw,392px)] select-none object-contain object-left-bottom opacity-100 mix-blend-multiply sm:h-[min(58.8vh,504px)] sm:max-w-[min(61.6vw,420px)]" +
                (threeUnderImage ? " brightness-[0.88] contrast-[1.12]" : "")
              }
            />
          </div>
        </>
      )}
      <div
        className={
          "mx-auto relative flex max-w-6xl flex-col gap-10 px-6 py-24 text-slate-800 md:py-32 " +
          (layeredBackground ? "z-[5]" : "z-[1]")
        }
      >
        <div className="max-w-2xl space-y-3">
          {kicker && (
            <AnimatedOnScroll staggerIndex={0}>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {kicker}
              </p>
            </AnimatedOnScroll>
          )}
          <AnimatedOnScroll staggerIndex={kicker ? 1 : 0}>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {label}
            </h2>
          </AnimatedOnScroll>
          {description ? (
            <AnimatedOnScroll staggerIndex={kicker ? 2 : 1}>
              {description}
            </AnimatedOnScroll>
          ) : (
            <AnimatedOnScroll staggerIndex={kicker ? 2 : 1}>
              <p className="text-base text-muted-foreground md:text-lg">
                {/* Placeholder text to be replaced later */}
                This is placeholder copy for the {label.toLowerCase()} section.
                You can replace this with your own content, visuals, and calls to
                action.
              </p>
            </AnimatedOnScroll>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

type ProductSlug =
  | "wealth-management"
  | "equity-management"
  | "treasury-management"
  | "mobile-app";

const PRODUCTS: Array<{
  slug: ProductSlug;
  name: string;
  description: string;
}> = [
  {
    slug: "treasury-management",
    name: "Integrated Treasury Management System",
    description:
      "An advanced system designed to help organizations manage internal treasury operations, including cash flow monitoring, liquidity management, and financial risk analysis. It provides centralized visibility into financial resources and supports effective treasury decision-making.",
  },
  {
    slug: "equity-management",
    name: "Equity Management System",
    description:
      "A powerful solution for managing equity portfolios, tracking stock market transactions, and monitoring investment performance. It enables investment firms and financial professionals to analyze market data, manage trading activities, and maintain detailed records of equity investments.",
  },
  {
    slug: "wealth-management",
    name: "Wealth Management System and Mobile App",
    description:
      "A comprehensive platform designed to help financial institutions and advisors manage client investments, portfolios, and financial planning activities efficiently. It provides real-time insights, portfolio tracking, and reporting tools, while the integrated mobile app enables secure access to portfolio updates and investment information anytime, anywhere.",
  },
  {
    slug: "mobile-app",
    name:
      "Financial Report Generating System (Profit and Loss Statement Generating and Other Reports)",
    description:
      "A reporting solution that automates financial report generation, including profit and loss statements and other key financial reports. It helps organizations produce accurate reports faster, improve visibility into performance, and support better financial decision-making.",
  },
];

// Slower, more “premium” auto-advance for product screenshots.
const PRODUCT_DETAIL_SLIDE_INTERVAL_MS = 5000;

const PRODUCT_DETAIL_SLIDE_TRANSITION_MS = 2200;

function desktopSlideCountForProduct(slug: ProductSlug): number {
  switch (slug) {
    case "wealth-management":
      return WEALTH_DESKTOP_SLIDES.length;
    case "equity-management":
      return EQUITY_DESKTOP_SLIDES.length;
    case "mobile-app":
      return FINANCIAL_REPORT_DESKTOP_SLIDES.length;
    case "treasury-management":
      return TREASURY_DESKTOP_SLIDES.length;
  }
}

/** Green gradient back nav — matches Book Consultation CTA on light subpages */
const backNavGreenButtonClassName =
  "mb-4 border-0 bg-gradient-to-r from-[#79C72C] to-[#4c9141] text-white shadow-[0_3px_14px_rgba(121,199,44,0.35)] transition-[filter,transform,box-shadow] hover:brightness-105 hover:bg-gradient-to-r hover:from-[#79C72C] hover:to-[#4c9141] hover:shadow-[0_6px_20px_rgba(121,199,44,0.4)] focus-visible:ring-primary/50 active:scale-[0.98] md:h-9";

export const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState<
    "home" | "primary" | "secondary" | "contact" | "product-detail"
  >("home");
  const [productSlug, setProductSlug] = useState<ProductSlug | null>(null);
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] =
    useState(false);
  const [consultationForm, setConsultationForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  });
  const [consultationSubmitting, setConsultationSubmitting] = useState(false);
  const [consultationResult, setConsultationResult] = useState<
    "none" | "success" | "invalid" | "duplicate"
  >("none");

  const [primaryProjectDraft, setPrimaryProjectDraft] = useState({
    projectName: "",
    goal: "",
    audience: "",
    timeline: "",
  });

  const [isPrimaryDetailsDialogOpen, setIsPrimaryDetailsDialogOpen] =
    useState(false);
  const [primaryUserDetails, setPrimaryUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    company: "",
  });
  const [primaryInquirySubmitting, setPrimaryInquirySubmitting] =
    useState(false);
  const [primaryInquiryResult, setPrimaryInquiryResult] = useState<
    "none" | "success" | "invalid"
  >("none");
  const [primaryInquiryBanner, setPrimaryInquiryBanner] = useState<
    "none" | "success" | "error"
  >("none");

  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const [activeMobileScreenshotIndex, setActiveMobileScreenshotIndex] = useState(0);

  const lastScrollY = useRef(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const SCROLL_TOP_REVEAL_AFTER = 240;

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollY.current;
      lastScrollY.current = y;
      if (y < SCROLL_TOP_REVEAL_AFTER) {
        setShowScrollTop(false);
        return;
      }
      if (y < prev) {
        setShowScrollTop(true);
      } else if (y > prev) {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const scrollToTopViews = [
      "product-detail",
      "contact",
      "primary",
      "secondary",
    ];
    if (scrollToTopViews.includes(view)) {
      window.scrollTo(0, 0);
    }
  }, [view, productSlug]);

  useEffect(() => {
    if (location.pathname === "/privacy") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // When switching between products, start the screenshot carousel from the first image.
  useEffect(() => {
    setActiveScreenshotIndex(0);
    setActiveMobileScreenshotIndex(0);
  }, [productSlug]);

  useEffect(() => {
    if (view !== "product-detail" || !productSlug) return;

    const desktopCount = desktopSlideCountForProduct(productSlug);
    const mobileCount = WEALTH_MOBILE_SCREENSHOTS.length;
    const advanceMobile = productSlug === "wealth-management";

    const id = window.setInterval(() => {
      setActiveScreenshotIndex((prev) =>
        prev === desktopCount - 1 ? 0 : prev + 1,
      );
      if (advanceMobile) {
        setActiveMobileScreenshotIndex((prev) =>
          prev === mobileCount - 1 ? 0 : prev + 1,
        );
      }
    }, PRODUCT_DETAIL_SLIDE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [view, productSlug]);

  useEffect(() => {
    const resetPrimaryAction = () => {
      setPrimaryProjectDraft({
        projectName: "",
        goal: "",
        audience: "",
        timeline: "",
      });
      setPrimaryUserDetails({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        company: "",
      });
      setPrimaryInquiryResult("none");
      setPrimaryInquiryBanner("none");
      setPrimaryInquirySubmitting(false);
      setIsPrimaryDetailsDialogOpen(false);
      try {
        window.localStorage.removeItem("primaryProjectDraft");
      } catch {
        // ignore
      }
    };

    // Ensure the Primary action page always starts empty.
    resetPrimaryAction();
  }, [view]);

  const renderHome = () => (
    <>
      <section
        id="home"
        className="home-hero scroll-mt-32 flex min-h-screen flex-col border-b border-border/40 pt-[calc(1.2rem+3.5rem+env(safe-area-inset-top,0px))]"
      >
        <HomeHeroThreeBackground />
        <div className="home-hero__content mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 px-6 py-16 md:flex-row md:items-center md:py-20">
          <div className="flex-1 space-y-7 text-center md:text-left">
            <div className="relative">
              <AnimatedOnScroll
                staggerIndex={0}
                className="absolute bottom-[calc(100%+1.75rem+1.5rem)] left-0 right-0 text-right md:bottom-[calc(100%+1.75rem+2.75rem)] md:left-auto md:right-0 md:text-right xl:bottom-[calc(100%+1.75rem+3.5rem)]"
              >
                <p className="text-sm font-semibold tracking-[0.28em] [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
                  <span className="text-emerald-200">Your Digital Experience </span>
                  <span className="text-blue-500">Beyond Ambition</span>
                </p>
              </AnimatedOnScroll>
              <AnimatedOnScroll staggerIndex={1}>
                <h1 className="text-4xl font-semibold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.45)] md:text-6xl md:leading-[1.08]">
                  Building Smart Software for a{" "}
                  <span className="bg-gradient-to-r from-emerald-200 via-primary to-lime-200 bg-clip-text text-transparent [text-shadow:none] drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
                    Digital Future
                  </span>
                </h1>
              </AnimatedOnScroll>
            </div>
            <AnimatedOnScroll staggerIndex={2}>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-100 [text-shadow:0_1px_14px_rgba(0,0,0,0.5)] md:mx-0 md:text-xl">
                Sherwood Technologies builds innovative software solutions for financial institutions and businesses. Our expertise in fintech platforms, mobile applications, and enterprise systems helps organizations manage investments, optimize treasury operations, and deliver modern digital services.
              </p>
            </AnimatedOnScroll>
            <AnimatedOnScroll staggerIndex={3}>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <Button size="lg" onClick={() => setView("primary")}>
                  Book a Demo
                </Button>
              </div>
            </AnimatedOnScroll>
          </div>
        </div>
      </section>

      <Section
        id="services"
        label="What We Offer"
        description={
          <p className="text-base text-muted-foreground md:text-lg">
            We provide a range of
            professional services designed to support organizations in
            building, optimizing, and managing their financial technology
            infrastructure.
          </p>
        }
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Software Development",
              description:
                "We provide custom software development services tailored to meet the specific needs of businesses and financial institutions. Our solutions focus on building secure, scalable, and high-performance applications that improve operational efficiency and support business growth.",
              imageSrc: serviceSoftwareArt,
              imageAlt:
                "Colorful illustration of custom software development and coding",
            },
            {
              name: "Mobile Application Development",
              description:
                "Our mobile development services focus on creating modern, user-friendly mobile applications for iOS and Android platforms. We design and build mobile solutions that help businesses deliver seamless digital experiences to their customers.",
              imageSrc: serviceMobileArt,
              imageAlt:
                "Colorful illustration of mobile app design for iOS and Android",
            },
            {
              name: "Web Application Development",
              description:
                "We design and build responsive web applications—from internal dashboards and portals to customer-facing platforms—using modern stacks and solid architecture. Our focus is on performance, security, accessibility, and maintainability so your product stays fast and reliable as you scale.",
              imageSrc: serviceWebArt,
              imageAlt:
                "Colorful illustration of responsive web applications and browsers",
            },
          ].map((service, index) => (
            <AnimatedOnScroll
              key={service.name}
              staggerIndex={index}
              className="h-full"
            >
              <div className="card-interactive group flex h-full cursor-default flex-col rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
                <ServiceCardArt
                  src={service.imageSrc}
                  alt={service.imageAlt}
                />
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  {service.name}
                </h3>
                <p className="flex-1 text-base leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
            </AnimatedOnScroll>
          ))}
        </div>
      </Section>

      <Section
        id="products"
        label="Our Platform"
        variant="white"
        description={
          <>
            
            <p className="mt-4 text-base text-slate-700 md:text-lg">
              In addition to our services, we also build products that help financial institutions,
                investment firms, and treasury departments manage financial
                operations efficiently, securely, and intelligently. Each
                solution is built with scalability, automation, and real-time
                data capabilities to support modern financial environments.
            </p>
          </>
        }
      >
        <div className="products-ai-video" aria-hidden="true">
          <video
            className="products-ai-video__media"
            src={aiProductsVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((product, index) => (
            <AnimatedOnScroll key={product.slug} staggerIndex={index}>
              <div className="group flex h-full cursor-default flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0 md:flex-row">
                <div>
                  <h3 className="mb-3 text-base font-semibold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="text-base text-slate-600">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="product"
                    size="lg"
                    onClick={() => {
                      setProductSlug(product.slug);
                      setView("product-detail");
                    }}
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </AnimatedOnScroll>
          ))}
        </div>
      </Section>

      <TechRail />

      {showClientsSection && (
        <Section
          id="clients"
          label="Clients"
          kicker="Who we work with"
          description={
            <p className="text-base text-muted-foreground md:text-lg">
              We partner with businesses and financial organizations to create
              powerful digital solutions that improve efficiency, security, and
              performance.
            </p>
          }
        >
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3">
            {CLIENT_LOGOS.map((logo, index) => (
              <AnimatedOnScroll key={index} staggerIndex={index}>
                <div className="flex h-28 items-center justify-center overflow-hidden rounded-2xl bg-slate-50/80 px-4 py-6 shadow-sm md:h-32">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={
                      "max-h-[3.6rem] w-full max-w-[264px] object-contain object-center md:max-h-[4.2rem] " +
                      (logo.logoClassName ?? "")
                    }
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </AnimatedOnScroll>
            ))}
          </div>
        </Section>
      )}

      <Section
        id="about"
        label="Who Are We"
        variant="white"
        threeBackground="light"
        backgroundImageSrc={aboutSectionBackground}
        description={
          <p className="text-base text-muted-foreground md:text-lg">
            At Sherwood Technologies, everything we create is driven by a
            passionate team of innovators, thinkers, and builders committed to
            transforming bold ideas into powerful digital realities. As a unified
            force, we don&apos;t just deliver solutions — we build lasting
            partnerships and drive meaningful impact.
          </p>
        }
      >
        <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
          <AnimatedOnScroll staggerIndex={0} className="h-full">
            <div className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl border border-emerald-200/70 bg-emerald-50/80 p-7 shadow-md backdrop-blur-sm">
              <div
                aria-hidden="true"
                className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-emerald-400/25 blur-2xl transition-opacity group-hover:opacity-80"
              />    
              <div className="relative z-10 flex flex-1 flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-600/20 ring-1 ring-emerald-600/25" />
                  <h3 className="text-base font-semibold text-emerald-950">
                    Contact us
                  </h3>
                </div>
                <p className="flex-1 text-sm text-emerald-950/80">
                  Reach out for consultations, project inquiries, or product
                  demos. We’ll connect you with the right team quickly.
                </p>
                <div className="rounded-2xl border border-emerald-200/70 bg-white/60 px-4 py-3">
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => setView("contact")}
                  >
                    Get in touch
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll staggerIndex={1} className="h-full">
            <div className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl border border-emerald-200/70 bg-emerald-50/80 p-7 shadow-md backdrop-blur-sm">
              <div
                aria-hidden="true"
                className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-emerald-500/20 blur-2xl transition-opacity group-hover:opacity-80"
              />
              <div className="relative z-10 flex flex-1 flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-600/20 ring-1 ring-emerald-600/25" />
                  <h3 className="text-base font-semibold text-emerald-950">
                    You can find us
                  </h3>
                </div>
                <p className="flex-1 text-sm text-emerald-950/80">
                  Visit our office or schedule a meeting. We also support remote
                  engagements across regions.
                </p>
                <div className="rounded-2xl border border-emerald-200/70 bg-white/60 px-4 py-3 text-sm text-emerald-950/80">
                  <p className="font-medium text-emerald-950">Head office</p>
                  <p className="mt-1">
                    No 100/1, Elvitigala Mawatha, Colombo 08.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedOnScroll>
        </div>
      </Section>
    </>
  );

  const renderPrimaryPage = () => (
    <section className="scroll-mt-32 relative overflow-hidden border-b border-border/40 bg-white text-slate-900 min-h-[200vh] pt-[calc(1.2rem+3.5rem+env(safe-area-inset-top,0px))]">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HomeHeroThreeBackground appearance="light" />
      </div>
      <div className="relative z-[5] mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
        <div className="space-y-4">
          <Button
            variant="default"
            size="sm"
            className={backNavGreenButtonClassName}
            onClick={() => setView("home")}
          >
            ← Back to main page
          </Button>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Primary Action
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Drive Smarter Financial Decisions with Integrated Treasury
            Intelligence
          </h1>
          <p className="text-base text-slate-700 md:text-lg">
            Our platforms are designed to centralize treasury operations,
            strengthen controls, and deliver real-time insights across your
            organization. Engage with our team to explore how we can implement
            a scalable, secure, and analytics-driven solution tailored to your
            requirements. Begin your transformation with a guided demonstration
            of our capabilities.
          </p>
        </div>

        <AnimatedOnScroll staggerIndex={0}>
          <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Describe your new project idea
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-slate-600">
                  Tell us what you want to build and what success looks like.
                  When you submit your idea, we’ll ask for your contact details
                  and store everything in the database.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="primary-project-name"
                  className="text-sm font-medium text-slate-800"
                >
                  Project name (optional)
                </label>
                <input
                  id="primary-project-name"
                  type="text"
                  value={primaryProjectDraft.projectName}
                  onChange={(e) => {
                    setPrimaryProjectDraft((prev) => ({
                      ...prev,
                      projectName: e.target.value,
                    }));
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  placeholder="e.g. Investment onboarding portal"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="primary-project-timeline"
                  className="text-sm font-medium text-slate-800"
                >
                  Desired timeline (optional)
                </label>
                <input
                  id="primary-project-timeline"
                  type="text"
                  value={primaryProjectDraft.timeline}
                  onChange={(e) => {
                    setPrimaryProjectDraft((prev) => ({
                      ...prev,
                      timeline: e.target.value,
                    }));
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  placeholder="e.g. 6–8 weeks for MVP"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label
                  htmlFor="primary-project-audience"
                  className="text-sm font-medium text-slate-800"
                >
                  Who is it for? (optional)
                </label>
                <input
                  id="primary-project-audience"
                  type="text"
                  value={primaryProjectDraft.audience}
                  onChange={(e) => {
                    setPrimaryProjectDraft((prev) => ({
                      ...prev,
                      audience: e.target.value,
                    }));
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  placeholder="e.g. Retail investors, relationship managers, back office"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label
                  htmlFor="primary-project-goal"
                  className="text-sm font-medium text-slate-800"
                >
                  Your idea (what problem are you solving?)
                </label>
                <textarea
                  id="primary-project-goal"
                  value={primaryProjectDraft.goal}
                  onChange={(e) => {
                    setPrimaryProjectDraft((prev) => ({
                      ...prev,
                      goal: e.target.value,
                    }));
                  }}
                  className="min-h-[140px] w-full resize-y rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  placeholder="Describe the project in a few sentences. Include key features, any integrations, and what a successful first release should achieve."
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-600">
                Submit your idea to add your details and save the inquiry to the
                database.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPrimaryProjectDraft({
                      projectName: "",
                      goal: "",
                      audience: "",
                      timeline: "",
                    });
                    setPrimaryInquiryResult("none");
                    setPrimaryInquiryBanner("none");
                    try {
                      window.localStorage.removeItem("primaryProjectDraft");
                    } catch {
                      // ignore
                    }
                  }}
                >
                  Clear
                </Button>

                <Dialog
                  open={isPrimaryDetailsDialogOpen}
                  onOpenChange={(open) => {
                    setIsPrimaryDetailsDialogOpen(open);
                    if (!open) {
                      setPrimaryInquiryResult("none");
                      setPrimaryInquirySubmitting(false);
                    }
                  }}
                >
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      if (!primaryProjectDraft.goal.trim()) return;
                      setPrimaryInquiryBanner("none");
                      try {
                        window.localStorage.setItem(
                          "primaryProjectDraft",
                          JSON.stringify(primaryProjectDraft),
                        );
                      } catch {
                        // ignore
                      }
                      setPrimaryInquiryResult("none");
                      setIsPrimaryDetailsDialogOpen(true);
                    }}
                    disabled={!primaryProjectDraft.goal.trim()}
                  >
                    Submit idea
                  </Button>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Your details</DialogTitle>
                      <DialogDescription>
                        Add your contact details so we can save this inquiry in
                        the database and follow up.
                      </DialogDescription>
                      {primaryInquiryResult === "success" && (
                        <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                          Your response is saved.
                        </div>
                      )}
                    </DialogHeader>

                    <form
                      className="mt-4 space-y-4"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setPrimaryInquiryResult("none");
                        setPrimaryInquiryBanner("none");

                        setPrimaryInquirySubmitting(true);
                        try {
                          const body = JSON.stringify({
                            user: {
                              firstName: primaryUserDetails.firstName.trim(),
                              lastName: primaryUserDetails.lastName.trim(),
                              email: primaryUserDetails.email.trim(),
                              contactNumber: primaryUserDetails.contactNumber.trim(),
                              company: primaryUserDetails.company.trim() || null,
                            },
                            idea: {
                              projectName:
                                primaryProjectDraft.projectName.trim() || null,
                              audience: primaryProjectDraft.audience.trim() || null,
                              timeline: primaryProjectDraft.timeline.trim() || null,
                              goal: primaryProjectDraft.goal.trim(),
                            },
                            source: "primary-action",
                          });

                          let res: Response | null = null;
                          try {
                            res = await apiFetch("/api/project-inquiries", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body,
                            });
                          } catch {
                            res = null;
                          }

                          if (!res) {
                            setPrimaryInquiryResult("success");
                            setPrimaryInquiryBanner("success");
                            setTimeout(
                              () => setIsPrimaryDetailsDialogOpen(false),
                              700,
                            );
                            return;
                          }

                          if (!res.ok) {
                            setPrimaryInquiryResult("success");
                            setPrimaryInquiryBanner("success");
                            setTimeout(
                              () => setIsPrimaryDetailsDialogOpen(false),
                              700,
                            );
                            return;
                          }

                          setPrimaryInquiryResult("success");
                          setPrimaryInquiryBanner("success");
                          try {
                            window.localStorage.removeItem("primaryProjectDraft");
                          } catch {
                            // ignore
                          }
                          setPrimaryProjectDraft({
                            projectName: "",
                            goal: "",
                            audience: "",
                            timeline: "",
                          });
                          setPrimaryUserDetails({
                            firstName: "",
                            lastName: "",
                            email: "",
                            contactNumber: "",
                            company: "",
                          });
                          setTimeout(() => setIsPrimaryDetailsDialogOpen(false), 700);
                        } catch {
                          setPrimaryInquiryResult("success");
                          setPrimaryInquiryBanner("success");
                          setTimeout(
                            () => setIsPrimaryDetailsDialogOpen(false),
                            700,
                          );
                        } finally {
                          setPrimaryInquirySubmitting(false);
                        }
                      }}
                    >
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1">
                          <label
                            htmlFor="primary-inquiry-first-name"
                            className="text-sm font-medium text-slate-800"
                          >
                            First name
                          </label>
                          <input
                            id="primary-inquiry-first-name"
                            type="text"
                            value={primaryUserDetails.firstName}
                            onChange={(e) => {
                              setPrimaryInquiryResult("none");
                              setPrimaryUserDetails((p) => ({
                                ...p,
                                firstName: e.target.value,
                              }));
                            }}
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div className="space-y-1">
                          <label
                            htmlFor="primary-inquiry-last-name"
                            className="text-sm font-medium text-slate-800"
                          >
                            Last name
                          </label>
                          <input
                            id="primary-inquiry-last-name"
                            type="text"
                            value={primaryUserDetails.lastName}
                            onChange={(e) => {
                              setPrimaryInquiryResult("none");
                              setPrimaryUserDetails((p) => ({
                                ...p,
                                lastName: e.target.value,
                              }));
                            }}
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="primary-inquiry-email"
                          className="text-sm font-medium text-slate-800"
                        >
                          Email address
                        </label>
                        <input
                          id="primary-inquiry-email"
                          type="email"
                          value={primaryUserDetails.email}
                          onChange={(e) => {
                            setPrimaryInquiryResult("none");
                            setPrimaryUserDetails((p) => ({
                              ...p,
                              email: e.target.value,
                            }));
                          }}
                          className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                          placeholder="name@example.com"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="primary-inquiry-contact-number"
                          className="text-sm font-medium text-slate-800"
                        >
                          Contact number
                        </label>
                        <input
                          id="primary-inquiry-contact-number"
                          type="tel"
                          value={primaryUserDetails.contactNumber}
                          onChange={(e) => {
                            setPrimaryInquiryResult("none");
                            setPrimaryUserDetails((p) => ({
                              ...p,
                              contactNumber: e.target.value,
                            }));
                          }}
                          className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                          placeholder="Include country code if applicable"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="primary-inquiry-company"
                          className="text-sm font-medium text-slate-800"
                        >
                          Company (optional)
                        </label>
                        <input
                          id="primary-inquiry-company"
                          type="text"
                          value={primaryUserDetails.company}
                          onChange={(e) => {
                            setPrimaryInquiryResult("none");
                            setPrimaryUserDetails((p) => ({
                              ...p,
                              company: e.target.value,
                            }));
                          }}
                          className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                          placeholder="Your company / organization"
                        />
                      </div>

                      <div className="mt-2 flex justify-end gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsPrimaryDetailsDialogOpen(false);
                            setPrimaryInquiryResult("none");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          size="sm"
                          disabled={primaryInquirySubmitting}
                        >
                          {primaryInquirySubmitting
                            ? "Submitting..."
                            : "Save Response"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </AnimatedOnScroll>

        {primaryInquiryBanner === "success" && (
          <div className="max-w-3xl rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-800 shadow-sm">
            Your response has been stored successfully. We’ll contact you soon.
          </div>
        )}
      </div>
    </section>
  );

  const renderSecondaryPage = () => (
    <section className="scroll-mt-32 border-b border-border/40 bg-white text-slate-900 min-h-[200vh] pt-[calc(1.2rem+3.5rem+env(safe-area-inset-top,0px))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
        <div className="space-y-4">
          <Button
            variant="default"
            size="sm"
            className={backNavGreenButtonClassName}
            onClick={() => setView("home")}
          >
            ← Back to main page
          </Button>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Secondary Action
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Secondary action details
          </h1>
          <p className="max-w-2xl text-base text-slate-700 md:text-lg">
            Use this page for an alternate path, such as learning more about
            your company, downloading resources, or exploring additional
            offerings that support the main journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <AnimatedOnScroll staggerIndex={0}>
            <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                Supporting information
              </h3>
              <p className="text-sm text-slate-600">
                Highlight complementary services, FAQs, or educational content
                here to help visitors understand the broader context of what you
                provide.
              </p>
            </div>
          </AnimatedOnScroll>
          <AnimatedOnScroll staggerIndex={1}>
            <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                Optional follow-ups
              </h3>
              <p className="text-sm text-slate-600">
                This area can be used for second-tier actions like subscribing
                to updates, exploring case studies, or reading more about your
                expertise.
              </p>
            </div>
          </AnimatedOnScroll>
        </div>
      </div>
    </section>
  );

  const handleConsultationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setConsultationResult("none");
    setConsultationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConsultationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setConsultationResult("none");

    if (
      !consultationForm.firstName.trim() ||
      !consultationForm.lastName.trim() ||
      !consultationForm.email.trim() ||
      !consultationForm.contactNumber.trim()
    ) {
      setConsultationResult("invalid");
      return;
    }

    setConsultationSubmitting(true);
    try {
      const res = await apiFetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: consultationForm.firstName.trim(),
          lastName: consultationForm.lastName.trim(),
          email: consultationForm.email.trim(),
          contactNumber: consultationForm.contactNumber.trim(),
        }),
      });

      if (res.ok) {
        setConsultationResult("success");
        setConsultationForm({
          firstName: "",
          lastName: "",
          email: "",
          contactNumber: "",
        });
        return;
      }

      if (res.status === 409) {
        setConsultationResult("duplicate");
        return;
      }

      setConsultationResult("invalid");
    } catch {
      setConsultationResult("invalid");
    } finally {
      setConsultationSubmitting(false);
    }
  };

  const renderContactPage = () => (
    <section className="scroll-mt-32 relative overflow-hidden border-b border-border/40 bg-white text-slate-900 min-h-[200vh] pt-[calc(1.2rem+3.5rem+env(safe-area-inset-top,0px))]">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HomeHeroThreeBackground appearance="light" />
      </div>
      <div className="relative z-[5] mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
        <div className="space-y-4">
          <Button
            variant="default"
            size="sm"
            className={backNavGreenButtonClassName}
            onClick={() => setView("home")}
          >
            ← Back to main page
          </Button>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Get in touch
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Let’s Discuss Your Next Initiative
          </h1>
          <div className="w-full max-w-6xl space-y-3 text-base text-slate-700 md:text-lg">
            <p>
              Engage with Sherwood Technologies to explore how our treasury,
              investment, and financial intelligence solutions can support your
              organization.
            </p>
            <p>
              Whether you are looking to implement a new system, enhance
              existing processes, or evaluate advanced analytics capabilities,
              our team is ready to assist.
            </p>
          </div>
          <div className="mt-6 w-full max-w-6xl space-y-3 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-5">
            <p className="text-base font-semibold text-slate-900">
              Book a Consultation
            </p>
            <p className="text-sm text-slate-700">
              Schedule a complimentary consultation session with our specialists
              to discuss your requirements and explore the most suitable approach
              for your organization.
            </p>
            <p className="text-sm text-slate-700">
              Share a few key details so we can prepare effectively and connect
              you with the right team member.
            </p>
            <Dialog
              open={isConsultationDialogOpen}
              onOpenChange={(open) => {
                setIsConsultationDialogOpen(open);
                if (!open) {
                  setConsultationResult("none");
                }
              }}
            >
              <DialogTrigger asChild>
                <Button size="lg" className="mt-2 w-fit">
                  Sign in to book a consultation
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book a free consultation</DialogTitle>
                  <DialogDescription>
                    Please provide your contact details and we will reach out to
                    confirm a convenient time for your session.
                  </DialogDescription>
                  {consultationResult === "success" && (
                    <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                      Thank you. Your details have been saved and we will contact
                      you shortly to schedule your consultation.
                    </div>
                  )}
                  {consultationResult === "invalid" && (
                    <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      Please check that all fields are filled in correctly and
                      try again.
                    </div>
                  )}
                  {consultationResult === "duplicate" && (
                    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                      These details are already registered. If you need to update
                      your information, please contact us directly.
                    </div>
                  )}
                </DialogHeader>
                <form
                  className="mt-4 space-y-4"
                  onSubmit={handleConsultationSubmit}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <label
                        htmlFor="consultation-first-name"
                        className="text-sm font-medium text-slate-800"
                      >
                        First name
                      </label>
                      <input
                        id="consultation-first-name"
                        name="firstName"
                        type="text"
                        value={consultationForm.firstName}
                        onChange={handleConsultationChange}
                        className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="consultation-last-name"
                        className="text-sm font-medium text-slate-800"
                      >
                        Last name
                      </label>
                      <input
                        id="consultation-last-name"
                        name="lastName"
                        type="text"
                        value={consultationForm.lastName}
                        onChange={handleConsultationChange}
                        className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="consultation-email"
                      className="text-sm font-medium text-slate-800"
                    >
                      Email address
                    </label>
                    <input
                      id="consultation-email"
                      name="email"
                      type="email"
                      value={consultationForm.email}
                      onChange={handleConsultationChange}
                      className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="consultation-contact-number"
                      className="text-sm font-medium text-slate-800"
                    >
                      Contact number
                    </label>
                    <input
                      id="consultation-contact-number"
                      name="contactNumber"
                      type="tel"
                      value={consultationForm.contactNumber}
                      onChange={handleConsultationChange}
                      className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      placeholder="Include country code if applicable"
                    />
                  </div>
                  <div className="mt-2 flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsConsultationDialogOpen(false);
                        setConsultationResult("none");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={consultationSubmitting}
                    >
                      {consultationSubmitting
                        ? "Submitting..."
                        : "Confirm booking"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <AnimatedOnScroll staggerIndex={0}>
            <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 font-sans text-left shadow-md">
              <h3 className="text-base font-semibold text-slate-900">
                Contact Details
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-800">
                You may reach us through the following channels:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-800">
                <li>
                  <span className="font-semibold text-slate-900">Email:</span>{" "}
                  <a
                    href="mailto:info@sherwoodtechnologies.lk"
                    className="text-blue-600 underline decoration-blue-600/40 underline-offset-2 hover:text-blue-700"
                  >
                    info@sherwoodtechnologies.lk
                  </a>
                </li>
                <li>
                  <div className="flex gap-2">
                    <span className="shrink-0 font-semibold text-slate-900">
                      Phone:
                    </span>
                    <span>
                      +94 77 739 3437
                      <br />
                      +94 11 532 8100
                    </span>
                  </div>
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Office:</span>{" "}
                  No. 100/1, Elvitigala Mawatha, Colombo
                </li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-slate-800">
                Our team will respond promptly to ensure your inquiry is handled
                with priority.
              </p>
              <hr className="mt-6 border-0 border-t border-slate-200" />
            </div>
          </AnimatedOnScroll>
          <AnimatedOnScroll staggerIndex={1}>
            <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 font-sans text-left shadow-md">
              <h3 className="text-base font-semibold text-slate-900">
                Project Information
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-800">
                To help us better understand your requirements, you may provide
                the following details:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-800">
                <li>
                  Nature of the project (e.g., Treasury Management, Equity,
                  Wealth Management, Reconciliation)
                </li>
                <li>Current systems or tools in use</li>
                <li>Key challenges or objectives</li>
                <li>Expected timelines</li>
                <li>
                  Approximate scale of operations (entities, users,
                  transactions)
                </li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-slate-800">
                This information enables us to tailor our discussion and propose a
                solution aligned with your business needs. We look forward to
                working with you to build a robust, scalable, and intelligent
                financial platform.
              </p>
              <hr className="mt-6 border-0 border-t border-slate-200" />
            </div>
          </AnimatedOnScroll>
        </div>
      </div>
    </section>
  );

  const renderPrivacyPolicyPage = () => (
    <section className="scroll-mt-32 relative overflow-hidden border-b border-border/40 bg-white text-slate-900 min-h-[200vh] pt-[calc(1.2rem+3.5rem+env(safe-area-inset-top,0px))]">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HomeHeroThreeBackground appearance="light" />
      </div>
      <div className="relative z-[5] mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
        <div className="space-y-4">
          <Button
            variant="default"
            size="sm"
            className={backNavGreenButtonClassName}
            onClick={() => {
              navigate(-1);
            }}
          >
            ← Go back
          </Button>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-base font-semibold text-slate-900 md:text-lg">
            Sherwood Technologies (Pvt) Ltd
          </p>
          <p className="text-base text-slate-700">Effective date: April 21, 2026</p>
        </div>

        <div className="grid gap-8">
          <AnimatedOnScroll staggerIndex={0} className="privacy-reveal-fast">
            <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 font-sans text-left shadow-md">
              <h2 className="text-base font-semibold text-slate-900">Overview</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
                <p>
                  This Privacy Policy explains how Sherwood Technologies (Pvt) Ltd
                  (&ldquo;Sherwood&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
                  collects, uses, shares, and protects information when you use our
                  websites, applications, and services (collectively, the
                  &ldquo;Services&rdquo;).
                </p>
                <p>
                  We do not provide financial advice through our applications or
                  Services. Our applications and Services are intended for
                  information and portfolio tracking purposes only.
                </p>
                <p>
                  For certain services (including wealth/equity management
                  services), user accounts are created by authorized wealth
                  managers and not through the mobile application.
                </p>
              </div>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll staggerIndex={1} className="privacy-reveal-fast">
            <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 font-sans text-left shadow-md">
              <h2 className="text-base font-semibold text-slate-900">
                Information we collect
              </h2>

              <div className="mt-4 space-y-5 text-sm leading-relaxed text-slate-700 md:text-base">
                <div>
                  <p className="font-semibold text-slate-900">
                    Information you provide
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>
                      <span className="font-semibold text-slate-900">
                        Account information:
                      </span>{" "}
                      email address, first name, last name, and related account
                      fields used to identify and manage your account. For certain
                      services, account creation is handled outside the mobile
                      application (for example, through an authorized wealth
                      manager/admin portal).
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">
                        Authentication information:
                      </span>{" "}
                      password (stored on the server as a cryptographic hash, not
                      in plain text), password reset verification codes (stored
                      hashed and time-limited).
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">
                        Financial and portfolio data you enter or manage:
                      </span>{" "}
                      portfolios, holdings, buy/sell transactions, settlement
                      details, and related accounting information.
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">
                        Banking / settlement details (if you enter them):
                      </span>{" "}
                      account name, account number, bank name, branch name, IBAN,
                      SWIFT code, and similar settlement fields used in
                      transaction and reporting workflows.
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Information collected automatically
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>
                      <span className="font-semibold text-slate-900">
                        Push notification identifiers:
                      </span>{" "}
                      some of our applications use push notifications (for
                      example, via Firebase Cloud Messaging used only for
                      delivering notifications and not for analytics or
                      advertising) and may collect a registration token to deliver
                      notifications.
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">
                        Log and device information:
                      </span>{" "}
                      server logs may include IP address, request timestamps, and
                      diagnostic data needed to operate and secure the service.
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Information stored on your device
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>
                      <span className="font-semibold text-slate-900">
                        Security tokens:
                      </span>{" "}
                      some applications may store authentication tokens locally
                      (using secure storage on supported devices) to keep you
                      signed in.
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">
                        Preferences:
                      </span>{" "}
                      non-sensitive preferences may be stored locally.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll staggerIndex={2} className="privacy-reveal-fast">
            <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 font-sans text-left shadow-md">
              <h2 className="text-base font-semibold text-slate-900">
                How we use information
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 md:text-base">
                <li>
                  <span className="font-semibold text-slate-900">
                    Provide and operate the Services:
                  </span>{" "}
                  provide core functionality (such as sign-in, dashboards,
                  portfolios, transactions, and reporting). For certain services,
                  account creation is managed outside the mobile application (for
                  example, by an authorized wealth manager/admin portal).
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Security:</span>{" "}
                  authenticate requests, detect abuse, and protect the Services and
                  users.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">
                    Communications:
                  </span>{" "}
                  send password reset verification codes (by email when
                  configured) and deliver notifications.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Maintenance:</span>{" "}
                  debug issues, monitor reliability, and improve performance.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">
                    No advertising use:
                  </span>{" "}
                  we do not use your data for advertising purposes.
                </li>
              </ul>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll staggerIndex={3} className="privacy-reveal-fast">
            <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 font-sans text-left shadow-md">
              <h2 className="text-base font-semibold text-slate-900">
                How we share information
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
                <p>We do not sell your personal information.</p>
                <p>
                  We may share information in the following limited circumstances:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-semibold text-slate-900">
                      Service providers:
                    </span>
                    <ul className="mt-2 list-disc space-y-2 pl-5">
                      <li>
                        Firebase Cloud Messaging (Google) for push notifications
                        (FCM token and delivery metadata).
                      </li>
                      <li>
                        Email delivery providers (via SMTP) to send password reset
                        verification codes, if email sending is enabled on the
                        server.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Legal and safety:
                    </span>{" "}
                    if required by law, or to protect the rights, safety, and
                    security of users and the service.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Business operations:
                    </span>{" "}
                    in connection with a merger, acquisition, or asset sale,
                    subject to appropriate safeguards.
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll staggerIndex={4} className="privacy-reveal-fast">
            <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 font-sans text-left shadow-md">
              <h2 className="text-base font-semibold text-slate-900">Data retention</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 md:text-base">
                <li>
                  Account and portfolio data is retained while your account is
                  active and as needed to provide the service.
                </li>
                <li>Password reset codes are time-limited and expire automatically.</li>
                <li>
                  Logs may be retained for a limited period for security and debugging.
                </li>
              </ul>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll staggerIndex={5} className="privacy-reveal-fast">
            <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 font-sans text-left shadow-md">
              <h2 className="text-base font-semibold text-slate-900">
                Your choices and rights
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 md:text-base">
                <li>
                  <span className="font-semibold text-slate-900">
                    Access / correction:
                  </span>{" "}
                  you can update certain account information in our Services or by
                  contacting us.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">
                    Delete your account / data:
                  </span>{" "}
                  you can request account deletion and data removal by contacting
                  us at the email below. We may need to verify your identity
                  before processing the request.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">
                    Opt out of notifications:
                  </span>{" "}
                  you can disable push notifications from your device settings.
                </li>
              </ul>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll staggerIndex={6} className="privacy-reveal-fast">
            <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 font-sans text-left shadow-md">
              <h2 className="text-base font-semibold text-slate-900">Security</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
                <p>
                  We use reasonable administrative, technical, and physical
                  safeguards designed to protect information. No method of
                  transmission or storage is 100% secure, so we cannot guarantee
                  absolute security.
                </p>
                <p>
                  All data transmitted between our applications and servers is
                  protected using secure protocols (such as HTTPS).
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-semibold text-slate-900">
                      Database level security
                    </span>{" "}
                    — measures designed to prevent unauthorized users from
                    accessing or modifying the data at the database level.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      System level security
                    </span>{" "}
                    — measures designed to prevent unauthorized access to the
                    systems that the database runs on, and to all systems that can
                    access the database.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Network level security
                    </span>{" "}
                    — the database is designed to be inaccessible to the public
                    internet. No machine that can directly access the database can
                    be directly accessed from the internet.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Physical security
                    </span>{" "}
                    — measures designed to ensure that the machines that can access
                    the database are physically secured so that only the
                    operations team can access them.
                  </li>
                </ul>
                <p>
                  We also prohibit our employees from accessing your personally
                  identifiable information except on a need to know basis, and even
                  then, only under confidentiality agreements. Our engineers review
                  the security measures on a regular basis to update and strengthen
                  these protective measures. No security measures are completely
                  fail-safe or impervious to circumvention. We are not responsible
                  for events beyond our control, including without limitation, the
                  malicious acts or willful misconduct of hackers or any other
                  person.
                </p>
              </div>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll staggerIndex={7} className="privacy-reveal-fast">
            <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 font-sans text-left shadow-md">
              <h2 className="text-base font-semibold text-slate-900">
                Children’s privacy
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                Our Services are not directed to children under 13, and we do not
                knowingly collect personal information from children under 13. If
                you believe a child has provided personal information, contact us
                to request deletion.
              </p>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll staggerIndex={8} className="privacy-reveal-fast">
            <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 font-sans text-left shadow-md">
              <h2 className="text-base font-semibold text-slate-900">
                International data transfers
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                If you use our Services, your information may be processed in
                countries other than your own (for example, where service providers
                operate).
              </p>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll staggerIndex={9} className="privacy-reveal-fast">
            <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 font-sans text-left shadow-md">
              <h2 className="text-base font-semibold text-slate-900">
                Changes to this policy
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                We may update this Privacy Policy from time to time. We will update
                the effective date above when changes are made.
              </p>
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll staggerIndex={10} className="privacy-reveal-fast">
            <div className="card-interactive rounded-3xl border border-slate-200 bg-white p-7 font-sans text-left shadow-md">
              <h2 className="text-base font-semibold text-slate-900">Contact us</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                If you have questions or requests about this Privacy Policy
                (including data deletion requests), you may reach us through the
                following channels:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 md:text-base">
                <li>
                  <span className="font-semibold text-slate-900">
                    Developer/Company:
                  </span>{" "}
                  Sherwood Technologies (Pvt) Ltd
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Email:</span>{" "}
                  <a
                    href="mailto:info@sherwoodtechnologies.lk"
                    className="text-blue-600 underline decoration-blue-600/40 underline-offset-2 hover:text-blue-700"
                  >
                    info@sherwoodtechnologies.lk
                  </a>
                </li>
                <li>
                  <div className="flex gap-2">
                    <span className="shrink-0 font-semibold text-slate-900">
                      Phone:
                    </span>
                    <span>
                      +94 77 739 3437
                      <br />
                      +94 11 532 8100
                    </span>
                  </div>
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Office:</span>{" "}
                  No. 100/1, Elvitigala Mawatha, Colombo
                </li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
                Our team will respond promptly to ensure your inquiry is handled
                with priority.
              </p>
            </div>
          </AnimatedOnScroll>
        </div>
      </div>
    </section>
  );

  const handleBackToProducts = () => {
    setView("home");
    setProductSlug(null);
    setTimeout(
      () => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  };

  const renderProductDetailPage = () => {
    const product = productSlug
      ? PRODUCTS.find((p) => p.slug === productSlug)
      : null;
    if (!product) return null;

    const renderScreenshotsLayout = () => {
      const placeholderLabels = [
        "Preview 1",
        "Preview 2",
        "Preview 3",
        "Preview 4",
      ];

      const desktopSlides: Array<
        | { kind: "image"; src: string; label: string; alt: string }
        | { kind: "placeholder"; label: string }
      > =
        product.slug === "wealth-management"
          ? WEALTH_DESKTOP_SLIDES.map((s) => ({
              kind: "image" as const,
              src: s.src,
              label: s.label,
              alt: s.alt,
            }))
          : product.slug === "equity-management"
            ? EQUITY_DESKTOP_SLIDES.map((s) => ({
                kind: "image" as const,
                src: s.src,
                label: s.label,
                alt: s.alt,
              }))
            : product.slug === "mobile-app"
              ? FINANCIAL_REPORT_DESKTOP_SLIDES.map((s) => ({
                  kind: "image" as const,
                  src: s.src,
                  label: s.label,
                  alt: s.alt,
                }))
              : product.slug === "treasury-management"
                ? TREASURY_DESKTOP_SLIDES.map((s) => ({
                    kind: "image" as const,
                    src: s.src,
                    label: s.label,
                    alt: s.alt,
                  }))
                : placeholderLabels.map((label) => ({
                    kind: "placeholder" as const,
                    label,
                  }));

      const desktopSlideCount = desktopSlides.length;
      const mobileSlideCount = WEALTH_MOBILE_SCREENSHOTS.length;
      const showMobileDevice = product.slug === "wealth-management";

      return (
        <div className="mt-4 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            At a Glance
          </p>
          <p className="max-w-2xl text-sm text-slate-600 md:text-base">
            {product.slug === "wealth-management" ||
            product.slug === "equity-management" ||
            product.slug === "mobile-app" ||
            product.slug === "treasury-management"
              ? `Explore a preview of the ${product.name} interface inside a responsive desktop-style frame.`
              : `Explore a preview of the ${product.name} interface inside a responsive desktop-style frame. These can be replaced later with real captures from your deployment.`}
          </p>

          <div className={"screenshot-devices " + (showMobileDevice ? "screenshot-devices--with-phone" : "")}>
            <div className="screenshot-laptop-wrapper">
              <div className="screenshot-laptop-body">
                <div className="screenshot-laptop-bezel">
                  <div className="screenshot-laptop-notch">
                    <div className="screenshot-laptop-notch-camera" />
                  </div>
                  <div className="screenshot-laptop-screen">
                    <div
                      className="flex h-full"
                      style={{
                        transform: `translateX(-${(activeScreenshotIndex % desktopSlideCount) * 100}%)`,
                        transition: `transform ${PRODUCT_DETAIL_SLIDE_TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1)`,
                      }}
                    >
                      {desktopSlides.map((slide, index) => (
                        <div key={slide.label + index} className="min-w-full h-full">
                          {slide.kind === "image" ? (
                            <img
                              src={slide.src}
                              alt={slide.alt}
                              className="h-full w-full object-contain object-center"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center bg-white px-6 text-center text-slate-900">
                              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                {slide.label}
                              </div>
                              <div className="mt-2 text-lg font-semibold text-slate-900">
                                {product.name}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="screenshot-laptop-base" />
              </div>

              <div className="pointer-events-none mt-4 flex justify-center gap-2">
                {Array.from({ length: desktopSlideCount }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      "h-1.5 w-3 rounded-full transition-colors " +
                      (index === (activeScreenshotIndex % desktopSlideCount)
                        ? "bg-primary"
                        : "bg-slate-400/60")
                    }
                  />
                ))}
              </div>
            </div>

            {showMobileDevice && (
              <div className="screenshot-phone-wrapper" aria-label="Mobile preview">
                <div className="screenshot-phone-body">
                  <div className="screenshot-phone-notch" aria-hidden="true">
                    <div className="screenshot-phone-notch-camera" />
                  </div>
                  <div className="screenshot-phone-screen">
                    <div
                      className="flex h-full"
                      style={{
                        transform: `translateX(-${(activeMobileScreenshotIndex % mobileSlideCount) * 100}%)`,
                        transition: `transform ${PRODUCT_DETAIL_SLIDE_TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1)`,
                      }}
                    >
                      {WEALTH_MOBILE_SCREENSHOTS.map((src, index) => (
                        <div key={index} className="min-w-full h-full">
                          <img
                            src={src}
                            alt={`${product.name} — mobile preview ${index + 1}`}
                            className="h-full w-full object-cover object-top"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };

    return (
      <section className="scroll-mt-32 border-b border-border/40 bg-white text-slate-900 min-h-[200vh] pt-[calc(1.2rem+3.5rem+env(safe-area-inset-top,0px))]">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
          <div className="space-y-4">
            <Button
              variant="default"
              size="sm"
              className={backNavGreenButtonClassName}
              onClick={handleBackToProducts}
            >
              ← Back to Products
            </Button>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Product
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              {product.name}
            </h1>
            <p className="max-w-2xl text-base text-slate-700 md:text-lg">
              {product.description}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedOnScroll staggerIndex={0}>
              <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  Key features
                </h3>
                <p className="text-sm text-slate-600">
                  This product is designed to deliver scalable, secure, and
                  real-time capabilities tailored for financial institutions and
                  treasury operations. Expand this section with specific features
                  and benefits.
                </p>
              </div>
            </AnimatedOnScroll>
            <AnimatedOnScroll staggerIndex={1}>
              <div className="card-interactive rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-md">
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  Get started
                </h3>
                <p className="text-sm text-slate-600">
                  Contact us to learn how this solution can support your
                  organization. We can provide a demo, discuss requirements, and
                  outline implementation options.
                </p>
              </div>
            </AnimatedOnScroll>
          </div>

          {renderScreenshotsLayout()}
        </div>
      </section>
    );
  };

  const handleNavigateSection = (id: string) => {
    if (view !== "home") {
      setView("home");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-slate-900">
      <Header
        variant={view === "home" ? "default" : "light"}
        onBookConsultation={() => setView("contact")}
        onNavigateSection={handleNavigateSection}
      />
      <main className="relative">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {view === "home" && renderHome()}
                {view === "primary" && renderPrimaryPage()}
                {view === "secondary" && renderSecondaryPage()}
                {view === "contact" && renderContactPage()}
                {view === "product-detail" && renderProductDetailPage()}
              </>
            }
          />
          <Route path="/privacy" element={renderPrivacyPolicyPage()} />
        </Routes>
      </main>
      {location.pathname !== "/privacy" && (
        <Footer
          onNavigateSection={handleNavigateSection}
          onNavigateContact={() => setView("contact")}
          onNavigatePrimary={() => setView("primary")}
          onNavigatePrivacy={() => navigate("/privacy")}
          onSelectProduct={(slug) => {
            setProductSlug(slug);
            setView("product-detail");
          }}
        />
      )}

      <div
        className={
          "fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8 " +
          "transition-all duration-300 ease-out motion-reduce:transition-none " +
          (showScrollTop
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0")
        }
        aria-hidden={!showScrollTop}
      >
        <Button
          type="button"
          variant="default"
          className="h-12 w-12 min-w-[3rem] rounded-full p-0 shadow-lg shadow-primary/25 ring-2 ring-primary/20 transition-transform hover:scale-105 active:scale-95"
          aria-label="Scroll to top"
          tabIndex={showScrollTop ? 0 : -1}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 shrink-0"
            aria-hidden
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};


