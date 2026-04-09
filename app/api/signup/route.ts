import { NextResponse } from "next/server";
import { getResend, FROM_EMAIL } from "@/lib/resend";

export const runtime = "nodejs";

interface SignupPayload {
  name?: string;
  email?: string;
  marketplace?: string;
}

export async function POST(req: Request) {
  let body: SignupPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, marketplace } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Nome e e-mail são obrigatórios." },
      { status: 400 }
    );
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "E-mail inválido." },
      { status: 400 }
    );
  }

  const resend = getResend();

  if (!resend) {
    // Do not crash — signup still "succeeds" but logs a warning.
    console.warn(
      "[signup] RESEND_API_KEY not set — skipping welcome email."
    );
    return NextResponse.json({
      ok: true,
      emailSent: false,
      message: "Cadastro recebido (modo dev — sem envio de e-mail).",
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Bem-vindo à Sellerverse! 🚀",
      html: renderWelcomeEmail({ name, marketplace }),
    });

    if (error) {
      console.error("[signup] Resend error:", error);
      return NextResponse.json(
        { error: "Falha ao enviar e-mail de boas-vindas.", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      emailSent: true,
      id: data?.id,
    });
  } catch (err) {
    console.error("[signup] unexpected:", err);
    return NextResponse.json(
      { error: "Erro interno ao processar cadastro." },
      { status: 500 }
    );
  }
}

function renderWelcomeEmail({
  name,
  marketplace,
}: {
  name: string;
  marketplace?: string;
}) {
  const firstName = name.split(" ")[0];
  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background:#F4F5F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#F4F5F7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
            <tr>
              <td style="background:linear-gradient(135deg,#0C447C 0%,#185FA5 60%,#EF9F27 100%);padding:40px 32px;text-align:center;">
                <div style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Seller<span style="color:#C4B5FD;">verse</span></div>
                <div style="margin-top:8px;font-size:14px;color:rgba(255,255,255,0.85);">O ecossistema completo para sellers</div>
              </td>
            </tr>
            <tr>
              <td style="padding:40px 32px 24px 32px;">
                <h1 style="margin:0 0 16px 0;font-size:24px;font-weight:700;color:#111827;">Bem-vindo(a), ${escapeHtml(firstName)}! 🚀</h1>
                <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#374151;">
                  Sua conta na Sellerverse foi criada com sucesso. A partir de agora você tem acesso à comunidade, cursos, ferramentas e mentorias que vão te ajudar a escalar no e-commerce.
                </p>
                ${
                  marketplace
                    ? `<p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#374151;">Vimos que você vende no <strong>${escapeHtml(
                        marketplace
                      )}</strong> — já separamos conteúdo específico pra você na área do aluno.</p>`
                    : ""
                }
                <div style="margin:28px 0;text-align:center;">
                  <a href="https://project-9hhfa.vercel.app/dashboard" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#EF9F27 0%,#FAC775 100%);color:#0A0A0F;text-decoration:none;border-radius:10px;font-weight:700;font-size:15px;">Acessar área do aluno →</a>
                </div>
                <p style="margin:24px 0 0 0;font-size:14px;line-height:1.6;color:#6B7280;">
                  Qualquer dúvida, é só responder esse e-mail. Estamos juntos nessa.
                </p>
                <p style="margin:16px 0 0 0;font-size:14px;color:#6B7280;">— Equipe Sellerverse</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #E5E7EB;text-align:center;font-size:12px;color:#9CA3AF;">
                © ${new Date().getFullYear()} Sellerverse — Brasil
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
