import React from "react";
import SectionLine from "@/components/ui/SectionLine";

function splitItems(items) {
    if (!Array.isArray(items)) return { top: [], bottom: [] };
    return {
        top: items.slice(0, 3),
        bottom: items.slice(3, 5),
    };
}

function IconCard({ item }) {
    return (
        <div className="flex flex-col items-center text-center">
            {/* Icon */}
            {item?.icon?.asset?.url ? (
                <img
                    src={item.icon.asset.url}
                    alt={item.title || ""}
                    className="h-16 w-16 object-contain"
                    loading="lazy"
                />
            ) : (
                <div className="h-10 w-10 rounded-full bg-neutral-200" />
            )}

            {/* Title */}
            <h3 className="mt-6 font-headline text-2xl font-regular text-neutral-900 md:text-3xl">{item?.title}</h3>

            {/* Description */}
            {item?.description ? (
                <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-neutral-600">{item.description}</p>
            ) : null}
        </div>
    );
}

export default function IconGridSection({ data }) {
    if (!data) return null;

    const { top, bottom } = splitItems(data.items);

    return (
        <section className="w-full relative bg-white">
            <SectionLine direction="down" length={120} overlap={60} />

            <div className="mx-auto w-full max-w-[1200px] px-6 py-20 md:py-28">
                {/* Headline */}
                {data.headlinePrefix || data.headlineHighlight || data.headlineSuffix ? (
                    <h2 className="text-center  text-4xl font-light text-neutral-900 md:text-5xl">
                        <span>{data.headlinePrefix} </span>
                        <span
                            className="font-semibold font-headline"
                            style={{ color: data.highlightColor || "#BE1622" }}
                        >
                            {data.headlineHighlight}
                        </span>{" "}
                        <span>{data.headlineSuffix}</span>
                    </h2>
                ) : null}

                {data.intro ? (
                    <p className="mx-auto mt-4 max-w-[70ch] text-center text-sm leading-relaxed text-neutral-600">
                        {data.intro}
                    </p>
                ) : null}

                {/* Grid Top (3) */}
                <div className="mt-24 grid gap-12 md:grid-cols-3 md:gap-10">
                    {top.map((item, idx) => (
                        <IconCard key={idx} item={item} />
                    ))}
                </div>

                {/* Grid Bottom (2 centered) */}
                <div className="mt-0 grid gap-12 md:grid-cols-2 md:gap-10 md:px-[16%]">
                    {bottom.map((item, idx) => (
                        <IconCard key={idx} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
