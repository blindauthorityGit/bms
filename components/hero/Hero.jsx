import React from "react";
import SectionLine from "@/components/ui/SectionLine";

function resolveHref(link) {
    if (!link) return "#";
    if (link.type === "external") return link.external || "#";
    return link.internal || "#";
}

export default function Hero({ hero }) {
    if (!hero) return null;

    const href = resolveHref(hero.buttonLink);
    const bgUrl = hero.image?.asset?.url;

    return (
        <section className="w-full relative bg-white">
            <SectionLine direction="down" length={120} overlap={60} />

            <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
                {/* IMPORTANT: give the hero a real height so children can be 100% */}
                <div className="relative overflow-hidden bg-white h-[520px] lg:h-[656px]">
                    {/* Background image */}
                    {bgUrl ? (
                        <img
                            src={bgUrl}
                            alt={hero.image?.alt || ""}
                            className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-neutral-100" />
                    )}

                    {/* Subtle fade for readability (NOT milky white) */}
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-white/85 via-white/35 to-transparent" />

                    {/* Content layer */}
                    <div className="relative z-20 grid h-full lg:grid-cols-[minmax(520px,600px)_1fr]">
                        {/* LEFT: this must be h-full so flex centering works */}
                        <div className="flex h-full flex-col justify-center py-10 lg:py-0">
                            <h1 className="leading-[0.95] tracking-tight">
                                <span className="block text-5xl font-light md:text-6xl">
                                    <span className="text-[#be1622] font-headline font-semibold">Longevity</span>{" "}
                                    <span className="text-neutral-900">als Haltung –</span>
                                </span>
                                <span className="mt-2 block text-5xl font-light text-neutral-900 md:text-6xl">
                                    nicht als Trend
                                </span>
                            </h1>

                            {hero.text ? (
                                <p className="mt-6 max-w-[64ch] text-sm leading-relaxed text-neutral-700 md:text-base">
                                    {hero.text}
                                </p>
                            ) : null}

                            {hero.buttonText ? (
                                <div className="mt-8">
                                    <a
                                        href={href}
                                        className="inline-flex items-center justify-center bg-[#be1622] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B21F24]/40"
                                    >
                                        {hero.buttonText}
                                    </a>
                                </div>
                            ) : null}
                        </div>

                        {/* RIGHT: empty column (image shows through) */}
                        <div className="hidden lg:block" />
                    </div>
                </div>
            </div>
        </section>
    );
}
