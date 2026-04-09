import { NextResponse } from "next/server";
import { getResend, FROM_EMAIL } from "@/lib/resend";

export const runtime = "nodejs";

interface Payload {
  name?: string;
  email?: string;
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const resend = getResend();
  if (!resend) {
    console.warn("[newsletter] RESEND_API_KEY not set — skipping send");
    return NextResponse.json({ ok: true, emailSent: false });
  }

  const firstName = name ? name.split(" ")[0] : "seller";

  const html = `
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 16px;">
          <tr>
            <td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
                <tr>
                  <td style="background:linear-gradient(135deg,#5B3FD8 0%,#9B7BFF 100%);padding:28px 32px;">
                    <div style="font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Seller<span style="color:#C4B5FD;">verse</span></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px;">
                    <h1 style="margin:0 0 16px 0;font-size:22px;color:#111827;">Obrigado, ${firstName}! 📚</h1>
                    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#374151;">
                      O guia <strong>"Os 7 Erros que Quebram 90% dos Sellers"</strong> já está a caminho da sua caixa de entrada.
                      Caso não apareça nos próximos minutos, confira a pasta de spam ou promoções.
                    </p>
                    <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#374151;">
                      Enquanto isso, dá uma olhada nas ferramentas gratuitas que a gente separou pra você:
                    </p>
                    <a href="https://sellerverse.com.br/ferramentas" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#5B3FD8 0%,#9B7BFF 100%);color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;font-size:14px;">Explorar ferramentas →</a>
                    <p style="margin:24px 0 0 0;font-size:13px;color:#6B7280;">— Equipe Sellerverse</p>
                  </td>
                </tr>
                <tr>
                  <td style="background:#F9FAFB;padding:16px 32px;text-align:center;font-size:12px;color:#9CA3AF;">
                    © ${new Date().getFullYear()} Sellerverse — Brasil
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Seu guia gratuito chegou! 📚",
      html,
    });
    if (error) {
      console.error("[newsletter] resend error:", error);
      return NextResponse.json({ error: "Falha ao enviar e-mail." }, { status: 500 });
    }
    return NextResponse.json({ ok: true, emailSent: true });
  } catch (err) {
    console.error("[newsletter] unexpected:", err);
    return NextResponse.json({ error: "Erro inesperado." }, { status: 500 });
  }
}
