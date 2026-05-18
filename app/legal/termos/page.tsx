import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos e condições para utilização da plataforma Sellerverse — cursos, ferramentas e comunidade para sellers brasileiros.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "18 de maio de 2026";

export default function TermosPage() {
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
              Termos de Uso
            </h1>
            <p className="text-white/50 text-sm">
              Última atualização: {LAST_UPDATED}
            </p>
          </header>

          <article className="prose-legal space-y-10 text-white/75 text-[15px] leading-relaxed">
            <section>
              <p>
                Estes Termos de Uso ("Termos") regulam o acesso e a utilização
                da plataforma{" "}
                <strong className="text-white">Sellerverse</strong>{" "}
                (sellerverse.com.br), operada por{" "}
                <strong className="text-white">Enzo Tolissa</strong>
                {/* TODO: substituir por razão social + CNPJ se houver pessoa jurídica */}
                . Ao se cadastrar e utilizar a plataforma, você ("Usuário")
                concorda integralmente com estes Termos.
              </p>
              <p className="mt-4">
                Se você não concorda com qualquer disposição, não utilize a
                plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                1. Definições
              </h2>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <strong className="text-white">Plataforma:</strong> conjunto
                  de páginas web, aplicações, ferramentas, cursos e canais de
                  comunidade disponibilizados via sellerverse.com.br.
                </li>
                <li>
                  <strong className="text-white">Usuário:</strong> pessoa
                  física maior de 18 anos com cadastro ativo na Plataforma.
                </li>
                <li>
                  <strong className="text-white">Plano Grátis:</strong> nível
                  gratuito de acesso, com escopo limitado ao que está
                  expressamente indicado na página de planos.
                </li>
                <li>
                  <strong className="text-white">Plano Pro:</strong> nível pago
                  com acesso ampliado a cursos, ferramentas exclusivas e
                  comunidade Discord.
                </li>
                <li>
                  <strong className="text-white">Conteúdo:</strong> qualquer
                  curso, aula, ebook, calculadora, extensão, texto, vídeo,
                  imagem ou ferramenta disponibilizada na Plataforma.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                2. Cadastro e Conta
              </h2>
              <p>
                Para utilizar funcionalidades autenticadas da Plataforma, o
                Usuário deve realizar cadastro fornecendo informações
                verdadeiras, exatas e atualizadas. Cada Usuário é responsável
                por manter a confidencialidade de sua senha e por todas as
                atividades realizadas em sua conta.
              </p>
              <p className="mt-4">
                É vedado o compartilhamento de conta entre múltiplas pessoas. A
                violação desta regra autoriza a Sellerverse a suspender ou
                encerrar o acesso sem reembolso.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                3. Assinatura e Pagamento
              </h2>
              <p>
                O Plano Pro é cobrado em base recorrente (mensal ou anual,
                conforme escolha do Usuário no momento da contratação). O
                pagamento pode ocorrer via:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <strong className="text-white">Pix</strong> — fase inicial,
                  com confirmação manual e liberação do plano em até 12 horas
                  úteis;
                </li>
                <li>
                  <strong className="text-white">Cartão de crédito</strong> via
                  Stripe (a ser disponibilizado).
                </li>
              </ul>
              <p className="mt-4">
                O Usuário pode cancelar sua assinatura a qualquer momento. O
                cancelamento entra em vigor ao final do período já pago — não
                há reembolso proporcional fora da garantia descrita na cláusula
                seguinte.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                4. Garantia de 7 dias
              </h2>
              <p>
                Oferecemos garantia incondicional de{" "}
                <strong className="text-white">7 (sete) dias corridos</strong>{" "}
                a contar da data da primeira cobrança. Caso o Usuário não esteja
                satisfeito por qualquer motivo, basta solicitar o reembolso pelo
                e-mail{" "}
                <a
                  href="mailto:suporte@sellerverse.com.br"
                  className="text-orbit-400 hover:text-orbit-200 transition-colors"
                >
                  suporte@sellerverse.com.br
                </a>
                {/* TODO: confirmar email final + criar caixa */} dentro do prazo,
                que efetuaremos o estorno integral em até 5 dias úteis.
              </p>
              <p className="mt-4">
                Após o prazo de 7 dias, não há devolução de valores já pagos —
                apenas cancelamento da renovação futura.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                5. Uso Aceitável
              </h2>
              <p>
                Ao utilizar a Plataforma, o Usuário compromete-se a NÃO:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  Copiar, reproduzir, redistribuir ou revender o Conteúdo a
                  terceiros;
                </li>
                <li>
                  Compartilhar credenciais de acesso ou disponibilizar acesso a
                  cursos pagos a quem não seja o titular da conta;
                </li>
                <li>
                  Utilizar a Plataforma para fins ilícitos, fraudulentos ou que
                  violem direitos de terceiros;
                </li>
                <li>
                  Praticar engenharia reversa, raspagem automatizada ou
                  extração massiva de dados das ferramentas e cursos;
                </li>
                <li>
                  Importunar, ofender ou prejudicar outros membros nos canais
                  de comunidade (Discord, WhatsApp).
                </li>
              </ul>
              <p className="mt-4">
                Violações podem resultar em suspensão imediata da conta, sem
                direito a reembolso, e nas medidas cabíveis pela legislação.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                6. Propriedade Intelectual
              </h2>
              <p>
                Todo o Conteúdo disponibilizado na Plataforma — cursos, aulas,
                ferramentas, textos, marcas, logos e código-fonte — é de
                propriedade exclusiva da Sellerverse ou de seus parceiros
                licenciantes, protegido pelas leis de direito autoral (Lei nº
                9.610/1998) e propriedade industrial (Lei nº 9.279/1996).
              </p>
              <p className="mt-4">
                A assinatura ativa concede ao Usuário licença{" "}
                <strong className="text-white">
                  pessoal, não exclusiva, intransferível e revogável
                </strong>{" "}
                de acesso e uso, durante a vigência do plano contratado. Nenhum
                outro direito é concedido.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                7. Suspensão e Encerramento
              </h2>
              <p>
                A Sellerverse reserva-se o direito de suspender ou encerrar o
                acesso de qualquer Usuário que:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Viole estes Termos ou a legislação aplicável;</li>
                <li>
                  Tenha pagamento em atraso por mais de 7 dias após vencimento;
                </li>
                <li>
                  Utilize a Plataforma de modo a prejudicar sua operação ou
                  outros Usuários.
                </li>
              </ul>
              <p className="mt-4">
                O Usuário pode encerrar sua conta a qualquer momento pelo painel
                da plataforma ou por solicitação ao suporte.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                8. Limitação de Responsabilidade
              </h2>
              <p>
                A Sellerverse fornece a Plataforma "no estado em que se
                encontra". Embora envidemos os melhores esforços para garantir
                disponibilidade e qualidade do Conteúdo, NÃO garantimos:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  Resultados financeiros específicos decorrentes da aplicação
                  do conteúdo educacional (resultados em vendas dependem de
                  inúmeros fatores externos);
                </li>
                <li>
                  Funcionamento ininterrupto, livre de erros ou falhas dos
                  marketplaces de terceiros integrados (Mercado Livre, Shopee,
                  Amazon, etc.);
                </li>
                <li>
                  Conteúdo de comunidade gerado por outros Usuários nos canais
                  externos (Discord, WhatsApp).
                </li>
              </ul>
              <p className="mt-4">
                A responsabilidade da Sellerverse limita-se ao valor pago pelo
                Usuário nos 12 meses anteriores ao evento que gerou a demanda.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                9. Alterações
              </h2>
              <p>
                Estes Termos podem ser atualizados periodicamente. Mudanças
                relevantes serão comunicadas por e-mail e pela própria
                Plataforma com pelo menos 15 dias de antecedência. Continuar
                utilizando a Plataforma após a vigência de novos Termos implica
                aceite tácito.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                10. Disposições gerais
              </h2>
              <p>
                Estes Termos são regidos pelas leis brasileiras. Fica eleito o
                foro da Comarca de{" "}
                <strong className="text-white">[CIDADE A DEFINIR]</strong>
                {/* TODO: substituir pela comarca do controlador (provavelmente cidade do Enzo) */}{" "}
                — Estado de{" "}
                <strong className="text-white">[ESTADO A DEFINIR]</strong>, com
                renúncia expressa a qualquer outro, por mais privilegiado que
                seja.
              </p>
              <p className="mt-4">
                A invalidade de qualquer cláusula isolada não afeta a validade
                das demais.
              </p>
            </section>

            <section>
              <h2 className="text-white font-display text-xl font-bold mb-3">
                11. Contato
              </h2>
              <p>
                Dúvidas sobre estes Termos? Escreva para{" "}
                <a
                  href="mailto:suporte@sellerverse.com.br"
                  className="text-orbit-400 hover:text-orbit-200 transition-colors"
                >
                  suporte@sellerverse.com.br
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
