// /app/wissen/page.jsx
import { sanityClient } from "@/client";
import { POSTS_INDEX_QUERY } from "@/queries";
import WissenIndex from "@/sections/blog/WissenIndex";

export const revalidate = 60;

export const metadata = {
    title: "Wissen & Inspirationen",
};

export default async function Page() {
    const posts = await sanityClient.fetch(POSTS_INDEX_QUERY);

    return (
        <main>
            <WissenIndex posts={Array.isArray(posts) ? posts : []} />
        </main>
    );
}
