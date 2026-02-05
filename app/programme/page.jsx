import SmallHero from "@/components/hero/SmallHero";
import { sanityClient } from "@/client";
import { PROGRAMME_PAGE_QUERY } from "@/queries";
import IconGridSection from "@/sections/IconGridSection";
import TextImageSection from "@/sections/TextImageSection";
import SimpleText from "@/sections/SimpleText";
import WaysSection from "@/sections/WaysSection";
import DecoImageSection from "@/sections/DecoImageSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import BenefitsSection from "@/sections/BenefitsSection";
import ProgrammAblaufSection from "@/sections/ProgrammAblaufSection";

export const revalidate = 60;

export default async function Programme() {
    const data = await sanityClient.fetch(PROGRAMME_PAGE_QUERY);

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
            <SmallHero hero={data.hero} />
            <SimpleText data={data.intro} />
            <TextImageSection data={data.achtwochen} />
            <TextImageSection data={data.coaching} />
            <TextImageSection data={data.workshops} />
            <TextImageSection data={data.about} />
            <div className="h-12"></div>
            {/* weitere Sections später */}
        </main>
    );
}
