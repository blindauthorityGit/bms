// app/components/Footer.jsx

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-neutral-200">
            <div className="container mx-auto px-6 py-16">
                {/* TOP */}
                <div className="grid gap-12 md:grid-cols-3">
                    {/* LEFT: LOGO + CLAIM */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Image
                                src="/logo.png"
                                alt="bodysoulmind Logo"
                                width={260}
                                height={80}
                                // className="h-14 w-14"
                                priority={false}
                            />
                        </div>
                    </div>

                    {/* CENTER: ADDRESS */}
                    <div className="space-y-2 text-neutral-700">
                        <div className="text-lg font-semibold font-serif text-neutral-800">
                            bodysoulmind · Tanja Bauer
                        </div>
                        <div className="text-sm leading-6 text-neutral-600">
                            Hofgut Neuhof · Haus 8–9
                            <br />
                            63303 Dreieich-Götzenhain
                        </div>
                    </div>

                    {/* RIGHT: CONTACT */}
                    <div className="space-y-3">
                        <div className="text-lg font-semibold font-serif text-neutral-800">Kontakt</div>
                        <div className="text-sm leading-6 text-neutral-600">
                            <div>
                                Telefon:{" "}
                                <a
                                    className="underline underline-offset-4 hover:text-neutral-800"
                                    href="tel:+4915754148113"
                                >
                                    0157 54148113
                                </a>
                            </div>
                            <div>
                                E-Mail:{" "}
                                <a
                                    className="underline underline-offset-4 hover:text-neutral-800"
                                    href="mailto:bsm-tanja-bauer@web.de"
                                >
                                    kontakt@body-soul-mind.de
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="mt-12 border-t border-neutral-200" />

                {/* BOTTOM LINKS */}
                <div className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
                    <nav className="flex flex-wrap gap-x-10 gap-y-3 text-sm text-neutral-600">
                        <Link className="hover:text-neutral-800" href="/impressum">
                            Impressum
                        </Link>
                        <Link className="hover:text-neutral-800" href="/datenschutz">
                            Datenschutz
                        </Link>
                        <Link className="hover:text-neutral-800" href="/barrierefreiheit">
                            Barrierefreiheitserklärung
                        </Link>
                        <Link className="hover:text-neutral-800" href="/kontakt">
                            Kontakt
                        </Link>
                    </nav>

                    <div className="text-xs text-neutral-500">
                        © {new Date().getFullYear()} bodysoulmind · Tanja Bauer
                    </div>
                </div>
            </div>
        </footer>
    );
}
