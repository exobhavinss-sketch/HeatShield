import React, { useState, useEffect } from 'react';
import { X, Thermometer, ShieldAlert, Trees, Building, Droplets, ArrowUpRight } from './Icons';

export default function StationDetailModal({ locationId, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locationId) return;
    setLoading(true);
    fetch(`http://127.0.0.1:5000/api/v1/locations/${locationId}`)
      .then(res => {
        if (!res.ok) throw new Error('Station not found');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [locationId]);

  if (!locationId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold text-white">
                {data?.location?.location_name || locationId}
              </h2>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                {locationId}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {data?.location?.zone_type} Zone
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Coordinates: {data?.location?.latitude?.toFixed(4)}°N, {data?.location?.longitude?.toFixed(4)}°E • Solapur, Maharashtra
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mr-3"></div>
              Loading station data...
            </div>
          ) : error ? (
            <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-300 rounded-lg text-center">
              {error}
            </div>
          ) : data ? (
            <>
              {/* Summary KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
                  <div className="text-[11px] text-slate-400 font-medium">Mean Surface LST</div>
                  <div className="text-2xl font-bold text-red-400 mt-1">
                    {data.multi_year_summary?.mean_lst}°C
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Max Peak: {data.multi_year_summary?.max_lst}°C</div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
                  <div className="text-[11px] text-slate-400 font-medium">Mean UHI Intensity</div>
                  <div className="text-2xl font-bold text-orange-400 mt-1">
                    +{data.multi_year_summary?.mean_uhi}°C
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Above rural baseline</div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
                  <div className="text-[11px] text-slate-400 font-medium">Cooling Priority Score</div>
                  <div className="text-2xl font-bold text-cyan-400 mt-1">
                    {data.multi_year_summary?.mean_cps}
                    <span className="text-xs text-slate-400 font-normal"> / 100</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">MCDM Index</div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
                  <div className="text-[11px] text-slate-400 font-medium">Shade Gap Index</div>
                  <div className="text-2xl font-bold text-amber-400 mt-1">
                    {data.multi_year_summary?.mean_shade_gap}
                    <span className="text-xs text-slate-400 font-normal"> / 100</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Pedestrian deficit</div>
                </div>
              </div>

              {/* Baseline Land Cover & Infrastructure */}
              <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-xl">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-orange-400" />
                  Station Morphological Baseline & Land Cover
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">Vegetation Cover:</span>
                    <div className="font-semibold text-emerald-400 text-sm mt-0.5">
                      {data.land_cover?.base_vegetation_cover_pct}%
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Impervious Surface:</span>
                    <div className="font-semibold text-red-400 text-sm mt-0.5">
                      {data.land_cover?.base_impervious_surface_pct}%
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Tree Canopy Cover:</span>
                    <div className="font-semibold text-emerald-300 text-sm mt-0.5">
                      {data.land_cover?.base_tree_canopy_cover_pct}%
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Surface Albedo:</span>
                    <div className="font-semibold text-slate-200 text-sm mt-0.5">
                      {data.land_cover?.surface_albedo}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Population Density:</span>
                    <div className="font-semibold text-slate-200 text-sm mt-0.5">
                      {data.location?.population_density_per_km2?.toLocaleString()} / km²
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Cooling Assets:</span>
                    <div className="font-semibold text-cyan-400 text-sm mt-0.5">
                      {data.location?.cooling_infrastructure_present ? data.location?.cooling_infrastructure_type : 'None Installed'}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Distance to Water:</span>
                    <div className="font-semibold text-slate-200 text-sm mt-0.5">
                      {data.location?.distance_to_water_m} meters
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Distance to Green Space:</span>
                    <div className="font-semibold text-slate-200 text-sm mt-0.5">
                      {data.location?.distance_to_green_space_m} meters
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent 30 Observations Table */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Recent 30-Day Thermal Observation Profile</span>
                  <span className="text-[11px] text-slate-500 font-normal">Synchronized from database</span>
                </h3>
                <div className="border border-slate-800 rounded-xl overflow-hidden overflow-x-auto max-h-64">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] sticky top-0">
                      <tr>
                        <th className="p-2.5">Date</th>
                        <th className="p-2.5">Air Temp</th>
                        <th className="p-2.5">Surface LST</th>
                        <th className="p-2.5">UHI</th>
                        <th className="p-2.5">Risk Tier</th>
                        <th className="p-2.5">Priority</th>
                        <th className="p-2.5">Recommended Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {data.recent_observations?.map((obs) => (
                        <tr key={obs.record_id} className="hover:bg-slate-800/30">
                          <td className="p-2.5 text-slate-300 font-sans">{obs.observation_date}</td>
                          <td className="p-2.5 text-blue-400">{obs.air_temperature_c}°C</td>
                          <td className="p-2.5 text-red-400 font-semibold">{obs.land_surface_temperature_c}°C</td>
                          <td className="p-2.5 text-orange-400">+{obs.urban_heat_island_intensity_c}°C</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${
                              obs.heat_risk_category === 'Very High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                              obs.heat_risk_category === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                              obs.heat_risk_category === 'Moderate' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                              'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            }`}>
                              {obs.heat_risk_category}
                            </span>
                          </td>
                          <td className="p-2.5 text-cyan-400 font-semibold">{obs.cooling_priority_score}</td>
                          <td className="p-2.5 text-slate-300 font-sans truncate max-w-xs">{obs.recommended_intervention}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
