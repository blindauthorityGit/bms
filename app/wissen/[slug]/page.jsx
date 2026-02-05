// /app/wissen/[slug]/page.jsx
import { notFound } from "next/navigation";
import { sanityClient } from "@/client";
import { POST_BY_SLUG_QUERY } from "@/queries";
import PostDetail from "@/sections/blog/PostDetail";

// optional SSG
export const revalidate = 60;

export default async function Page({ params }) {
    const { slug } = await params;

    const post = await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug });

    if (!post?._id) return notFound();

    return (
        <main>
            <PostDetail post={post} />
        </main>
    );
}

// /app/wissen/[slug]/page.jsx (unten ergänzen)
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug });

    if (!post?._id) return {};

    const title = post?.seo?.metaTitle || post.title;
    const description = post?.seo?.metaDescription || post.excerpt || "";

    return {
        title,
        description,
        robots: post?.seo?.noIndex ? "noindex,nofollow" : "index,follow",
        openGraph: {
            title,
            description,
            images: post?.seo?.ogImage?.asset?.url ? [post.seo.ogImage.asset.url] : [],
        },
    };
}
