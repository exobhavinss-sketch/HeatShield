import React from 'react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-950/40 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-200/90 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="flex h-2 w-2 relative flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span className="font-semibold text-amber-400 uppercase tracking-wider text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded">Academic Simulation</span>
        <span>
          HeatShield uses synthetic academic simulation data representing selected urban heat and environmental indicators for Solapur. The observations are intended for educational analysis and are not verified real-world sensor measurements.
        </span>
      </div>
      <div className="hidden md:flex items-center space-x-2 text-[11px] text-slate-400 flex-shrink-0 ml-4">
        <span>MIT-VPU Integrated Project</span>
        <span>•</span>
        <span className="font-mono text-cyan-400">Team TF-141</span>
      </div>
    </div>
  );
}
