import React from "react";
import { sanityClient } from "@/client";
import EventCard from "@/sections/events/EventCard";
import { EVENTS_INDEX_QUERY } from "@/queries";

export const revalidate = 60;

export default async function Page() {
    const events = await sanityClient.fetch(EVENTS_INDEX_QUERY);

    return (
        <main>
            {/* Headline */}
            <section className="relative w-full bg-white">
                <div className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-10">
                    <h1 className="text-center text-5xl font-light leading-[0.95] tracking-tight text-neutral-900 md:text-6xl">
                        <span>Kommende </span>
                        <span className="font-headline font-semibold text-[#BE1622]">Workshops / Events</span>
                    </h1>
                </div>
            </section>

            {/* Grid */}
            <section className="relative w-full bg-white pb-24">
                <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
                    {Array.isArray(events) && events.length ? (
                        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                            {events.map((e) => (
                                <EventCard key={e._id} event={e} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center text-neutral-600">Aktuell sind keine Events geplant.</div>
                    )}
                </div>
            </section>
        </main>
    );
}
