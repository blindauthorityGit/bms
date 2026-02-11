import SmallHero from "@/components/hero/SmallHero";
import { sanityClient } from "@/client";
import { LONGEVITY_PAGE_QUERY } from "@/queries";
import IconGridSection from "@/sections/IconGridSection";
import TextImageSection from "@/sections/TextImageSection";
import CtaSection from "@/sections/CtaSection";
import WaysSection from "@/sections/WaysSection";
import DecoImageSection from "@/sections/DecoImageSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import BenefitsSection from "@/sections/BenefitsSection";
import ProgrammAblaufSection from "@/sections/ProgrammAblaufSection";
import VideoSection from "@/sections/VideoSection";

export const revalidate = 60;

export default async function Page() {
    const data = await sanityClient.fetch(LONGEVITY_PAGE_QUERY);

    console.log(data);

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
            {/* <SmallHero hero={data.hero} /> */}
            <TextImageSection data={data.introSection} />
            <div className="h-12"></div>
            <ProgrammAblaufSection data={data.programmAblauf} />
            <BenefitsSection data={data.benefits} />
            <div className="h-12"></div>

            <TextImageSection data={data.geignet} />
            <BenefitsSection data={data.teilnahme} />

            <IconGridSection data={data.iconGridRef?.iconGrid} />
            <VideoSection></VideoSection>
            <CtaSection data={data.cta} />
            {/* weitere Sections später */}
        </main>
    );
}
