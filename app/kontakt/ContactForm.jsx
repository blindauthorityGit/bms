"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sanityClient } from "@/client";
import { AnimatePresence, motion } from "framer-motion";

const ANLIEGEN = [
    { key: "schmerztherapie", label: "Schmerztherapie nach Liebscher & Bracht" },
    { key: "8-wochen-programm", label: "8-Wochen-Programm (Longevity-Coaching)" },
    { key: "1-1-coaching", label: "1:1-Coaching" },
    { key: "workshops-events-specials", label: "Workshops / Events / Specials" },
    { key: "yoga", label: "Yoga" },
    { key: "allgemein", label: "Allgemeine Fragen" },
];

const DEFAULT_ANLIEGEN = "schmerztherapie";
const MIN_SUBMIT_MS = 4000;

const EVENTS_FOR_CONTACT_QUERY = `
*[_type == "event" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  "categoryTitle": category->title,
  "nextDate": dates[defined(start)] | order(start asc)[0]{ start }
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

function Spinner({ className = "" }) {
    return (
        <span
            className={[
                "inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin",
                className,
            ].join(" ")}
            aria-hidden="true"
        />
    );
}

function Notice({ type = "success", title, children, onClose }) {
    const styles =
        type === "success"
            ? "border-emerald-200 bg-emerald-50 text-emerald-950"
            : "border-red-200 bg-red-50 text-red-950";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`rounded-2xl border p-4 md:p-5 ${styles}`}
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    {title ? <div className="font-semibold">{title}</div> : null}
                    {children ? <div className="mt-1 text-sm opacity-90">{children}</div> : null}
                </div>
                {onClose ? (
                    <button
                        type="button"
                        onClick={onClose}
                        className="shrink-0 rounded-lg px-2 py-1 text-sm hover:bg-black/5"
                        aria-label="Hinweis schließen"
                    >
                        ✕
                    </button>
                ) : null}
            </div>
        </motion.div>
    );
}

function Input({ label, name, value, onChange, placeholder, required = false, disabled = false, type = "text" }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-black/80">
                {label}
                {required ? "*" : ""}
            </span>
            <input
                className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base outline-none focus:border-black/30 disabled:opacity-60"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
            />
        </label>
    );
}

function Select({ label, name, value, onChange, children, required = false, disabled = false }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-black/80">
                {label}
                {required ? "*" : ""}
            </span>
            <select
                className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base outline-none focus:border-black/30 disabled:opacity-60"
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
            >
                {children}
            </select>
        </label>
    );
}

function Textarea({ label, name, value, onChange, placeholder, required = false, disabled = false }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-black/80">
                {label}
                {required ? "*" : ""}
            </span>
            <textarea
                className="mt-2 w-full min-h-[140px] rounded-xl border border-black/15 bg-white px-4 py-3 text-base outline-none focus:border-black/30 disabled:opacity-60"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
            />
        </label>
    );
}

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

function isLikelySpamText(value) {
    const v = String(value || "").trim();
    if (!v) return false;
    if (/[A-Za-z0-9]{20,}/.test(v)) return true;
    if (!/\s/.test(v) && v.length > 28) return true;
    return false;
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

    const [events, setEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(false);
    const [eventsError, setEventsError] = useState("");

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
        website: "",
        middleName: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [buttonMode, setButtonMode] = useState("idle");

    const noticeRef = useRef(null);
    const hideSuccessTimer = useRef(null);
    const resetButtonTimer = useRef(null);
    const fileInputRef = useRef(null);
    const startedAtRef = useRef(Date.now());

    function clearTimers() {
        if (hideSuccessTimer.current) clearTimeout(hideSuccessTimer.current);
        if (resetButtonTimer.current) clearTimeout(resetButtonTimer.current);
        hideSuccessTimer.current = null;
        resetButtonTimer.current = null;
    }

    useEffect(() => {
        startedAtRef.current = Date.now();
        return () => clearTimers();
    }, []);

    function resetNotices() {
        clearTimers();
        setSubmitError("");
        setSubmitSuccess(false);
    }

    function scrollToNotice() {
        requestAnimationFrame(() => {
            if (!noticeRef.current) return;
            noticeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    function replaceQuery(next) {
        const sp = new URLSearchParams(Array.from(searchParams.entries()));
        Object.entries(next).forEach(([k, v]) => {
            if (v === null || v === undefined || v === "") sp.delete(k);
            else sp.set(k, String(v));
        });
        const qs = sp.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }

    useEffect(() => {
        const next = sanitizeAnliegen(queryAnliegen);
        setAnliegen(next);
    }, [queryAnliegen]);

    useEffect(() => {
        const nextEvent = sanitizeEventSlug(queryEvent);
        if (sanitizeAnliegen(queryAnliegen) === "workshops-events-specials") {
            setSelectedEvent(nextEvent);
        }
    }, [queryEvent, queryAnliegen]);

    useEffect(() => {
        let alive = true;

        async function loadEvents() {
            setEventsLoading(true);
            setEventsError("");
            try {
                const res = await sanityClient.fetch(EVENTS_FOR_CONTACT_QUERY);
                if (!alive) return;
                setEvents(Array.isArray(res) ? res : []);
            } catch {
                if (!alive) return;
                setEventsError("Events konnten nicht geladen werden.");
            } finally {
                if (!alive) return;
                setEventsLoading(false);
            }
        }

        if (anliegen === "workshops-events-specials") {
            if (!events.length && !eventsLoading) loadEvents();
        } else {
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
        resetNotices();

        if (nextKey !== "workshops-events-specials") {
            setSelectedEvent("");
            replaceQuery({ anliegen: nextKey, event: "" });
        } else {
            replaceQuery({ anliegen: nextKey });
        }
    }

    function onChange(e) {
        const { name, value, type, checked } = e.target;
        resetNotices();
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    function onPickEvent(e) {
        const slug = e.target.value;
        resetNotices();
        setSelectedEvent(slug);
        replaceQuery({ event: slug });
        setForm((prev) => ({ ...prev, event: slug }));
    }

    const dynamicFields = FIELDS_BY_ANLIEGEN[anliegen] || [];

    const selectedEventObj = useMemo(() => {
        if (!selectedEvent) return null;
        return events.find((ev) => ev.slug === selectedEvent) || null;
    }, [events, selectedEvent]);

    function validateClientSide() {
        if (form.website || form.middleName) {
            return "Anfrage konnte nicht verarbeitet werden.";
        }

        const submitDelta = Date.now() - startedAtRef.current;
        if (submitDelta < MIN_SUBMIT_MS) {
            return "Bitte einen Moment warten und das Formular dann erneut senden.";
        }

        if (
            isLikelySpamText(form.vorname) ||
            isLikelySpamText(form.nachname) ||
            isLikelySpamText(form.kurzbeschreibung)
        ) {
            return "Bitte Angaben prüfen und erneut versuchen.";
        }

        return "";
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (isSubmitting) return;

        const validationError = validateClientSide();
        if (validationError) {
            setSubmitError(validationError);
            requestAnimationFrame(scrollToNotice);
            return;
        }

        setIsSubmitting(true);
        setButtonMode("sending");
        setSubmitError("");
        setSubmitSuccess(false);
        clearTimers();

        try {
            const fd = new FormData();

            fd.set("anliegen", anliegen);
            fd.set("vorname", form.vorname);
            fd.set("nachname", form.nachname);
            fd.set("email", form.email);
            fd.set("telefon", form.telefon || "");
            fd.set("kurzbeschreibung", form.kurzbeschreibung);
            fd.set("verfuegbarkeit", form.verfuegbarkeit || "");
            fd.set("consent", form.consent ? "true" : "false");
            fd.set("newsletter", form.newsletter ? "true" : "false");

            fd.set("website", form.website || "");
            fd.set("middleName", form.middleName || "");
            fd.set("formStartedAt", String(startedAtRef.current));
            fd.set("formSubmittedAt", String(Date.now()));
            fd.set("pagePath", pathname || "");

            if (selectedEvent) fd.set("eventSlug", selectedEvent);

            Object.entries(form).forEach(([k, v]) => {
                if (
                    [
                        "vorname",
                        "nachname",
                        "email",
                        "telefon",
                        "kurzbeschreibung",
                        "verfuegbarkeit",
                        "consent",
                        "newsletter",
                        "website",
                        "middleName",
                    ].includes(k)
                )
                    return;
                if (v === undefined || v === null) return;
                if (typeof v === "string" && v.trim() === "") return;
                fd.set(k, String(v));
            });

            if (fileInputRef.current?.files?.[0]) {
                fd.set("datei", fileInputRef.current.files[0]);
            }

            const res = await fetch("/api/kontakt", { method: "POST", body: fd });
            const json = await res.json();

            if (!res.ok || !json.ok) {
                setSubmitError(json?.error || "Fehler beim Senden. Bitte versuche es erneut.");
                setIsSubmitting(false);
                setButtonMode("idle");
                requestAnimationFrame(scrollToNotice);
                return;
            }

            setSubmitSuccess(true);
            setButtonMode("sent");
            setIsSubmitting(false);

            setForm({
                vorname: "",
                nachname: "",
                email: "",
                telefon: "",
                kurzbeschreibung: "",
                verfuegbarkeit: "",
                consent: false,
                newsletter: false,
                website: "",
                middleName: "",
            });
            setSelectedEvent("");
            replaceQuery({ event: "" });
            startedAtRef.current = Date.now();

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            requestAnimationFrame(scrollToNotice);

            hideSuccessTimer.current = setTimeout(() => setSubmitSuccess(false), 8000);
            resetButtonTimer.current = setTimeout(() => setButtonMode("idle"), 1600);
        } catch (err) {
            console.error(err);
            setSubmitError("Fehler beim Senden. Bitte versuche es erneut.");
            setIsSubmitting(false);
            setButtonMode("idle");
            requestAnimationFrame(scrollToNotice);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-10">
            <div ref={noticeRef} />

            <AnimatePresence initial={false}>
                {submitSuccess ? (
                    <Notice
                        key="success"
                        type="success"
                        title="Danke! Deine Nachricht wurde gesendet."
                        onClose={() => setSubmitSuccess(false)}
                    >
                        Wir melden uns zeitnah bei dir mit den nächsten Schritten.
                    </Notice>
                ) : null}

                {submitError ? (
                    <Notice
                        key="error"
                        type="error"
                        title="Das hat leider nicht geklappt."
                        onClose={() => setSubmitError("")}
                    >
                        {submitError}
                    </Notice>
                ) : null}
            </AnimatePresence>

            <div className="hidden" aria-hidden="true">
                <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={onChange}
                    tabIndex={-1}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="middleName"
                    value={form.middleName}
                    onChange={onChange}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

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
                                    disabled={isSubmitting}
                                    className={[
                                        "px-4 py-2 rounded-full border text-sm transition disabled:opacity-60",
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

            <div className="space-y-6">
                <div className="text-lg font-semibold">Kontaktdaten</div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Input
                        label="Vorname"
                        name="vorname"
                        value={form.vorname}
                        onChange={onChange}
                        required
                        disabled={isSubmitting}
                    />
                    <Input
                        label="Nachname"
                        name="nachname"
                        value={form.nachname}
                        onChange={onChange}
                        required
                        disabled={isSubmitting}
                    />
                    <Input
                        label="E-Mail"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="name@email.de"
                        required
                        disabled={isSubmitting}
                    />
                    <Input
                        label="Telefon (optional)"
                        name="telefon"
                        value={form.telefon}
                        onChange={onChange}
                        placeholder="+49 …"
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="text-lg font-semibold">Details (optional)</div>

                <div className="rounded-2xl bg-black/5 border border-black/10 p-5">
                    <div className="text-sm font-semibold text-black/70 mb-4">
                        Fall: {ANLIEGEN.find((x) => x.key === anliegen)?.label}
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {anliegen === "workshops-events-specials" ? (
                            <div className="md:col-span-3">
                                <Select
                                    label="Welcher Workshop/Event?"
                                    name="event"
                                    value={selectedEvent}
                                    onChange={onPickEvent}
                                    disabled={isSubmitting}
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
                                disabled={isSubmitting}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="text-lg font-semibold">Kurzbeschreibung</div>
                <Textarea
                    label="Worum geht’s genau?"
                    name="kurzbeschreibung"
                    value={form.kurzbeschreibung}
                    onChange={onChange}
                    placeholder="Ein paar Sätze reichen völlig…"
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Input
                    label="Verfügbarkeit (optional)"
                    name="verfuegbarkeit"
                    value={form.verfuegbarkeit}
                    onChange={onChange}
                    placeholder="Zeitfenster / Rückruf bevorzugt"
                    disabled={isSubmitting}
                />

                <label className="block">
                    <span className="block text-sm font-medium text-black/80">Dateien (optional)</span>
                    <input
                        ref={fileInputRef}
                        className="mt-2 block w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base disabled:opacity-60"
                        type="file"
                        name="datei"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={resetNotices}
                        disabled={isSubmitting}
                    />
                    <div className="mt-2 text-xs text-black/60">Arztbriefe / Unterlagen (PDF/JPG/PNG, max. 10 MB)</div>
                </label>
            </div>

            <div className="space-y-3 text-sm">
                <label className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        name="consent"
                        checked={form.consent}
                        onChange={onChange}
                        required
                        className="mt-1"
                        disabled={isSubmitting}
                    />
                    <span className="text-black/70">
                        Ich stimme der Speicherung meiner Angaben zur Kontaktaufnahme zu.{" "}
                        <a className="underline" href="datenschutz">
                            Datenschutz lesen
                        </a>
                    </span>
                </label>

                <label className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        name="newsletter"
                        checked={form.newsletter}
                        onChange={onChange}
                        className="mt-1"
                        disabled={isSubmitting}
                    />
                    <span className="text-black/70">
                        Ich möchte gelegentlich Infos zu Terminen &amp; Artikeln erhalten (Newsletter).
                    </span>
                </label>
            </div>

            <div className="pt-2 space-y-3">
                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileTap={!isSubmitting ? { scale: 0.99 } : undefined}
                    className={[
                        "inline-flex items-center justify-center gap-3 rounded-xl px-6 py-3 font-medium transition",
                        "bg-[#A81E1E] text-white hover:opacity-90",
                        isSubmitting ? "opacity-70 cursor-not-allowed" : "",
                    ].join(" ")}
                >
                    {buttonMode === "sending" ? (
                        <>
                            <Spinner />
                            <span>Wird gesendet…</span>
                        </>
                    ) : buttonMode === "sent" ? (
                        <span>Gesendet ✓</span>
                    ) : (
                        <span>Abschicken</span>
                    )}
                </motion.button>

                <p className="text-xs text-black/50">
                    Dieses Formular ist technisch gegen automatisierte Spam-Anfragen geschützt.
                </p>
            </div>
        </form>
    );
}
