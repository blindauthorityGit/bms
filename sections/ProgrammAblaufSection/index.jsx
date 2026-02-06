"use client";

import React, { useMemo, useRef, useLayoutEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
}

function StepCard({ topline, title, cardRef }) {
    return (
        <div ref={cardRef} className="rounded-[28px] border border-neutral-300 bg-white px-10 py-10 text-center">
            <div className="text-sm text-neutral-500">{topline}</div>
            <div className="mt-3 text-2xl font-headline text-neutral-900">{title}</div>
        </div>
    );
}

function useMediaQuery(query) {
    const [matches, setMatches] = React.useState(false);

    React.useEffect(() => {
        if (typeof window === "undefined") return;

        const mql = window.matchMedia(query);
        const onChange = () => setMatches(mql.matches);

        onChange(); // initial
        if (mql.addEventListener) mql.addEventListener("change", onChange);
        else mql.addListener(onChange);

        return () => {
            if (mql.removeEventListener) mql.removeEventListener("change", onChange);
            else mql.removeListener(onChange);
        };
    }, [query]);

    return matches;
}

function buildSnakePath(points, midX) {
    // points: [{x,y}] in visual order 1..8 already “snaked”
    // We create: start above first -> down into center -> horizontals -> vertical drop at right -> etc.
    if (!points.length) return "";

    const [p1, ...rest] = points;
    const startY = Math.max(0, p1.y - 90);

    // helper
    const L = (p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`;

    let d = `M ${p1.x.toFixed(1)},${startY.toFixed(1)} L ${L(p1)}`;

    for (let i = 0; i < rest.length; i++) {
        const prev = i === 0 ? p1 : rest[i - 1];
        const cur = rest[i];

        const sameRow = Math.abs(prev.y - cur.y) < 8;

        if (sameRow) {
            // horizontal segment with a tiny “straight” feel
            d += ` L ${L(cur)}`;
        } else {
            // row change: go down at the turning edge (use midX as a stable “elbow”)
            // We create an elbow: prev -> (prev.x, cur.y) -> cur
            d += ` L ${prev.x.toFixed(1)},${cur.y.toFixed(1)} L ${L(cur)}`;
        }
    }

    // end below last
    const last = points[points.length - 1];
    const endY = last.y + 90;
    d += ` L ${last.x.toFixed(1)},${endY.toFixed(1)}`;

    return d;
}

export default function ProgrammAblaufSection({ data, className = "" }) {
    if (!data) return null;

    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-15% 0px -15% 0px" });

    const highlightColor = data.highlightColor || "#BE1622";

    const cards = Array.isArray(data.cards) ? data.cards : [];
    const rows = useMemo(() => chunk(cards, 4), [cards]);

    // refs for cards (max 8, but works with any count)
    const cardRefs = useRef([]);
    cardRefs.current = cards.map((_, i) => cardRefs.current[i] || React.createRef());

    // dynamic line path
    const [pathD, setPathD] = useState("");

    const isLg = useMediaQuery("(min-width: 1024px)");

    useLayoutEffect(() => {
        if (!gridRef.current) return;
        if (!cards.length) return;

        const calc = () => {
            const gridRect = gridRef.current.getBoundingClientRect();

            // get centers for each card in DOM order (0..n-1)
            const centers = cards
                .map((_, i) => {
                    const el = cardRefs.current[i]?.current;
                    if (!el) return null;
                    const r = el.getBoundingClientRect();
                    return {
                        x: r.left - gridRect.left + r.width / 2,
                        y: r.top - gridRect.top + r.height / 2,
                    };
                })
                .filter(Boolean);

            // we need “snake order”: row1 left->right, row2 right->left, row3 left->right ...
            // But we only have 2 rows right now (4+4). We'll implement generic:
            // group by approx y (rows)
            const sortedByY = [...centers].sort((a, b) => a.y - b.y);
            const rowGroups = [];
            const threshold = 80; // row separation threshold

            for (const p of sortedByY) {
                const lastRow = rowGroups[rowGroups.length - 1];
                if (!lastRow) {
                    rowGroups.push([p]);
                } else {
                    const avgY = lastRow.reduce((s, q) => s + q.y, 0) / lastRow.length;
                    if (Math.abs(p.y - avgY) < threshold) lastRow.push(p);
                    else rowGroups.push([p]);
                }
            }

            // sort each row by x, then reverse every 2nd row for snake
            const snaked = rowGroups.flatMap((row, idx) => {
                const r = row.sort((a, b) => a.x - b.x);
                return idx % 2 === 1 ? r.reverse() : r;
            });

            const midX = snaked.reduce((s, p) => s + p.x, 0) / Math.max(1, snaked.length);

            const d = buildSnakePath(snaked, midX);
            setPathD(d);
        };

        calc();

        // keep it stable on resize/fonts
        const ro = new ResizeObserver(() => calc());
        ro.observe(gridRef.current);

        window.addEventListener("resize", calc);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", calc);
        };
    }, [cards.length]); // recalc when count changes

    // Animation
    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
    };

    const item = {
        hidden: { opacity: 0, y: 14, filter: "blur(2px)" },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
        },
    };

    return (
        <section ref={sectionRef} className={`relative w-full lg:mt-16 bg-white ${className}`}>
            <div className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-10">
                {/* HEADLINE */}
                <div className="text-center">
                    <h2 className="text-5xl font-light leading-[1.05] tracking-tight text-neutral-900 md:text-6xl">
                        <span className="block">{data.headlinePrefix}</span>
                        <span className="mt-2 block font-headline font-semibold" style={{ color: highlightColor }}>
                            {data.headlineHighlight}
                        </span>
                        {data.headlineSuffix ? <span className="mt-2 block">{data.headlineSuffix}</span> : null}
                    </h2>
                </div>

                {/* GRID WRAP */}
                <div ref={gridRef} className="relative mt-16">
                    {/* LINE SVG (background) - dynamic */}
                    <div className="pointer-events-none absolute inset-0 hidden lg:block">
                        <svg className="h-full w-full" preserveAspectRatio="none">
                            {/* faint line */}
                            {pathD ? (
                                <path
                                    d={pathD}
                                    fill="none"
                                    stroke="rgba(23,23,23,0.22)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            ) : null}

                            {/* animated draw */}
                            {pathD ? (
                                <motion.path
                                    d={pathD}
                                    fill="none"
                                    stroke="rgba(23,23,23,0.6)"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                                    transition={{ duration: 1.15, ease: "easeInOut", delay: 0.05 }}
                                />
                            ) : null}
                        </svg>
                    </div>

                    {/* CARDS */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        className="grid gap-10"
                    >
                        {rows.map((row, rowIndex) => {
                            // ✅ reverse ONLY on desktop (lg+)
                            const rowCards = rowIndex % 2 === 1 && isLg ? [...row].reverse() : row;

                            return (
                                <div key={rowIndex} className="grid gap-10 lg:grid-cols-4">
                                    {rowCards.map((c, idx) => {
                                        const originalIndex = cards.indexOf(c);

                                        return (
                                            <motion.div key={`${rowIndex}-${idx}`} variants={item}>
                                                <StepCard
                                                    topline={c.topline}
                                                    title={c.title}
                                                    cardRef={cardRefs.current[originalIndex]}
                                                />
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
