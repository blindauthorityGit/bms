import React from "react";
import SectionLine from "@/components/ui/SectionLine";

export default function SimpleText({ data, className = "" }) {
    if (!data) return null;

    return (
        <section className={`relative w-full bg-white ${className}`}>
            <SectionLine direction="down" length={120} overlap={60} />

            <div className="h-24"></div>
            <div className="mx-auto w-full max-w-[1200px] px-6 py-24 md:py-32">
                <div className="mx-auto max-w-[980px] text-center">
                    {/* Text */}
                    {data.text ? (
                        <p className="font-headline text-3xl font-light leading-loose text-neutral-900 md:text-2xl">
                            {data.text}
                        </p>
                    ) : null}
                </div>

                {/* Optional: wenn du hier den Strich direkt drunter willst */}
                {/* <SectionLine direction="down" length={120} overlap={60} /> */}
            </div>
        </section>
    );
}
