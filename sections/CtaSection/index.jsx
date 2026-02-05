import React from "react";
import SectionLine from "@/components/ui/SectionLine";

function resolveHref(link) {
    if (!link) return "#";
    if (link.type === "external") return link.external || "#";
    return link.internal || "#";
}

export default function CtaSection({ data, className = "" }) {
    if (!data) return null;

    const href = resolveHref(data.buttonLink);

    return (
        <section className={`relative w-full bg-white ${className}`}>
            <SectionLine direction="down" length={120} overlap={60} />

            <div className="h-24"></div>
            <div className="mx-auto w-full max-w-[1200px] px-6 py-24 md:py-32">
                <div className="mx-auto max-w-[980px] text-center">
                    {/* Text */}
                    {data.text ? (
                        <p className="font-headline text-3xl font-light leading-loose text-neutral-900 md:text-4xl">
                            {data.text}
                        </p>
                    ) : null}

                    {/* Button */}
                    {data.buttonText ? (
                        <div className="mt-10">
                            <a
                                href={href}
                                className="inline-flex items-center justify-center bg-[#B21F24] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B21F24]/40"
                            >
                                {data.buttonText}
                            </a>
                        </div>
                    ) : null}
                </div>

                {/* Optional: wenn du hier den Strich direkt drunter willst */}
                {/* <SectionLine direction="down" length={120} overlap={60} /> */}
            </div>
        </section>
    );
}
