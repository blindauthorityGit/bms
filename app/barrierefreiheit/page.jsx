// app/barrierefreiheit/page.jsx

export const metadata = {
    title: "Erklärung zur Barrierefreiheit | BodySoulMind",
    robots: { index: true, follow: true },
};

export default function BarrierefreiheitPage() {
    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <header className="mb-10">
                <p className="text-sm opacity-70">bodysoulmind · Tanja Bauer</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">Erklärung zur Barrierefreiheit</h1>
                <p className="mt-2 opacity-80">
                    Informationen zur Zugänglichkeit dieser Website gemäß den geltenden gesetzlichen Vorgaben.
                </p>
            </header>

            <section className="space-y-10 leading-relaxed">
                <div>
                    <h2 className="text-lg font-semibold">1. Geltungsbereich</h2>
                    <p className="mt-3">
                        Diese Erklärung zur Barrierefreiheit gilt für die Website
                        <strong> body-soul-mind.de</strong>.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">2. Ziel der Barrierefreiheit</h2>
                    <p className="mt-3">
                        BodySoulMind ist bemüht, diese Website barrierefrei zugänglich zu machen. Grundlage sind die
                        Anforderungen der
                        <strong> Barrierefreie-Informationstechnik-Verordnung (BITV 2.0)</strong>
                        sowie die Vorgaben der
                        <strong> Richtlinie (EU) 2016/2102</strong>.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">3. Stand der Vereinbarkeit</h2>
                    <p className="mt-3">
                        Diese Website ist <strong>teilweise barrierefrei</strong>. Sie entspricht größtenteils den oben
                        genannten Anforderungen, weist jedoch noch einzelne Barrieren auf.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">4. Nicht barrierefreie Inhalte</h2>
                    <p className="mt-3">
                        Die nachstehend aufgeführten Inhalte sind derzeit noch nicht vollständig barrierefrei:
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-5">
                        <li>Einzelne Kontraste können noch nicht optimal sein</li>
                        <li>Animationen und visuelle Effekte sind ggf. nicht vollständig deaktivierbar</li>
                        <li>Texte und Inhalte werden laufend hinsichtlich Verständlichkeit optimiert</li>
                    </ul>
                    <p className="mt-3">
                        Die Beseitigung dieser Barrieren erfolgt schrittweise im Rahmen der technischen und
                        gestalterischen Weiterentwicklung der Website.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">5. Erstellung dieser Erklärung</h2>
                    <p className="mt-3">
                        Diese Erklärung wurde am <strong>Februar 2026</strong> erstellt.
                    </p>
                    <p className="mt-3">
                        Die Bewertung der Website erfolgte durch eine
                        <strong> Selbstbewertung</strong>.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">6. Feedback und Kontakt</h2>
                    <p className="mt-3">
                        Sollten Ihnen Mängel in Bezug auf die barrierefreie Gestaltung dieser Website auffallen oder
                        möchten Sie Informationen zu nicht barrierefreien Inhalten erhalten, können Sie uns gerne
                        kontaktieren:
                    </p>
                    <p className="mt-3">
                        E-Mail:{" "}
                        <a className="underline underline-offset-4" href="mailto:bsm-tanja-bauer@web.de">
                            bsm-tanja-bauer@web.de
                        </a>
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">7. Durchsetzungsverfahren</h2>
                    <p className="mt-3">
                        Wenn Sie der Ansicht sind, dass Sie durch eine nicht ausreichende barrierefreie Gestaltung
                        dieser Website benachteiligt sind und Ihre Anfrage nicht zufriedenstellend beantwortet wurde,
                        können Sie sich an die zuständige Durchsetzungsstelle wenden.
                    </p>
                </div>
            </section>
        </main>
    );
}
