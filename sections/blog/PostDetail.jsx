// /sections/blog/PostDetail.jsx
"use client";

import React from "react";
import { PortableText } from "@portabletext/react";
import PostPortableTextComponents from "@/sections/blog/PostPortableTextComponents";

export default function PostDetail({ post }) {
    const coverUrl = post?.coverImage?.asset?.url;

    return (
        <article className="mx-auto w-full max-w-[1100px] px-6 py-16 lg:px-10">
            {/* Top meta */}
            <header className="grid gap-10 lg:grid-cols-[420px_1fr] lg:items-start">
                {/* Cover */}
                <div className="relative">
                    {coverUrl ? (
                        <img
                            src={coverUrl}
                            alt={post?.coverImage?.alt || post?.title || ""}
                            className="w-full max-w-[420px] object-cover"
                        />
                    ) : null}
                </div>

                {/* Title + excerpt */}
                <div>
                    <h1 className="text-5xl font-light leading-[1.05] tracking-tight text-neutral-900 md:text-6xl">
                        {post.title}
                    </h1>

                    {post.excerpt ? (
                        <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-neutral-700 md:text-base">
                            {post.excerpt}
                        </p>
                    ) : null}

                    <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                        {post.publishedAt ? (
                            <span>
                                {new Date(post.publishedAt).toLocaleDateString("de-DE", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        ) : null}
                        {post.readingTime ? <span>•</span> : null}
                        {post.readingTime ? <span>{post.readingTime} Min Lesezeit</span> : null}
                        {post.category?.title ? <span>•</span> : null}
                        {post.category?.title ? <span>{post.category.title}</span> : null}
                    </div>
                </div>
            </header>

            {/* Body */}
            {Array.isArray(post.body) ? (
                <div className="mt-16">
                    <PortableText value={post.body} components={PostPortableTextComponents} />
                </div>
            ) : null}
        </article>
    );
}
