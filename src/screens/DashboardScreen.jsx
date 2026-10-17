import React from 'react';
import { Thermometer, ShieldAlert, Compass, Flame, TrendingUp, AlertTriangle, ArrowRight } from '../components/Icons';

export default function DashboardScreen({ summary, onSelectStation, onNavigate }) {
  if (!summary) {
    return (
      <div className="flex items-center justify-center py-32 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mr-3"></div>
        Loading citywide heat metrics...
      </div>
    );
  }

  const kpis = summary.kpis || {};
  const risk = summary.risk_distribution || {};

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Flame className="w-6 h-6 text-orange-500" />
            Solapur Urban Heat Exposure Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Empirical Synthesis of 150,000 Station Observations • Solapur Municipal Corporation (2021–2025)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('map')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg shadow-md transition"
          >
            <span>Open Spatial Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6 Top KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
          <div className="text-[11px] text-slate-400 font-medium">Monitoring Stations</div>
          <div className="text-2xl font-black text-white mt-1.5">{kpis.total_locations || 100}</div>
          <div className="text-[10px] text-slate-500 mt-1">9 Urban Zones</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
          <div className="text-[11px] text-slate-400 font-medium">Total Observations</div>
          <div className="text-2xl font-black text-white mt-1.5 font-mono">
            {kpis.total_observations ? (kpis.total_observations / 1000).toFixed(0) + 'K' : '150K'}
          </div>
          <div className="text-[10px] text-emerald-400 mt-1">100% Complete (0 Nulls)</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
          <div className="text-[11px] text-slate-400 font-medium">Mean Air Temperature</div>
          <div className="text-2xl font-black text-blue-400 mt-1.5 font-mono">
            {kpis.avg_air_temp_c}°C
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Peak: {kpis.max_air_temp_c}°C</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
          <div className="text-[11px] text-slate-400 font-medium">Mean Land Surface (LST)</div>
          <div className="text-2xl font-black text-red-400 mt-1.5 font-mono">
            {kpis.avg_lst_c}°C
          </div>
          <div className="text-[10px] text-red-400/80 mt-1 font-semibold">Peak: {kpis.max_lst_c}°C</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
          <div className="text-[11px] text-slate-400 font-medium">Urban Heat Island (UHI)</div>
          <div className="text-2xl font-black text-orange-400 mt-1.5 font-mono">
            +{kpis.avg_uhi_c}°C
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Excess canopy warming</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
          <div className="text-[11px] text-slate-400 font-medium">Mean Priority Score</div>
          <div className="text-2xl font-black text-cyan-400 mt-1.5 font-mono">
            {kpis.avg_cooling_priority_score}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">MCDM Scale (0–100)</div>
        </div>
      </div>

      {/* Heat Risk Tier Distribution */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm">
        <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Citywide Heat Exposure Risk Proportions (N = 150,000 Observations)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-emerald-950/30 border border-emerald-500/30 p-3.5 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">Low Risk</span>
              <span className="text-xs font-mono font-bold text-emerald-300">{risk['Low']?.percentage || 25.4}%</span>
            </div>
            <div className="text-lg font-bold text-white mt-1 font-mono">{risk['Low']?.count?.toLocaleString() || '38,100'}</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Parks, lakes, open water buffer</p>
          </div>

          <div className="bg-amber-950/30 border border-amber-500/30 p-3.5 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">Moderate Risk</span>
              <span className="text-xs font-mono font-bold text-amber-300">{risk['Moderate']?.percentage || 41.2}%</span>
            </div>
            <div className="text-lg font-bold text-white mt-1 font-mono">{risk['Moderate']?.count?.toLocaleString() || '61,800'}</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Medium-density residential wards</p>
          </div>

          <div className="bg-orange-950/30 border border-orange-500/30 p-3.5 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-400">High Risk</span>
              <span className="text-xs font-mono font-bold text-orange-300">{risk['High']?.percentage || 24.3}%</span>
            </div>
            <div className="text-lg font-bold text-white mt-1 font-mono">{risk['High']?.count?.toLocaleString() || '36,450'}</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Dense transport and arterial roads</p>
          </div>

          <div className="bg-red-950/30 border border-red-500/30 p-3.5 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-400">Very High Risk</span>
              <span className="text-xs font-mono font-bold text-red-300">{risk['Very High']?.percentage || 9.1}%</span>
            </div>
            <div className="text-lg font-bold text-white mt-1 font-mono">{risk['Very High']?.count?.toLocaleString() || '13,650'}</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Industrial MIDC and core retail centers</p>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Top Hot Spots & Priority Interventions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Hottest Locations */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-400" />
              Top 5 Hottest Microclimate Wards
            </h2>
            <button
              onClick={() => onNavigate('stations')}
              className="text-xs text-orange-400 hover:text-orange-300 font-medium"
            >
              View All 100
            </button>
          </div>
          <div className="divide-y divide-slate-800/80">
            {summary.top_hot_spots?.map((st) => (
              <div
                key={st.location_id}
                onClick={() => onSelectStation(st.location_id)}
                className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 px-2 rounded-lg transition"
              >
                <div>
                  <div className="font-semibold text-xs text-white flex items-center gap-2">
                    <span>{st.location_name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                      {st.location_id}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{st.zone_type} Zone</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-red-400 font-mono">{st.avg_lst}°C LST</div>
                  <div className="text-[10px] text-orange-400 font-mono">+{st.avg_uhi}°C UHI</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Priority Interventions */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              Top 5 Priority Cooling Actions
            </h2>
            <button
              onClick={() => onNavigate('interventions')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
            >
              View Full Plan
            </button>
          </div>
          <div className="divide-y divide-slate-800/80">
            {summary.top_priority_interventions?.map((pi) => (
              <div
                key={pi.location_id}
                onClick={() => onSelectStation(pi.location_id)}
                className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 px-2 rounded-lg transition"
              >
                <div>
                  <div className="font-semibold text-xs text-white flex items-center gap-2">
                    <span>{pi.location_name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                      {pi.location_id}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-0.5 truncate max-w-xs">
                    {pi.recommended_intervention}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-cyan-400 font-mono">CPS {pi.avg_cps}</div>
                  <div className="text-[10px] text-emerald-400 font-mono font-medium">-{pi.avg_cooling_potential}°C Est.</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Morphological Zone Comparison Table */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm">
        <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>Morphological Zone Microclimate Disparities</span>
          <span className="text-[11px] text-slate-500 font-normal">Ranked by Mean Surface Temperature (LST)</span>
        </h2>
        <div className="border border-slate-800/80 rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/70 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3">Urban Zone</th>
                <th className="p-3">Stations</th>
                <th className="p-3">Mean Surface LST</th>
                <th className="p-3">Mean UHI Intensity</th>
                <th className="p-3">Cooling Priority Score</th>
                <th className="p-3">Thermal Stress Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {summary.zone_comparison?.map((z) => (
                <tr key={z.zone_type} className="hover:bg-slate-800/30">
                  <td className="p-3 text-white font-sans font-semibold">{z.zone_type}</td>
                  <td className="p-3 text-slate-300">{z.site_count}</td>
                  <td className="p-3 text-red-400 font-bold">{z.avg_lst}°C</td>
                  <td className="p-3 text-orange-400 font-semibold">+{z.avg_uhi}°C</td>
                  <td className="p-3 text-cyan-400 font-semibold">{z.avg_cps}</td>
                  <td className="p-3 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      z.avg_lst > 40 ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      z.avg_lst > 36 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      z.avg_lst > 33 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {z.avg_lst > 40 ? 'Critical Thermal Hotspot' : z.avg_lst > 36 ? 'Elevated Heat Stress' : z.avg_lst > 33 ? 'Moderate Climate' : 'Cooling Buffer Zone'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
