import { useEffect, useMemo, useState } from "react";
import { Session } from "@supabase/supabase-js";
import {
  Building2,
  Calendar,
  Image,
  Loader2,
  Mail,
  MessageCircle,
  MousePointerClick,
  Palette,
  Phone,
  Save,
  Sparkles,
  UserRound,
} from "lucide-react";
import { supabase } from "../lib/supabase";

type WelcomeBuilderProps = {
  session: Session;
};

type WelcomeTemplate = {
  id: string;
  user_id: string;
  name: string;
  type: string;
  subject: string | null;
  content: string | null;
  is_active: boolean | null;
};

const defaultSubject = "Bienvenue {{first_name}} — ravi de vous accompagner";

export default function WelcomeBuilder({ session }: WelcomeBuilderProps) {
  const [template, setTemplate] = useState<WelcomeTemplate | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingTemplate, setLoadingTemplate] = useState(true);

  const [subject, setSubject] = useState(defaultSubject);

  const [companyName, setCompanyName] = useState("MyPX");
  const [companyTagline, setCompanyTagline] = useState(
    "Votre assistant intelligent de suivi client"
  );
  const [companyEmail, setCompanyEmail] = useState(
    "christian.kinda@hotmail.fr"
  );
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [mainColor, setMainColor] = useState("#7c3aed");

  const [advisorName, setAdvisorName] = useState("Christian Kinda");
  const [advisorRole, setAdvisorRole] = useState(
    "Conseiller & créateur d’opportunités"
  );
  const [advisorPhotoUrl, setAdvisorPhotoUrl] = useState("");

  const [introTitle, setIntroTitle] = useState(
    "Bienvenue dans notre portefeuille client"
  );

  const [introText, setIntroText] = useState(
    "Bonjour {{first_name}},\n\nJe suis ravi de pouvoir vous accompagner concernant {{group_name}}.\n\nVous faites désormais partie de notre portefeuille client, ce qui nous permettra de mieux suivre vos besoins, vos opportunités et les prochaines actions utiles pour vous."
  );

  const [whyText, setWhyText] = useState(
    "Vous recevez ce message car vous avez été ajouté à notre portefeuille client à la suite d’un échange, d’une demande d’information ou d’une opportunité identifiée."
  );

  const [questionText, setQuestionText] = useState(
    "Pour mieux vous accompagner, vous pouvez simplement répondre à cet email avec votre priorité du moment."
  );

  const [ctaText, setCtaText] = useState("Répondre à cet email");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");

  const [footerText, setFooterText] = useState(
    "Vous recevez ce message car vous avez été ajouté à notre portefeuille client."
  );

  const insertVariable = (variable: string) => {
    setIntroText((prev) => `${prev} ${variable}`);
  };

  const generateHtml = () => {
    const safeLogo =
      logoUrl.trim() ||
      "https://dummyimage.com/160x160/0f172a/ffffff.png&text=LOGO";

    const safeCover =
      coverUrl.trim() ||
      "https://dummyimage.com/1200x420/7c3aed/ffffff.png&text=Bienvenue";

    const safeAdvisorPhoto =
      advisorPhotoUrl.trim() ||
      "https://dummyimage.com/200x200/0f172a/ffffff.png&text=Photo";

    return `
<div style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <div style="max-width:700px;margin:0 auto;padding:28px 14px;">
    <div style="background:#ffffff;border-radius:30px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 18px 45px rgba(15,23,42,0.14);">

      <div style="height:220px;background:url('${safeCover}') center/cover no-repeat;">
        <div style="height:100%;background:linear-gradient(135deg,rgba(15,23,42,0.92),rgba(15,23,42,0.38));padding:30px;box-sizing:border-box;">
          <img src="${safeLogo}" alt="${companyName}" style="width:74px;height:74px;object-fit:cover;border-radius:24px;border:2px solid rgba(255,255,255,0.85);background:#ffffff;" />
          <h1 style="margin:20px 0 0;font-size:30px;line-height:1.2;color:#ffffff;">
            ${introTitle}
          </h1>
          <p style="margin:9px 0 0;color:rgba(255,255,255,0.84);font-size:14px;">
            ${companyTagline}
          </p>
        </div>
      </div>

      <div style="padding:34px;">
        <div style="font-size:15px;line-height:1.85;color:#334155;white-space:pre-line;">
${introText}
        </div>

        <div style="margin:28px 0;padding:20px;border-radius:22px;background:#f8fafc;border:1px solid #e5e7eb;">
          <p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;color:#64748b;">
            Pourquoi vous recevez ce mail
          </p>
          <p style="margin:0;font-size:14px;line-height:1.75;color:#334155;">
            ${whyText}
          </p>
        </div>

        <div style="margin:28px 0;padding:22px;border-radius:24px;background:#ffffff;border:1px solid #e5e7eb;box-shadow:0 10px 25px rgba(15,23,42,0.06);">
          <p style="margin:0 0 14px;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;color:#64748b;">
            Votre contact
          </p>

          <table width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="vertical-align:middle;width:76px;">
                <img src="${safeAdvisorPhoto}" alt="${advisorName}" style="width:64px;height:64px;object-fit:cover;border-radius:20px;background:#fff;border:1px solid #e5e7eb;" />
              </td>
              <td style="vertical-align:middle;">
                <p style="margin:0;font-size:18px;font-weight:700;color:#0f172a;">${advisorName}</p>
                <p style="margin:5px 0 0;font-size:13px;color:#64748b;">${advisorRole}</p>
              </td>
            </tr>
          </table>

          <div style="margin-top:18px;font-size:14px;line-height:1.7;color:#334155;">
            ${
              companyEmail
                ? `<div><strong>Email :</strong> ${companyEmail}</div>`
                : ""
            }
            ${
              companyPhone
                ? `<div><strong>Téléphone :</strong> ${companyPhone}</div>`
                : ""
            }
            ${
              companyWebsite
                ? `<div><strong>Site :</strong> ${companyWebsite}</div>`
                : ""
            }
            ${
              companyAddress
                ? `<div><strong>Adresse :</strong> ${companyAddress}</div>`
                : ""
            }
          </div>
        </div>

        <div style="margin:28px 0;padding:20px;border-radius:22px;background:#f8fafc;border:1px solid #e5e7eb;">
          <p style="margin:0;font-size:14px;line-height:1.75;color:#334155;">
            ${questionText}
          </p>
        </div>

        <div style="margin-top:26px;">
          <a href="mailto:${companyEmail}" style="display:inline-block;background:${mainColor};color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:700;font-size:14px;margin:0 8px 10px 0;">
            ${ctaText}
          </a>

          ${
            whatsappUrl
              ? `<a href="${whatsappUrl}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:700;font-size:14px;margin:0 8px 10px 0;">WhatsApp</a>`
              : ""
          }

          ${
            bookingUrl
              ? `<a href="${bookingUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:700;font-size:14px;margin:0 8px 10px 0;">Prendre RDV</a>`
              : ""
          }
        </div>

        <p style="margin:34px 0 0;font-size:14px;line-height:1.7;color:#475569;">
          À bientôt,<br />
          <strong>${advisorName}</strong><br />
          ${companyName}
        </p>
      </div>

      <div style="padding:22px 34px;background:#0f172a;color:rgba(255,255,255,0.72);font-size:12px;line-height:1.6;">
        <strong style="color:#ffffff;">${companyName}</strong><br />
        ${footerText}<br />
        ${companyEmail ? `${companyEmail}` : ""} ${
      companyPhone ? ` · ${companyPhone}` : ""
    }
        ${companyWebsite ? `<br />${companyWebsite}` : ""}
      </div>
    </div>
  </div>
</div>
`.trim();
  };

  const finalHtml = useMemo(
    () => generateHtml(),
    [
      companyName,
      companyTagline,
      companyEmail,
      companyPhone,
      companyWebsite,
      companyAddress,
      logoUrl,
      coverUrl,
      mainColor,
      advisorName,
      advisorRole,
      advisorPhotoUrl,
      introTitle,
      introText,
      whyText,
      questionText,
      ctaText,
      whatsappUrl,
      bookingUrl,
      footerText,
    ]
  );

  const fetchTemplate = async () => {
    setLoadingTemplate(true);

    const { data, error } = await supabase
      .from("email_templates")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("type", "welcome_email")
      .maybeSingle();

    if (error) {
      alert(error.message);
      setLoadingTemplate(false);
      return;
    }

    if (data) {
      setTemplate(data as WelcomeTemplate);
      setSubject(data.subject || defaultSubject);
    }

    setLoadingTemplate(false);
  };

  useEffect(() => {
    fetchTemplate();
  }, [session.user.id]);

  const handleSave = async () => {
    if (!subject.trim()) {
      alert("Ajoute un sujet pour l’email.");
      return;
    }

    setLoading(true);

    const payload = {
      user_id: session.user.id,
      name: "Template bienvenue premium",
      type: "welcome_email",
      subject: subject.trim(),
      content: finalHtml,
      is_active: true,
    };

    let error = null;

    if (template?.id) {
      const response = await supabase
        .from("email_templates")
        .update(payload)
        .eq("id", template.id)
        .eq("user_id", session.user.id);

      error = response.error;
    } else {
      const response = await supabase.from("email_templates").insert(payload);
      error = response.error;
    }

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchTemplate();
    alert("Template de bienvenue premium enregistré.");
  };

  const previewSubject = subject
    .replace(/{{first_name}}/g, "Christian")
    .replace(/{{group_name}}/g, "Assurance")
    .replace(/{{city}}/g, "Genève")
    .replace(/{{company}}/g, "Entreprise Exemple");

  const previewHtml = finalHtml
    .replace(/{{first_name}}/g, "Christian")
    .replace(/{{group_name}}/g, "Assurance")
    .replace(/{{city}}/g, "Genève")
    .replace(/{{company}}/g, "Entreprise Exemple");

  if (loadingTemplate) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-[2rem] border border-white/75 bg-white/70 p-8 text-center text-sm font-bold text-slate-500 shadow-2xl shadow-violet-100/60 backdrop-blur-2xl">
        <Loader2 size={18} className="animate-spin" />
        Chargement du template...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-violet-700">
          <Mail size={14} />
          Email premium
        </div>

        <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
          Welcome Builder
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
          Crée un email de bienvenue professionnel avec photo, identité
          visuelle, carte de contact, CTA, signature et pied de page.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <BuilderCard icon={<Mail size={17} />} title="Sujet & message">
            <Input
              placeholder="Sujet de l’email"
              value={subject}
              onChange={setSubject}
            />

            <div className="mt-4 rounded-2xl border border-dashed border-violet-200 bg-violet-50 px-4 py-3 text-xs font-bold text-slate-500">
              <span>Variables cliquables :</span>
              {[
                "{{first_name}}",
                "{{group_name}}",
                "{{city}}",
                "{{company}}",
              ].map((variable) => (
                <button
                  key={variable}
                  type="button"
                  onClick={() => insertVariable(variable)}
                  className="ml-2 mt-2 rounded-full border border-violet-100 bg-white px-3 py-1 font-black text-violet-700 transition hover:bg-violet-100"
                >
                  {variable}
                </button>
              ))}
            </div>

            <Input
              placeholder="Titre principal"
              value={introTitle}
              onChange={setIntroTitle}
              className="mt-4"
            />

            <Textarea
              value={introText}
              onChange={setIntroText}
              placeholder="Texte principal"
              className="min-h-[220px]"
            />

            <Textarea
              value={whyText}
              onChange={setWhyText}
              placeholder="Pourquoi le client reçoit ce mail"
              className="min-h-[110px]"
            />

            <Textarea
              value={questionText}
              onChange={setQuestionText}
              placeholder="Question ou phrase d’engagement"
              className="min-h-[100px]"
            />
          </BuilderCard>

          <BuilderCard icon={<UserRound size={17} />} title="Signature humaine">
            <Input
              placeholder="Nom du conseiller"
              value={advisorName}
              onChange={setAdvisorName}
            />
            <Input
              placeholder="Rôle / expertise"
              value={advisorRole}
              onChange={setAdvisorRole}
              className="mt-3"
            />
            <Input
              placeholder="URL photo du conseiller"
              value={advisorPhotoUrl}
              onChange={setAdvisorPhotoUrl}
              className="mt-3"
            />
          </BuilderCard>

          <BuilderCard icon={<Building2 size={17} />} title="Carte entreprise">
            <div className="grid grid-cols-1 gap-3">
              <Input
                value={companyName}
                onChange={setCompanyName}
                placeholder="Nom entreprise"
              />
              <Input
                value={companyTagline}
                onChange={setCompanyTagline}
                placeholder="Phrase de présentation"
              />
              <Input
                value={companyEmail}
                onChange={setCompanyEmail}
                placeholder="Email"
              />
              <Input
                value={companyPhone}
                onChange={setCompanyPhone}
                placeholder="Téléphone"
              />
              <Input
                value={companyWebsite}
                onChange={setCompanyWebsite}
                placeholder="Site web"
              />
              <Input
                value={companyAddress}
                onChange={setCompanyAddress}
                placeholder="Adresse"
              />
            </div>
          </BuilderCard>

          <BuilderCard
            icon={<MousePointerClick size={17} />}
            title="Boutons d’action"
          >
            <Input
              value={ctaText}
              onChange={setCtaText}
              placeholder="Texte du bouton email"
            />

            <div className="mt-3 flex items-center gap-2">
              <MessageCircle size={16} className="text-slate-400" />
              <Input
                value={whatsappUrl}
                onChange={setWhatsappUrl}
                placeholder="Lien WhatsApp, ex: https://wa.me/41797896193"
              />
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Calendar size={16} className="text-slate-400" />
              <Input
                value={bookingUrl}
                onChange={setBookingUrl}
                placeholder="Lien RDV / Calendly / agenda"
              />
            </div>
          </BuilderCard>

          <BuilderCard icon={<Image size={17} />} title="Visuels">
            <Input
              value={logoUrl}
              onChange={setLogoUrl}
              placeholder="URL logo / photo entreprise"
            />

            <Input
              value={coverUrl}
              onChange={setCoverUrl}
              placeholder="URL image de couverture"
              className="mt-3"
            />

            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <Palette size={16} className="text-slate-400" />
              <input
                type="color"
                value={mainColor}
                onChange={(e) => setMainColor(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded-xl border border-slate-200 bg-transparent"
              />
              <span className="text-sm font-bold text-slate-500">
                Couleur principale
              </span>
            </div>
          </BuilderCard>

          <BuilderCard icon={<Sparkles size={17} />} title="Pied de page">
            <Textarea
              value={footerText}
              onChange={setFooterText}
              placeholder="Texte pied de page"
              className="min-h-[90px]"
            />

            <button
              onClick={handleSave}
              disabled={loading}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-4 text-sm font-black text-white shadow-xl shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Enregistrer le template premium
                </>
              )}
            </button>
          </BuilderCard>
        </div>

        <div className="sticky top-6 h-fit space-y-4">
          <div className="rounded-[2rem] border border-white/75 bg-white/70 p-5 shadow-2xl shadow-violet-100/60 backdrop-blur-2xl">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-violet-700" />
              <p className="text-sm font-black text-slate-950">Aperçu email</p>
            </div>

            <div className="mt-4 rounded-3xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Sujet
              </p>
              <p className="mt-2 text-base font-black text-slate-950">
                {previewSubject}
              </p>
            </div>

            <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-inner">
              <iframe
                title="Aperçu email"
                srcDoc={previewHtml}
                className="h-[720px] w-full bg-white"
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/75 bg-white/70 p-5 shadow-xl shadow-violet-100/50 backdrop-blur-2xl">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-violet-700" />
              <p className="text-sm font-black text-slate-950">
                Ce que ça apporte
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {[
                "Email plus humain avec signature conseiller",
                "Boutons email, WhatsApp et RDV",
                "Bloc rassurant : pourquoi le client reçoit ce mail",
                "Variables automatiques prénom, groupe, ville, société",
                "Carte de visite intégrée dans chaque email",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuilderCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-white/75 bg-white/70 p-5 shadow-2xl shadow-violet-100/60 backdrop-blur-2xl sm:p-6">
      <div className="flex items-center gap-2">
        <span className="text-violet-700">{icon}</span>
        <h3 className="font-black text-slate-950">{title}</h3>
      </div>

      <div className="mt-4">{children}</div>
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none placeholder:text-slate-300 transition focus:border-violet-300 focus:ring-4 focus:ring-violet-100 ${className}`}
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none placeholder:text-slate-300 transition focus:border-violet-300 focus:ring-4 focus:ring-violet-100 ${className}`}
    />
  );
}
