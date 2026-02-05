// /sections/blog/PostCard.jsx
"use client";

import React from "react";
import Link from "next/link";

function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
        return new Date(dateStr).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    } catch {
        return "";
    }
}

export default function PostCard({ post }) {
    const href = `/wissen/${post.slug}`;
    const imgUrl = post?.coverImage?.asset?.url;
    const date = formatDate(post?.publishedAt);
    const rt = post?.readingTime ? `${post.readingTime} Min Lesezeit` : null;

    return (
        <article className="text-center">
            <Link href={href} className="group block">
                {/* Image */}
                <div className="relative mx-auto w-full overflow-hidden bg-neutral-100">
                    {imgUrl ? (
                        <img
                            src={imgUrl}
                            alt={post?.coverImage?.alt || post?.title || ""}
                            className="h-auto w-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="aspect-[16/9] w-full bg-neutral-200" />
                    )}

                    {/* Category badge */}
                    {post?.category?.title ? (
                        <div className="absolute left-5 top-5">
                            <span className="inline-flex items-center rounded-full bg-[#BE1622] px-3 py-1 text-[11px] font-semibold text-white">
                                {post.category.title}
                            </span>
                        </div>
                    ) : null}
                </div>

                {/* Meta */}
                {date || rt ? (
                    <div className="mt-6 text-[11px] text-neutral-500">
                        {date}
                        {date && rt ? " • " : null}
                        {rt}
                    </div>
                ) : null}

                {/* Title */}
                <h2 className="mt-3 text-2xl font-semibold text-neutral-900 md:text-3xl">{post.title}</h2>

                {/* Excerpt */}
                {post.excerpt ? (
                    <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-neutral-700">{post.excerpt}</p>
                ) : null}

                {/* Read more */}
                <div className="mt-6">
                    <span className="text-sm underline decoration-neutral-300 underline-offset-4 group-hover:decoration-neutral-900">
                        Mehr lesen
                    </span>
                </div>
            </Link>
        </article>
    );
}
