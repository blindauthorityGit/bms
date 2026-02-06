// app/datenschutz/page.jsx

export const metadata = {
    title: "Datenschutzerklärung | BodySoulMind",
    robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
            <header className="mb-10">
                <p className="text-sm opacity-70">bodysoulmind · Tanja Bauer</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">Datenschutzerklärung</h1>
                <p className="mt-2 opacity-80">
                    Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO und TMG.
                </p>
            </header>

            <section className="space-y-10 leading-relaxed">
                <div>
                    <h2 className="text-lg font-semibold">1. Verantwortliche Stelle</h2>
                    <div className="mt-3 space-y-1">
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
                            Website:{" "}
                            <a
                                className="underline underline-offset-4"
                                href="https://body-soul-mind.de"
                                target="_blank"
                                rel="noreferrer"
                            >
                                body-soul-mind.de
                            </a>
                        </p>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">2. Allgemeine Hinweise zur Datenverarbeitung</h2>
                    <p className="mt-3">
                        Diese Website dient der Bereitstellung von Informationen über das Angebot von BodySoulMind.
                        Personenbezogene Daten werden nur dann verarbeitet, wenn Sie uns diese freiwillig mitteilen (z.
                        B. über das Kontaktformular oder bei der Newsletter-Anmeldung).
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">3. Hosting über Vercel</h2>
                    <p className="mt-3">
                        Diese Website wird bei <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723,
                        USA gehostet.
                    </p>
                    <p className="mt-3">
                        Beim Aufruf der Website erhebt Vercel automatisch sogenannte Server-Logfiles, die folgende Daten
                        enthalten können:
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-5">
                        <li>IP-Adresse</li>
                        <li>Datum und Uhrzeit der Anfrage</li>
                        <li>Aufgerufene Seite</li>
                        <li>Browsertyp und Browserversion</li>
                        <li>Betriebssystem</li>
                        <li>Referrer-URL</li>
                    </ul>
                    <p className="mt-3">
                        Diese Daten sind technisch erforderlich, um die Website stabil und sicher bereitzustellen.
                    </p>
                    <p className="mt-3">
                        Vercel verarbeitet diese Daten auf Grundlage von Standardvertragsklauseln (SCCs) gemäß Art. 46
                        DSGVO.
                    </p>
                    <p className="mt-3">
                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem
                        und zuverlässigem Betrieb der Website)
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">4. Einsatz von Next.js</h2>
                    <p className="mt-3">
                        Diese Website wurde mit dem Framework <strong>Next.js</strong> erstellt. Next.js dient
                        ausschließlich der technischen Auslieferung der Inhalte. Es findet keine eigenständige Analyse,
                        Profilbildung oder Nutzerverfolgung statt.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">5. Kontaktformular</h2>
                    <p className="mt-3">
                        Wenn Sie uns über das Kontaktformular kontaktieren, werden die von Ihnen eingegebenen Daten (z.
                        B. Name, E-Mail-Adresse, Nachricht) zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet.
                    </p>
                    <p className="mt-3">
                        Die Daten werden nicht ohne Ihre Einwilligung weitergegeben und nur so lange gespeichert, wie es
                        für die Bearbeitung der Anfrage erforderlich ist.
                    </p>
                    <p className="mt-3">
                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen)
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">6. Newsletter (Mailchimp)</h2>
                    <p className="mt-3">
                        Für den Versand unseres Newsletters nutzen wir den Dienst <strong>Mailchimp</strong>, ein
                        Angebot der <strong>Intuit Inc.</strong>, 2700 Coast Ave, Mountain View, CA 94043, USA.
                    </p>
                    <p className="mt-3">
                        Wenn Sie sich für unseren Newsletter anmelden, werden die von Ihnen angegebenen Daten (z. B.
                        E-Mail-Adresse, ggf. Name) an Mailchimp übermittelt und dort gespeichert.
                    </p>
                    <p className="mt-3">
                        Die Anmeldung erfolgt im <strong>Double-Opt-in-Verfahren</strong>. Sie können den Newsletter
                        jederzeit über den Abmeldelink im Newsletter abbestellen.
                    </p>
                    <p className="mt-3">
                        Mailchimp verarbeitet Daten auf Grundlage von Standardvertragsklauseln (SCCs) gemäß Art. 46
                        DSGVO.
                    </p>
                    <p className="mt-3">
                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">7. Cookies</h2>
                    <p className="mt-3">
                        Diese Website verwendet keine Cookies zu Analyse-, Tracking- oder Marketingzwecken.
                    </p>
                    <p className="mt-3">
                        Es können technisch notwendige Cookies durch den Hosting- oder Serverbetrieb entstehen, die für
                        die Funktionalität der Website erforderlich sind.
                    </p>
                    <p className="mt-3">
                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">8. Externe Links</h2>
                    <p className="mt-3">
                        Diese Website enthält Links zu externen Websites. Für deren Inhalte und Datenschutzpraktiken
                        übernehmen wir keine Verantwortung.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">9. Ihre Rechte</h2>
                    <p className="mt-3">Sie haben jederzeit das Recht auf:</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5">
                        <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                        <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                    </ul>
                    <p className="mt-3">
                        Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen geltendes Datenschutzrecht verstößt,
                        haben Sie das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">10. Datensicherheit</h2>
                    <p className="mt-3">
                        Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten bestmöglich
                        vor Verlust, Manipulation oder unbefugtem Zugriff zu schützen.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold">11. Aktualität und Änderungen</h2>
                    <p className="mt-3">
                        Diese Datenschutzerklärung ist aktuell gültig und hat den Stand <strong>Februar 2026</strong>.
                        Durch Weiterentwicklung der Website oder gesetzliche Änderungen kann eine Anpassung erforderlich
                        werden.
                    </p>
                </div>
            </section>
        </main>
    );
}
