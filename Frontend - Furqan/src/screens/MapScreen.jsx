import React from 'react';
import SolapurMap from '../components/SolapurMap';
import { Compass, Flame, ShieldAlert, Droplets } from '../components/Icons';

export default function MapScreen({ locations, onSelectStation, selectedLocation }) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
          <Compass className="w-6 h-6 text-orange-500" />
          Spatial Microclimate Heat Island Mapping
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Interactive coordinate projection across 100 monitoring stations in Solapur • Hover to inspect station • Click for deep profile
        </p>
      </div>

      <div className="h-[700px]">
        <SolapurMap
          locations={locations}
          onSelectLocation={(loc) => onSelectStation(loc.location_id)}
          selectedLocation={selectedLocation}
        />
      </div>
    </div>
  );
}
