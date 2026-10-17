import React from 'react';
import { Users, BookOpen, GitBranch, ShieldCheck, CheckCircle2, Award, Terminal } from '../components/Icons';

export default function AboutTeamScreen() {
  const teamMembers = [
    {
      name: 'Furqan Bagwan',
      prn: 'SCFU425004',
      role: 'Full Stack Architect & API Lead',
      courseLead: 'Full Stack Development (FSD-1)',
      contributions: [
        'React 19 + Vite modern client architecture & component system',
        'Offline spatial coordinate projection engine for Solapur',
        'Flask REST API endpoints, CORS security, and PostgREST client adapter',
        'Interactive UI state management, pagination, and filter pipelines',
      ],
      avatarColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    },
    {
      name: 'Aman Shaikh',
      prn: 'SCFU425013',
      role: 'Database Architect & Cloud Lead',
      courseLead: 'Database Management Systems (DBMS)',
      contributions: [
        '3NF relational normalization across 6 relational tables',
        'Supabase PostgreSQL schema migrations and DDL definitions',
        'Row Level Security (RLS) policy design and role permissions',
        '7 pre-computed analytical views for sub-100ms dashboard queries',
      ],
      avatarColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    },
    {
      name: 'Bhavin Shankur',
      prn: 'SCFU425014',
      role: 'Data Scientist & Visualization Lead',
      courseLead: 'Exploratory Data Analysis & Data Visualization (EDA & DV)',
      contributions: [
        'Biophysical data synthesis and thermodynamic validation checks',
        '10 high-resolution analytical figures (300 DPI) and distributions',
        'Empirical correlation analysis (NDVI/NDBI vs LST relationships)',
        'Multi-Criteria Decision Making (MCDM) cooling prioritization model',
      ],
      avatarColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    },
  ];

  const courseIntegrations = [
    {
      course: 'Full Stack Development',
      code: 'FSD-1',
      highlights: [
        'React 19 single-page application with modular screen architecture',
        'Zero-dependency SVG offline spatial mapping of Solapur stations',
        'Dual-mode client: Supabase PostgreSQL direct queries with local Flask fallback',
        'Production Vite build optimizing bundles under 1 second',
      ],
    },
    {
      course: 'Database Management Systems',
      code: 'DBMS',
      highlights: [
        'Third Normal Form (3NF) relational design eliminating redundancy',
        'Enforced thermodynamic hierarchy constraints (T_min <= T_air <= T_max)',
        'Row Level Security (RLS) policies protecting all 6 tables in PostgreSQL',
        'Indexed query execution plans achieving sub-5ms lookup latency',
      ],
    },
    {
      course: 'Exploratory Data Analysis & DV',
      code: 'EDA & DV',
      highlights: [
        '150,000 multi-year observation dataset analysis across 5 urban zones',
        '10 publication-quality charts capturing microclimate dynamics',
        'Verification of inverse vegetative cooling (NDVI vs LST: r = -0.428)',
        'Multi-criteria algorithmic ranking for municipal tree planting and cool roofs',
      ],
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Hero & Academic Institutional Banner */}
      <div className="bg-[#142D4B] border border-blue-900/50 p-6 md:p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>MIT Vishwaprayag University (MIT-VPU) &bull; Integrated Semester III Project</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Team TF-141 &bull; HeatShield Platform
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              An interdisciplinary technical project unifying Full Stack Web Engineering,
              Relational Database Systems, and Environmental Data Science into a single cohesive
              academic cooling intelligence platform.
            </p>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-right min-w-[200px]">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Project Code</div>
            <div className="text-xl font-black text-white">TF-141-HS</div>
            <div className="text-xs text-teal-400 font-semibold mt-1">Solapur Microclimate Focus</div>
          </div>
        </div>
      </div>

      {/* 2. Team Member Cards */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <Users className="w-5 h-5 text-[#F07835]" />
          <span>Team TF-141 Authors & Role Allocation</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.prn}
              className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${member.avatarColor}`}>
                    {member.prn}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">B.Tech Sem III</span>
                </div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <div className="text-xs text-[#F07835] font-semibold mt-0.5">{member.role}</div>
                <div className="text-[11px] text-teal-400 font-medium mt-1">Lead: {member.courseLead}</div>
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Core Technical Deliverables:
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5">
                    {member.contributions.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Three Integrated Courses Mapping */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <BookOpen className="w-5 h-5 text-[#2A9D8F]" />
          <span>Curricular Integration & Academic Policy Mapping</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courseIntegrations.map((c) => (
            <div key={c.code} className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{c.course}</h4>
                <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono rounded">
                  {c.code}
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {c.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#F07835] font-bold">&bull;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Git & Project Milestones Summary */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <GitBranch className="w-5 h-5 text-[#F07835]" />
          <span>Implementation Phases & Engineering Milestones</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="font-bold text-orange-400 flex items-center justify-between">
              <span>Phase 1: Foundation</span>
              <span className="text-emerald-400 text-[10px] uppercase font-mono">Completed</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Project charter, SRS, initial 3NF entity-relationship diagrams, architectural contracts, and wireframes.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="font-bold text-teal-400 flex items-center justify-between">
              <span>Phase 2: Core Build</span>
              <span className="text-emerald-400 text-[10px] uppercase font-mono">Completed</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              150K record SQLite/MySQL implementation, 10 analytical figures, Flask REST API with 8 tests, and working React frontend.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="font-bold text-blue-400 flex items-center justify-between">
              <span>Phase 3: Supabase & Demo</span>
              <span className="text-emerald-400 text-[10px] uppercase font-mono">Ready</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Supabase PostgreSQL migrations, 7 analytical views, RLS policies, 16 automated tests, 9 full screens, and comprehensive documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
