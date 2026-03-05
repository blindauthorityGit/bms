// /sections/WeeklyScheduleSection.jsx
"use client";

import React, { useMemo } from "react";

const DAYS = [
    { key: "mon", label: "Montag" },
    { key: "tue", label: "Dienstag" },
    { key: "wed", label: "Mittwoch" },
    { key: "thu", label: "Donnerstag" },
    { key: "fri", label: "Freitag" },
    { key: "sat", label: "Samstag" },
    { key: "sun", label: "Sonntag" },
];

const BG_MAP = {
    white: "bg-white",
    offwhite: "bg-[#E2DADB]/25",
    light: "bg-neutral-50",
};

/** "9.00–10.15" / "9:00-10:15" / "09.00 – 10.15 Uhr" -> minutes from 00:00 (best effort) */
function parseStartMinutes(timeStr) {
    if (!timeStr || typeof timeStr !== "string") return 999999;

    // pick first time occurrence
    const m = timeStr.match(/(\d{1,2})[.:](\d{2})/);
    if (!m) return 999999;

    const hh = Number(m[1]);
    const mm = Number(m[2]);
    if (!Number.isFinite(hh) || !Number.isFinite(mm)) return 999999;

    return hh * 60 + mm;
}

function cn(...c) {
    return c.filter(Boolean).join(" ");
}

export default function WeeklyScheduleSection({
    schedule,
    className = "",
    background = "white",
    highlightColor = "#BE1622",
}) {
    // schedule = { title, weekLabel, note, courses: [] }
    if (!schedule) return null;

    const bgClass = BG_MAP[background] || BG_MAP.white;

    const grouped = useMemo(() => {
        const map = Object.fromEntries(DAYS.map((d) => [d.key, []]));
        const items = Array.isArray(schedule.courses) ? schedule.courses : [];

        for (const it of items) {
            if (!it?.day || !map[it.day]) continue;
            map[it.day].push(it);
        }

        // sort per day by start time
        for (const k of Object.keys(map)) {
            map[k].sort((a, b) => parseStartMinutes(a?.time) - parseStartMinutes(b?.time));
        }

        return map;
    }, [schedule]);

    return (
        <section className={cn("relative w-full", bgClass, className)}>
            <div className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-10">
                {/* HEADER */}
                <div className="text-center">
                    <h2 className="text-4xl font-light leading-[0.95] tracking-tight text-neutral-900 md:text-5xl">
                        <span className="block">Wochenplan</span>
                        {schedule.weekLabel ? (
                            <span className="mt-2 block font-headline font-semibold" style={{ color: highlightColor }}>
                                {schedule.weekLabel}
                            </span>
                        ) : null}
                    </h2>
                </div>

                {/* GRID */}
                <div className="mt-12">
                    {/* Desktop: 7 columns */}
                    <div className="hidden gap-3 md:grid md:grid-cols-7">
                        {DAYS.map((d) => {
                            const dayItems = grouped[d.key] || [];
                            return (
                                <div key={d.key} className="min-w-0">
                                    <div className="rounded-none bg-[#B21F24] px-3 py-3 text-center text-xs font-semibold uppercase tracking-widest text-white">
                                        {d.label}
                                    </div>

                                    <div className="mt-3 space-y-3">
                                        {dayItems.length ? (
                                            dayItems.map((it) => (
                                                <CourseCard
                                                    key={it._key || `${d.key}-${it.title}-${it.time}`}
                                                    item={it}
                                                />
                                            ))
                                        ) : (
                                            <EmptyCard />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile: stacked list */}
                    <div className="space-y-6 md:hidden">
                        {DAYS.map((d) => {
                            const dayItems = grouped[d.key] || [];
                            return (
                                <div key={d.key}>
                                    <div className="rounded-none bg-[#B21F24] px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-white">
                                        {d.label}
                                    </div>

                                    <div className="mt-3 space-y-3">
                                        {dayItems.length ? (
                                            dayItems.map((it) => (
                                                <CourseCard
                                                    key={it._key || `${d.key}-${it.title}-${it.time}`}
                                                    item={it}
                                                />
                                            ))
                                        ) : (
                                            <div className="rounded-[18px] border border-neutral-200 bg-white px-5 py-5 text-sm text-neutral-500">
                                                Keine Termine
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* NOTE */}
                {schedule.note ? (
                    <div className="mx-auto mt-12 max-w-3xl text-center">
                        <p className="whitespace-pre-line text-sm leading-relaxed text-neutral-700 md:text-base">
                            {schedule.note}
                        </p>
                    </div>
                ) : null}
            </div>
        </section>
    );
}

function EmptyCard() {
    return (
        <div className="rounded-[18px] border border-neutral-200 bg-[#E2DADB]/25 px-4 py-8 text-center text-sm text-neutral-400">
            —
        </div>
    );
}

function CourseCard({ item }) {
    const cancelled = item?.status === "cancelled";

    return (
        <div
            className={cn(
                "rounded-[18px] border px-4 py-5",
                cancelled ? "border-neutral-200 bg-neutral-100" : "border-neutral-200 bg-white",
            )}
        >
            <div
                className={cn(
                    "text-sm font-semibold",
                    cancelled ? "text-neutral-500 line-through" : "text-neutral-900",
                )}
            >
                {item?.title || "Termin"}
            </div>

            {item?.time ? (
                <div className={cn("mt-1 text-xs", cancelled ? "text-neutral-500" : "text-neutral-600")}>
                    {item.time}
                </div>
            ) : null}

            {cancelled ? (
                <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Kurs entfällt
                </div>
            ) : null}

            {item?.description ? (
                <div
                    className={cn(
                        "mt-3 whitespace-pre-line text-sm leading-relaxed",
                        cancelled ? "text-neutral-600" : "text-neutral-700",
                    )}
                >
                    {item.description}
                </div>
            ) : null}
        </div>
    );
}
