"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Bullet({ mainline, subline, dotColor }) {
    return (
        <div className="flex gap-5">
            <div className="pt-3">
                <span className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: dotColor }} />
            </div>

            <div>
                <div className="text-2xl font-headline font-semibold text-neutral-900 md:text-3xl">{mainline}</div>
                {subline ? (
                    <div className="mt-1 text-sm leading-relaxed text-neutral-600 md:text-base">{subline}</div>
                ) : null}
            </div>
        </div>
    );
}

export default function BenefitsSection({ data, className = "" }) {
    if (!data) return null;

    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

    const highlightColor = data.highlightColor || "#BE1622";
    const bullets = Array.isArray(data.bullets) ? data.bullets : [];

    const container = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.12, delayChildren: 0.1 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 12, filter: "blur(2px)" },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
        },
    };

    return (
        <section ref={ref} className={`relative w-full bg-white ${className}`}>
            <div className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-10">
                <div className="grid items-start gap-16 lg:grid-cols-[420px_1fr]">
                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                        transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                        className="max-w-[42ch]"
                    >
                        {/* Headline */}
                        <h2 className="text-5xl font-light leading-[0.95] tracking-tight text-neutral-900 md:text-6xl">
                            {data.headlinePrefix && <span className="block">{data.headlinePrefix}</span>}

                            {data.headlineHighlight && (
                                <span
                                    className="mt-2 block font-headline font-semibold"
                                    style={{ color: highlightColor }}
                                >
                                    {data.headlineHighlight}
                                </span>
                            )}

                            {data.headlineSuffix && <span className="mt-2 block">{data.headlineSuffix}</span>}
                        </h2>

                        {/* ✅ Additional Headline / Subline */}
                        {(data.additionalHeadline || data.additionalSubline) && (
                            <div className="mt-6 space-y-2">
                                {data.additionalHeadline && (
                                    <p className="text-base font-medium text-neutral-700">{data.additionalHeadline}</p>
                                )}

                                {data.additionalSubline && (
                                    <p className="text-sm leading-relaxed text-neutral-600">{data.additionalSubline}</p>
                                )}
                            </div>
                        )}
                    </motion.div>

                    {/* RIGHT: Bullets */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        className="space-y-12"
                    >
                        {bullets.map((b, idx) => (
                            <motion.div key={idx} variants={item}>
                                <Bullet mainline={b.mainline} subline={b.subline} dotColor={highlightColor} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
