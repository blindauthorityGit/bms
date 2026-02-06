import nodemailer from "nodemailer";

export const runtime = "nodejs"; // wichtig: nodemailer braucht node runtime
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME = new Set(["application/pdf", "image/jpeg", "image/png", "image/jpg"]);

function clean(v) {
    return String(v || "").trim();
}

function anliegenLabel(key) {
    const map = {
        schmerztherapie: "Schmerztherapie",
        "8-wochen-programm": "8-Wochen-Programm (Longevity-Coaching)",
        "1-1-coaching": "1:1-Coaching",
        "workshops-events-specials": "Workshops / Events / Specials",
        yoga: "Yoga",
        allgemein: "Allgemeine Fragen",
    };
    return map[key] || key || "—";
}

function escapeHtml(str) {
    return String(str || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function kvRowEmphasis(label, value) {
    const v = clean(value);
    if (!v) return "";
    return `
    <tr>
      <td style="padding:10px 10px;border-bottom:1px solid #eee;color:#111;width:220px;">
        <strong style="display:inline-block;background:#111;color:#fff;padding:4px 8px;border-radius:999px;font-size:12px;letter-spacing:0.02em;">
          ${escapeHtml(label)}
        </strong>
      </td>
      <td style="padding:10px 10px;border-bottom:1px solid #eee;color:#111;font-weight:700;">
        ${escapeHtml(v)}
      </td>
    </tr>
  `;
}

function kvRow(label, value) {
    const v = clean(value);
    if (!v) return "";
    return `
    <tr>
      <td style="padding:8px 10px;border-bottom:1px solid #eee;color:#555;width:220px;"><strong>${escapeHtml(
          label,
      )}</strong></td>
      <td style="padding:8px 10px;border-bottom:1px solid #eee;color:#111;">${escapeHtml(v)}</td>
    </tr>
  `;
}

function deSlugify(slug) {
    const s = clean(slug);
    if (!s) return "";
    // bindestriche/unterstriche zu spaces + mehrfach-spaces fixen
    const spaced = s.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();

    // einfache Title Case (DE-friendly genug für Eventtitel)
    return spaced
        .split(" ")
        .map((w) => (w.length <= 2 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join(" ");
}

function buildOwnerHtml(data) {
    const {
        anliegen,
        vorname,
        nachname,
        email,
        telefon,
        kurzbeschreibung,
        verfuegbarkeit,
        newsletter,
        eventSlug,
        // dynamische felder:
        beschwerden,
        dauer,
        arztinfo,
        termin,
        start,
        praeferenz,
        zeiten,
        gesundheit,
        ziel,
        workshop,
        personen,
        yogaArt,
        level,
        thema,
    } = data;

    const dyn = `
    ${kvRowEmphasis("Event", deSlugify(eventSlug))}
    ${kvRow("Beschwerden / Schmerzbild", beschwerden)}
    ${kvRow("Seit wann?", dauer)}
    ${kvRow("Diagnosen / Arztinfo", arztinfo)}
    ${kvRow("Wunschtermin / Zeitraum", termin)}
    ${kvRow("Startinteresse", start)}
    ${kvRow("Präferenz (vor Ort/online)", praeferenz)}
    ${kvRow("Wochentage / Uhrzeiten", zeiten)}
    ${kvRow("Hinweis Gesundheit", gesundheit)}
    ${kvRow("Coaching-Ziel", ziel)}
    ${kvRow("Workshop/Event", workshop)}
    ${kvRow("Teilnehmerzahl", personen)}
    ${kvRow("Yoga-Art", yogaArt)}
    ${kvRow("Level", level)}
    ${kvRow("Thema / Frage", thema)}
  `;

    return `
  <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.4;color:#111;">
    <h2 style="margin:0 0 10px;">Neue Kontaktanfrage</h2>
    <p style="margin:0 0 18px;color:#555;">
      Anliegen: <strong>${escapeHtml(anliegenLabel(anliegen))}</strong>
    </p>

    <table style="border-collapse:collapse;width:100%;max-width:760px;border:1px solid #eee;">
      <tbody>
        ${kvRow("Vorname", vorname)}
        ${kvRow("Nachname", nachname)}
        ${kvRow("E-Mail", email)}
        ${kvRow("Telefon", telefon)}
        ${kvRow("Verfügbarkeit", verfuegbarkeit)}
        ${kvRow("Newsletter Opt-In", newsletter ? "Ja" : "Nein")}
        ${dyn}
      </tbody>
    </table>

    <h3 style="margin:18px 0 8px;">Kurzbeschreibung</h3>
    <div style="white-space:pre-wrap;border:1px solid #eee;background:#fafafa;padding:12px;border-radius:8px;">
      ${escapeHtml(kurzbeschreibung)}
    </div>

    <p style="margin:18px 0 0;color:#888;font-size:12px;">
      Hinweis: Diese Mail wurde automatisch über das Website-Formular gesendet.
    </p>
  </div>
  `;
}

function buildUserHtml(data) {
    const { vorname, anliegen } = data;

    return `
  <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#111;">
    <h2 style="margin:0 0 10px;">Danke für deine Nachricht${vorname ? `, ${escapeHtml(vorname)}` : ""}!</h2>
    <p style="margin:0 0 14px;color:#555;">
      Ich habe deine Anfrage zum Thema <strong>${escapeHtml(anliegenLabel(anliegen))}</strong> erhalten und melde mich zeitnah bei dir mit den nächsten Schritten.
    </p>

    <p style="margin:0 0 14px;color:#555;">
      Liebe Grüße<br/>
      <strong>Tanja Bauer</strong><br/>
      bodysoulmind
    </p>

    <hr style="border:none;border-top:1px solid #eee;margin:18px 0;" />

    <p style="margin:0;color:#888;font-size:12px;">
      Falls du diese Anfrage nicht gestellt hast, kannst du diese E-Mail ignorieren.
    </p>
  </div>
  `;
}

function buildTransport() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !port || !user || !pass) {
        throw new Error("SMTP env vars missing (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS).");
    }

    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // 465 = SMTPS
        auth: { user, pass },
    });
}

export async function POST(req) {
    try {
        const formData = await req.formData();

        // Pflichtfelder
        const anliegen = clean(formData.get("anliegen"));
        const vorname = clean(formData.get("vorname"));
        const nachname = clean(formData.get("nachname"));
        const email = clean(formData.get("email"));
        const kurzbeschreibung = clean(formData.get("kurzbeschreibung"));
        const consent = formData.get("consent");

        if (!anliegen) return Response.json({ ok: false, error: "Missing anliegen" }, { status: 400 });
        if (!vorname || !nachname || !email)
            return Response.json({ ok: false, error: "Missing contact fields" }, { status: 400 });
        if (!kurzbeschreibung) return Response.json({ ok: false, error: "Missing kurzbeschreibung" }, { status: 400 });
        if (!consent || String(consent) !== "true")
            return Response.json({ ok: false, error: "Consent required" }, { status: 400 });

        // Sammle alle Felder (inkl. dynamischer)
        const data = {
            anliegen,
            vorname,
            nachname,
            email,
            telefon: clean(formData.get("telefon")),
            verfuegbarkeit: clean(formData.get("verfuegbarkeit")),
            kurzbeschreibung,
            newsletter: String(formData.get("newsletter")) === "true",
            eventSlug: clean(formData.get("eventSlug")),

            // dynamische felder (falls vorhanden)
            beschwerden: clean(formData.get("beschwerden")),
            dauer: clean(formData.get("dauer")),
            arztinfo: clean(formData.get("arztinfo")),
            termin: clean(formData.get("termin")),
            start: clean(formData.get("start")),
            praeferenz: clean(formData.get("praeferenz")),
            zeiten: clean(formData.get("zeiten")),
            gesundheit: clean(formData.get("gesundheit")),
            ziel: clean(formData.get("ziel")),
            workshop: clean(formData.get("workshop")),
            personen: clean(formData.get("personen")),
            yogaArt: clean(formData.get("yogaArt")),
            level: clean(formData.get("level")),
            thema: clean(formData.get("thema")),
        };

        // Datei (optional)
        const file = formData.get("datei"); // name muss im input so heißen
        let attachment = null;

        if (file && typeof file === "object" && "arrayBuffer" in file) {
            if (file.size > MAX_FILE_SIZE) {
                return Response.json({ ok: false, error: "File too large (max 10MB)" }, { status: 400 });
            }
            if (!ALLOWED_MIME.has(file.type)) {
                return Response.json({ ok: false, error: "Invalid file type (PDF/JPG/PNG only)" }, { status: 400 });
            }

            const buf = Buffer.from(await file.arrayBuffer());
            attachment = {
                filename: file.name || "upload",
                content: buf,
                contentType: file.type,
            };
        }

        const transporter = buildTransport();

        const MAIL_FROM = process.env.MAIL_FROM;
        const MAIL_TO = process.env.MAIL_TO;
        const MAIL_REPLY_TO = process.env.MAIL_REPLY_TO || MAIL_TO;

        if (!MAIL_FROM || !MAIL_TO) {
            throw new Error("MAIL_FROM/MAIL_TO missing in env.");
        }

        const subjectOwner = `Kontaktformular: ${anliegenLabel(anliegen)} – ${vorname} ${nachname}`;
        const htmlOwner = buildOwnerHtml(data);

        // 1) Mail an Betreiber
        await transporter.sendMail({
            from: MAIL_FROM,
            to: MAIL_TO,
            replyTo: email || MAIL_REPLY_TO, // Antworten gehen an User
            subject: subjectOwner,
            html: htmlOwner,
            attachments: attachment ? [attachment] : [],
        });

        // 2) Bestätigung an User
        const subjectUser = `Bestätigung: Deine Anfrage bei bodysoulmind`;
        const htmlUser = buildUserHtml(data);

        await transporter.sendMail({
            from: MAIL_FROM,
            to: email,
            replyTo: MAIL_REPLY_TO,
            subject: subjectUser,
            html: htmlUser,
        });

        return Response.json({ ok: true });
    } catch (err) {
        console.error(err);
        return Response.json({ ok: false, error: "Server error" }, { status: 500 });
    }
}
