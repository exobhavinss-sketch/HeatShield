import React from 'react';
import {
  LayoutDashboard,
  Map,
  Compass,
  Database,
  BarChart3,
  ShieldAlert,
  BookOpen,
  Users,
  Flame,
} from './Icons';
import { getConnectionStatus } from '../lib/supabaseClient';

export default function Navbar({ activeScreen, setActiveScreen, healthStatus }) {
  const navItems = [
    { id: 'dashboard', label: 'City Overview', icon: LayoutDashboard },
    { id: 'map', label: 'Microclimate Map', icon: Map },
    { id: 'stations', label: 'Stations', icon: Compass },
    { id: 'observations', label: 'Observations', icon: Database },
    { id: 'analytics', label: 'EDA Gallery', icon: BarChart3 },
    { id: 'interventions', label: 'Cooling Plan', icon: ShieldAlert },
    { id: 'methodology', label: 'Methodology', icon: BookOpen },
    { id: 'about', label: 'About & Team', icon: Users },
  ];

  const isConnected = healthStatus?.status === 'healthy';
  const connStatus = getConnectionStatus();

  return (
    <header className="bg-[#142D4B] border-b border-blue-900/40 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div
            className="flex items-center space-x-3 cursor-pointer select-none"
            onClick={() => setActiveScreen('dashboard')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black tracking-tight text-white font-mono">HeatShield</span>
                <span className="text-[10px] font-bold bg-[#F07835]/20 text-[#F07835] border border-[#F07835]/30 px-1.5 py-0.5 rounded">
                  v3.0 Final
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium">
                MIT-VPU &bull; Solapur Microclimate Intelligence
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#F07835] text-white shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* System Status Pills */}
          <div className="flex items-center space-x-2">
            {/* Backend / Client Engine Pill */}
            <div
              className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${connStatus.badgeColor}`}
              title={connStatus.description}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>{connStatus.badgeText}</span>
            </div>

            {/* Health Status */}
            <div
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                isConnected
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                  : 'bg-red-950/40 text-red-300 border-red-500/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-red-400'}`} />
              <span className="font-mono font-semibold">{isConnected ? 'API Live' : 'API Offline'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Navigation Bar */}
      <div className="xl:hidden flex items-center border-t border-blue-900/60 px-2 py-1.5 bg-[#0e1f33] overflow-x-auto space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`flex items-center space-x-1 py-1 px-2.5 text-[11px] font-medium rounded-md whitespace-nowrap transition ${
                isActive
                  ? 'bg-[#F07835] text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
