import React, { useState } from 'react';
import { Database, FileText, CheckCircle2, AlertTriangle, Layers, BookOpen, ShieldAlert } from '../components/Icons';

export default function DatasetMethodologyScreen() {
  const [selectedTable, setSelectedTable] = useState('ALL');
  const [searchFeature, setSearchFeature] = useState('');

  // 57 features inventory structured by table
  const featureInventory = [
    // locations (10 features)
    { table: 'locations', name: 'location_id', type: 'VARCHAR(10)', desc: 'Unique spatial station primary key (LOC001 - LOC100)' },
    { table: 'locations', name: 'location_name', type: 'VARCHAR(100)', desc: 'Descriptive geographic neighborhood name in Solapur' },
    { table: 'locations', name: 'zone_type', type: 'VARCHAR(50)', desc: 'Urban zoning classification (Commercial, Industrial, Residential, etc.)' },
    { table: 'locations', name: 'city', type: 'VARCHAR(50)', desc: 'Municipal entity (Solapur)' },
    { table: 'locations', name: 'state', type: 'VARCHAR(50)', desc: 'State jurisdiction (Maharashtra)' },
    { table: 'locations', name: 'latitude', type: 'NUMERIC(8,5)', desc: 'WGS84 latitude coordinate (Solapur bounding box: 17.61 - 17.72°N)' },
    { table: 'locations', name: 'longitude', type: 'NUMERIC(8,5)', desc: 'WGS84 longitude coordinate (Solapur bounding box: 75.86 - 75.96°E)' },
    { table: 'locations', name: 'elevation_m', type: 'NUMERIC(6,2)', desc: 'Topographic elevation above sea level in meters (~440m - 490m)' },
    { table: 'locations', name: 'population_density_per_km2', type: 'NUMERIC(8,2)', desc: 'Estimated population density within station catchment area' },
    { table: 'locations', name: 'vulnerable_population_index', type: 'NUMERIC(4,3)', desc: 'Socioeconomic vulnerability metric [0.0 - 1.0] for heat sensitivity' },

    // land_cover (8 features)
    { table: 'land_cover', name: 'base_vegetation_cover_pct', type: 'NUMERIC(5,2)', desc: 'Baseline vegetative ground coverage percentage [0 - 100%]' },
    { table: 'land_cover', name: 'base_impervious_surface_pct', type: 'NUMERIC(5,2)', desc: 'Asphalt, concrete, and built impervious footprint [0 - 100%]' },
    { table: 'land_cover', name: 'base_building_density_index', type: 'NUMERIC(5,3)', desc: 'Normalized structural floor area ratio index [0.0 - 1.0]' },
    { table: 'land_cover', name: 'base_road_density_km_per_km2', type: 'NUMERIC(5,2)', desc: 'Transportation infrastructure density in linear km per km2' },
    { table: 'land_cover', name: 'base_tree_canopy_cover_pct', type: 'NUMERIC(5,2)', desc: 'Overhead shade tree canopy percentage [0 - 100%]' },
    { table: 'land_cover', name: 'surface_albedo', type: 'NUMERIC(4,3)', desc: 'Reflectance coefficient of surface materials [0.08 - 0.35]' },
    { table: 'land_cover', name: 'distance_to_green_space_m', type: 'NUMERIC(7,2)', desc: 'Euclidean distance to nearest municipal park or green reserve (m)' },
    { table: 'land_cover', name: 'distance_to_water_m', type: 'NUMERIC(7,2)', desc: 'Distance to Siddheshwar Lake, Kambar Talav, or major reservoir (m)' },

    // weather_observations (12 features)
    { table: 'weather_observations', name: 'record_id', type: 'VARCHAR(32)', desc: 'Deterministic MD5 composite primary key' },
    { table: 'weather_observations', name: 'observation_datetime', type: 'TIMESTAMPTZ', desc: 'ISO8601 temporal timestamp (2021-2025)' },
    { table: 'weather_observations', name: 'air_temperature_c', type: 'NUMERIC(5,2)', desc: 'Ambient dry-bulb air temperature at 2m height (°C)' },
    { table: 'weather_observations', name: 'min_air_temperature_c', type: 'NUMERIC(5,2)', desc: 'Diurnal cycle minimum recorded air temperature (°C)' },
    { table: 'weather_observations', name: 'max_air_temperature_c', type: 'NUMERIC(5,2)', desc: 'Diurnal cycle maximum recorded air temperature (°C)' },
    { table: 'weather_observations', name: 'relative_humidity_pct', type: 'NUMERIC(5,2)', desc: 'Atmospheric moisture saturation ratio [0 - 100%]' },
    { table: 'weather_observations', name: 'wind_speed_mps', type: 'NUMERIC(5,2)', desc: 'Horizontal wind speed at 10m height (m/s)' },
    { table: 'weather_observations', name: 'wind_direction_deg', type: 'NUMERIC(5,1)', desc: 'Compass wind azimuth [0 - 360°]' },
    { table: 'weather_observations', name: 'solar_radiation_w_m2', type: 'NUMERIC(6,2)', desc: 'Downward shortwave solar irradiance (W/m2)' },
    { table: 'weather_observations', name: 'precipitation_mm', type: 'NUMERIC(6,2)', desc: 'Liquid water precipitation equivalent (mm)' },
    { table: 'weather_observations', name: 'cloud_cover_pct', type: 'NUMERIC(5,2)', desc: 'Fractional sky cloud cover percentage [0 - 100%]' },
    { table: 'weather_observations', name: 'atmospheric_pressure_hpa', type: 'NUMERIC(6,1)', desc: 'Barometric station pressure (hPa)' },

    // surface_observations (7 features)
    { table: 'surface_observations', name: 'land_surface_temperature_c', type: 'NUMERIC(5,2)', desc: 'Radiometric skin surface temperature (LST) (°C)' },
    { table: 'surface_observations', name: 'surface_temperature_anomaly_c', type: 'NUMERIC(5,2)', desc: 'Deviation from 5-year station baseline LST (°C)' },
    { table: 'surface_observations', name: 'ndvi', type: 'NUMERIC(5,3)', desc: 'Normalized Difference Vegetation Index [-1.0 to 1.0]' },
    { table: 'surface_observations', name: 'ndbi', type: 'NUMERIC(5,3)', desc: 'Normalized Difference Built-up Index [-1.0 to 1.0]' },
    { table: 'surface_observations', name: 'soil_moisture_pct', type: 'NUMERIC(5,2)', desc: 'Near-surface soil volumetric water content [0 - 100%]' },
    { table: 'surface_observations', name: 'surface_albedo_observed', type: 'NUMERIC(4,3)', desc: 'Dynamic radiometric albedo observed during pass' },
    { table: 'surface_observations', name: 'evapotranspiration_mm_day', type: 'NUMERIC(5,2)', desc: 'Simulated daily surface water loss through transpiration (mm/day)' },

    // heat_assessments (10 features)
    { table: 'heat_assessments', name: 'heat_index_c', type: 'NUMERIC(5,2)', desc: 'Steadman/NOAA apparent temperature feeling index (°C)' },
    { table: 'heat_assessments', name: 'urban_heat_island_intensity_c', type: 'NUMERIC(5,2)', desc: 'Thermal differential over peri-urban baseline (ΔT_uhi °C)' },
    { table: 'heat_assessments', name: 'heat_risk_category', type: 'VARCHAR(20)', desc: 'Categorical risk tier: Low, Moderate, High, Extreme' },
    { table: 'heat_assessments', name: 'wet_bulb_globe_temp_c', type: 'NUMERIC(5,2)', desc: 'Occupational thermal work-safety indicator (WBGT °C)' },
    { table: 'heat_assessments', name: 'diurnal_temp_range_c', type: 'NUMERIC(5,2)', desc: 'Daily thermal oscillation (T_max - T_min) (°C)' },
    { table: 'heat_assessments', name: 'thermal_comfort_index', type: 'NUMERIC(4,2)', desc: 'Physiological equivalent thermal stress index' },
    { table: 'heat_assessments', name: 'cooling_degree_days', type: 'NUMERIC(5,2)', desc: 'Energy demand threshold accumulation (base 18.3°C)' },
    { table: 'heat_assessments', name: 'solar_radiation_exposure_kj', type: 'NUMERIC(8,2)', desc: 'Integrated daily radiant exposure energy' },
    { table: 'heat_assessments', name: 'surface_thermal_capacity_mj', type: 'NUMERIC(6,2)', desc: 'Substrate heat storage capacity' },
    { table: 'heat_assessments', name: 'extreme_heat_alert_flag', type: 'BOOLEAN', desc: 'Alert flag active when Heat Index exceeds 40.5°C' },

    // interventions (10 features)
    { table: 'interventions', name: 'cooling_priority_score', type: 'NUMERIC(5,2)', desc: 'MCDM composite cooling urgency score [0.0 - 100.0]' },
    { table: 'interventions', name: 'primary_intervention_recommended', type: 'VARCHAR(100)', desc: 'Primary nature-based or infrastructural mitigation' },
    { table: 'interventions', name: 'secondary_intervention_recommended', type: 'VARCHAR(100)', desc: 'Complementary cooling mechanism' },
    { table: 'interventions', name: 'estimated_cooling_potential_c', type: 'NUMERIC(4,2)', desc: 'Theoretical simulated maximum thermal reduction (°C)' },
    { table: 'interventions', name: 'cost_estimate_inr_lakhs', type: 'NUMERIC(8,2)', desc: 'Heuristic capital expenditure estimate (Lakhs INR)' },
    { table: 'interventions', name: 'implementation_feasibility', type: 'VARCHAR(20)', desc: 'Feasibility classification: High, Medium, Low' },
    { table: 'interventions', name: 'co_benefits_score', type: 'NUMERIC(4,2)', desc: 'Ecological, air quality, and recreational synergy [1-10]' },
    { table: 'interventions', name: 'urgency_tier', type: 'VARCHAR(20)', desc: 'Implementation urgency: Tier 1 (Immediate) to Tier 4' },
    { table: 'interventions', name: 'recommended_tree_species', type: 'VARCHAR(100)', desc: 'Drought-tolerant endemic flora suitable for Solapur' },
    { table: 'interventions', name: 'simulated_post_intervention_lst', type: 'NUMERIC(5,2)', desc: 'Projected post-mitigation surface temperature (°C)' },
  ];

  const filteredFeatures = featureInventory.filter((f) => {
    const matchTable = selectedTable === 'ALL' || f.table === selectedTable;
    const matchSearch =
      !searchFeature ||
      f.name.toLowerCase().includes(searchFeature.toLowerCase()) ||
      f.desc.toLowerCase().includes(searchFeature.toLowerCase());
    return matchTable && matchSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header & Academic Scope */}
      <div className="bg-[#142D4B] border border-blue-900/50 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#2A9D8F] mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Academic Data Governance & Methodology</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Dataset Architecture & Simulation Science
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              HeatShield synthesizes 150,000 multi-year microclimate observations across 100 spatial
              monitoring sites in Solapur, Maharashtra, structured in 3NF relational PostgreSQL.
            </p>
          </div>
          <div className="bg-slate-900/80 border border-slate-700/60 p-3 rounded-xl text-right">
            <div className="text-xs text-slate-400">Total Features Tracked</div>
            <div className="text-2xl font-black text-[#F07835]">57 Attributes</div>
            <div className="text-[10px] text-slate-400">6 Normalized Relational Tables</div>
          </div>
        </div>
      </div>

      {/* 2. Simulation Methodology & Governing Equations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-[#F07835] font-bold text-sm uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Biophysical & Thermodynamic Modeling</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The synthetic observations reflect empirical urban heat island physics calibrated against
            Solapur&apos;s semi-arid Deccan plateau climate. Surface temperatures are governed by localized
            energy conservation balances:
          </p>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-[11px] text-blue-300 space-y-2">
            <div>
              <span className="text-slate-400"># 1. Surface Thermal Elevation:</span>
              <br />
              <span className="text-orange-400">LST</span> = T_air + &Delta;T_surface
              <br />
              &Delta;T_surface = &alpha; &times; NDBI - &beta; &times; NDVI + &gamma; &times; (1 - Albedo)
            </div>
            <div>
              <span className="text-slate-400"># 2. Urban Heat Island Intensity:</span>
              <br />
              <span className="text-emerald-400">UHI</span> = LST_urban - LST_peri_urban_baseline
            </div>
            <div>
              <span className="text-slate-400"># 3. NOAA Heat Index (Steadman Equation):</span>
              <br />
              <span className="text-amber-400">HI</span> = c_1 + c_2(T) + c_3(RH) + c_4(T)(RH) + ...
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>0 Thermodynamic Inversions: Strict check constraint T_min &le; T_air &le; T_max enforced.</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-[#2A9D8F] font-bold text-sm uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>Multi-Criteria Decision Making (MCDM) Scoring</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Cooling intervention priorities are ranked via a deterministic, multi-attribute utility formula
            combining thermal stress, social sensitivity, and existing vegetative deficit:
          </p>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-[11px] text-teal-300 space-y-1">
            <div className="text-slate-400"># Cooling Priority Score (CPS) Weight Matrix:</div>
            <div>CPS = (0.35 &times; Norm_UHI)</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ (0.25 &times; Vulnerable_Pop_Index)</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ (0.20 &times; Vegetative_Deficit)</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ (0.20 &times; Infrastructure_Deficit)</div>
            <div className="text-[10px] text-slate-400 pt-1">Result: Bounded continuous score [0.0 - 100.0]</div>
          </div>
          <div className="text-[11px] text-slate-300 space-y-1">
            <div className="font-semibold text-slate-200">Zonal Stratification (100 Sites):</div>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
              <div>&bull; Commercial: 14 stations</div>
              <div>&bull; Industrial: 12 stations</div>
              <div>&bull; High-Density Res: 32 stations</div>
              <div>&bull; Low-Density Res: 24 stations</div>
              <div>&bull; Peri-Urban Agri: 18 stations</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 57 Features Data Dictionary Explorer */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#F07835]" />
              <span>Relational Feature Dictionary (57 Attributes)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive schema inspection across all 6 normalized relational entities.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
              {['ALL', 'locations', 'land_cover', 'weather_observations', 'surface_observations', 'heat_assessments', 'interventions'].map((tbl) => (
                <button
                  key={tbl}
                  onClick={() => setSelectedTable(tbl)}
                  className={`px-2.5 py-1 rounded-md transition ${
                    selectedTable === tbl
                      ? 'bg-[#142D4B] text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tbl}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search attribute name or description..."
              value={searchFeature}
              onChange={(e) => setSearchFeature(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500 w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-96">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#142D4B] text-slate-200 uppercase font-semibold text-[10px] tracking-wider sticky top-0">
              <tr>
                <th className="px-4 py-3">Table</th>
                <th className="px-4 py-3">Attribute Name</th>
                <th className="px-4 py-3">Data Type</th>
                <th className="px-4 py-3">Description & Engineering Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/60 font-mono">
              {filteredFeatures.map((f, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50 transition">
                  <td className="px-4 py-2.5 text-slate-400 font-sans">{f.table}</td>
                  <td className="px-4 py-2.5 font-bold text-orange-400">{f.name}</td>
                  <td className="px-4 py-2.5 text-teal-400 text-[11px]">{f.type}</td>
                  <td className="px-4 py-2.5 text-slate-300 font-sans text-xs">{f.desc}</td>
                </tr>
              ))}
              {filteredFeatures.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500 font-sans">
                    No features match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Scientific Limitations Disclosure Card */}
      <div className="bg-amber-950/30 border border-amber-600/40 p-5 rounded-2xl flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1">
          <div className="font-bold text-amber-300">
            Mandatory Academic Disclosure & Known Synthetic Data Boundaries
          </div>
          <p className="leading-relaxed">
            HeatShield is an academic computational prototype designed for MIT Vishwaprayag University
            coursework. All 150,000 meteorological records, spectral indices (NDVI/NDBI), and surface
            temperature measurements represent a scientifically calibrated synthetic simulation for
            Solapur, Maharashtra. While values satisfy microclimate thermodynamics, they do not constitute
            verified ground-truth municipal weather stations or real-time Sentinel-3/Landsat-8 thermal satellite passes.
          </p>
        </div>
      </div>
    </div>
  );
}
