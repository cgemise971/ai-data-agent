import Link from "next/link";
import { ArrowRight, Check, Upload, Cpu, BarChart3, Shield, FileSpreadsheet, Share2, Search, Zap } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { HeroVisualization } from "@/components/hero-visualization";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0F172A] overflow-x-hidden">
      <AnimatedBackground />

      {/* Nav */}
      <nav className="glass sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-6 h-16">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366F1, #06B6D4)" }}>
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <span className="font-[family-name:var(--font-syne)] text-base font-bold tracking-tight text-white">DataPulse AI</span>
          </div>
          <Link href="/analyze">
            <button className="group flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-white transition-all hover:shadow-[0_0_24px_rgba(99,102,241,0.3)]" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
              Essayer gratuitement
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
          <ScrollReveal>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#34D399]/20 bg-[#34D399]/5 px-4 py-2 text-sm text-[#6EE7B7]">
              <Zap className="h-3.5 w-3.5" />
              Analyse IA en moins de 30 secondes
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-[family-name:var(--font-syne)] text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-white mb-6">
              Vos donnees parlent.
              <br />
              <span className="gradient-text">Ecoutez-les.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#94A3B8] mb-10">
              Uploadez un CSV, obtenez des insights IA en secondes.
              Tendances, anomalies, graphiques —{" "}
              <strong className="text-[#CBD5E1]">sans ecrire une seule requete</strong>.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/analyze">
                <button className="group flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(99,102,241,0.2)] transition-all hover:scale-[1.02] hover:shadow-[0_0_48px_rgba(99,102,241,0.3)]" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
                  <Upload className="h-4 w-4" />
                  Essayer gratuitement
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Link>
              <a href="/sample-data.csv" download>
                <button className="flex items-center gap-2 rounded-full border border-[#334155] bg-[#1E293B]/50 px-8 py-3.5 text-sm font-medium text-[#CBD5E1] transition-all hover:border-[#475569] hover:bg-[#1E293B]">
                  <FileSpreadsheet className="h-4 w-4" />
                  Telecharger un exemple
                </button>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <HeroVisualization />
          </ScrollReveal>
        </section>

        {/* Social proof */}
        <section className="border-t border-[#1E293B] py-8">
          <div className="flex items-center justify-center gap-8 text-xs text-[#475569]">
            <span>Propulse par <strong className="text-[#818CF8]">Claude</strong> (Anthropic)</span>
            <span className="h-3 w-px bg-[#334155]" />
            <span><strong className="text-white">500+</strong> analyses cette semaine</span>
            <span className="h-3 w-px bg-[#334155]" />
            <span>Donnees <strong className="text-[#34D399]">jamais stockees</strong></span>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-6xl mx-auto px-6 py-28">
          <ScrollReveal>
            <p className="mb-3 text-center font-[family-name:var(--font-syne)] text-xs font-bold uppercase tracking-[0.2em] text-[#6366F1]">Comment ca marche</p>
            <h2 className="mb-16 text-center font-[family-name:var(--font-syne)] text-3xl md:text-4xl font-bold text-white">Trois etapes. Trente secondes.</h2>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: <Upload className="h-6 w-6" />, title: "Uploadez", desc: "Deposez votre fichier CSV. Drag & drop ou clic.", color: "#818CF8" },
              { step: "02", icon: <Cpu className="h-6 w-6" />, title: "L'IA analyse", desc: "Claude examine les patterns, anomalies, correlations.", color: "#C084FC" },
              { step: "03", icon: <BarChart3 className="h-6 w-6" />, title: "Visualisez", desc: "Graphiques interactifs + insights actionnables.", color: "#67E8F9" },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden group transition-all hover:bg-[#1E293B]/50">
                  <span className="absolute top-4 right-4 font-[family-name:var(--font-syne)] text-6xl font-extrabold opacity-[0.04]" style={{ color: item.color }}>{item.step}</span>
                  <div className="mx-auto mb-5 h-14 w-14 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}08)` }}>
                    <div style={{ color: item.color }}>{item.icon}</div>
                  </div>
                  <h3 className="font-[family-name:var(--font-syne)] text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-[#94A3B8]">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Features */}
        <section className="border-t border-[#1E293B] py-28">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal>
              <p className="mb-3 text-center font-[family-name:var(--font-syne)] text-xs font-bold uppercase tracking-[0.2em] text-[#8B5CF6]">Fonctionnalites</p>
              <h2 className="mb-16 text-center font-[family-name:var(--font-syne)] text-3xl md:text-4xl font-bold text-white">Tout ce dont vous avez besoin</h2>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: <Search className="h-5 w-5" />, title: "Detection d'anomalies", desc: "L'IA repere les outliers automatiquement dans vos donnees.", color: "#EF4444" },
                { icon: <BarChart3 className="h-5 w-5" />, title: "Graphiques intelligents", desc: "Charts auto-generes selon la structure de vos donnees.", color: "#818CF8" },
                { icon: <Cpu className="h-5 w-5" />, title: "Insights en langage naturel", desc: "Explications claires en francais. Pas de jargon technique.", color: "#C084FC" },
                { icon: <Share2 className="h-5 w-5" />, title: "Export & partage", desc: "Telechargez vos rapports. Partagez avec votre equipe.", color: "#67E8F9" },
                { icon: <FileSpreadsheet className="h-5 w-5" />, title: "Multi-format", desc: "CSV, Excel, Google Sheets. Tous vos exports sont compatibles.", color: "#34D399" },
                { icon: <Shield className="h-5 w-5" />, title: "Confidentialite", desc: "Vos donnees ne sont jamais stockees. Analyse ephemere.", color: "#FBBF24" },
              ].map((feat) => (
                <StaggerItem key={feat.title}>
                  <div className="glass-card rounded-xl p-6 transition-all hover:bg-[#1E293B]/50">
                    <div className="mb-3 h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: `${feat.color}15` }}>
                      <div style={{ color: feat.color }}>{feat.icon}</div>
                    </div>
                    <h3 className="font-[family-name:var(--font-syne)] text-sm font-bold text-white mb-1">{feat.title}</h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{feat.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-28">
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-12 md:p-16 text-center relative overflow-hidden" style={{ boxShadow: "0 0 60px rgba(99,102,241,0.08)" }}>
              <div className="absolute -top-1/2 -left-1/3 w-full h-full blur-[120px] opacity-15" style={{ background: "#6366F1" }} />
              <div className="absolute -bottom-1/2 -right-1/3 w-full h-full blur-[120px] opacity-15" style={{ background: "#06B6D4" }} />
              <div className="relative">
                <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl font-bold text-white mb-4">
                  Pret a comprendre vos donnees ?
                </h2>
                <p className="text-[#94A3B8] mb-10 max-w-md mx-auto">
                  Gratuit jusqu&apos;a 10 analyses par mois. Pas de carte de credit.
                </p>
                <Link href="/analyze">
                  <button className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all hover:scale-[1.02]" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6, #06B6D4)" }}>
                    Commencer maintenant
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E293B] py-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-6 gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366F1, #06B6D4)" }}>
              <BarChart3 className="h-3 w-3 text-white" />
            </div>
            <span className="font-[family-name:var(--font-syne)] text-sm font-bold text-white">DataPulse AI</span>
          </div>
          <p className="text-xs text-[#475569]">
            Concu par <a href="#" className="text-[#818CF8] hover:text-[#A5B4FC]">Votre Nom</a> — Infrastructure IA pour startups SaaS
          </p>
        </div>
      </footer>
    </div>
  );
}
