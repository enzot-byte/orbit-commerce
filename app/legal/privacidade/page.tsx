import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o Sellerverse coleta, usa e protege seus dados pessoais — conforme a Lei Geral de Proteção de Dados (LGPD).",
  robots: { index: true, follow: true },
};

// Última atualização — sempre que mudar o documento, atualize aqui
const LAST_UPDATED = "18 de maio de 2026";

export default function PrivacidadePage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0A0A0F] min-h-screen pt-20 pb-24">
        <div className="container-orbit max-w-3xl">
          <header className="mb-12">
            <h1
              className="text-white font-bold mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.875rem, 4vw, 2.5rem)",
              }}
            >
              Política de Privacidade
            </h1>
            <p className="text-white/50 text-sm">
              Última atualização: {LAST_UPDATED}
            </p>
          </header>

          <article className="prose-legal space-y-10 text-white/75 text-[15px] leading-relaxed">
            <section>
              <p>
                Esta Política de Privacidade descreve como a{" "}
                <strong className="text-white">Sellerverse</strong> ("nós",
                "nosso") coleta, usa, armazena e protege os dados pessoais dos
                usuários ("você", "titular") da plataforma{" "}
                <strong className="text-white">sellerverse.com.br</strong>{" "}
                ("Plataforma"). Estamos em conformidade com a Lei nº 13.709/2018
                (Lei Geral de Proteção de Dados — LGPD) e demais normas
                aplicáveis.
              </p>
              <p className="mt-4">
                Ao se cadastrar e utilizar a Plataforma, você concorda com os
                termos desta Política. Recomendamos a leitura integral.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                1. Controlador dos dados
              </h2>
              <p>
                O controlador dos dados pessoais coletados é{" "}
                <strong className="text-white">Enzo Tolissa</strong>
                {/* TODO: substituir por razão social + CNPJ se houver pessoa jurídica */}
                , responsável pela operação da Sellerverse. Para questões
                relacionadas a esta Política ou a seus dados pessoais, entre em
                contato pelo e-mail{" "}
                <a
                  href="mailto:privacidade@sellerverse.com.br"
                  className="text-orbit-400 hover:text-orbit-200 transition-colors"
                >
                  privacidade@sellerverse.com.br
                </a>
                .
                {/* TODO: confirmar email final + criar caixa no Resend */}
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                2. Dados coletados
              </h2>
              <p>Coletamos os seguintes dados, sempre com base legal definida:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <strong className="text-white">Dados de cadastro:</strong>{" "}
                  nome completo, e-mail, senha (armazenada com hash bcrypt), número
                  de WhatsApp e marketplaces em que você opera.
                </li>
                <li>
                  <strong className="text-white">Dados de autenticação:</strong>{" "}
                  quando você opta por entrar via Google, recebemos do Google o
                  seu e-mail, nome e foto de perfil (apenas se você consentir).
                </li>
                <li>
                  <strong className="text-white">Dados de uso:</strong> registros
                  de acesso (data, hora, IP de origem), páginas visitadas dentro
                  da Plataforma e interações com cursos e ferramentas.
                </li>
                <li>
                  <strong className="text-white">Dados de pagamento:</strong>{" "}
                  durante a fase atual, pagamentos são processados manualmente
                  via Pix — não armazenamos dados bancários. Quando o pagamento
                  recorrente automatizado entrar (via Stripe), o processamento
                  ocorrerá inteiramente nos servidores do Stripe, sem que sua
                  informação financeira passe pelos nossos sistemas.
                </li>
                <li>
                  <strong className="text-white">Cookies essenciais:</strong>{" "}
                  utilizamos cookies estritamente necessários para manter sua
                  sessão autenticada (cookies HTTP-only emitidos pelo Supabase).
                  Não utilizamos cookies de rastreamento publicitário.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                3. Finalidade do uso
              </h2>
              <p>Utilizamos seus dados estritamente para:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Criar e manter sua conta na Plataforma;</li>
                <li>
                  Liberar e controlar acesso aos cursos, ferramentas e comunidade
                  conforme o plano contratado;
                </li>
                <li>
                  Enviar comunicações operacionais (confirmação de cadastro,
                  recuperação de senha, atualizações de plano);
                </li>
                <li>
                  Enviar comunicações educacionais e promocionais relacionadas à
                  Plataforma (com possibilidade de descadastramento a qualquer
                  momento);
                </li>
                <li>
                  Cumprir obrigações legais, regulatórias e fiscais quando
                  aplicáveis;
                </li>
                <li>
                  Prevenir fraude, abuso e violação dos Termos de Uso.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                4. Base legal
              </h2>
              <p>
                O tratamento dos seus dados pessoais ocorre nas seguintes bases
                legais (art. 7º da LGPD):
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <strong className="text-white">Consentimento</strong> — para
                  cadastro e envio de comunicações educacionais/promocionais;
                </li>
                <li>
                  <strong className="text-white">Execução de contrato</strong>{" "}
                  — para entrega dos serviços do plano contratado;
                </li>
                <li>
                  <strong className="text-white">
                    Cumprimento de obrigação legal
                  </strong>{" "}
                  — para guarda de registros conforme exigências fiscais e do
                  Marco Civil da Internet;
                </li>
                <li>
                  <strong className="text-white">Legítimo interesse</strong> —
                  para garantir segurança, prevenir fraude e melhorar a
                  Plataforma.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                5. Compartilhamento de dados
              </h2>
              <p>
                Não vendemos seus dados pessoais. Compartilhamos apenas com os
                seguintes operadores, estritamente para viabilizar o
                funcionamento da Plataforma:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <strong className="text-white">Supabase</strong> (autenticação
                  e banco de dados — servidor em São Paulo, Brasil);
                </li>
                <li>
                  <strong className="text-white">Vercel</strong> (hospedagem da
                  aplicação web);
                </li>
                <li>
                  <strong className="text-white">Resend</strong> (envio de
                  e-mails transacionais);
                </li>
                <li>
                  <strong className="text-white">Google</strong> (apenas se você
                  optar por entrar com a sua conta Google).
                </li>
              </ul>
              <p className="mt-4">
                Todos esses operadores são contratualmente obrigados a tratar
                seus dados conforme a LGPD ou regulação equivalente (GDPR, no
                caso de operadores internacionais).
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                6. Retenção
              </h2>
              <p>
                Mantemos seus dados pelo período em que sua conta estiver ativa.
                Após o cancelamento da conta, mantemos os dados por mais{" "}
                <strong className="text-white">90 dias</strong> para fins de
                eventual reativação e por até{" "}
                <strong className="text-white">5 anos</strong> registros mínimos
                exigidos pela legislação fiscal e pelo Marco Civil da Internet
                (Lei nº 12.965/2014).
              </p>
              <p className="mt-4">
                Após esses prazos, os dados são definitivamente anonimizados ou
                excluídos.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                7. Seus direitos
              </h2>
              <p>
                A LGPD garante a você, titular dos dados, os seguintes direitos
                (art. 18):
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Confirmação da existência de tratamento;</li>
                <li>Acesso aos dados;</li>
                <li>
                  Correção de dados incompletos, inexatos ou desatualizados;
                </li>
                <li>
                  Anonimização, bloqueio ou eliminação de dados desnecessários ou
                  excessivos;
                </li>
                <li>Portabilidade dos dados a outro fornecedor;</li>
                <li>
                  Eliminação dos dados tratados com base no seu consentimento;
                </li>
                <li>Informação sobre as entidades com quem compartilhamos;</li>
                <li>Revogação do consentimento a qualquer momento.</li>
              </ul>
              <p className="mt-4">
                Para exercer qualquer um desses direitos, envie um e-mail para{" "}
                <a
                  href="mailto:privacidade@sellerverse.com.br"
                  className="text-orbit-400 hover:text-orbit-200 transition-colors"
                >
                  privacidade@sellerverse.com.br
                </a>
                . Responderemos em até 15 dias.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                8. Segurança
              </h2>
              <p>
                Adotamos medidas técnicas e administrativas para proteger seus
                dados: senhas armazenadas com hash criptográfico, conexões HTTPS
                obrigatórias, autenticação por cookies HTTP-only e princípio do
                menor privilégio no acesso interno aos dados.
              </p>
              <p className="mt-4">
                Apesar disso, nenhum sistema é 100% seguro. Em caso de incidente
                que envolva dados pessoais, notificaremos a Autoridade Nacional
                de Proteção de Dados (ANPD) e os titulares afetados nos prazos
                legais.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                9. Alterações desta Política
              </h2>
              <p>
                Podemos atualizar esta Política periodicamente. Sempre que houver
                mudança relevante, comunicaremos por e-mail e pela própria
                Plataforma. A data da última atualização está indicada no topo
                deste documento.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                10. Contato
              </h2>
              <p>
                Em caso de dúvidas, contate-nos por{" "}
                <a
                  href="mailto:privacidade@sellerverse.com.br"
                  className="text-orbit-400 hover:text-orbit-200 transition-colors"
                >
                  privacidade@sellerverse.com.br
                </a>
                .
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
