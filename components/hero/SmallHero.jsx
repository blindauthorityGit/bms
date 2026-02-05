import React from "react";
import Link from "next/link";
import SectionLine from "@/components/ui/SectionLine";

function resolveLink(link) {
    if (!link) return { href: "#", isExternal: false };

    const type = link.type || (link.external ? "external" : "internal");
    if (type === "external") return { href: link.external || "#", isExternal: true };

    // internal
    return { href: link.internal || "#", isExternal: false };
}

function splitHeadline(headline) {
    if (!headline) return { line1: "", line2: "" };

    // prefer explicit newline from CMS
    if (headline.includes("\n")) {
        const [a, ...rest] = headline.split("\n");
        return { line1: a.trim(), line2: rest.join("\n").trim() };
    }

    // common separators
    const seps = [" – ", " - ", " — ", "–", "—"];
    for (const sep of seps) {
        if (headline.includes(sep)) {
            const parts = headline.split(sep);
            const line1 = parts[0].trim();
            const line2 = parts.slice(1).join(sep).trim();
            return { line1, line2 };
        }
    }

    // fallback: single line
    return { line1: headline.trim(), line2: "" };
}

function renderHeadlineLine(line) {
    if (!line) return null;

    // Highlight first "Longevity" word if present at start
    const trimmed = line.trim();
    if (/^longevity\b/i.test(trimmed)) {
        const rest = trimmed.replace(/^longevity\b/i, "").trimStart();
        return (
            <>
                <span className="text-[#be1622] font-headline font-semibold">Longevity</span>
                {rest ? <span className="text-neutral-900">{` ${rest}`}</span> : null}
            </>
        );
    }

    return <span className="text-neutral-900">{trimmed}</span>;
}

export default function SmallHero({ hero }) {
    if (!hero) return null;

    const { href, isExternal } = resolveLink(hero.buttonLink);
    const bgUrl = hero.image?.asset?.url || null;

    const { line1, line2 } = splitHeadline(hero.headline);

    return (
        <section className="w-full relative bg-white">
            <SectionLine direction="down" length={120} overlap={60} />

            <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
                <div className="relative overflow-hidden bg-white h-[520px] lg:h-[456px]">
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

                    {/* readability gradient */}
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-white/85 via-white/35 to-transparent" />

                    {/* Content */}
                    <div className="relative z-20 grid h-full lg:grid-cols-[minmax(520px,600px)_1fr]">
                        <div className="flex h-full flex-col justify-center py-10 lg:py-0">
                            {line1 || line2 ? (
                                <h1 className="leading-[0.95] tracking-tight">
                                    {line1 ? (
                                        <span className="block text-5xl font-light md:text-6xl">
                                            {renderHeadlineLine(line1)}
                                        </span>
                                    ) : null}

                                    {line2 ? (
                                        <span className="mt-2 block text-5xl font-light md:text-6xl">
                                            {renderHeadlineLine(line2)}
                                        </span>
                                    ) : null}
                                </h1>
                            ) : null}

                            {hero.text ? (
                                <p className="mt-6 max-w-[64ch] text-sm leading-relaxed text-neutral-700 md:text-base">
                                    {hero.text}
                                </p>
                            ) : null}

                            {hero.buttonText ? (
                                <div className="mt-8">
                                    {isExternal ? (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center bg-[#be1622] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B21F24]/40"
                                        >
                                            {hero.buttonText}
                                        </a>
                                    ) : (
                                        <Link
                                            href={href}
                                            className="inline-flex items-center justify-center bg-[#be1622] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B21F24]/40"
                                        >
                                            {hero.buttonText}
                                        </Link>
                                    )}
                                </div>
                            ) : null}
                        </div>

                        <div className="hidden lg:block" />
                    </div>
                </div>
            </div>
        </section>
    );
}
