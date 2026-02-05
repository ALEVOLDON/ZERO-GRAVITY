import React, { useState, useMemo } from 'react';
import {
  Search, ExternalLink, Code2, Palette, Server, Box,
  BookOpen, PenTool, Layout, Zap, Archive, Sparkles,
  Cpu, Globe, Layers, Database, Command, Terminal, Map, Rocket
} from 'lucide-react';
import { resourcesDB, categories } from './data/resources';
import { RoadmapView } from './components/RoadmapView';
import { SpaceBackground } from './components/SpaceBackground';
import { HeroSection } from './components/HeroSection';
import { AudioController } from './components/AudioController';

// --- CSS STYLES FOR ANIMATION (Some are kept for UI elements) ---
const styles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  .animate-float { animation: float 6s ease-in-out infinite; }
  
  /* Custom Scrollbar for the container */
  .custom-scrollbar::-webkit-scrollbar { height: 4px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(139, 92, 246, 0.3); border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(139, 92, 246, 0.5); }
`;

export default function AntiGravityApp() {
  const [started, setStarted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'roadmap'>('grid');

  const filteredResources = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return resourcesDB.filter(resource => {
      const matchesCategory = activeCategory === 'All' || resource.category === activeCategory;
      const matchesSearch =
        resource.name.toLowerCase().includes(lowerQuery) ||
        resource.description.toLowerCase().includes(lowerQuery) ||
        resource.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#05060A] text-slate-300 font-sans selection:bg-purple-500/30 selection:text-purple-200 overflow-hidden relative">
      <style>{styles}</style>

      {/* --- 3D SPACE BACKGROUND --- */}
      <SpaceBackground />

      {/* --- AUDIO SYSTEM --- */}
      <AudioController />

      {/* --- HERO SECTION (MISSION BRIEFING) --- */}
      {!started ? (
        <div className="relative z-50">
          <HeroSection onStart={() => setStarted(true)} />
        </div>
      ) : (
        /* --- MAIN INTERFACE --- */
        <div className="relative z-10 animate-fade-in transition-opacity duration-1000">

          {/* --- HEADER --- */}
          <header className="sticky top-0 z-50 border-b border-white/5 bg-[#05060A]/70 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Logo Area */}
                <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setStarted(false)}>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative p-2.5 bg-black/80 rounded-lg border border-white/10 flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-cyan-400 group-hover:-rotate-45 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 tracking-tighter group-hover:via-white transition-all">
                      ZERO_GRAVITY
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                      <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-slate-500 group-hover:text-cyan-400 transition-colors">
                        Dev Terminal Active
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
                  {/* View Toggles */}
                  <div className="flex bg-black/40 border border-white/10 rounded-xl p-1 backdrop-blur-sm shadow-xl">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      <Layout size={14} />
                      GRID
                    </button>
                    <button
                      onClick={() => setViewMode('roadmap')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all ${viewMode === 'roadmap' ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-cyan-300 border border-cyan-500/20 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      <Map size={14} />
                      ROADMAP
                    </button>
                  </div>

                  {/* Search Input */}
                  {viewMode === 'grid' && (
                    <div className="relative w-full md:w-72 group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 to-cyan-500/50 rounded-xl blur opacity-20 group-focus-within:opacity-100 transition duration-500"></div>
                      <div className="relative bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 flex items-center overflow-hidden">
                        <div className="pl-4 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-slate-600 group-focus-within:text-cyan-400 transition-colors" />
                        </div>
                        <input
                          type="text"
                          className="block w-full pl-3 pr-4 py-2 bg-transparent border-none text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-0 text-xs font-mono tracking-wide"
                          placeholder="SEARCH SYSTEM..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                          <button onClick={() => setSearchQuery('')} className="pr-4 text-slate-600 hover:text-white transition-colors">
                            <span className="text-xs font-mono">[X]</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 min-h-[80vh] flex flex-col">

            {viewMode === 'roadmap' ? (
              <RoadmapView />
            ) : (
              <>
                {/* --- CATEGORY NAVIGATION --- */}
                <div className="mb-12 overflow-x-auto pb-4 custom-scrollbar">
                  <div className="flex flex-nowrap gap-3 md:justify-center">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      const isActive = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`relative group px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap overflow-hidden
                                ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
                            `}
                        >
                          {/* Active Background Glow */}
                          {isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-purple-500/30 rounded-xl"></div>
                          )}
                          {/* Inactive Hover Effect */}
                          {!isActive && (
                            <div className="absolute inset-0 bg-white/0 border border-transparent hover:border-white/5 hover:bg-white/5 rounded-xl transition-all"></div>
                          )}

                          <div className="relative flex items-center gap-2.5">
                            <Icon size={14} className={isActive ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'} />
                            <span>{cat.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* --- STATS BAR --- */}
                <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    <span>Status: <span className="text-purple-400">{filteredResources.length > 0 ? 'ONLINE' : 'OFFLINE'}</span></span>
                    <span className="hidden sm:inline">|</span>
                    <span className="hidden sm:inline">Resources: <span className="text-cyan-400">{filteredResources.length}</span></span>
                  </div>

                  {activeCategory !== 'All' && (
                    <button
                      onClick={() => setActiveCategory('All')}
                      className="text-[10px] font-mono text-slate-500 hover:text-white transition-colors border border-dashed border-slate-700 hover:border-slate-400 px-2 py-1 rounded"
                    >
                      [ RESET FILTERS ]
                    </button>
                  )}
                </div>

                {/* --- RESOURCE GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                  {filteredResources.map((resource, index) => (
                    <div
                      key={resource.id}
                      className={`group relative flex flex-col h-full
                            bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/5
                            transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]
                            ${index % 2 === 0 ? 'animate-float' : 'animate-float'}
                        `}
                      style={{ animationDuration: `${6 + (index % 4)}s`, animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Internal Glow Effect on Hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-transparent to-cyan-500/0 group-hover:from-purple-500/10 group-hover:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="p-6 flex flex-col h-full relative z-10">
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-5">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-black/40 border border-white/10 text-purple-300 group-hover:text-cyan-300 transition-colors shadow-lg">
                              <CategoryIcon category={resource.category} />
                            </div>
                          </div>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                            aria-label={`Open ${resource.name}`}
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all">
                          {resource.name}
                        </h3>

                        <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed font-light tracking-wide">
                          {resource.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {resource.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-[9px] uppercase tracking-widest font-semibold rounded bg-black/40 border border-white/5 text-slate-500 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* --- NO RESULTS STATE --- */}
                {filteredResources.length === 0 && (
                  <div className="flex flex-col items-center justify-center flex-grow py-20 text-center relative z-10">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-20 animate-pulse"></div>
                      <div className="relative p-6 bg-black/40 border border-white/10 rounded-full">
                        <Archive className="w-10 h-10 text-slate-600" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-600 mb-2 tracking-tight">
                      SYSTEM EMPTY
                    </h3>
                    <p className="text-slate-500 font-mono text-xs max-w-sm leading-relaxed">
                      No artifacts found for "{searchQuery}".<br />
                      Recalibrate sensors.
                    </p>
                    <button
                      onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                      className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 text-white rounded-lg text-xs font-mono tracking-widest transition-all backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                    >
                      RESET SENSORS
                    </button>
                  </div>
                )}
              </>
            )}

          </main>

          {/* --- FOOTER --- */}
          <footer className="relative z-10 border-t border-white/5 bg-[#05060A]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-600 font-mono tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <Code2 size={12} />
                <p>ZERO GRAVITY DEV SYSTEM</p>
              </div>
              <div className="flex gap-6">
                <span>VERSION: 3.0.0 (STELLAR)</span>
                <span className="flex items-center gap-2">
                  STATUS: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span> ONLINE
                </span>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

// Helper component for icons
function CategoryIcon({ category }: { category: string }) {
  const icons: Record<string, any> = {
    Learning: BookOpen,
    Design: Palette,
    Frontend: Layout,
    Backend: Server,
    Hosting: Zap,
    Tools: Terminal
  };

  const Icon = icons[category] || Box;

  return <Icon size={20} strokeWidth={1.5} />;
}
