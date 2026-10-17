import React, { useState, useEffect } from 'react';
import DisclaimerBanner from './components/DisclaimerBanner';
import Navbar from './components/Navbar';
import DashboardScreen from './screens/DashboardScreen';
import MapScreen from './screens/MapScreen';
import StationsScreen from './screens/StationsScreen';
import ObservationsScreen from './screens/ObservationsScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import InterventionsScreen from './screens/InterventionsScreen';
import DatasetMethodologyScreen from './screens/DatasetMethodologyScreen';
import AboutTeamScreen from './screens/AboutTeamScreen';
import StationDetailModal from './components/StationDetailModal';
import { getDashboardSummary, getLocations, getAnalyticsSummary, API_BASE_URL } from './lib/supabaseClient';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [healthStatus, setHealthStatus] = useState(null);
  const [summary, setSummary] = useState(null);
  const [locations, setLocations] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial data loading via universal client (Supabase direct or REST fallback)
  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);

      // 1. Health check from Flask API
      try {
        const hRes = await fetch(`${API_BASE_URL}/health`);
        if (hRes.ok) {
          const hData = await hRes.json();
          setHealthStatus(hData);
        }
      } catch (err) {
        console.warn('Backend health check error (running standalone):', err);
      }

      // 2. Dashboard summary
      try {
        const sumData = await getDashboardSummary();
        setSummary(sumData);
      } catch (err) {
        console.error('Failed to load dashboard summary:', err);
      }

      // 3. Locations catalog
      try {
        const locData = await getLocations();
        setLocations(locData.data || []);
      } catch (err) {
        console.error('Failed to load locations catalog:', err);
      }

      // 4. Analytics data
      try {
        const anData = await getAnalyticsSummary();
        setAnalyticsData(anData);
      } catch (err) {
        console.error('Failed to load analytics data:', err);
      }

      setLoading(false);
    }

    loadInitialData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A121E] text-slate-100 flex flex-col font-sans selection:bg-[#F07835] selection:text-white">
      {/* 1. Academic Institutional Disclosure Banner */}
      <DisclaimerBanner />

      {/* 2. Top Navigation Bar */}
      <Navbar
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        healthStatus={healthStatus}
      />

      {/* 3. Screen Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeScreen === 'dashboard' && (
          <DashboardScreen
            summary={summary}
            onSelectStation={(id) => setSelectedStationId(id)}
            onNavigate={(screen) => setActiveScreen(screen)}
          />
        )}

        {activeScreen === 'map' && (
          <MapScreen
            locations={locations}
            onSelectStation={(id) => setSelectedStationId(id)}
            selectedLocation={locations.find((l) => l.location_id === selectedStationId)}
          />
        )}

        {activeScreen === 'stations' && (
          <StationsScreen
            locations={locations}
            onSelectStation={(id) => setSelectedStationId(id)}
          />
        )}

        {activeScreen === 'observations' && (
          <ObservationsScreen
            onSelectStation={(id) => setSelectedStationId(id)}
          />
        )}

        {activeScreen === 'analytics' && (
          <AnalyticsScreen
            analyticsData={analyticsData}
          />
        )}

        {activeScreen === 'interventions' && (
          <InterventionsScreen
            onSelectStation={(id) => setSelectedStationId(id)}
          />
        )}

        {activeScreen === 'methodology' && (
          <DatasetMethodologyScreen />
        )}

        {activeScreen === 'about' && (
          <AboutTeamScreen />
        )}
      </main>

      {/* 4. Station Detail Modal */}
      {selectedStationId && (
        <StationDetailModal
          locationId={selectedStationId}
          onClose={() => setSelectedStationId(null)}
        />
      )}

      {/* 5. Footer */}
      <footer className="bg-[#0e1a2b] border-t border-blue-950/60 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <div className="flex items-center space-x-2 text-slate-300 font-semibold mb-1">
              <span className="text-white">HeatShield Platform</span>
              <span>&bull;</span>
              <span>MIT Vishwaprayag University (MIT-VPU)</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Integrated Semester Project: Full Stack Development (FSD-1) &bull; DBMS &bull; Exploratory Data Analysis & DV
            </p>
          </div>

          <div className="text-right">
            <div className="text-slate-300 font-medium">Team TF-141</div>
            <div className="text-[11px] text-slate-400 mt-0.5 space-x-2">
              <span>Furqan Bagwan (SCFU425004)</span>
              <span>&bull;</span>
              <span>Aman Shaikh (SCFU425013)</span>
              <span>&bull;</span>
              <span>Bhavin Shankur (SCFU425014)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
