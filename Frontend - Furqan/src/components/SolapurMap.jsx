import React, { useState, useMemo } from 'react';

// Geographic bounds for Solapur stations
const BOUNDS = {
  minLat: 17.610,
  maxLat: 17.730,
  minLng: 75.830,
  maxLng: 75.970,
};

const WIDTH = 900;
const HEIGHT = 620;
const PADDING = 60;

function project(lat, lng) {
  const x = PADDING + ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * (WIDTH - 2 * PADDING);
  const y = HEIGHT - PADDING - ((lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * (HEIGHT - 2 * PADDING);
  return { x, y };
}

function getUhiColor(uhi) {
  if (uhi >= 4.0) return '#EF4444'; // Red
  if (uhi >= 2.5) return '#F97316'; // Orange
  if (uhi >= 1.0) return '#F59E0B'; // Amber
  return '#10B981'; // Green
}

export default function SolapurMap({ locations, onSelectLocation, selectedLocation }) {
  const [hoveredStation, setHoveredStation] = useState(null);
  const [zoneFilter, setZoneFilter] = useState('ALL');
  const [colorMode, setColorMode] = useState('uhi'); // 'uhi' or 'cps' or 'lst'

  const zones = useMemo(() => {
    const set = new Set(locations.map(l => l.zone_type));
    return ['ALL', ...Array.from(set).sort()];
  }, [locations]);

  const filteredLocations = useMemo(() => {
    if (zoneFilter === 'ALL') return locations;
    return locations.filter(l => l.zone_type === zoneFilter);
  }, [locations, zoneFilter]);

  // Major Solapur landmarks for offline spatial context
  const landmarks = [
    { name: 'Siddheshwar Lake', lat: 17.668, lng: 75.905, type: 'water' },
    { name: 'Saat Rasta Central', lat: 17.659, lng: 75.906, type: 'junction' },
    { name: 'MIDC Chhatrapati Sambhaji', lat: 17.682, lng: 75.918, type: 'industrial' },
    { name: 'Ashok Chowk Corridor', lat: 17.652, lng: 75.912, type: 'commercial' },
    { name: 'Solapur Central Station', lat: 17.665, lng: 75.898, type: 'transport' },
    { name: 'Kambar Talao', lat: 17.640, lng: 75.885, type: 'water' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl text-slate-100 flex flex-col h-full">
      {/* Map Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            Solapur Microclimate Geographic Map
          </h2>
          <p className="text-xs text-slate-400">
            100 Stationary Monitoring Wards (17.61°N – 17.73°N, 75.83°E – 75.97°E) • Offline Vector Grid
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-800/80 rounded-lg p-1 text-xs">
            <span className="text-slate-400 px-2">Metric:</span>
            <button
              onClick={() => setColorMode('uhi')}
              className={`px-2 py-1 rounded font-medium transition ${colorMode === 'uhi' ? 'bg-orange-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
            >
              UHI (°C)
            </button>
            <button
              onClick={() => setColorMode('lst')}
              className={`px-2 py-1 rounded font-medium transition ${colorMode === 'lst' ? 'bg-red-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
            >
              Surface LST
            </button>
            <button
              onClick={() => setColorMode('cps')}
              className={`px-2 py-1 rounded font-medium transition ${colorMode === 'cps' ? 'bg-teal-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
            >
              Priority Score
            </button>
          </div>

          <div className="flex items-center bg-slate-800/80 rounded-lg p-1 text-xs">
            <span className="text-slate-400 px-2">Zone:</span>
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="bg-slate-900 text-slate-200 text-xs rounded border border-slate-700 px-2 py-1 focus:outline-none focus:border-cyan-500"
            >
              {zones.map(z => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative flex-1 bg-slate-950/70 rounded-lg border border-slate-800/80 overflow-hidden flex items-center justify-center min-h-[460px]">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-full max-h-[600px] select-none"
        >
          {/* Background Grid & Coordinate Lines */}
          <defs>
            <pattern id="solapurGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="0.8" />
            </pattern>
            <radialGradient id="uhiHeatCenter" cx="55%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.12" />
              <stop offset="60%" stopColor="#F97316" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Thermal heat background gradient */}
          <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#solapurGrid)" />
          <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#uhiHeatCenter)" />

          {/* Solapur Municipal Extent Outline (Stylized polygonal zone boundary) */}
          <path
            d={`M 120 180 Q 280 80 500 100 T 800 220 T 780 480 T 450 560 T 150 480 Z`}
            fill="#0F172A"
            fillOpacity="0.3"
            stroke="#334155"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Landmarks */}
          {landmarks.map((lm, idx) => {
            const pos = project(lm.lat, lm.lng);
            return (
              <g key={idx} opacity={0.6}>
                {lm.type === 'water' ? (
                  <circle cx={pos.x} cy={pos.y} r="18" fill="#0284C7" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="1" />
                ) : (
                  <rect x={pos.x - 12} y={pos.y - 8} width="24" height="16" rx="4" fill="#334155" fillOpacity="0.5" />
                )}
                <text
                  x={pos.x}
                  y={pos.y - 14}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="9"
                  fontFamily="sans-serif"
                  fontWeight="600"
                >
                  {lm.name}
                </text>
              </g>
            );
          })}

          {/* Station Nodes */}
          {filteredLocations.map((loc) => {
            const pos = project(loc.latitude, loc.longitude);
            const isHovered = hoveredStation?.location_id === loc.location_id;
            const isSelected = selectedLocation?.location_id === loc.location_id;

            // Radius scaled by priority score
            const radius = 6 + (loc.avg_cooling_priority_score ? (loc.avg_cooling_priority_score / 100) * 10 : 4);

            let nodeColor = getUhiColor(loc.avg_uhi_c || 0);
            if (colorMode === 'lst') {
              const lst = loc.avg_lst_c || 35;
              nodeColor = lst > 40 ? '#EF4444' : lst > 36 ? '#F97316' : lst > 33 ? '#F59E0B' : '#10B981';
            } else if (colorMode === 'cps') {
              const cps = loc.avg_cooling_priority_score || 50;
              nodeColor = cps > 70 ? '#EF4444' : cps > 55 ? '#F97316' : cps > 35 ? '#14B8A6' : '#0D9488';
            }

            return (
              <g
                key={loc.location_id}
                onClick={() => onSelectLocation && onSelectLocation(loc)}
                onMouseEnter={() => setHoveredStation(loc)}
                onMouseLeave={() => setHoveredStation(null)}
                className="cursor-pointer transition-transform duration-200"
              >
                {/* Glow ring on hover/selected */}
                {(isHovered || isSelected) && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={radius + 6}
                    fill="none"
                    stroke={isSelected ? '#38BDF8' : '#F97316'}
                    strokeWidth="2.5"
                    strokeOpacity="0.8"
                    className="animate-pulse"
                  />
                )}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={radius}
                  fill={nodeColor}
                  fillOpacity={0.88}
                  stroke="#FFFFFF"
                  strokeWidth={isHovered || isSelected ? '2' : '1'}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover / Selected Tooltip Overlay */}
        {hoveredStation && (
          <div
            className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-lg shadow-2xl pointer-events-none max-w-xs animate-in fade-in"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1 mb-1.5">
              <span className="font-bold text-sm text-white">{hoveredStation.location_name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">
                {hoveredStation.location_id}
              </span>
            </div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Zone Typology:</span>
                <span className="font-semibold text-white">{hoveredStation.zone_type}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Mean Surface Temp (LST):</span>
                <span className="font-bold text-red-400">{hoveredStation.avg_lst_c || '--'}°C</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>UHI Intensity:</span>
                <span className="font-bold text-orange-400">+{hoveredStation.avg_uhi_c || '--'}°C</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Cooling Priority Score:</span>
                <span className="font-bold text-cyan-400">{hoveredStation.avg_cooling_priority_score || '--'} / 100</span>
              </div>
              <div className="pt-1 text-[11px] text-amber-300/90 italic">
                Click station to open deep historical climate profile
              </div>
            </div>
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-2.5 rounded-lg text-xs space-y-1.5 shadow-lg">
          <div className="font-semibold text-slate-300 text-[11px] mb-1">
            {colorMode === 'uhi' ? 'UHI Intensity (°C)' : colorMode === 'lst' ? 'Surface LST (°C)' : 'Cooling Priority'}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-slate-300 text-[11px]">{colorMode === 'uhi' ? '≥ +4.0°C (Critical)' : colorMode === 'lst' ? '> 40°C' : 'High Priority (>70)'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            <span className="text-slate-300 text-[11px]">{colorMode === 'uhi' ? '+2.5°C to +4.0°C' : colorMode === 'lst' ? '36°C – 40°C' : 'Moderate (55–70)'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-slate-300 text-[11px]">{colorMode === 'uhi' ? '+1.0°C to +2.5°C' : colorMode === 'lst' ? '33°C – 36°C' : 'Low-Medium (35–55)'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-slate-300 text-[11px]">{colorMode === 'uhi' ? '< +1.0°C (Cool/Baseline)' : colorMode === 'lst' ? '< 33°C' : 'Baseline (<35)'}</span>
          </div>
          <div className="pt-1 border-t border-slate-800 text-[10px] text-slate-400">
            Bubble size: Cooling Priority Score
          </div>
        </div>
      </div>
    </div>
  );
}
