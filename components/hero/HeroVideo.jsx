import React from "react";
import SectionLine from "@/components/ui/SectionLine";

function resolveHref(link) {
    if (!link) return "#";
    if (link.type === "external") return link.external || "#";
    return link.internal || "#";
}

export default function HeroVideo({ hero }) {
    if (!hero) return null;

    const href = resolveHref(hero.buttonLink);

    return (
        <section className="w-full relative bg-white">
            <SectionLine direction="down" length={120} overlap={60} />

            <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
                <div className="relative overflow-hidden bg-white py-14 lg:py-20">
                    <div className="grid items-start gap-10 lg:grid-cols-[minmax(520px,600px)_1fr]">
                        {/* LEFT */}
                        <div className="pt-2 lg:pt-8">
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

                        {/* RIGHT: VIDEO */}
                        <div className="lg:pt-14">
                            <div className="relative overflow-hidden rounded-[28px] border border-neutral-200 bg-neutral-100 shadow-sm">
                                {/* Aspect ratio wrapper */}
                                <div className="relative w-full pb-[62%]">
                                    <video
                                        className="absolute inset-0 h-full w-full object-cover"
                                        controls
                                        preload="metadata"
                                        playsInline
                                        // IMPORTANT: no autoplay, no muted
                                        // autoPlay={false} is default; we simply omit it
                                    >
                                        <source src="/Tanja_Bauer.mov" type="video/quicktime" />
                                        <source src="/Tanja_Bauer.mov" type="video/mp4" />
                                        Dein Browser unterstützt das Video-Tag nicht.
                                    </video>
                                </div>
                            </div>

                            {/* optional: kleine caption/label unter dem video */}
                            {/* <div className="mt-3 text-xs text-neutral-500">Ein kurzer Einblick</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
