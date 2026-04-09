import React from "react";
import Link from "next/link";
import { Play, BookOpen, Lock, ArrowRight, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import ScrollReveal from "@/components/shared/ScrollReveal";

const mockUser = {
  name: "Pedro Alves",
  plan: "Pro" as "Grátis" | "Pro" | "Premium",
};

const enrolledCourses = [
  {
    slug: "marketplace-do-zero",
    title: "Marketplace do Zero ao Avançado",
    instructor: "Rafael Moura",
    progress: 68,
    totalLessons: 45,
    completedLessons: 30,
    gradient: "from-orbit-800 to-orbit-600",
    category: "Vendas",
  },
  {
    slug: "trafego-pago-sellers",
    title: "Tráfego Pago para Sellers",
    instructor: "Camila Santos",
    progress: 32,
    totalLessons: 28,
    completedLessons: 9,
    gradient: "from-purple-900 to-orbit-800",
    category: "Marketing",
  },
  {
    slug: "fotografia-produtos",
    title: "Fotografia de Produtos que Vendem",
    instructor: "Lucas Ferreira",
    progress: 5,
    totalLessons: 18,
    completedLessons: 1,
    gradient: "from-emerald-900 to-orbit-800",
    category: "Conteúdo",
  },
];

const availableCourses = [
  {
    slug: "logistica-ecommerce",
    title: "Logística no E-commerce Brasileiro",
    instructor: "Marcos Pinto",
    totalLessons: 22,
    rating: 4.9,
    gradient: "from-orange-900 to-red-900",
    category: "Operações",
    planRequired: "Pro",
  },
  {
    slug: "copywriting-produtos",
    title: "Copywriting para Descrições de Produtos",
    instructor: "Juliana Reis",
    totalLessons: 15,
    rating: 4.8,
    gradient: "from-pink-900 to-purple-900",
    category: "Marketing",
    planRequired: "Pro",
  },
  {
    slug: "financas-seller",
    title: "Finanças para Sellers: Planilhas e Controle",
    instructor: "André Souza",
    totalLessons: 19,
    rating: 4.7,
    gradient: "from-teal-900 to-orbit-900",
    category: "Finanças",
    planRequired: "Pro",
  },
];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-accent-400 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function CursosPage() {
  const isPro = mockUser.plan === "Pro" || mockUser.plan === "Premium";

  return (
    <div className="p-6 lg:p-8 space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <ScrollReveal direction="up">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
              Meus Cursos
            </h1>
            <p className="text-white/50 mt-1 text-sm">
              {enrolledCourses.length} cursos matriculados · continue de onde parou
            </p>
          </div>
          <Badge variant="accent">Plano {mockUser.plan}</Badge>
        </div>
      </ScrollReveal>

      {/* Enrolled courses */}
      <section>
        <ScrollReveal direction="up" delay={0.05}>
          <h2 className="text-base font-semibold text-white/70 uppercase tracking-widest text-xs mb-4">
            Em andamento
          </h2>
        </ScrollReveal>

        {enrolledCourses.length === 0 ? (
          <ScrollReveal direction="up" delay={0.1}>
            <Card variant="dark" padding="xl" className="text-center">
              <BookOpen size={40} className="text-white/20 mx-auto mb-3" />
              <p className="text-white font-semibold">Nenhum curso ainda</p>
              <p className="text-white/50 text-sm mt-1">
                Explore os cursos disponíveis no seu plano abaixo.
              </p>
            </Card>
          </ScrollReveal>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrolledCourses.map((course, i) => (
              <ScrollReveal key={course.slug} direction="up" index={i} delay={0.05}>
                <Card variant="dark" padding="none" hover className="overflow-hidden flex flex-col">
                  {/* Thumbnail */}
                  <div
                    className={`h-40 bg-gradient-to-br ${course.gradient} flex items-center justify-center relative`}
                  >
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play size={24} className="text-white ml-1" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="default" size="sm">
                        {course.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
                      <ProgressBar value={course.progress} />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-white text-sm leading-snug mb-1">
                      {course.title}
                    </h3>
                    <p className="text-white/50 text-xs mb-1">{course.instructor}</p>
                    <p className="text-white/40 text-xs mb-3">
                      {course.completedLessons} de {course.totalLessons} aulas concluídas
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-accent-400 text-xs font-bold">
                        {course.progress}% completo
                      </span>
                      <Link href={`/dashboard/cursos/${course.slug}`}>
                        <Button size="sm" variant="primary">
                          Continuar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* Available courses */}
      <section>
        <ScrollReveal direction="up" delay={0.05}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white/70 uppercase tracking-widest text-xs">
              Disponíveis no seu plano
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {availableCourses.map((course, i) => (
            <ScrollReveal key={course.slug} direction="up" index={i} delay={0.05}>
              <Card variant="dark" padding="none" hover className="overflow-hidden flex flex-col">
                <div
                  className={`h-36 bg-gradient-to-br ${course.gradient} flex items-center justify-center relative`}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="default" size="sm">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-white text-sm leading-snug mb-1">
                    {course.title}
                  </h3>
                  <p className="text-white/50 text-xs mb-1">{course.instructor}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star size={12} className="text-accent-400 fill-accent-400" />
                    <span className="text-white/60 text-xs">{course.rating}</span>
                    <span className="text-white/30 text-xs">·</span>
                    <span className="text-white/40 text-xs">{course.totalLessons} aulas</span>
                  </div>
                  <div className="mt-auto">
                    <Link href={`/dashboard/cursos/${course.slug}`}>
                      <Button size="sm" variant="secondary" className="w-full">
                        Começar agora
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Upgrade CTA for Pro */}
      {isPro && (
        <ScrollReveal direction="up" delay={0.1}>
          <Card
            variant="glass"
            padding="lg"
            className="bg-gradient-to-br from-orbit-900/60 to-purple-900/30 border border-orbit-400/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(24,95,165,0.2),transparent_60%)]" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <Badge variant="primary" size="sm" className="mb-2">
                  Premium
                </Badge>
                <h3 className="text-white font-bold text-lg font-display">
                  Desbloqueie mais de 40 cursos
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  Upgrade para Premium e acesse toda a biblioteca de cursos, incluindo
                  masterclasses exclusivas e mentorias em grupo.
                </p>
              </div>
              <Link href="/dashboard/plano">
                <Button variant="accent" size="lg">
                  Ver Premium <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </Card>
        </ScrollReveal>
      )}
    </div>
  );
}
