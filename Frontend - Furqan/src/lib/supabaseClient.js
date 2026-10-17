/**
 * HeatShield — Universal Supabase & Local REST Data Client
 * MIT Vishwaprayag University (MIT-VPU) | Semester III Integrated Project
 * Team: TF-141 (Furqan Bagwan, Aman Shaikh, Bhavin Shankur)
 *
 * Architecture:
 * - Direct Client-Side Supabase Access: When VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 *   are provided, queries the PostgreSQL pre-computed analytical views and tables under RLS.
 * - Automatic Local REST API Fallback: When Supabase credentials are not configured or
 *   offline, seamlessly routes queries to the local Flask backend (http://127.0.0.1:5000/api/v1).
 * - Zero Secrets in Client: Only public anonymous keys are accessed.
 */

import { createClient } from '@supabase/supabase-js';

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api/v1';

// Strict validation of Supabase configuration
export const isSupabaseConfigured = Boolean(
  rawSupabaseUrl &&
  rawAnonKey &&
  rawSupabaseUrl.startsWith('https://') &&
  !rawSupabaseUrl.includes('your-project-id') &&
  !rawAnonKey.includes('your-public-anon-key')
);

// Instantiate Supabase client if valid credentials exist
export const supabase = isSupabaseConfigured
  ? createClient(rawSupabaseUrl, rawAnonKey)
  : null;

/**
 * Returns connection diagnostic metadata for the UI status badge
 */
export function getConnectionStatus() {
  if (isSupabaseConfigured) {
    return {
      mode: 'supabase',
      badgeText: 'Supabase Cloud (PostgreSQL RLS)',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      description: 'Connected directly to Supabase PostgreSQL database under Row Level Security.',
      endpoint: rawSupabaseUrl,
    };
  }
  return {
    mode: 'rest_fallback',
    badgeText: 'Local REST Engine (Flask / SQLite)',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    description: 'Running with local REST API fallback engine. Configure frontend/.env with Supabase credentials for cloud mode.',
    endpoint: API_BASE_URL,
  };
}

/**
 * 1. Fetch High-Level Executive Dashboard Summary & KPIs
 */
export async function getDashboardSummary() {
  if (isSupabaseConfigured && supabase) {
    try {
      // Query single-row aggregation view
      const { data: kpiData, error: kpiErr } = await supabase
        .from('v_dashboard_kpis')
        .select('*')
        .single();

      // Query top hotspots view
      const { data: hotspots, error: hotErr } = await supabase
        .from('v_top_hotspots')
        .select('*')
        .limit(5);

      // Query priority interventions view
      const { data: interventions, error: intErr } = await supabase
        .from('v_priority_interventions')
        .select('*')
        .limit(5);

      // Query risk distribution view
      const { data: risks, error: riskErr } = await supabase
        .from('v_risk_distribution')
        .select('*');

      if (!kpiErr && kpiData) {
        const riskDistMap = {};
        if (risks) {
          risks.forEach((r) => {
            riskDistMap[r.heat_risk_category] = r.observation_count;
          });
        }

        return {
          source: 'supabase',
          city: 'Solapur',
          academic_disclosure:
            'Computationally simulated microclimate indicators for Solapur, Maharashtra.',
          kpis: kpiData,
          top_hot_spots: hotspots || [],
          top_priority_interventions: interventions || [],
          risk_distribution: riskDistMap,
        };
      }
    } catch (err) {
      console.warn('Direct Supabase fetch encountered error, using REST fallback:', err);
    }
  }

  // Fallback to local REST API
  const res = await fetch(`${API_BASE_URL}/dashboard/summary`);
  if (!res.ok) throw new Error(`HTTP error ${res.status} from ${API_BASE_URL}`);
  const data = await res.json();
  data.source = 'rest_fallback';
  return data;
}

/**
 * 2. Fetch Locations Catalog with Optional Zone Filtering
 */
export async function getLocations(zoneType = null) {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase
        .from('v_station_directory')
        .select('*');

      if (zoneType && zoneType !== 'ALL') {
        query = query.eq('zone_type', zoneType);
      }

      const { data, error } = await query;
      if (!error && data) {
        return {
          source: 'supabase',
          count: data.length,
          data,
        };
      }
    } catch (err) {
      console.warn('Supabase locations query error, using REST fallback:', err);
    }
  }

  // Fallback
  const url = zoneType && zoneType !== 'ALL'
    ? `${API_BASE_URL}/locations?zone_type=${encodeURIComponent(zoneType)}`
    : `${API_BASE_URL}/locations`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch locations: ${res.status}`);
  const data = await res.json();
  data.source = 'rest_fallback';
  return data;
}

/**
 * 3. Fetch Single Station Deep Drill-down
 */
export async function getLocationDetail(locationId) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: loc, error: locErr } = await supabase
        .from('locations')
        .select('*, land_cover(*)')
        .eq('location_id', locationId)
        .single();

      const { data: recent, error: recErr } = await supabase
        .from('weather_observations')
        .select('*')
        .eq('location_id', locationId)
        .order('observation_date', { ascending: false })
        .limit(10);

      if (!locErr && loc) {
        return {
          source: 'supabase',
          location: loc,
          land_cover: loc.land_cover || null,
          recent_observations: recent || [],
        };
      }
    } catch (err) {
      console.warn('Supabase detail query error, using REST fallback:', err);
    }
  }

  // Fallback
  const res = await fetch(`${API_BASE_URL}/locations/${encodeURIComponent(locationId)}`);
  if (!res.ok) throw new Error(`Failed to fetch station ${locationId}`);
  const data = await res.json();
  data.source = 'rest_fallback';
  return data;
}

/**
 * 4. Fetch Paginated Observations
 */
export async function getObservations({
  page = 1,
  limit = 20,
  location_id = null,
  heat_risk = null,
  sort_by = 'observation_date',
  order = 'desc',
} = {}) {
  // If Supabase is configured, use range-based pagination
  if (isSupabaseConfigured && supabase) {
    try {
      const offset = (page - 1) * limit;
      let query = supabase
        .from('weather_observations')
        .select('*', { count: 'exact' });

      if (location_id) query = query.eq('location_id', location_id);

      query = query
        .order(sort_by === 'observation_date' ? 'observation_date' : 'air_temperature_c', {
          ascending: order.toLowerCase() === 'asc',
        })
        .range(offset, offset + limit - 1);

      const { data, count, error } = await query;
      if (!error && data) {
        const total = count || 150000;
        return {
          source: 'supabase',
          page,
          limit,
          total_records: total,
          total_pages: Math.ceil(total / limit),
          has_next: offset + limit < total,
          has_prev: page > 1,
          data,
        };
      }
    } catch (err) {
      console.warn('Supabase observations query error, using REST fallback:', err);
    }
  }

  // Fallback
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (location_id) params.set('location_id', location_id);
  if (heat_risk) params.set('heat_risk', heat_risk);
  if (sort_by) params.set('sort_by', sort_by);
  if (order) params.set('order', order);

  const res = await fetch(`${API_BASE_URL}/observations?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch observations: ${res.status}`);
  const data = await res.json();
  data.source = 'rest_fallback';
  return data;
}

/**
 * 5. Fetch Priority Interventions
 */
export async function getPriorityInterventions(limit = 100) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('v_priority_interventions')
        .select('*')
        .limit(limit);

      if (!error && data) {
        return {
          source: 'supabase',
          count: data.length,
          data,
        };
      }
    } catch (err) {
      console.warn('Supabase interventions query error, using REST fallback:', err);
    }
  }

  // Fallback
  const res = await fetch(`${API_BASE_URL}/interventions/priority?limit=${limit}`);
  if (!res.ok) throw new Error(`Failed to fetch interventions: ${res.status}`);
  const data = await res.json();
  data.source = 'rest_fallback';
  return data;
}

/**
 * 6. Fetch Analytics Summary & Correlations
 */
export async function getAnalyticsSummary() {
  const res = await fetch(`${API_BASE_URL}/analytics/summary`);
  if (!res.ok) throw new Error(`Failed to fetch analytics: ${res.status}`);
  return await res.json();
}
