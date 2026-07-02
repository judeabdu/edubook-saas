import React from 'react';

export default function Home() {
  const phases = [
    { name: "Phase 1: Public Portal & Payments", status: "In Progress", color: "text-amber-400" },
    { name: "Phase 2: School Authentication", status: "Scheduled", color: "text-slate-500" },
    { name: "Phase 3: Multi-tenant School Dashboard", status: "Scheduled", color: "text-slate-500" },
    { name: "Phase 4: Super Admin Control Panel", status: "Scheduled", color: "text-slate-500" },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0B0F19] text-slate-100 font-sans overflow-hidden">
      {/* Premium background gradient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-900/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full px-6 text-center space-y-10">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium tracking-wide mx-auto">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Production Environment Active
        </div>

        {/* Project Branding */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            EduBook <span className="text-indigo-400">SaaS</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-md mx-auto">
            The modern, premium management and continuous-billing ecosystem engineered for forward-thinking schools.
          </p>
        </div>

        {/* Roadmap Preview Card */}
        <div className="bg-slate-900/50 border border-slate-800/80 backdrop-blur-md rounded-2xl p-6 text-left shadow-xl space-y-4 max-w-lg mx-auto">
          <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
            Deployment Roadmap
          </h3>
          
          <div className="space-y-3">
            {phases.map((phase, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-slate-800/40 pb-2 last:border-0 last:pb-0">
                <span className="text-sm font-medium text-slate-400">{phase.name}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 ${phase.color}`}>
                  {phase.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-900 max-w-xs mx-auto">
          <p className="text-xs text-slate-500 tracking-wide">
            Next Sync: Frontend implementation kicks off tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
}