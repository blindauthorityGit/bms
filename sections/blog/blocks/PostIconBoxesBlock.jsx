// /sections/blog/blocks/PostIconBoxesBlock.jsx
"use client";
import React from "react";

export default function PostIconBoxesBlock({ data }) {
    if (!data) return null;

    const items = Array.isArray(data.items) ? data.items : [];
    if (!items.length) return null;

    return (
        <section className="mt-16">
            {data.headline ? (
                <h2 className="text-center text-4xl font-light leading-[1.05] tracking-tight text-neutral-900 md:text-5xl">
                    {data.headline}
                </h2>
            ) : null}

            <div className="mt-12 grid gap-10 lg:grid-cols-3">
                {items.map((box) => {
                    const iconUrl = box?.icon?.asset?.url;
                    const steps = Array.isArray(box.steps) ? box.steps : [];
                    const showNumbers = typeof box.showNumbers === "boolean" ? box.showNumbers : !!data.showNumbers;

                    return (
                        <div
                            key={box._key}
                            className="rounded-[28px] border border-neutral-300 bg-white px-10 py-10 text-center"
                        >
                            {iconUrl ? (
                                <img
                                    src={iconUrl}
                                    alt={box?.icon?.alt || box?.title || ""}
                                    className="mx-auto h-10 w-10"
                                />
                            ) : null}

                            {box.title ? (
                                <h3 className="mt-6 text-2xl font-headline text-neutral-900">{box.title}</h3>
                            ) : null}

                            {steps.length ? (
                                <div className="mt-6 space-y-5 text-sm leading-relaxed text-neutral-700">
                                    {steps.map((s, idx) => (
                                        <div key={s._key || idx}>
                                            {showNumbers ? (
                                                <div className="font-semibold text-neutral-900">
                                                    {s.number || idx + 1}
                                                </div>
                                            ) : null}
                                            {s.text ? <div className="mt-1">{s.text}</div> : null}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
