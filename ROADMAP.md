# Sellerverse — Roadmap

Sistema único de organização do produto. Atualize esse arquivo conforme
fechar itens, sem precisar mexer em Notion / Trello / Linear externo.

**Convenção:** `[ ]` pendente · `[x]` feito · `[~]` em progresso · `[!]` bloqueado

**Como ler:** os sprints estão em ordem de prioridade. Faça de cima pra baixo.
Quando algo de prioridade alta surgir, insere no sprint atual (não no fim).

**Daily ritual (5 min de manhã):**
1. Abrir esse arquivo
2. Olhar Sprint atual + "Em andamento agora"
3. Marcar 1-2 itens pra hoje
4. Fechar o que terminou ontem

Última revisão: _atualize aqui ao mudar o arquivo_

---

## 🎯 Em andamento agora

_O que tá sendo trabalhado nesta semana, atualize livre_

- [ ] _(adicione aqui o que estiver fazendo)_

---

## 🚨 Sprint 1 — Stripe + cobrança real

**Critério de sucesso:** um stranger consegue assinar Pro com cartão real e o
plano dele aparece como "Pro" no Supabase.

- [ ] Criar projeto Supabase NOVO só pro Sellerverse (separado do SellerData)
- [ ] Trocar `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` na Vercel
- [ ] Criar table `subscriptions` no Supabase (`user_id`, `plan`, `status`, `current_period_end`, `stripe_customer_id`, `stripe_subscription_id`)
- [ ] `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` nas env vars
- [ ] `app/api/checkout/route.ts` — cria Stripe Checkout Session a partir do plano + user
- [ ] `app/api/webhook/stripe/route.ts` — handle `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- [ ] `lib/AuthProvider.tsx` — lookup do plano via `subscriptions` table em vez de `user_metadata`
- [ ] Trocar `mockUser.plan === "Pro"` em todas as páginas do dashboard por user real
- [ ] Stripe Customer Portal para gerenciar/cancelar assinatura
- [ ] Página `/checkout/sucesso` + email de boas-vindas via Resend

**Estimativa:** 1 semana focada · **Bloqueia:** tudo, sem isso não tem negócio

---

## 🎓 Sprint 2 — MVP da área do aluno

**Critério de sucesso:** assinante Pro entra no dashboard e tem ao menos 1
curso completo pra consumir + 1 ferramenta funcionando.

- [ ] Definir MVP honesto: o que o Pro entrega no dia 1?
  - opção A: 1 curso completo gravado (5-10 aulas) + Calculadora de Margem + Discord exclusivo
  - opção B: ferramentas avançadas + cursos "em breve" + Discord
- [ ] Hosting de vídeo: Mux Video OU Cloudflare Stream (Vimeo é caro)
- [ ] Schema Supabase: `courses`, `lessons`, `enrollments`, `lesson_completion`
- [ ] Player de vídeo no `app/dashboard/cursos/[slug]/page.tsx`
- [ ] Checkbox "marcar como concluída" persistindo no banco
- [ ] Progress bar real por curso (% de aulas concluídas)
- [ ] Discord invite real (substituir `discord.gg/placeholder`)
- [ ] WhatsApp invite real (substituir `chat.whatsapp.com/placeholder`)
- [ ] Gating: `if (user.plan !== 'Pro') return <UpgradeCTA />` nas páginas/ferramentas Pro
- [ ] Email do Resend num domínio próprio (`hello@sellerverse.com.br`) em vez de `onboarding@resend.dev`

**Estimativa:** 2 semanas dependendo do conteúdo gravado · **Bloqueia:** crescimento

---

## ⚡ Sprint 3 — Performance fluidez Apple-style (em andamento, parcial)

**Critério de sucesso:** Lighthouse mobile score > 85 em todas as rotas
principais E "feel" subjetivo de scroll fluido até em PC mediano.

### Já feito ✅
- [x] Galaxy WebGL: DPR cap por tier, density auto-tune, pause offscreen, skip total em low-tier
- [x] rAF cancel real (não só skip draw) em WebGL components
- [x] CustomCursor pausa quando tab oculto + 30fps idle
- [x] Removido `@react-three/fiber` + Antigravity (código morto)
- [x] AuthProvider singleton (1 getUser em vez de 3)
- [x] Dashboard server-componentizado parcial
- [x] Server-side auth guard via `proxy.ts`
- [x] Mobile drawer a11y (inert, focus trap, escape)
- [x] Footer href="#" eliminados
- [x] `dynamicParams=false` em rotas de blog/cursos
- [x] HomeBelowFold com chunk splitting via Client wrapper
- [x] UI primitives sem framer-motion (Button, Card, Toggle, Input)
- [x] Variable fonts (9 arquivos → 3)
- [x] ToolsPreview orbit CSS-only (zero rAF JS)
- [x] HowItWorks/Hero sem useScroll/useTransform
- [x] shimmer-text reduzido de 12 instâncias para 1 (só Hero h1)
- [x] Footer Logo não anima mais
- [x] `content-visibility: auto` em todas as below-fold sections (browser pula paint quando offscreen)
- [x] backdrop-filter cortado de `.glass`, `.glass-card`, `.hyper-feature-card`, `.blog-slide--featured`
- [x] DPR cap mais agressivo (low 1×, mid 1.25×, high 1.5×)
- [x] lib/web-vitals.ts — métricas reais no console em dev

### Restante 🟡
- [ ] PlanosHero hyper-scroll 3D parallax — auditar perspective + transform 3D
- [ ] CursosHero "course builder" scene — auditar keyframes
- [ ] FerramentasHero factory belt — auditar keyframes
- [ ] Audit + remover `will-change` permanentes não justificados (~20 instâncias)
- [ ] Trocar restantes `backdrop-blur-sm` em bolinhas decorativas do dashboard por bg sólido
- [ ] Sections framer-motion restantes (Pricing, EbookCapture, Testimonials, ToolsPreview) → CSS reveals
- [ ] `Image` component em logos/avatars (zero hoje)
- [ ] Pre-paint static skeleton enquanto Galaxy chunk carrega
- [ ] Optional: toggle "modo lite" no canto inferior persistindo no `localStorage`

**Estimativa:** 3-5 dias de trabalho focado

---

## 📈 Sprint 4 — Conteúdo + SEO

**Critério de sucesso:** Google indexa 10+ artigos, tráfego orgânico começa a
aparecer no Search Console.

- [ ] 5-10 artigos no blog (cada um vira entrada no `ARTICLES` em `app/blog/[slug]/page.tsx`)
- [ ] `app/sitemap.ts` — sitemap dinâmico com todos os slugs reais
- [ ] `app/robots.ts` — config padrão + ref ao sitemap
- [ ] Schema.org structured data (`Course`, `Article`, `Organization`, `BreadcrumbList`)
- [ ] `metadataBase` no `app/layout.tsx` (warning do build atual)
- [ ] Páginas legais `/legal/privacidade` + `/legal/termos` (obrigatório LGPD pra cobrar)
- [ ] Open Graph image dinâmica por artigo (`/api/og/blog/[slug]/route.ts`)
- [ ] Analytics: Plausible ou Umami (privacy-friendly, no cookie banner) — recomendo Plausible Self-hosted ou Vercel Analytics
- [ ] Sentry ou Highlight pra error tracking em prod (hoje cego pra bugs reais)

**Estimativa:** 1-2 semanas

---

## 🧹 Sprint 5 — Limpeza / dívida técnica

_Não é urgente, mas tira ruído da base._

- [ ] Páginas dinâmicas `app/dashboard/cursos/[slug]` + `ferramentas/[slug]` com fallback "em breve" → adicionar `generateStaticParams`
- [ ] Padronizar warnings de build (`metadataBase`, lockfile duplicado, etc)
- [ ] Adicionar `.claude/` ao `.gitignore` (anda vazando uns arquivos em commits)
- [ ] CI básico: GitHub Action que roda `tsc --noEmit` + `next build` em PR
- [ ] Tests de smoke nas rotas críticas (`/login`, `/cadastro`, `/checkout/[plano]`)
- [ ] Lighthouse CI no PR pra catch regressões de perf

---

## 🌱 Backlog (ideias soltas, não priorizadas)

- [ ] Modo claro de verdade (hoje toggle existe mas pouco testado fora do dashboard)
- [ ] PWA (manifest + service worker) pra instalar como app
- [ ] Sistema de afiliados (provavelmente Rewardful + Stripe)
- [ ] Notificações in-app de novas aulas (Supabase Realtime)
- [ ] Chat de suporte (Crisp / Intercom / próprio)
- [ ] Live streaming de aulas (StreamYard / vmix → YouTube unlisted)
- [ ] Versionamento de planos (preços antigos pra usuários antigos)
- [ ] A/B test framework (Vercel Edge Config ou GrowthBook)

---

## 📝 Convenções operacionais

- **Branches:** `claude/<nome-da-task>` pra cada feature, merge na `main` quando passa build
- **Commits:** prefixos `perf:`, `feat:`, `fix:`, `docs:`, `chore:`
- **Deploys:** Vercel auto-deploya `main` → produção
- **Env vars críticas:** `NEXT_PUBLIC_SUPABASE_*`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`
- **Rollback rápido:** `git push origin <commit-anterior>:main --force-with-lease` (usar SÓ se quebrou prod)

---

## 🔥 Como descobrir os números reais

Quando rodar `npm run dev` localmente, abra DevTools console na home. Vai
logar automaticamente:

```
🟢 TTFB: 120ms
🟢 FCP: 800ms
🟡 LCP: 2700ms          ← este precisa de atenção
🟢 CLS: 0.020
🟢 INP: 90ms
```

Verde = produto fluido. Amarelo = melhorar. Vermelho = corrige antes de
mostrar pra alguém.
