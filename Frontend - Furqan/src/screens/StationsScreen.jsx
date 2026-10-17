import React, { useState, useMemo } from 'react';
import { Search, Filter, Compass, Thermometer, ShieldAlert, ArrowUpDown } from '../components/Icons';

export default function StationsScreen({ locations, onSelectStation }) {
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState('ALL');
  const [infraFilter, setInfraFilter] = useState('ALL');
  const [sortField, setSortField] = useState('avg_cooling_priority_score');
  const [sortAsc, setSortAsc] = useState(false);

  const zones = useMemo(() => {
    const set = new Set(locations.map(l => l.zone_type));
    return ['ALL', ...Array.from(set).sort()];
  }, [locations]);

  const filtered = useMemo(() => {
    return locations.filter(loc => {
      const matchSearch = !search ||
        loc.location_name.toLowerCase().includes(search.toLowerCase()) ||
        loc.location_id.toLowerCase().includes(search.toLowerCase());
      const matchZone = selectedZone === 'ALL' || loc.zone_type === selectedZone;
      const matchInfra = infraFilter === 'ALL' ||
        (infraFilter === 'YES' && loc.cooling_infrastructure_present === 1) ||
        (infraFilter === 'NO' && loc.cooling_infrastructure_present === 0);
      return matchSearch && matchZone && matchInfra;
    }).sort((a, b) => {
      let valA = a[sortField] || 0;
      let valB = b[sortField] || 0;
      if (typeof valA === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });
  }, [locations, search, selectedZone, infraFilter, sortField, sortAsc]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-orange-500" />
            Monitoring Stations Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete inventory of 100 stationary observation wards across Solapur Municipal Corporation
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          Showing <span className="font-bold text-orange-400">{filtered.length}</span> of 100 stations
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search station by name or ID (e.g., Saat Rasta, LOC018)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <span>Zone:</span>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-orange-500"
            >
              {zones.map(z => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <span>Cooling Asset:</span>
            <select
              value={infraFilter}
              onChange={(e) => setInfraFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-orange-500"
            >
              <option value="ALL">All Stations</option>
              <option value="YES">Installed</option>
              <option value="NO">None</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stations Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[600px]">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] sticky top-0 backdrop-blur-sm z-10">
              <tr>
                <th className="p-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('location_id')}>
                  <div className="flex items-center gap-1">Station ID <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="p-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('location_name')}>
                  <div className="flex items-center gap-1">Station Name <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="p-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('zone_type')}>
                  <div className="flex items-center gap-1">Zone <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="p-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('avg_lst_c')}>
                  <div className="flex items-center gap-1">Mean LST (°C) <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="p-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('avg_uhi_c')}>
                  <div className="flex items-center gap-1">UHI (°C) <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="p-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('avg_cooling_priority_score')}>
                  <div className="flex items-center gap-1">Priority (CPS) <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="p-3.5">Cooling Infrastructure</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filtered.map((loc) => (
                <tr
                  key={loc.location_id}
                  onClick={() => onSelectStation(loc.location_id)}
                  className="hover:bg-slate-800/40 cursor-pointer transition"
                >
                  <td className="p-3.5 font-bold text-orange-400">{loc.location_id}</td>
                  <td className="p-3.5 font-sans font-semibold text-white">{loc.location_name}</td>
                  <td className="p-3.5 font-sans">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {loc.zone_type}
                    </span>
                  </td>
                  <td className="p-3.5 text-red-400 font-bold">{loc.avg_lst_c || '--'}°C</td>
                  <td className="p-3.5 text-orange-400 font-semibold">+{loc.avg_uhi_c || '--'}°C</td>
                  <td className="p-3.5 text-cyan-400 font-bold">{loc.avg_cooling_priority_score || '--'}</td>
                  <td className="p-3.5 font-sans text-slate-300">
                    {loc.cooling_infrastructure_present ? (
                      <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {loc.cooling_infrastructure_type}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">None</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right font-sans">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStation(loc.location_id);
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-orange-600 text-slate-300 hover:text-white rounded text-[11px] font-semibold transition"
                    >
                      Profile
                    </button>
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
