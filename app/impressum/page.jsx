// app/impressum/page.tsx

export const metadata = {
    title: "Impressum | BodySoulMind",
    robots: { index: true, follow: true },
};

export default function ImpressumPage() {
    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <header className="mb-10">
                <p className="text-sm opacity-70">bodysoulmind · Tanja Bauer</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">Impressum</h1>
                <p className="mt-2 opacity-80">Angaben gem. § 5 TMG</p>
            </header>

            <section className="space-y-10">
                <div>
                    <h2 className="text-lg font-semibold">Betreiberin und Kontakt</h2>
                    <div className="mt-3 space-y-1 leading-relaxed">
                        <p>Tanja-Patricia Bauer</p>
                        <p>Hofgut Neuhof · Haus 8–9</p>
                        <p>63303 Dreieich-Götzenhain</p>
                        <p>
                            E-Mail:{" "}
                            <a className="underline underline-offset-4" href="mailto:bsm-tanja-bauer@web.de">
                                bsm-tanja-bauer@web.de
                            </a>
                        </p>
                        <p>
                            Web:{" "}
                            <a
                                className="underline underline-offset-4"
                                href="https://body-soul-mind.de"
                                target="_blank"
                                rel="noreferrer"
                            >
                                body-soul-mind.de
                            </a>
                        </p>
                        <p>
                            Telefon:{" "}
                            <a className="underline underline-offset-4" href="tel:+4915754148113">
                                0157 5414 8113
                            </a>
                        </p>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">Inhaltlich verantwortlich gem. § 55 II RStV</h2>
                    <p className="mt-3 leading-relaxed">Tanja-Patricia Bauer</p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">Steuer-Nummer</h2>
                    <p className="mt-3 leading-relaxed">2880400245</p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">USt-IDNummer</h2>
                    <p className="mt-3 leading-relaxed">DE425473383</p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">Fotos</h2>
                    <p className="mt-3 leading-relaxed">Matthias Raith</p>
                </div>
            </section>
        </main>
    );
}
