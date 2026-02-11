import React from "react";
import SectionLine from "@/components/ui/SectionLine";

export default function VideoSection() {
    return (
        <section className="w-full bg-white relative py-16 lg:py-24">
            <SectionLine direction="down" length={120} overlap={60} />

            <div className="mx-auto w-full px-6 lg:px-10">
                <div className="flex justify-center">
                    {/* 
                      Mobile: full width
                      Desktop: fixed-ish portrait width
                    */}
                    <div className="w-full max-w-[560px] lg:max-w-[420px] xl:max-w-[460px]">
                        <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-neutral-100 shadow-sm">
                            <video className="w-full h-auto" controls preload="metadata" playsInline>
                                <source src="/tb.mp4" type="video/mp4" />
                                Dein Browser unterstützt das Video-Tag nicht.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
