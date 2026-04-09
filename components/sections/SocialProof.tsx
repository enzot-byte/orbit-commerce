import AnimatedCounter from "@/components/shared/AnimatedCounter";
import ScrollReveal from "@/components/shared/ScrollReveal";

const stats = [
  {
    value: 2500,
    prefix: "+",
    suffix: " sellers",
    label: "Comunidade ativa",
  },
  {
    value: 50,
    prefix: "+R$",
    suffix: "M faturados",
    label: "Pelos nossos membros",
  },
  {
    value: 150,
    prefix: "+",
    suffix: " ferramentas",
    label: "Disponíveis na plataforma",
  },
];

const marketplaces = [
  "Amazon",
  "Mercado Livre",
  "Shopee",
  "Magalu",
  "Americanas",
  "Shein",
];

export default function SocialProof() {
  return (
    <section
      className="section-pad border-y"
      style={{
        backgroundColor: "#1A1A2E",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="container-orbit">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 mb-14">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} direction="up" index={i} delay={0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2200}
                  />
                </div>
                <p className="text-sm text-white/50 font-medium">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Marketplace badges */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="flex flex-col items-center gap-5">
            <p className="text-sm text-white/45 tracking-wide font-medium uppercase">
              Presentes nos principais marketplaces:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {marketplaces.map((name) => (
                <span
                  key={name}
                  className="px-4 py-1.5 rounded-full text-sm font-medium border"
                  style={{
                    borderColor: "rgba(24,95,165,0.35)",
                    backgroundColor: "rgba(24,95,165,0.1)",
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
