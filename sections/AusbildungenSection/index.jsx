// /sections/about/AusbildungenSection.jsx
"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

export default function AusbildungenSection({ data, className = "" }) {
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

    if (!data) return null;

    const highlightColor = data.highlightColor || "#BE1622";
    const groups = Array.isArray(data.groups) ? data.groups : [];

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
    };

    const item = {
        hidden: { opacity: 0, y: 10, filter: "blur(2px)" },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
        },
    };

    return (
        <section ref={ref} className={`w-full bg-white ${className}`}>
            <div className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-10">
                {/* Headline */}
                <div className="text-left md:text-center">
                    <h2 className="text-5xl font-light leading-[1.05] tracking-tight text-neutral-900 md:text-6xl">
                        <span>{data.headlinePrefix} </span>
                        <span className="font-headline font-semibold" style={{ color: highlightColor }}>
                            {data.headlineHighlight}
                        </span>
                        {data.headlineSuffix ? <span> {data.headlineSuffix}</span> : null}
                    </h2>
                </div>

                {/* Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-4"
                >
                    {groups.map((g) => (
                        <motion.div key={g._key || g.yearLabel} variants={item} className="text-left">
                            {/* Pill */}
                            <div className="mx-auto w-full max-w-[320px] md:max-w-none">
                                <div className="rounded-full border border-neutral-400 px-6 py-4 text-center text-xl font-semibold text-neutral-900">
                                    {g.yearLabel}
                                </div>

                                {/* Bullets */}
                                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-neutral-800">
                                    {(g.items || []).map((it) => (
                                        <li key={it._key || it.text} className="flex gap-3">
                                            <span className="mt-[6px] inline-block h-[4px] w-[4px] shrink-0 rounded-full bg-neutral-800" />
                                            <span>{it.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
