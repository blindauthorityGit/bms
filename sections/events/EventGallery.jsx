"use client";

import React from "react";

export default function EventGallery({ images = [] }) {
    if (!Array.isArray(images) || !images.length) return null;

    return (
        <section className="mt-16">
            <h2 className="text-3xl font-headline font-semibold text-neutral-900 md:text-4xl">Impressionen</h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {images.map((img) => {
                    const url = img?.asset?.url;
                    if (!url) return null;

                    return (
                        <div key={img._key} className="overflow-hidden rounded-[22px] bg-neutral-100">
                            <img src={url} alt={img?.alt || ""} className="h-auto w-full object-cover" loading="lazy" />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
