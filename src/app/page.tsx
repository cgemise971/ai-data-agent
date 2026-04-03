import Link from "next/link";
import { CursorSpotlight } from "@/components/ui/cursor-spotlight";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { SECTORS } from "@/lib/sectors";
import { ArrowRight, MessageSquare, BarChart3, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <CursorSpotlight />

      {/* Cursor spotlight ambient effect */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(217,119,6,0.04), transparent 40%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(217,119,6,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Floating amber orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute rounded-full blur-[130px]"
          style={{
            width: "600px",
            height: "600px",
            top: "-10%",
            left: "60%",
            background: "rgba(217,119,6,0.07)",
            animation: "var(--animate-float-slow)",
          }}
        />
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: "400px",
            height: "400px",
            top: "50%",
            left: "-10%",
            background: "rgba(251,191,36,0.05)",
            animation: "var(--animate-float-mid)",
          }}
        />
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: "300px",
            height: "300px",
            bottom: "10%",
            right: "15%",
            background: "rgba(16,185,129,0.05)",
            animation: "var(--animate-float-slow)",
            animationDelay: "5s",
          }}
        />
      </div>

      {/* Navigation */}
      <nav
        className="fixed top-0 w-full z-50"
        style={{
          background: "rgba(9,9,11,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="font-[family-name:var(--font-syne)] font-extrabold text-xl tracking-tight">
            <span className="gradient-text">AI</span>
            <span className="text-white"> Diagnostic</span>
          </div>
          <Link href="/diagnostic">
            <button
              className="animated-border px-5 py-2 rounded-xl font-[family-name:var(--font-syne)] font-bold text-sm text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "rgba(217,119,6,0.2)" }}
            >
              Lancer le diagnostic
            </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 pt-24">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
          <ScrollReveal>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
              style={{
                background: "rgba(217,119,6,0.1)",
                border: "1px solid rgba(217,119,6,0.2)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-[pulse-soft_3s_ease-in-out_infinite]" />
              <span className="text-xs text-amber-500 uppercase tracking-widest font-[family-name:var(--font-geist-sans)]">
                Diagnostic IA gratuit et personnalise
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-5xl md:text-7xl tracking-tighter leading-none mb-6">
              <span className="text-white">Votre entreprise</span>
              <br />
              <span className="gradient-text">est-elle prete</span>
              <br />
              <span className="text-white">pour l&apos;IA ?</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-zinc-400 font-[family-name:var(--font-geist-sans)] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Diagnostic gratuit et personnalise en 5 minutes. Decouvrez vos opportunites IA selon votre secteur, avec ROI projete et plan d&apos;action.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Link href="/diagnostic">
              <button className="animated-border glow-amber px-10 py-5 rounded-2xl font-[family-name:var(--font-syne)] font-extrabold text-xl text-white transition-all hover:scale-105 hover:opacity-90 active:scale-95 flex items-center gap-3 mx-auto">
                Lancer le diagnostic
                <ArrowRight className="w-5 h-5 text-amber-400" />
              </button>
            </Link>
            <p className="text-zinc-600 text-xs mt-4 font-[family-name:var(--font-geist-sans)] uppercase tracking-widest">
              Gratuit — 5 minutes — Aucune inscription
            </p>
          </ScrollReveal>
        </section>

        {/* Sector cards grid */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-syne)] font-bold text-3xl md:text-4xl text-white mb-3 tracking-tight">
                8 secteurs, des opportunites <span className="gradient-text">sur mesure</span>
              </h2>
              <p className="text-zinc-500 font-[family-name:var(--font-geist-sans)] text-sm">
                Notre IA connait les enjeux specifiques de votre industrie
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SECTORS.map((sector) => (
              <StaggerItem key={sector.id}>
                <Link href="/diagnostic">
                  <div
                    className="glass-card rounded-2xl p-5 cursor-pointer group transition-all duration-300 hover:border-amber-600/30"
                    style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                        style={{ background: "radial-gradient(circle at 50% 0%, rgba(217,119,6,0.06), transparent 70%)" }}
                      />
                    </div>
                    <div className="text-3xl mb-3">{sector.icon}</div>
                    <h3 className="font-[family-name:var(--font-syne)] font-bold text-sm text-white mb-1 leading-tight">
                      {sector.name}
                    </h3>
                    <p className="text-xs text-zinc-500 font-[family-name:var(--font-geist-sans)]">
                      {sector.problems.length} problemes resolus par l&apos;IA
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* How it works */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-[family-name:var(--font-syne)] font-bold text-3xl md:text-4xl text-white mb-3 tracking-tight">
                Comment ca marche ?
              </h2>
              <p className="text-zinc-500 font-[family-name:var(--font-geist-sans)] text-sm">
                3 etapes pour obtenir votre diagnostic complet
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <BarChart3 className="w-6 h-6 text-amber-500" />,
                step: "01",
                title: "Choisissez votre secteur",
                desc: "Selectionnez votre industrie parmi 8 secteurs. L'IA adapte immediatement le diagnostic a vos enjeux specifiques.",
              },
              {
                icon: <MessageSquare className="w-6 h-6 text-emerald-500" />,
                step: "02",
                title: "Repondez a 5 questions",
                desc: "Notre consultant IA vous pose des questions ciblees sur vos processus, volumes et douleurs concretes.",
              },
              {
                icon: <Zap className="w-6 h-6 text-cyan-500" />,
                step: "03",
                title: "Recevez votre diagnostic",
                desc: "Rapport complet avec radar de maturite, opportunites chiffrees, ROI projete et plan d'action en 3 phases.",
              },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div
                  className="glass-card rounded-2xl p-6 h-full"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-600 font-[family-name:var(--font-syne)] font-bold uppercase tracking-widest mb-1 block">
                        Etape {item.step}
                      </span>
                      <h3 className="font-[family-name:var(--font-syne)] font-bold text-white text-base mb-2">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 text-xs font-[family-name:var(--font-geist-sans)] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Final CTA */}
        <section className="max-w-3xl mx-auto px-6 py-24 text-center relative">
          <div
            className="absolute inset-0 pointer-events-none blur-[150px] -z-10 opacity-30"
            style={{ background: "radial-gradient(ellipse, rgba(217,119,6,0.3), transparent)" }}
          />
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-4xl md:text-5xl text-white tracking-tighter mb-6">
              Pret a decouvrir vos{" "}
              <span className="gradient-text">opportunites IA</span> ?
            </h2>
            <p className="text-zinc-400 font-[family-name:var(--font-geist-sans)] mb-10 text-base">
              5 minutes suffisent pour identifier les projets IA a fort ROI dans votre entreprise.
            </p>
            <Link href="/diagnostic">
              <button className="animated-border glow-amber px-12 py-5 rounded-2xl font-[family-name:var(--font-syne)] font-extrabold text-xl text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto">
                Lancer mon diagnostic gratuit
                <ArrowRight className="w-5 h-5 text-amber-400" />
              </button>
            </Link>
            <p className="text-zinc-600 text-xs mt-5 font-[family-name:var(--font-geist-sans)] uppercase tracking-widest">
              Gratuit — Sans inscription — Resultats instantanes
            </p>
          </ScrollReveal>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="border-t relative z-10"
        style={{ borderColor: "rgba(255,255,255,0.04)", background: "rgba(9,9,11,0.8)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-[family-name:var(--font-syne)] font-bold text-white">
            <span className="gradient-text">AI</span> Diagnostic
          </div>
          <p className="text-zinc-600 text-xs font-[family-name:var(--font-geist-sans)]">
            &copy; 2025 AI Diagnostic. Propulse par Claude (Anthropic).
          </p>
        </div>
      </footer>
    </div>
  );
}
