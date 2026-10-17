import React, { useState, useEffect } from 'react';
import { Database, Filter, ChevronLeft, ChevronRight, Search, RefreshCw } from '../components/Icons';

export default function ObservationsScreen({ onSelectStation }) {
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [riskCategory, setRiskCategory] = useState('');
  const [locationId, setLocationId] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchObservations = () => {
    setLoading(true);
    let url = `http://127.0.0.1:5000/api/v1/observations?page=${page}&limit=${limit}`;
    if (riskCategory) url += `&risk_category=${riskCategory}`;
    if (locationId) url += `&location_id=${locationId}`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        setData(json.data || []);
        setTotalRecords(json.total_records || 0);
        setTotalPages(json.total_pages || 1);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchObservations();
  }, [page, limit, riskCategory, locationId]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Database className="w-6 h-6 text-orange-500" />
            Unified Observations Data Explorer
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time paginated queries joining meteorological facts, remote sensing indices, and heat exposure scores (N = 150,000)
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          Total Observations: <span className="font-bold text-orange-400">{totalRecords.toLocaleString()}</span>
        </div>
      </div>

      {/* Filters & Pagination toolbar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3 flex-wrap flex-1">
          {/* Station filter */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <span>Station ID:</span>
            <input
              type="text"
              placeholder="e.g. LOC001"
              value={locationId}
              onChange={(e) => {
                setLocationId(e.target.value.toUpperCase());
                setPage(1);
              }}
              className="w-24 bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          {/* Risk category filter */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <span>Risk Tier:</span>
            <select
              value={riskCategory}
              onChange={(e) => {
                setRiskCategory(e.target.value);
                setPage(1);
              }}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-orange-500"
            >
              <option value="">All Categories</option>
              <option value="Very High">Very High</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Page size limit */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <span>Page Size:</span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-orange-500"
            >
              <option value="15">15 rows</option>
              <option value="25">25 rows</option>
              <option value="50">50 rows</option>
              <option value="100">100 rows</option>
            </select>
          </div>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-slate-300 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-300 px-2">
            Page <span className="font-bold text-white">{page}</span> of <span className="font-bold text-slate-400">{totalPages.toLocaleString()}</span>
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-slate-300 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center py-28 text-slate-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mr-3"></div>
              Streaming observation records from local database...
            </div>
          ) : data.length === 0 ? (
            <div className="py-20 text-center text-slate-400 text-xs">
              No observation records match the specified filters.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] sticky top-0 backdrop-blur-sm z-10">
                <tr>
                  <th className="p-3">Record ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Station</th>
                  <th className="p-3">Zone</th>
                  <th className="p-3">Air Temp</th>
                  <th className="p-3">Surface LST</th>
                  <th className="p-3">NDVI</th>
                  <th className="p-3">UHI Intensity</th>
                  <th className="p-3">Risk Tier</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Recommended Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {data.map((obs) => (
                  <tr
                    key={obs.record_id}
                    onClick={() => onSelectStation(obs.location_id)}
                    className="hover:bg-slate-800/40 cursor-pointer transition"
                  >
                    <td className="p-3 text-slate-400 text-[11px]">{obs.record_id}</td>
                    <td className="p-3 text-slate-300 font-sans">{obs.observation_date}</td>
                    <td className="p-3 font-sans font-semibold text-white">
                      {obs.location_name}
                      <span className="text-[10px] text-slate-500 font-mono ml-1">({obs.location_id})</span>
                    </td>
                    <td className="p-3 font-sans text-slate-400">{obs.zone_type}</td>
                    <td className="p-3 text-blue-400">{obs.air_temperature_c}°C</td>
                    <td className="p-3 text-red-400 font-bold">{obs.land_surface_temperature_c}°C</td>
                    <td className="p-3 text-emerald-400">{obs.ndvi}</td>
                    <td className="p-3 text-orange-400 font-semibold">+{obs.urban_heat_island_intensity_c}°C</td>
                    <td className="p-3 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        obs.heat_risk_category === 'Very High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        obs.heat_risk_category === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                        obs.heat_risk_category === 'Moderate' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {obs.heat_risk_category}
                      </span>
                    </td>
                    <td className="p-3 text-cyan-400 font-bold">{obs.cooling_priority_score}</td>
                    <td className="p-3 font-sans text-slate-300 truncate max-w-xs">{obs.recommended_intervention}</td>
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
