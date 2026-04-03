"use client";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Base gradient — navy NOT black */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0F172A 0%, #0C1322 40%, #10182D 100%)",
        }}
      />

      {/* Large animated mesh gradient — visible and warm */}
      <div
        className="absolute inset-0 animate-aurora opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 50% at 85% 20%, rgba(139,92,246,0.12) 0%, transparent 50%)," +
            "radial-gradient(ellipse 50% 40% at 10% 80%, rgba(6,182,212,0.10) 0%, transparent 50%)," +
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Animated orbs — larger and more visible */}
      <div
        className="absolute top-[-10%] left-[-5%] h-[600px] w-[600px] rounded-full animate-float-slow"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute top-[15%] right-[-8%] h-[500px] w-[500px] rounded-full animate-float-mid"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-[-5%] left-[25%] h-[450px] w-[450px] rounded-full animate-float-fast"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 60%)",
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
