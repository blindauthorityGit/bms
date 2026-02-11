import Hero from "@/components/hero/Hero";
import { sanityClient } from "@/client";
import { HOME_PAGE_QUERY } from "@/queries";
import IconGridSection from "@/sections/IconGridSection";
import TextImageSection from "@/sections/TextImageSection";
import CtaSection from "@/sections/CtaSection";
import WaysSection from "@/sections/WaysSection";
import DecoImageSection from "@/sections/DecoImageSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import BlogSection from "@/sections/BlogSection";

export const revalidate = 60;

export default async function Page() {
    const data = await sanityClient.fetch(HOME_PAGE_QUERY);

    console.log(data);
    console.log(data.blogSection.posts);

    if (!data) {
        return (
            <main className="p-6">
                <h1 className="text-2xl font-semibold">Home</h1>
                <p className="mt-2 opacity-70">Keine HomePage Daten in Sanity gefunden.</p>
            </main>
        );
    }

    return (
        <main>
            <Hero hero={data.hero} />
            <div className="h-12"></div>
            <IconGridSection data={data.iconGridRef?.iconGrid} />
            <TextImageSection data={data.aboutTeaser} />
            <CtaSection data={data.cta} />
            {data?.waysSection ? <WaysSection data={data.waysSection} /> : null}
            <div className="relative z-10">
                <DecoImageSection data={data?.decoImage} />
            </div>
            {data?.testimonials ? <TestimonialsSection data={data.testimonials} /> : null}
            <BlogSection data={data?.blogSection} />
            <div className="h-12"></div>
            <TextImageSection data={data.bereitSection} />

            {/* weitere Sections später */}
        </main>
    );
}
