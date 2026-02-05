import Image from "next/image";
import ContactForm from "./ContactForm";
import { Suspense } from "react";

export default function KontaktPage() {
    return (
        <main className="">
            {/* HERO */}
            <section className="px-6 pt-16 pb-10">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Kontakt &amp; Anmeldung</h1>

                            <p className="mt-4 max-w-prose text-base md:text-lg text-black/70">
                                Ob Fragen, Terminwunsch oder Anmeldung: Sag mir kurz, worum es geht – ich melde mich
                                zeitnah mit den nächsten Schritten.
                            </p>

                            <div className="mt-8 space-y-2 text-sm md:text-base">
                                <div className="font-semibold">bodysoulmind • Tanja Bauer</div>
                                <div>Hofgut Neuhof • Haus 8–9</div>
                                <div>63303 Dreieich-Götzenhain</div>

                                <div className="pt-4 space-y-2">
                                    <div>
                                        <span className="font-semibold">Telefon:</span>{" "}
                                        <a
                                            className="underline underline-offset-4 hover:opacity-80"
                                            href="tel:+4915754148113"
                                        >
                                            0157 54148113
                                        </a>
                                    </div>
                                    <div>
                                        <span className="font-semibold">E-Mail:</span>{" "}
                                        <a
                                            className="underline underline-offset-4 hover:opacity-80"
                                            href="mailto:bsm-tanja-bauer@web.de"
                                        >
                                            bsm-tanja-bauer@web.de
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Optionales Bild */}
                        <div className="relative overflow-hidden rounded-2xl bg-black/5 min-h-[240px] lg:min-h-[560px]">
                            <Image
                                src="/Entspannung.jpg"
                                alt="Portrait / Praxis"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FORMULAR */}
            <section className="px-6 pb-20">
                <div className="mx-auto max-w-6xl">
                    <div className="rounded-2xl bg-white/70 backdrop-blur border border-black/10 p-6 md:p-10">
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Formular</h2>
                        <p className="mt-2 text-sm md:text-base text-black/70">
                            Wähle dein Anliegen – danach siehst du die passenden Felder.
                        </p>

                        <div className="mt-8">
                            <Suspense fallback={<div className="text-sm text-black/60">Lade Formular…</div>}>
                                <ContactForm />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
