import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getOwnerEmail() {
  return process.env.OWNER_EMAIL || "contact@example.com";
}

export async function POST(req: Request) {
  const { email, sectorName, result } = await req.json();

  if (!email || !result) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  const diagnosticHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
      <div style="background: linear-gradient(135deg, #D97706, #F59E0B); padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 22px;">Diagnostic IA — ${sectorName}</h1>
      </div>
      <div style="padding: 24px; background: #fafafa; border: 1px solid #eee; border-top: none; border-radius: 0 0 12px 12px;">
        <h2 style="font-size: 16px; margin: 0 0 12px;">Resume</h2>
        <p style="color: #444; line-height: 1.6;">${result.summary}</p>

        <h2 style="font-size: 16px; margin: 24px 0 12px;">Maturite IA</h2>
        ${result.maturityScores
          .map(
            (s: { dimension: string; score: number }) =>
              `<div style="margin: 6px 0;"><strong>${s.dimension}:</strong> ${s.score}/100</div>`
          )
          .join("")}

        <h2 style="font-size: 16px; margin: 24px 0 12px;">Opportunites</h2>
        ${result.opportunities
          .map(
            (o: { title: string; roi: string; description: string }, i: number) =>
              `<div style="background: #fff; border: 1px solid #eee; border-radius: 8px; padding: 12px; margin: 8px 0;">
                <strong>${i + 1}. ${o.title}</strong> <span style="background: #FEF3C7; color: #92400E; padding: 2px 8px; border-radius: 10px; font-size: 11px;">ROI ${o.roi}</span>
                <p style="color: #666; margin: 8px 0 0; font-size: 13px;">${o.description}</p>
              </div>`
          )
          .join("")}

        <h2 style="font-size: 16px; margin: 24px 0 12px;">Projection ROI</h2>
        <div style="background: #1a1a2e; color: #fff; padding: 20px; border-radius: 8px; text-align: center;">
          <div style="display: inline-block; margin: 0 16px;">
            <div style="font-size: 22px; font-weight: 800;">${result.roiEstimate.invested}</div>
            <div style="font-size: 10px; color: #aaa; text-transform: uppercase;">Investissement</div>
          </div>
          <div style="display: inline-block; margin: 0 16px;">
            <div style="font-size: 22px; font-weight: 800; color: #10B981;">${result.roiEstimate.saved}</div>
            <div style="font-size: 10px; color: #aaa; text-transform: uppercase;">Economies</div>
          </div>
          <div style="display: inline-block; margin: 0 16px;">
            <div style="font-size: 22px; font-weight: 800; color: #FBBF24;">${result.roiEstimate.ratio}</div>
            <div style="font-size: 10px; color: #aaa; text-transform: uppercase;">ROI</div>
          </div>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 12px;">
          <p>Diagnostic genere par AI Diagnostic</p>
          <p>Contact : +33 6 16 81 70 40 | WhatsApp</p>
        </div>
      </div>
    </div>
  `;

  const resend = getResend();
  if (!resend) {
    // Pas de cle Resend configuree — on retourne OK pour le demo
    console.log(`[DEMO] Email would be sent to: ${email} + ${getOwnerEmail()}`);
    return Response.json({ ok: true, demo: true });
  }

  try {
    await resend.emails.send({
      from: "AI Diagnostic <diagnostic@resend.dev>",
      to: email,
      subject: `Votre diagnostic IA — ${sectorName}`,
      html: diagnosticHtml,
    });

    await resend.emails.send({
      from: "AI Diagnostic <diagnostic@resend.dev>",
      to: getOwnerEmail(),
      subject: `[LEAD] Nouveau diagnostic — ${sectorName} — ${email}`,
      html: `<p><strong>Nouveau lead !</strong></p><p>Email: ${email}</p><p>Secteur: ${sectorName}</p><hr/>${diagnosticHtml}`,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
