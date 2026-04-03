import Link from "next/link";
import {
  BarChart3,
  TriangleAlert,
  LineChart,
  MessageSquare,
  Share2,
  Grid2X2,
  ShieldCheck,
  Terminal,
  TrendingUp,
  PlayCircle,
  AtSign,
  Link2,
  Code2,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { HeroVisualization } from "@/components/hero-visualization";

export default function Home() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#0B1326", color: "#DAE2FD" }}
    >
      <AnimatedBackground />

      {/* Dot grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(192,193,255,0.1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Navigation */}
      <nav
        className="fixed top-0 w-full z-50 shadow-[0_0_15px_rgba(192,193,255,0.08)]"
        style={{
          background: "rgba(45,52,73,0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(70,69,84,0.3)",
        }}
      >
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div
            className="text-2xl font-bold tracking-tighter font-[family-name:var(--font-syne)]"
            style={{ color: "#C0C1FF" }}
          >
            DataPulse AI
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <a href="#" className="text-[rgba(218,226,253,0.7)] hover:text-[#4CD7F6] text-xs tracking-widest uppercase transition-colors duration-300 font-[family-name:var(--font-geist-sans)]">Features</a>
            <a href="#" className="text-[rgba(218,226,253,0.7)] hover:text-[#4CD7F6] text-xs tracking-widest uppercase transition-colors duration-300 font-[family-name:var(--font-geist-sans)]">Comment ça marche</a>
            <a href="#" className="text-[rgba(218,226,253,0.7)] hover:text-[#4CD7F6] text-xs tracking-widest uppercase transition-colors duration-300 font-[family-name:var(--font-geist-sans)]">Demo</a>
            <a href="#" className="text-[rgba(218,226,253,0.7)] hover:text-[#4CD7F6] text-xs tracking-widest uppercase transition-colors duration-300 font-[family-name:var(--font-geist-sans)]">Pricing</a>
          </div>
          <div className="flex items-center space-x-6">
            <button
              className="text-xs tracking-widest uppercase transition-colors font-[family-name:var(--font-geist-sans)]"
              style={{ color: "rgba(218,226,253,0.7)" }}
            >
              Connexion
            </button>
            <Link href="/analyze">
              <button
                className="px-6 py-2.5 rounded-full font-bold text-sm transition-all active:scale-95 font-[family-name:var(--font-syne)]"
                style={{
                  background:
                    "linear-gradient(135deg, #6366F1, #C0C1FF, #4CD7F6, #45DFA4)",
                  backgroundSize: "300% 300%",
                  color: "#1000A9",
                }}
              >
                Essayer gratuitement
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-24 overflow-hidden">
        {/* Hero Section — split layout */}
        <section className="max-w-7xl mx-auto px-8 relative">
          {/* Background aura blobs */}
          <div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
            style={{ background: "rgba(192,193,255,0.05)" }}
          />
          <div
            className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
            style={{ background: "rgba(76,215,246,0.05)" }}
          />

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left — text */}
            <div className="flex-1 text-center lg:text-left z-10">
              <ScrollReveal>
                <div
                  className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full mb-8 border"
                  style={{
                    background: "#171F33",
                    borderColor: "rgba(70,69,84,0.15)",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: "#4CD7F6",
                      animation: "pulse 2s ease-in-out infinite",
                      boxShadow: "0 0 15px rgba(76,215,246,0.3)",
                    }}
                  />
                  <span
                    className="text-xs font-[family-name:var(--font-geist-sans)] uppercase tracking-widest"
                    style={{ color: "#ACEDFF" }}
                  >
                    Analyse IA en moins de 30 secondes
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1
                  className="text-5xl lg:text-7xl font-[family-name:var(--font-syne)] font-extrabold tracking-tighter leading-none mb-8"
                  style={{ color: "#DAE2FD" }}
                >
                  Vos données parlent.
                  <br />
                  <span style={{ color: "#C0C1FF", fontStyle: "italic" }}>
                    Écoutez-les.
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p
                  className="text-lg lg:text-xl max-w-xl mb-12 font-[family-name:var(--font-geist-sans)] font-light leading-relaxed"
                  style={{ color: "#C7C4D7" }}
                >
                  Uploadez un CSV, obtenez des insights IA en secondes.
                  Tendances, anomalies, graphiques — sans écrire une seule
                  requête.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                  <Link href="/analyze">
                    <button
                      className="px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 hover:shadow-[0_0_25px_rgba(192,193,255,0.3)] font-[family-name:var(--font-syne)]"
                      style={{
                        background:
                          "linear-gradient(135deg, #6366F1, #C0C1FF, #4CD7F6, #45DFA4)",
                        backgroundSize: "300% 300%",
                        color: "#1000A9",
                      }}
                    >
                      Essayer gratuitement
                    </button>
                  </Link>
                  <button
                    className="px-8 py-4 rounded-xl font-semibold text-lg transition-all border flex items-center gap-2 font-[family-name:var(--font-geist-sans)]"
                    style={{
                      background: "rgba(45,52,73,0.6)",
                      backdropFilter: "blur(12px)",
                      borderColor: "rgba(70,69,84,0.2)",
                      color: "#DAE2FD",
                    }}
                  >
                    <PlayCircle className="w-5 h-5" />
                    Voir un exemple
                  </button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div
                  className="mt-16 flex items-center justify-center lg:justify-start gap-12"
                  style={{ color: "rgba(218,226,253,0.6)" }}
                >
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4" />
                    <span className="text-xs font-[family-name:var(--font-geist-sans)] uppercase tracking-tighter">
                      Propulsé par Claude (Anthropic)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-[family-name:var(--font-geist-sans)] uppercase tracking-tighter">
                      500+ analyses cette semaine
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — holographic visualization */}
            <div className="flex-1 flex items-center justify-center lg:justify-end">
              <HeroVisualization />
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="max-w-7xl mx-auto px-8 mt-48">
          <ScrollReveal>
            <div className="text-center mb-24">
              <h2
                className="text-3xl font-[family-name:var(--font-syne)] font-bold tracking-tight uppercase"
                style={{ color: "#C0C1FF" }}
              >
                Comment ça marche
              </h2>
              <div
                className="h-1 w-24 mx-auto mt-4 rounded-full"
                style={{ background: "#C0C1FF" }}
              />
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                num: "01",
                title: "Uploadez",
                desc: "Glissez-déposez votre fichier CSV ou Excel. Aucun nettoyage préalable n'est nécessaire, notre IA s'occupe de tout.",
                hoverColor: "rgba(192,193,255,0.2)",
              },
              {
                num: "02",
                title: "L'IA analyse",
                desc: "Propulsé par Claude, notre moteur détecte les tendances invisibles, les corrélations complexes et les anomalies.",
                hoverColor: "rgba(76,215,246,0.2)",
              },
              {
                num: "03",
                title: "Visualisez",
                desc: "Recevez un tableau de bord interactif avec des recommandations actionnables et des graphiques haute fidélité.",
                hoverColor: "rgba(69,223,164,0.2)",
              },
            ].map((step) => (
              <StaggerItem key={step.num}>
                <div className="group">
                  <div
                    className="text-6xl font-[family-name:var(--font-syne)] font-extrabold mb-6 transition-colors"
                    style={{ color: "#2D3449" }}
                  >
                    {step.num}
                  </div>
                  <h3
                    className="text-2xl font-[family-name:var(--font-syne)] font-bold mb-4"
                    style={{ color: "#DAE2FD" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-[family-name:var(--font-geist-sans)] leading-relaxed"
                    style={{ color: "#C7C4D7" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Live Demo Preview Section */}
        <section className="max-w-7xl mx-auto px-8 mt-48">
          <ScrollReveal>
            <div
              className="rounded-3xl p-8 lg:p-12 border shadow-2xl relative overflow-hidden"
              style={{
                background: "#171F33",
                borderColor: "rgba(70,69,84,0.1)",
              }}
            >
              {/* Dot grid overlay on card */}
              <div
                className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-5"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(192,193,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                {/* Left — Upload panel */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <div
                    className="p-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer group transition-all"
                    style={{
                      background: "rgba(45,52,73,0.6)",
                      backdropFilter: "blur(12px)",
                      borderColor: "rgba(192,193,255,0.3)",
                    }}
                  >
                    <svg
                      className="w-10 h-10 mb-4 transition-transform group-hover:scale-110"
                      style={{ color: "#C0C1FF" }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
                    </svg>
                    <span
                      className="text-sm font-semibold mb-1 font-[family-name:var(--font-geist-sans)]"
                      style={{ color: "#DAE2FD" }}
                    >
                      ventes_annuelles_2024.csv
                    </span>
                    <span
                      className="text-[10px] uppercase font-[family-name:var(--font-geist-sans)]"
                      style={{ color: "rgba(199,196,215,0.6)" }}
                    >
                      14.2 MB • Terminé
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div
                      className="h-3 w-full rounded-full overflow-hidden"
                      style={{ background: "#2D3449" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "85%",
                          background: "#C0C1FF",
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-[family-name:var(--font-geist-sans)] uppercase">
                      <span style={{ color: "#C7C4D7" }}>
                        Traitement des colonnes
                      </span>
                      <span style={{ color: "#C7C4D7" }}>85%</span>
                    </div>
                  </div>
                </div>

                {/* Right — Insights panel */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <h4
                      className="text-2xl font-[family-name:var(--font-syne)] font-bold"
                      style={{ color: "#DAE2FD" }}
                    >
                      Rapport d'analyse
                    </h4>
                    <span
                      className="px-3 py-1 text-[10px] font-bold rounded-full border font-[family-name:var(--font-geist-sans)]"
                      style={{
                        background: "rgba(69,223,164,0.1)",
                        color: "#45DFA4",
                        borderColor: "rgba(69,223,164,0.2)",
                      }}
                    >
                      IA ACTIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      className="p-6 rounded-xl border"
                      style={{
                        background: "#222A3D",
                        borderColor: "rgba(70,69,84,0.1)",
                      }}
                    >
                      <p
                        className="text-[10px] font-[family-name:var(--font-geist-sans)] uppercase tracking-widest mb-2"
                        style={{ color: "#4CD7F6" }}
                      >
                        Insight #1
                      </p>
                      <p
                        className="text-sm italic font-[family-name:var(--font-geist-sans)]"
                        style={{ color: "#DAE2FD" }}
                      >
                        &ldquo;Une hausse de 12% des conversions est corrélée aux
                        sessions mobiles entre 18h et 22h.&rdquo;
                      </p>
                    </div>
                    <div
                      className="p-6 rounded-xl border"
                      style={{
                        background: "#222A3D",
                        borderColor: "rgba(70,69,84,0.1)",
                      }}
                    >
                      <p
                        className="text-[10px] font-[family-name:var(--font-geist-sans)] uppercase tracking-widest mb-2"
                        style={{ color: "#45DFA4" }}
                      >
                        Insight #2
                      </p>
                      <p
                        className="text-sm italic font-[family-name:var(--font-geist-sans)]"
                        style={{ color: "#DAE2FD" }}
                      >
                        &ldquo;Le segment &lsquo;Europe du Nord&rsquo; présente une anomalie
                        de rétention positive inhabituelle.&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Mini bar chart */}
                  <div
                    className="p-6 rounded-xl border h-48 flex items-end justify-between gap-2 px-8"
                    style={{
                      background: "#222A3D",
                      borderColor: "rgba(70,69,84,0.1)",
                    }}
                  >
                    {[30, 50, 40, 80, 60, 45, 70].map((h, i) => (
                      <div
                        key={i}
                        className="w-full rounded-t"
                        style={{
                          height: `${h}%`,
                          background:
                            i === 3
                              ? "rgba(192,193,255,0.6)"
                              : "rgba(192,193,255,0.4)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Features Bento Grid */}
        <section className="max-w-7xl mx-auto px-8 mt-48">
          <ScrollReveal>
            <div className="mb-20">
              <h2
                className="text-4xl lg:text-5xl font-[family-name:var(--font-syne)] font-extrabold tracking-tighter mb-4"
                style={{ color: "#DAE2FD" }}
              >
                Puissance analytique{" "}
                <br />
                sans limites.
              </h2>
              <p
                className="max-w-lg font-[family-name:var(--font-geist-sans)]"
                style={{ color: "#C7C4D7" }}
              >
                Tout ce dont vous avez besoin pour transformer le chaos des
                chiffres en décisions stratégiques claires.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <TriangleAlert className="w-8 h-8" style={{ color: "#FFB4AB" }} />
                ),
                title: "Anomalies",
                desc: "Détection automatique des valeurs aberrantes et des erreurs de saisie dans vos jeux de données.",
              },
              {
                icon: (
                  <LineChart className="w-8 h-8" style={{ color: "#4CD7F6" }} />
                ),
                title: "Smart Charts",
                desc: "L'IA choisit le meilleur type de visualisation (Sankey, Radar, Treemap) pour votre message.",
              },
              {
                icon: (
                  <MessageSquare className="w-8 h-8" style={{ color: "#45DFA4" }} />
                ),
                title: "Language Insights",
                desc: "Posez des questions en français naturel : \"Pourquoi le CA baisse-t-il en Belgique ?\"",
              },
              {
                icon: (
                  <Share2 className="w-8 h-8" style={{ color: "#C0C1FF" }} />
                ),
                title: "Export/Share",
                desc: "Exportez vos résultats en PDF, PNG ou intégrez-les directement dans vos slides Notion ou Slack.",
              },
              {
                icon: (
                  <Grid2X2 className="w-8 h-8" style={{ color: "#DAE2FD" }} />
                ),
                title: "Multi-format",
                desc: "Support complet pour CSV, XLSX, Google Sheets et connecteurs SQL en temps réel.",
              },
              {
                icon: (
                  <ShieldCheck className="w-8 h-8" style={{ color: "#4CD7F6" }} />
                ),
                title: "Privacy First",
                desc: "Vos données sont traitées en mémoire et jamais stockées de manière permanente. Sécurité bancaire.",
              },
            ].map((feat) => (
              <StaggerItem key={feat.title}>
                <div
                  className="p-8 rounded-2xl border transition-all group"
                  style={{
                    background: "rgba(45,52,73,0.6)",
                    backdropFilter: "blur(12px)",
                    borderColor: "rgba(70,69,84,0.1)",
                  }}
                >
                  <div className="mb-6">{feat.icon}</div>
                  <h3
                    className="text-xl font-[family-name:var(--font-syne)] font-bold mb-3"
                    style={{ color: "#DAE2FD" }}
                  >
                    {feat.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed font-[family-name:var(--font-geist-sans)]"
                    style={{ color: "#C7C4D7" }}
                  >
                    {feat.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto px-8 mt-48 text-center relative">
          <div
            className="absolute inset-0 blur-[150px] -z-10"
            style={{ background: "rgba(192,193,255,0.1)" }}
          />
          <ScrollReveal>
            <h2
              className="text-4xl md:text-5xl font-[family-name:var(--font-syne)] font-extrabold tracking-tighter mb-8"
              style={{ color: "#DAE2FD" }}
            >
              Prêt à comprendre vos données ?
            </h2>
            <Link href="/analyze">
              <button
                className="px-12 py-5 rounded-2xl font-extrabold text-xl transition-all hover:scale-105 shadow-xl mb-6 font-[family-name:var(--font-syne)]"
                style={{
                  background:
                    "linear-gradient(135deg, #6366F1, #C0C1FF, #4CD7F6, #45DFA4)",
                  backgroundSize: "300% 300%",
                  color: "#1000A9",
                }}
              >
                Essayer gratuitement
              </button>
            </Link>
            <p
              className="font-[family-name:var(--font-geist-sans)] uppercase text-xs tracking-[0.2em] block"
              style={{ color: "rgba(199,196,215,0.6)" }}
            >
              Gratuit jusqu'à 10 analyses par mois
            </p>
          </ScrollReveal>
        </section>
      </main>

      {/* Footer — 4 columns */}
      <footer
        className="w-full border-t mt-32 relative z-10"
        style={{
          background: "#0B1326",
          borderColor: "rgba(45,52,73,0.3)",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-12 py-16 max-w-7xl mx-auto">
          {/* Brand */}
          <div>
            <div
              className="text-xl font-bold font-[family-name:var(--font-syne)] mb-6"
              style={{ color: "#C0C1FF" }}
            >
              DataPulse AI
            </div>
            <p
              className="text-xs leading-relaxed max-w-[200px] font-[family-name:var(--font-geist-sans)]"
              style={{ color: "rgba(218,226,253,0.5)" }}
            >
              © 2024 DataPulse AI. Precision Engineered.
            </p>
          </div>

          {/* Produit */}
          <div className="flex flex-col gap-4">
            <span
              className="text-xs font-[family-name:var(--font-geist-sans)] uppercase tracking-widest mb-2"
              style={{ color: "rgba(218,226,253,0.7)" }}
            >
              Produit
            </span>
            {["Features", "Sécurité", "API"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm transition-colors font-[family-name:var(--font-geist-sans)]"
                style={{ color: "rgba(218,226,253,0.5)" }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Ressources */}
          <div className="flex flex-col gap-4">
            <span
              className="text-xs font-[family-name:var(--font-geist-sans)] uppercase tracking-widest mb-2"
              style={{ color: "rgba(218,226,253,0.7)" }}
            >
              Ressources
            </span>
            {["Documentation", "Blog", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm transition-colors font-[family-name:var(--font-geist-sans)]"
                style={{ color: "rgba(218,226,253,0.5)" }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <span
              className="text-xs font-[family-name:var(--font-geist-sans)] uppercase tracking-widest mb-2"
              style={{ color: "rgba(218,226,253,0.7)" }}
            >
              Suivez-nous
            </span>
            <div className="flex gap-4">
              <Terminal
                className="w-5 h-5 cursor-pointer transition-colors"
                style={{ color: "rgba(218,226,253,0.5)" }}
              />
              <AtSign
                className="w-5 h-5 cursor-pointer transition-colors"
                style={{ color: "rgba(218,226,253,0.5)" }}
              />
              <Link2
                className="w-5 h-5 cursor-pointer transition-colors"
                style={{ color: "rgba(218,226,253,0.5)" }}
              />
              <Code2
                className="w-5 h-5 cursor-pointer transition-colors"
                style={{ color: "rgba(218,226,253,0.5)" }}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
