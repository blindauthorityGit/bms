"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sanityClient } from "@/client";

const ANLIEGEN = [
    { key: "schmerztherapie", label: "Schmerztherapie nach Liebscher & Bracht" },
    { key: "8-wochen-programm", label: "8-Wochen-Programm (Longevity-Coaching)" },
    { key: "1-1-coaching", label: "1:1-Coaching" },
    { key: "workshops-events-specials", label: "Workshops / Events / Specials" },
    { key: "yoga", label: "Yoga" },
    { key: "allgemein", label: "Allgemeine Fragen" },
];

const DEFAULT_ANLIEGEN = "schmerztherapie";

// Sanity: kleine Liste für Dropdown
const EVENTS_FOR_CONTACT_QUERY = `
*[_type == "event" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  "categoryTitle": category->title,
  "nextDate": dates[defined(start)] | order(start asc)[0]{
    start
  }
}
`;

function sanitizeAnliegen(value) {
    if (!value) return DEFAULT_ANLIEGEN;
    const v = String(value).toLowerCase().trim();
    const found = ANLIEGEN.some((a) => a.key === v);
    return found ? v : DEFAULT_ANLIEGEN;
}

function sanitizeEventSlug(value) {
    if (!value) return "";
    return String(value).trim();
}

function Input({ label, name, value, onChange, placeholder, required = false }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-black/80">
                {label}
                {required ? "*" : ""}
            </span>
            <input
                className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base outline-none focus:border-black/30"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </label>
    );
}

function Select({ label, name, value, onChange, children, required = false }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-black/80">
                {label}
                {required ? "*" : ""}
            </span>
            <select
                className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base outline-none focus:border-black/30"
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            >
                {children}
            </select>
        </label>
    );
}

function Textarea({ label, name, value, onChange, placeholder, required = false }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-black/80">
                {label}
                {required ? "*" : ""}
            </span>
            <textarea
                className="mt-2 w-full min-h-[140px] rounded-xl border border-black/15 bg-white px-4 py-3 text-base outline-none focus:border-black/30"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </label>
    );
}

// Welche Zusatzfelder sollen bei welchem Anliegen auftauchen?
const FIELDS_BY_ANLIEGEN = {
    schmerztherapie: [
        { name: "beschwerden", label: "Beschwerden / Schmerzbild", type: "text" },
        { name: "dauer", label: "Seit wann besteht das?", type: "text" },
        { name: "arztinfo", label: "Ärztliche Abklärung / Diagnosen (optional)", type: "text" },
        { name: "termin", label: "Wunschtermin / Zeitfenster", type: "text" },
    ],
    "8-wochen-programm": [
        { name: "start", label: "Startinteresse", type: "text" },
        { name: "praeferenz", label: "Präferenz (vor Ort / online)", type: "text" },
        { name: "zeiten", label: "Wochentage / Uhrzeiten", type: "text" },
        { name: "gesundheit", label: "Hinweis Gesundheit (optional)", type: "text" },
    ],
    "1-1-coaching": [
        { name: "ziel", label: "Worum geht’s im Coaching?", type: "text" },
        { name: "praeferenz", label: "Präferenz (vor Ort / online)", type: "text" },
        { name: "zeiten", label: "Wochentage / Uhrzeiten", type: "text" },
    ],
    "workshops-events-specials": [
        // workshop/event kommt jetzt als dropdown (Sanity) → nicht mehr als Textfeld
        { name: "personen", label: "Teilnehmerzahl (optional)", type: "text" },
        { name: "termin", label: "Termin / Zeitraum", type: "text" },
    ],
    yoga: [
        { name: "yogaArt", label: "Yoga-Art / Interesse", type: "text" },
        { name: "level", label: "Level (Anfänger:in / Fortgeschritten)", type: "text" },
        { name: "zeiten", label: "Wochentage / Uhrzeiten", type: "text" },
    ],
    allgemein: [{ name: "thema", label: "Thema / Frage", type: "text" }],
};

function formatMonthYear(dateStr) {
    if (!dateStr) return "";
    try {
        return new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(new Date(dateStr));
    } catch {
        return "";
    }
}

export default function ContactForm() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const queryAnliegen = searchParams.get("anliegen");
    const queryEvent = searchParams.get("event");

    const initialAnliegen = useMemo(() => sanitizeAnliegen(queryAnliegen), [queryAnliegen]);
    const initialEventSlug = useMemo(() => sanitizeEventSlug(queryEvent), [queryEvent]);

    const [anliegen, setAnliegen] = useState(initialAnliegen);

    // Sanity Events
    const [events, setEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(false);
    const [eventsError, setEventsError] = useState("");

    // Dropdown selection (slug)
    const [selectedEvent, setSelectedEvent] = useState(initialEventSlug);

    const [form, setForm] = useState({
        vorname: "",
        nachname: "",
        email: "",
        telefon: "",
        kurzbeschreibung: "",
        verfuegbarkeit: "",
        consent: false,
        newsletter: false,
        // dynamische Felder landen ebenfalls hier
    });

    // Helper: URL params update
    function replaceQuery(next) {
        const sp = new URLSearchParams(Array.from(searchParams.entries()));
        Object.entries(next).forEach(([k, v]) => {
            if (v === null || v === undefined || v === "") sp.delete(k);
            else sp.set(k, String(v));
        });
        const qs = sp.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }

    // Wenn URL sich ändert: Anliegen übernehmen
    useEffect(() => {
        const next = sanitizeAnliegen(queryAnliegen);
        setAnliegen(next);
    }, [queryAnliegen]);

    // Wenn URL sich ändert: event übernehmen (nur wenn Anliegen passt)
    useEffect(() => {
        const nextEvent = sanitizeEventSlug(queryEvent);
        if (sanitizeAnliegen(queryAnliegen) === "workshops-events-specials") {
            setSelectedEvent(nextEvent);
        }
    }, [queryEvent, queryAnliegen]);

    // Lazy fetch events, sobald Anliegen = Workshops
    useEffect(() => {
        let alive = true;

        async function loadEvents() {
            setEventsLoading(true);
            setEventsError("");
            try {
                const res = await sanityClient.fetch(EVENTS_FOR_CONTACT_QUERY);
                if (!alive) return;
                console.log(res);
                setEvents(Array.isArray(res) ? res : []);
            } catch (e) {
                if (!alive) return;
                setEventsError("Events konnten nicht geladen werden.");
            } finally {
                if (!alive) return;
                setEventsLoading(false);
            }
        }

        if (anliegen === "workshops-events-specials") {
            // nur einmal laden, wenn leer
            if (!events.length && !eventsLoading) loadEvents();
        } else {
            // wenn wegwechseln: selection/param entfernen
            setSelectedEvent("");
            replaceQuery({ event: "" });
        }

        return () => {
            alive = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anliegen]);

    function onPickAnliegen(nextKey) {
        setAnliegen(nextKey);

        // wenn Workshops: event param behalten (falls vorhanden), sonst löschen
        if (nextKey !== "workshops-events-specials") {
            setSelectedEvent("");
            replaceQuery({ anliegen: nextKey, event: "" });
        } else {
            replaceQuery({ anliegen: nextKey });
        }
    }

    function onChange(e) {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    // Dropdown Change (Event)
    function onPickEvent(e) {
        const slug = e.target.value;
        setSelectedEvent(slug);

        // in URL spiegeln
        replaceQuery({ event: slug });

        // optional: im form-state speichern (für später Mail/Subject)
        setForm((prev) => ({
            ...prev,
            event: slug,
        }));
    }

    const dynamicFields = FIELDS_BY_ANLIEGEN[anliegen] || [];

    const selectedEventObj = useMemo(() => {
        if (!selectedEvent) return null;
        return events.find((ev) => ev.slug === selectedEvent) || null;
    }, [events, selectedEvent]);

    function onSubmit(e) {
        e.preventDefault();

        const payload = {
            anliegen,
            selectedEvent: selectedEventObj ? { slug: selectedEventObj.slug, title: selectedEventObj.title } : null,
            ...form,
        };

        console.log("SUBMIT", payload);
        alert("Danke! Formular wurde (demo) abgeschickt.");
    }

    return (
        <form onSubmit={onSubmit} className="space-y-10">
            {/* Anliegen */}
            <div>
                <div className="text-lg font-semibold">Anliegen</div>

                <div className="mt-4 rounded-2xl border border-black/15 bg-white p-3">
                    <div className="flex flex-wrap gap-2">
                        {ANLIEGEN.map((a) => {
                            const active = a.key === anliegen;
                            return (
                                <button
                                    key={a.key}
                                    type="button"
                                    onClick={() => onPickAnliegen(a.key)}
                                    className={[
                                        "px-4 py-2 rounded-full border text-sm transition",
                                        active
                                            ? "border-black/30 bg-black text-white"
                                            : "border-black/15 bg-white hover:bg-black/5",
                                    ].join(" ")}
                                >
                                    {a.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Kontaktdaten */}
            <div className="space-y-6">
                <div className="text-lg font-semibold">Kontaktdaten</div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Input label="Vorname" name="vorname" value={form.vorname} onChange={onChange} required />
                    <Input label="Nachname" name="nachname" value={form.nachname} onChange={onChange} required />
                    <Input
                        label="E-Mail"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="name@email.de"
                        required
                    />
                    <Input
                        label="Telefon (optional)"
                        name="telefon"
                        value={form.telefon}
                        onChange={onChange}
                        placeholder="+49 …"
                    />
                </div>
            </div>

            {/* Dynamische Details */}
            <div className="space-y-6">
                <div className="text-lg font-semibold">Details (optional)</div>

                <div className="rounded-2xl bg-black/5 border border-black/10 p-5">
                    <div className="text-sm font-semibold text-black/70 mb-4">
                        Fall: {ANLIEGEN.find((x) => x.key === anliegen)?.label}
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* ✅ Workshop/Event Dropdown nur bei passendem Anliegen */}
                        {anliegen === "workshops-events-specials" ? (
                            <div className="md:col-span-3">
                                <Select
                                    label="Welcher Workshop/Event?"
                                    name="event"
                                    value={selectedEvent}
                                    onChange={onPickEvent}
                                >
                                    <option value="">Bitte auswählen…</option>

                                    {eventsLoading ? <option value="">Lade Events…</option> : null}
                                    {eventsError ? <option value="">{eventsError}</option> : null}

                                    {!eventsLoading && !eventsError
                                        ? events.map((ev) => {
                                              const meta = ev?.nextDate?.start
                                                  ? ` · ${formatMonthYear(ev.nextDate.start)}`
                                                  : "";
                                              const cat = ev?.categoryTitle ? ` (${ev.categoryTitle})` : "";
                                              return (
                                                  <option key={ev._id} value={ev.slug}>
                                                      {ev.title}
                                                      {cat}
                                                      {meta}
                                                  </option>
                                              );
                                          })
                                        : null}
                                </Select>

                                {/* kleines Preview */}
                                {selectedEventObj ? (
                                    <div className="mt-2 text-xs text-black/60">
                                        Ausgewählt: <span className="font-medium">{selectedEventObj.title}</span>
                                    </div>
                                ) : null}
                            </div>
                        ) : null}

                        {dynamicFields.map((f) => (
                            <Input
                                key={f.name}
                                label={f.label}
                                name={f.name}
                                value={form[f.name] || ""}
                                onChange={onChange}
                                placeholder=""
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Kurzbeschreibung */}
            <div className="space-y-6">
                <div className="text-lg font-semibold">Kurzbeschreibung</div>
                <Textarea
                    label="Worum geht’s genau?"
                    name="kurzbeschreibung"
                    value={form.kurzbeschreibung}
                    onChange={onChange}
                    placeholder="Ein paar Sätze reichen völlig…"
                    required
                />
            </div>

            {/* Verfügbarkeit & Datei */}
            <div className="grid gap-6 md:grid-cols-2">
                <Input
                    label="Verfügbarkeit (optional)"
                    name="verfuegbarkeit"
                    value={form.verfuegbarkeit}
                    onChange={onChange}
                    placeholder="Zeitfenster / Rückruf bevorzugt"
                />

                <label className="block">
                    <span className="block text-sm font-medium text-black/80">Dateien (optional)</span>
                    <input
                        className="mt-2 block w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base"
                        type="file"
                        name="datei"
                        accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <div className="mt-2 text-xs text-black/60">Arztbriefe / Unterlagen (PDF/JPG/PNG, max. 10 MB)</div>
                </label>
            </div>

            {/* Checkboxen */}
            <div className="space-y-3 text-sm">
                <label className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        name="consent"
                        checked={form.consent}
                        onChange={onChange}
                        required
                        className="mt-1"
                    />
                    <span className="text-black/70">
                        Ich stimme der Speicherung meiner Angaben zur Kontaktaufnahme zu. (Datenschutz)
                    </span>
                </label>

                <label className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        name="newsletter"
                        checked={form.newsletter}
                        onChange={onChange}
                        className="mt-1"
                    />
                    <span className="text-black/70">
                        Ich möchte gelegentlich Infos zu Terminen &amp; Artikeln erhalten (Newsletter).
                    </span>
                </label>
            </div>

            {/* Submit */}
            <div className="pt-2">
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl bg-[#A81E1E] px-6 py-3 text-white font-medium hover:opacity-90"
                >
                    Abschicken
                </button>
            </div>
        </form>
    );
}
