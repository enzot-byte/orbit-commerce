import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle,
  FileText,
  ChevronDown,
  Download,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// Mock course data by slug
const courseData: Record<
  string,
  {
    title: string;
    instructor: string;
    progress: number;
    gradient: string;
    description: string;
    currentLesson: { title: string; description: string; duration: string };
    modules: Array<{
      title: string;
      lessons: Array<{ title: string; duration: string; completed: boolean }>;
    }>;
    materials: Array<{ name: string; type: string }>;
  }
> = {
  "marketplace-do-zero": {
    title: "Marketplace do Zero ao Avançado",
    instructor: "Rafael Moura",
    progress: 68,
    gradient: "from-orbit-800 to-orbit-600",
    description:
      "Aprenda do zero como montar uma operação lucrativa em marketplaces como Mercado Livre, Amazon e Shopee. Nesta aula, entendemos as estratégias de precificação para maximizar sua margem sem perder competitividade.",
    currentLesson: {
      title: "Aula 14: Estratégia de Precificação",
      description:
        "Como precificar seus produtos levando em conta margem, frete, taxa do marketplace e posicionamento competitivo. Aprenda a calcular seu preço mínimo e preço ideal.",
      duration: "18 min",
    },
    modules: [
      {
        title: "Módulo 1: Fundamentos",
        lessons: [
          { title: "Introdução ao universo dos marketplaces", duration: "12 min", completed: true },
          { title: "Escolhendo seu nicho de mercado", duration: "15 min", completed: true },
          { title: "Como funciona o algoritmo de busca", duration: "20 min", completed: true },
          { title: "Cadastro e configuração da conta", duration: "10 min", completed: true },
        ],
      },
      {
        title: "Módulo 2: Produto e Catálogo",
        lessons: [
          { title: "Encontrando produtos ganhadores", duration: "22 min", completed: true },
          { title: "Criando títulos que vendem", duration: "18 min", completed: true },
          { title: "Descrições persuasivas", duration: "14 min", completed: true },
          { title: "Fotografia para marketplaces", duration: "25 min", completed: false },
        ],
      },
      {
        title: "Módulo 3: Precificação e Margem",
        lessons: [
          { title: "Entendendo as taxas dos marketplaces", duration: "16 min", completed: false },
          { title: "Calculando sua margem real", duration: "14 min", completed: false },
          { title: "Aula 14: Estratégia de Precificação", duration: "18 min", completed: false },
          { title: "Competindo sem guerra de preços", duration: "20 min", completed: false },
        ],
      },
      {
        title: "Módulo 4: Escala e Operação",
        lessons: [
          { title: "Gestão de estoque eficiente", duration: "19 min", completed: false },
          { title: "Automação de processos", duration: "23 min", completed: false },
          { title: "Análise de métricas e KPIs", duration: "21 min", completed: false },
        ],
      },
    ],
    materials: [
      { name: "Planilha de Precificação (Excel)", type: "xlsx" },
      { name: "Checklist de Cadastro de Produtos", type: "pdf" },
      { name: "Guia de Taxas por Marketplace 2025", type: "pdf" },
    ],
  },
};

const defaultCourse = {
  title: "Curso",
  instructor: "Instrutor",
  progress: 0,
  gradient: "from-orbit-900 to-orbit-800",
  description: "Conteúdo do curso.",
  currentLesson: { title: "Primeira aula", description: "Bem-vindo ao curso.", duration: "10 min" },
  modules: [
    {
      title: "Módulo 1",
      lessons: [
        { title: "Introdução", duration: "10 min", completed: false },
      ],
    },
  ],
  materials: [],
};

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courseData[slug] ?? { ...defaultCourse, title: slug.replace(/-/g, " ") };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Main content */}
      <div className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
        {/* Back nav */}
        <Link
          href="/dashboard/cursos"
          className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors"
        >
          <ChevronLeft size={16} /> Meus Cursos
        </Link>

        {/* Course header */}
        <div
          className={`h-48 lg:h-56 rounded-2xl bg-gradient-to-br ${course.gradient} flex items-center justify-center relative overflow-hidden`}
        >
          {/* Video placeholder */}
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
            <Play size={28} className="text-white ml-1" />
          </div>

          {/* Progress bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/80 text-xs">{course.currentLesson.title}</span>
              <span className="text-accent-400 text-xs font-semibold">{course.progress}%</span>
            </div>
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-400 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>

          <div className="absolute top-4 right-4">
            <Badge variant="default" size="sm">
              {course.currentLesson.duration}
            </Badge>
          </div>
        </div>

        {/* Lesson info */}
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-white font-display">
            {course.currentLesson.title}
          </h1>
          <p className="text-white/50 text-sm mt-0.5">{course.title} · {course.instructor}</p>
        </div>

        <p className="text-white/70 text-sm leading-relaxed">{course.currentLesson.description}</p>

        {/* Lesson navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button variant="outline" size="sm" leftIcon={<ChevronLeft size={16} />}>
            Aula anterior
          </Button>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="complete-lesson"
              className="w-4 h-4 rounded accent-orbit-600 cursor-pointer"
            />
            <label
              htmlFor="complete-lesson"
              className="text-white/70 text-sm cursor-pointer hover:text-white transition-colors"
            >
              Marcar como concluída
            </label>
          </div>

          <Button variant="primary" size="sm" rightIcon={<ChevronRight size={16} />}>
            Próxima aula
          </Button>
        </div>

        {/* Materials */}
        {course.materials.length > 0 && (
          <Card variant="dark" padding="md">
            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <FileText size={16} className="text-orbit-400" />
              Materiais da aula
            </h3>
            <div className="space-y-2">
              {course.materials.map((mat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="text-white/80 text-sm">{mat.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" size="sm">
                      {mat.type.toUpperCase()}
                    </Badge>
                    <Download size={14} className="text-white/40" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Sidebar - modules list */}
      <aside className="w-full lg:w-80 lg:border-l border-white/10 bg-dark-surface/50 overflow-y-auto">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-white font-semibold text-sm">Conteúdo do curso</h2>
          <p className="text-white/40 text-xs mt-0.5">{course.progress}% concluído</p>
        </div>

        <div className="p-2 space-y-1">
          {course.modules.map((mod, modIndex) => (
            <details key={modIndex} className="group" open={modIndex === 2}>
              <summary className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer hover:bg-white/5 text-white/80 text-sm font-medium list-none">
                <span>{mod.title}</span>
                <ChevronDown
                  size={16}
                  className="text-white/40 group-open:rotate-180 transition-transform"
                />
              </summary>

              <div className="pl-2 pr-1 pb-1 space-y-0.5">
                {mod.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs cursor-pointer transition-colors ${
                      lesson.title === course.currentLesson.title
                        ? "bg-orbit-600/20 text-orbit-300 border border-orbit-600/30"
                        : "text-white/50 hover:bg-white/5 hover:text-white/80"
                    }`}
                  >
                    {lesson.completed ? (
                      <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                    ) : (
                      <Play size={14} className="text-white/30 shrink-0" />
                    )}
                    <span className="flex-1 leading-snug">{lesson.title}</span>
                    <span className="text-white/30 shrink-0">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </aside>
    </div>
  );
}
