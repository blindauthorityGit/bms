// /sections/blog/WissenIndex.jsx
"use client";

import React from "react";
import PostCard from "@/sections/blog/PostCard";

export default function WissenIndex({ posts }) {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-10">
                {/* Headline */}
                <div className="text-center">
                    <h1 className="text-5xl font-light leading-[1.05] tracking-tight text-neutral-900 md:text-6xl">
                        <span className="text-primary font-headline font-semibold">Wissen</span>{" "}
                        <span className="text-neutral-900">&amp; Inspirationen</span>
                    </h1>
                </div>

                {/* Grid */}
                <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2">
                    {posts.map((p) => (
                        <PostCard key={p._id} post={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}
