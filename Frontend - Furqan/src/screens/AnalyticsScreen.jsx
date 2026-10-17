import React, { useState } from 'react';
import { BarChart3, Image, Download, CheckCircle, Info, ExternalLink } from '../components/Icons';

export default function AnalyticsScreen({ analyticsData }) {
  const [selectedChartIndex, setSelectedChartIndex] = useState(0);

  const charts = [
    {
      id: '01',
      filename: '01_temperature_distribution.png',
      title: 'Figure 01: Dual Histogram with KDE (Air vs. LST Distribution)',
      description: 'Probability density curves for ambient air temperature (mean 34.28°C) vs. radiative land surface temperature (mean 35.89°C, max 55.35°C), showing pronounced right-tail extreme surface heating.',
    },
    {
      id: '02',
      filename: '02_monthly_seasonal_trends.png',
      title: 'Figure 02: Longitudinal Monthly & Seasonal Heatwave Trends (2021–2025)',
      description: 'Multi-year seasonal periodicity isolating the annual pre-monsoon thermal peak in May (average LST 48.2°C), followed by rapid precipitation-induced cooling in June and July.',
    },
    {
      id: '03',
      filename: '03_correlation_heatmap.png',
      title: 'Figure 03: 10×10 Pearson Correlation Heatmap Matrix',
      description: 'Comprehensive cross-variable correlation matrix demonstrating physical coupling between biophysical traits (canopy deficit, impervious surface, NDBI) and public health exposure indicators.',
    },
    {
      id: '04',
      filename: '04_ndvi_vs_lst_scatter.png',
      title: 'Figure 04: Vegetative Greenness (NDVI) vs. Surface Temperature (LST)',
      description: 'Scatter plot with OLS linear regression fit demonstrating verified negative correlation (r = -0.307, p < 0.001). Every 0.1 increase in NDVI suppresses surface temperature by ~1.2°C to 1.5°C.',
    },
    {
      id: '05',
      filename: '05_builtup_intensity_vs_lst.png',
      title: 'Figure 05: Built-Up Density Index vs. Surface Temperature by Risk Tier',
      description: 'Thermal scatter categorized by heat risk categories, highlighting dense thermal clustering in wards where built-up intensity exceeds 75.0.',
    },
    {
      id: '06',
      filename: '06_heat_risk_distribution.png',
      title: 'Figure 06: Proportion of Observations by Heat Risk Category',
      description: 'Donut chart illustrating citywide vulnerability: 9.1% Very High Risk, 24.3% High Risk, 41.2% Moderate Risk, and 25.4% Low Risk across 150,000 multi-year observations.',
    },
    {
      id: '07',
      filename: '07_geographic_hotspot_map.png',
      title: 'Figure 07: Spatial Hotspot Geography of Solapur Monitoring Stations',
      description: 'Spatial coordinate scatter map where bubble size reflects Cooling Priority Score and color indicates mean UHI intensity, highlighting MIDC, Saat Rasta, and Ashok Chowk as primary heat clusters.',
    },
    {
      id: '08',
      filename: '08_cooling_priority_ranking.png',
      title: 'Figure 08: Top 15 Priority Municipal Wards for Cooling Action',
      description: 'Ranked horizontal bar chart prioritizing municipal intervention funding using the Multi-Criteria Decision Making (MCDM) scoring formula.',
    },
    {
      id: '09',
      filename: '09_location_zone_comparison.png',
      title: 'Figure 09: Box & Whisker Plot Across 9 Urban Zones',
      description: 'Distributional boxplots showing that Industrial (41.5°C) and Commercial (40.8°C) zones operate 10.7°C to 11.2°C hotter than Waterbodies (30.3°C) and Urban Parks (31.8°C).',
    },
    {
      id: '10',
      filename: '10_executive_summary_dashboard.png',
      title: 'Figure 10: Composite Executive Decision Dashboard',
      description: 'Multi-panel summary combining annual thermal curves, zone LST comparisons, vegetative cooling regression fits, and public health risk proportions in a single visual narrative.',
    },
  ];

  const currentChart = charts[selectedChartIndex];
  const stats = analyticsData?.descriptive_statistics || {};
  const corrs = analyticsData?.correlations || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
          <BarChart3 className="w-6 h-6 text-orange-500" />
          EDA Visualizations & Statistical Insights Gallery
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          10 Publication-Quality Figures (300 DPI) & Empirical Correlation Matrices Grounded in Solapur Master Observations
        </p>
      </div>

      {/* Main Feature: Selected Chart Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
              {currentChart.id} of 10 Visual Deliverables
            </span>
            <h2 className="text-base font-bold text-white mt-0.5">{currentChart.title}</h2>
          </div>
          <a
            href={`http://127.0.0.1:5000/api/v1/analytics/charts/${currentChart.filename}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download High-Res 300 DPI</span>
          </a>
        </div>

        {/* Chart Image Display */}
        <div className="bg-slate-950 rounded-xl border border-slate-800/80 p-2 flex items-center justify-center min-h-[420px] max-h-[580px] overflow-hidden">
          <img
            src={`http://127.0.0.1:5000/api/v1/analytics/charts/${currentChart.filename}`}
            alt={currentChart.title}
            className="max-h-[560px] w-auto object-contain rounded-lg shadow-md"
            onError={(e) => {
              // Fallback to local charts directory if API isn't streaming
              e.target.src = `/charts/${currentChart.filename}`;
            }}
          />
        </div>

        {/* Narrative & Statistical Takeaways */}
        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs space-y-2">
          <div className="font-bold text-slate-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-orange-400" />
            Analytical Findings & Physical Interpretation:
          </div>
          <p className="text-slate-300 leading-relaxed">
            {currentChart.description}
          </p>
        </div>

        {/* Chart Selector Thumbnails */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Switch Visualization (10 Generated Figures):
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {charts.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChartIndex(idx)}
                className={`p-2.5 rounded-lg text-left text-xs transition border ${
                  selectedChartIndex === idx
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-md'
                    : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <div className="font-mono font-bold text-[10px] text-orange-400">Fig {ch.id}</div>
                <div className="font-semibold truncate text-[11px] mt-0.5">{ch.title.split(':')[1] || ch.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Statistical Hypothesis Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
            <CheckCircle className="w-3.5 h-3.5" />
            H1: Vegetative Radiative Cooling
          </div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            r = {corrs.ndvi_vs_lst || '-0.307'}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Statistically significant negative correlation confirming that NDVI and tree canopy depress surface skin heat via evapotranspiration.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-bold text-red-400 flex items-center gap-1.5 mb-1">
            <CheckCircle className="w-3.5 h-3.5" />
            H2: Built-Up Thermal Trap
          </div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            r = +{corrs.ndbi_vs_lst || '0.369'}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            High built-up index (NDBI) and concrete surfaces absorb sensible radiant heat, exacerbating the localized urban heat island effect.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-bold text-orange-400 flex items-center gap-1.5 mb-1">
            <CheckCircle className="w-3.5 h-3.5" />
            H3: Solar Forcing Driver
          </div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            r = +{corrs.solar_rad_vs_lst || '0.590'}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Solar irradiance is the primary direct daytime forcing driver, elevating surface skin temperatures by up to 20°C above ambient air in May.
          </p>
        </div>
      </div>
    </div>
  );
}
