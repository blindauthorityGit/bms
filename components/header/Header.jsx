"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { NAV_ITEMS } from "@/config/navigation";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

function ChevronDownIcon({ className = "" }) {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function useOnClickOutside(ref, cb) {
    useEffect(() => {
        const handler = (e) => {
            const el = ref.current;
            if (!el) return;
            if (e.target instanceof Node && el.contains(e.target)) return;
            cb();
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [ref, cb]);
}

function DesktopNavItem({ item }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);

    useOnClickOutside(wrapRef, () => setOpen(false));

    const isActive = useMemo(() => {
        if (item.href) return pathname === item.href || pathname.startsWith(item.href + "/");
        if (item.children?.length)
            return item.children.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"));
        return false;
    }, [pathname, item]);

    const baseLink = "inline-flex items-center gap-1.5 px-2 py-2 text-sm tracking-wide uppercase transition-colors";
    const activeClass = isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text)]";
    const hoverClass = "hover:text-[var(--color-primary)]";

    // No submenu
    if (!item.children?.length) {
        return (
            <Link className={`${baseLink} ${activeClass} ${hoverClass}`} href={item.href || "#"}>
                {item.label}
            </Link>
        );
    }

    // With submenu: parent is clickable (Link), chevron toggles without navigation, hover-gap fixed via bridge
    return (
        <div ref={wrapRef} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <Link
                href={item.href || "#"}
                className={`${baseLink} ${activeClass} ${hoverClass}`}
                aria-haspopup="menu"
                aria-expanded={open}
                onFocus={() => setOpen(true)}
            >
                {item.label}

                <button
                    type="button"
                    className="ml-1 inline-flex items-center justify-center"
                    aria-label="Untermenü öffnen"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpen((v) => !v);
                    }}
                >
                    <ChevronDownIcon className={`transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
            </Link>

            {open && (
                <>
                    {/* bridge closes hover-gap between parent and dropdown */}
                    <div className="absolute left-0 top-full h-3 w-full" />

                    <div
                        role="menu"
                        className="absolute left-0 top-full z-50 min-w-56 overflow-hidden rounded-xl border border-black/10 bg-[var(--color-offwhite)] shadow-lg translate-y-2"
                    >
                        <div className="p-2">
                            {item.children.map((c) => {
                                const childActive = pathname === c.href || pathname.startsWith(c.href + "/");
                                return (
                                    <Link
                                        key={c.href}
                                        role="menuitem"
                                        href={c.href}
                                        className={[
                                            "block rounded-lg px-3 py-2 text-sm transition-colors",
                                            childActive
                                                ? "bg-black/5 text-[var(--color-primary)]"
                                                : "text-[var(--color-text)]",
                                            "hover:bg-black/5 hover:text-[var(--color-primary)]",
                                        ].join(" ")}
                                        onClick={() => setOpen(false)}
                                    >
                                        {c.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function MobileNav({ onNavigate }) {
    const pathname = usePathname();
    const [openLabel, setOpenLabel] = useState(null);

    return (
        <div className="p-2">
            {NAV_ITEMS.map((item) => {
                const hasChildren = !!item.children?.length;
                const isActive =
                    (item.href && (pathname === item.href || pathname.startsWith(item.href + "/"))) ||
                    (item.children?.some((c) => pathname === c.href || pathname.startsWith(c.href + "/")) ?? false);

                if (!hasChildren) {
                    return (
                        <Link
                            key={item.label}
                            href={item.href || "#"}
                            className={[
                                "flex items-center justify-between rounded-xl px-3 py-3 text-sm uppercase tracking-wide",
                                isActive ? "text-[var(--color-primary)] bg-black/5" : "text-[var(--color-text)]",
                            ].join(" ")}
                            onClick={onNavigate}
                        >
                            {item.label}
                        </Link>
                    );
                }

                const open = openLabel === item.label;

                return (
                    <div key={item.label} className="rounded-xl">
                        <div
                            className={[
                                "flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm uppercase tracking-wide",
                                isActive ? "text-[var(--color-primary)] bg-black/5" : "text-[var(--color-text)]",
                            ].join(" ")}
                        >
                            {/* parent is clickable */}
                            <Link href={item.href || "#"} className="flex-1" onClick={onNavigate}>
                                {item.label}
                            </Link>

                            {/* toggle submenu without navigation */}
                            <button
                                type="button"
                                className="ml-2 inline-flex items-center justify-center"
                                aria-label="Untermenü öffnen"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setOpenLabel(open ? null : item.label);
                                }}
                            >
                                <ChevronDownIcon className={`transition-transform ${open ? "rotate-180" : ""}`} />
                            </button>
                        </div>

                        {open && (
                            <div className="pb-2 pl-2 pr-2">
                                {item.children.map((c) => {
                                    const childActive = pathname === c.href || pathname.startsWith(c.href + "/");
                                    return (
                                        <Link
                                            key={c.href}
                                            href={c.href}
                                            className={[
                                                "block rounded-lg px-3 py-2 text-sm",
                                                childActive
                                                    ? "text-[var(--color-primary)] bg-black/5"
                                                    : "text-[var(--color-text)]",
                                                "hover:bg-black/5",
                                            ].join(" ")}
                                            onClick={onNavigate}
                                        >
                                            {c.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Scroll progress
    const { scrollY } = useScroll();

    // Threshold: becomes compact after e.g. 24px
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 24);
    });

    // Animated values (smooth)
    const headerH = useTransform(scrollY, [0, 120], [92, 70]);
    const logoH = useTransform(scrollY, [0, 120], [76, 52]);
    const padY = useTransform(scrollY, [0, 120], [18, 10]);
    const bgAlpha = useTransform(scrollY, [0, 120], [0.75, 0.92]);
    const shadow = useTransform(
        scrollY,
        [0, 40, 120],
        ["0px 0px 0px rgba(0,0,0,0)", "0px 10px 30px rgba(0,0,0,0.08)", "0px 10px 30px rgba(0,0,0,0.10)"],
    );

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <motion.header
            className="sticky top-0 z-50 w-full"
            style={{
                boxShadow: shadow,
            }}
        >
            {/* Background + Blur */}
            <motion.div
                className="w-full backdrop-blur supports-[backdrop-filter]:backdrop-blur"
                style={{
                    backgroundColor: `rgba(255,255,248, ${bgAlpha.get ? bgAlpha.get() : 0.85})`,
                }}
            >
                <motion.div
                    className="container mx-auto px-4"
                    style={{
                        paddingTop: padY,
                        paddingBottom: padY,
                    }}
                >
                    <motion.div className="flex items-center justify-between gap-6" style={{ height: headerH }}>
                        {/* Brand */}
                        <Link href="/" className="flex items-center">
                            <motion.div className="relative w-auto shrink-0" style={{ height: logoH }}>
                                <Image
                                    src="/logo.png"
                                    alt="bodysoulmind Logo"
                                    width={260}
                                    height={80}
                                    className="h-full w-auto object-contain"
                                    priority
                                />
                            </motion.div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden items-center gap-6 lg:flex">
                            {NAV_ITEMS.map((item) => (
                                <div
                                    key={item.label}
                                    className={[
                                        scrolled ? "scale-[0.98] origin-center" : "scale-100",
                                        "transition-transform duration-200",
                                    ].join(" ")}
                                >
                                    <DesktopNavItem item={item} />
                                </div>
                            ))}
                        </nav>

                        {/* CTA + Mobile toggle */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/kontakt"
                                className={[
                                    "hidden lg:inline-flex rounded-none bg-[var(--color-primary)] text-white font-semibold uppercase tracking-wide transition hover:opacity-90",
                                    scrolled ? "px-5 py-2.5 text-sm" : "px-6 py-3 text-sm",
                                ].join(" ")}
                            >
                                TERMIN ANFRAGEN
                            </Link>

                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-lg border border-black/10 p-2 text-[var(--color-text)] lg:hidden"
                                aria-label="Menü öffnen"
                                onClick={() => setMobileOpen(true)}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path
                                        d="M4 7h16M4 12h16M4 17h16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Mobile Menu Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-[var(--color-offwhite)] shadow-2xl">
                        <div className="flex items-center justify-between border-b border-black/10 p-4">
                            <div className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text)]">
                                Menü
                            </div>
                            <button
                                type="button"
                                className="rounded-lg border border-black/10 p-2"
                                aria-label="Menü schließen"
                                onClick={() => setMobileOpen(false)}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path
                                        d="M6 6l12 12M18 6L6 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>

                        <MobileNav onNavigate={() => setMobileOpen(false)} />

                        <div className="p-4">
                            <Link
                                href="/kontakt"
                                className="flex w-full items-center justify-center bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white"
                                onClick={() => setMobileOpen(false)}
                            >
                                TERMIN ANFRAGEN
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </motion.header>
    );
}
