// Beispiel: /app/ueber-mich/page.jsx (oder wo auch immer)
import { sanityClient } from "@/client";
import { ABOUT_PAGE_QUERY } from "@/queries";
import AusbildungenSection from "@/sections/AusbildungenSection";
import TextImageSection from "@/sections/TextImageSection";
import DecoImageSection from "@/sections/DecoImageSection";

export const revalidate = 60;

export default async function Page() {
    const data = await sanityClient.fetch(ABOUT_PAGE_QUERY);

    console.log(data);

    return (
        <main>
            <TextImageSection data={data.intro} />
            <TextImageSection data={data.meinWeg} />

            {(data?.sections || []).map((s) => {
                if (s._type === "ausbildungenSection") {
                    return <AusbildungenSection key={s._key} data={s} />;
                }
                return null;
            })}
            <div className="relative z-10">
                <DecoImageSection data={data?.decoImage} />
            </div>
        </main>
    );
}
