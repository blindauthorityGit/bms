import SmallHero from "@/components/hero/SmallHero";
import { sanityClient } from "@/client";
import { YOGA_QUERY, WEEKLY_SCHEDULE_QUERY } from "@/queries";
import IconGridSection from "@/sections/IconGridSection";
import TextImageSection from "@/sections/TextImageSection";
import CtaSection from "@/sections/CtaSection";
import WaysSection from "@/sections/WaysSection";
import DecoImageSection from "@/sections/DecoImageSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import BenefitsSection from "@/sections/BenefitsSection";
import ProgrammAblaufSection from "@/sections/ProgrammAblaufSection";
import VideoSection from "@/sections/VideoSection";
import WeeklyScheduleSection from "@/sections/WeeklyScheduleSecion";

export const revalidate = 60;

export default async function Page() {
    const [data, weeklySchedule] = await Promise.all([
        sanityClient.fetch(YOGA_QUERY),
        sanityClient.fetch(WEEKLY_SCHEDULE_QUERY),
    ]);

    console.log("LONGEVITY_PAGE_QUERY:", data);
    console.log("WEEKLY_SCHEDULE_QUERY:", weeklySchedule);

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
            <TextImageSection data={data.section2} />
            <div className="h-12"></div>
            <div className="h-12"></div>
            <WeeklyScheduleSection schedule={weeklySchedule} background="white" /> <div className="h-12"></div>
            <TextImageSection data={data.section3} />
            <div className="h-12"></div>
            <TextImageSection data={data.section4} />
            <div className="h-12"></div>
            <TextImageSection data={data.section5} />
            {/* <CtaSection data={data.cta} /> */}
            {/* weitere Sections später */}
        </main>
    );
}
