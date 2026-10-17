import React, { useState, useEffect } from 'react';
import { ShieldAlert, Trees, Building, Droplets, Sparkles, HelpCircle } from '../components/Icons';

export default function InterventionsScreen({ onSelectStation }) {
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/v1/interventions/priority?limit=30')
      .then(res => res.json())
      .then(json => {
        setInterventions(json.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-orange-500" />
          Cooling Interventions & Decision Intelligence
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Multi-Criteria Decision Making (MCDM) prioritization allocating municipal cooling budgets across Solapur wards
        </p>
      </div>

      {/* MCDM Formula Explainer Box */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Cooling Priority Score (CPS) Formulation
            </h2>
          </div>
          <span className="text-[10px] bg-slate-800 text-cyan-400 px-2 py-0.5 rounded font-mono">
            Scale: 0.0 – 100.0
          </span>
        </div>
        <div className="p-3 bg-slate-950/80 rounded-xl font-mono text-xs text-amber-300 border border-slate-800/80 overflow-x-auto">
          CPS = 0.30 × (LST / 55.0 × 100) + 0.25 × Shade_Gap_Index + 0.25 × Green_Cover_Deficit + 0.20 × Vulnerable_Population_Index
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-[11px] text-slate-400 pt-1">
          <div><span className="font-semibold text-slate-200">30% Radiative Heat:</span> Land Surface Temperature normalized to 55°C scale</div>
          <div><span className="font-semibold text-slate-200">25% Shade Deficit:</span> Lack of shade scaled by pedestrian footfall</div>
          <div><span className="font-semibold text-slate-200">25% Green Deficit:</span> Shortfall against the 35% WHO canopy target</div>
          <div><span className="font-semibold text-slate-200">20% Vulnerability:</span> Demographic elder and child density index</div>
        </div>
      </div>

      {/* 4 Intervention Typologies Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3">
            <Building className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-white">Cool Roofs & High-Albedo</h3>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            High-reflectance coatings on commercial flat roofs and industrial sheds to reflect up to 80% solar radiation.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-800 text-xs font-mono font-bold text-emerald-400">
            Est. Cooling: -2.5°C to -3.5°C
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
            <Trees className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-white">Urban Pocket Forests</h3>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            Dense native tree afforestation in open municipal buffers and roadside corridors to maximize evapotranspiration.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-800 text-xs font-mono font-bold text-emerald-400">
            Est. Cooling: -3.0°C to -4.05°C
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-white">Transit Shade Canopies</h3>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            Engineered shade structures along high-pedestrian commercial market corridors (Saat Rasta, Ashok Chowk).
          </p>
          <div className="mt-3 pt-2 border-t border-slate-800 text-xs font-mono font-bold text-emerald-400">
            Est. Cooling: -2.0°C to -3.0°C
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
            <Droplets className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-white">Water Retention & Misting</h3>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            Public water mister corridors and permeable bio-swales around Siddheshwar Lake and Kambar Talao perimeters.
          </p>
          <div className="mt-3 pt-2 border-t border-slate-800 text-xs font-mono font-bold text-emerald-400">
            Est. Cooling: -1.5°C to -2.5°C
          </div>
        </div>
      </div>

      {/* Priority Wards Ranking Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Priority Ranking of Monitoring Stations for Municipal Intervention
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Ranked in descending order by Cooling Priority Score (CPS)
            </p>
          </div>
          <span className="text-xs text-orange-400 font-mono font-semibold">
            Top {interventions.length} Priority Wards
          </span>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-slate-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mr-3"></div>
              Calculating priority rankings...
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] sticky top-0 backdrop-blur-sm z-10">
                <tr>
                  <th className="p-3.5">Rank</th>
                  <th className="p-3.5">Station ID</th>
                  <th className="p-3.5">Station Name</th>
                  <th className="p-3.5">Zone</th>
                  <th className="p-3.5">Mean LST</th>
                  <th className="p-3.5">Shade Gap</th>
                  <th className="p-3.5">Green Deficit</th>
                  <th className="p-3.5">Priority (CPS)</th>
                  <th className="p-3.5">Recommended Action</th>
                  <th className="p-3.5 text-right">Est. Cooling</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {interventions.map((item, idx) => (
                  <tr
                    key={item.location_id}
                    onClick={() => onSelectStation(item.location_id)}
                    className="hover:bg-slate-800/40 cursor-pointer transition"
                  >
                    <td className="p-3.5 font-bold text-slate-400">#{idx + 1}</td>
                    <td className="p-3.5 font-bold text-orange-400">{item.location_id}</td>
                    <td className="p-3.5 font-sans font-semibold text-white">{item.location_name}</td>
                    <td className="p-3.5 font-sans text-slate-400">{item.zone_type}</td>
                    <td className="p-3.5 text-red-400 font-bold">{item.avg_lst_c}°C</td>
                    <td className="p-3.5 text-amber-400">{item.avg_shade_gap}</td>
                    <td className="p-3.5 text-emerald-400">{item.avg_green_cover_deficit}%</td>
                    <td className="p-3.5 font-bold text-cyan-400 text-sm">{item.avg_cooling_priority_score}</td>
                    <td className="p-3.5 font-sans text-slate-200 font-medium truncate max-w-xs">{item.recommended_intervention}</td>
                    <td className="p-3.5 text-right font-bold text-emerald-400">-{item.avg_cooling_potential_c}°C</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
