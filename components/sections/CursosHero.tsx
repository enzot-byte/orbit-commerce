"use client";

/* ═══════════════════════════════════════════════════════════════════
   CursosHero — "Course Builder" animated background scene
   Inspired by CodePen SVG editor, adapted to Sellerverse universe.
   Three learning panels (Vendas/Marketing/Operações) on the left,
   a dashboard being assembled on the right.
   All CSS animations — zero JS per-frame cost.
   ═══════════════════════════════════════════════════════════════════ */

export default function CursosHero() {
  return (
    <div className="crs-scene" aria-hidden="true">
      {/* ── Left: Lesson Panels ── */}
      <div className="crs-panels">
        {/* Vendas */}
        <div className="crs-panel">
          <div className="crs-panel-tab" style={{ borderBottomColor: "#EF9F27" }}>
            <span className="crs-dot" style={{ background: "#EF9F27" }} />
            <span>Vendas</span>
          </div>
          <div className="crs-panel-body">
            <div className="crs-row">
              <span className="crs-bar crs-a1" style={{ width: "45%", background: "#b5bc67" }} />
              <span className="crs-bar crs-a1 crs-d1" style={{ width: "35%", background: "#EF9F27" }} />
            </div>
            <div className="crs-row">
              <span className="crs-bar crs-a1 crs-d2" style={{ width: "55%", background: "#ae94b1" }} />
              <span className="crs-bar crs-a1 crs-d3" style={{ width: "25%", background: "#b5bc67" }} />
            </div>
            <div className="crs-row">
              <span className="crs-bar crs-a1 crs-d4" style={{ width: "40%", background: "#EF9F27" }} />
            </div>
          </div>
        </div>

        {/* Marketing */}
        <div className="crs-panel">
          <div className="crs-panel-tab" style={{ borderBottomColor: "#9B7BFF" }}>
            <span className="crs-dot" style={{ background: "#9B7BFF" }} />
            <span>Marketing</span>
          </div>
          <div className="crs-panel-body">
            <div className="crs-row">
              <span className="crs-bar crs-a3" style={{ width: "50%", background: "#ae94b1" }} />
              <span className="crs-bar crs-a3 crs-d1" style={{ width: "30%", background: "#9B7BFF" }} />
            </div>
            <div className="crs-row">
              <span className="crs-bar crs-a3 crs-d2" style={{ width: "60%", background: "#b5bc67" }} />
              <span className="crs-bar crs-a3 crs-d3" style={{ width: "20%", background: "#ae94b1" }} />
            </div>
            <div className="crs-row">
              <span className="crs-bar crs-a3 crs-d4" style={{ width: "45%", background: "#9B7BFF" }} />
            </div>
          </div>
        </div>

        {/* Operações */}
        <div className="crs-panel">
          <div className="crs-panel-tab" style={{ borderBottomColor: "#378ADD" }}>
            <span className="crs-dot" style={{ background: "#378ADD" }} />
            <span>Finan&ccedil;as</span>
          </div>
          <div className="crs-panel-body">
            <div className="crs-row">
              <span className="crs-bar crs-a5" style={{ width: "55%", background: "#b5bc67" }} />
              <span className="crs-bar crs-a5 crs-d1" style={{ width: "25%", background: "#378ADD" }} />
            </div>
            <div className="crs-row">
              <span className="crs-bar crs-a5 crs-d2" style={{ width: "35%", background: "#e8a939" }} />
              <span className="crs-bar crs-a5 crs-d3" style={{ width: "40%", background: "#ae94b1" }} />
            </div>
            <div className="crs-row">
              <span className="crs-bar crs-a5 crs-d4" style={{ width: "50%", background: "#378ADD" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="crs-divider" />

      {/* ── Right: Dashboard Canvas ── */}
      <div className="crs-canvas">
        {/* Window chrome */}
        <div className="crs-chrome crs-a2">
          <span className="crs-wdot" style={{ background: "#ff5f57" }} />
          <span className="crs-wdot" style={{ background: "#febc2e" }} />
          <span className="crs-wdot" style={{ background: "#28c840" }} />
          <span className="crs-chrome-title">Sellerverse</span>
        </div>

        {/* Dashboard body */}
        <div className="crs-dash">
          {/* Sidebar */}
          <div className="crs-sidebar crs-a2">
            <div className="crs-nav crs-nav-active" />
            <div className="crs-nav" />
            <div className="crs-nav" />
            <div className="crs-nav" />
          </div>

          {/* Main content */}
          <div className="crs-main">
            {/* Section label */}
            <div className="crs-label crs-a4">EM ANDAMENTO</div>

            {/* Course progress cards */}
            <div className="crs-cards crs-a4">
              <div className="crs-ccard">
                <div className="crs-ccard-top" style={{ background: "linear-gradient(135deg, #EF9F27, #d88a1a)" }}>
                  <span className="crs-play" />
                </div>
                <div className="crs-ccard-bot">
                  <div className="crs-prog">
                    <div className="crs-prog-fill" style={{ width: "68%", background: "#EF9F27" }} />
                  </div>
                  <span className="crs-pct" style={{ color: "#EF9F27" }}>68%</span>
                </div>
              </div>
              <div className="crs-ccard">
                <div className="crs-ccard-top" style={{ background: "linear-gradient(135deg, #9B7BFF, #7c5fd8)" }}>
                  <span className="crs-play" />
                </div>
                <div className="crs-ccard-bot">
                  <div className="crs-prog">
                    <div className="crs-prog-fill" style={{ width: "32%", background: "#9B7BFF" }} />
                  </div>
                  <span className="crs-pct" style={{ color: "#9B7BFF" }}>32%</span>
                </div>
              </div>
              <div className="crs-ccard">
                <div className="crs-ccard-top" style={{ background: "linear-gradient(135deg, #378ADD, #2a6eb5)" }}>
                  <span className="crs-play" />
                </div>
                <div className="crs-ccard-bot">
                  <div className="crs-prog">
                    <div className="crs-prog-fill" style={{ width: "5%", background: "#378ADD" }} />
                  </div>
                  <span className="crs-pct" style={{ color: "#378ADD" }}>5%</span>
                </div>
              </div>
            </div>

            {/* Metrics chart */}
            <div className="crs-label crs-a6">DESEMPENHO</div>
            <div className="crs-chart crs-a6">
              {[35, 55, 40, 70, 50, 85, 65].map((h, i) => (
                <div key={i} className="crs-cbar" style={{ height: `${h}%` }} />
              ))}
            </div>

            {/* Agent completion */}
            <div className="crs-agent crs-a6 crs-d2">
              <div className="crs-avatar">
                <div className="crs-cap" />
                <div className="crs-face">
                  <span className="crs-eye" />
                  <span className="crs-eye" />
                </div>
                <div className="crs-abody" />
              </div>
              <span className="crs-msg">Curso conclu&iacute;do!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
