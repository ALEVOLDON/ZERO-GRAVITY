import React from 'react';
import { roadmapStages } from '../data/roadmap';
import { resourcesDB } from '../data/resources';
import { ExternalLink } from 'lucide-react';

export function RoadmapView() {
    return (
        <div className="max-w-4xl mx-auto pb-20 px-4 relative">
            {/* Central Line (Tether) - Mobile: Left aligned, Desktop: Center */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-cyan-500 to-purple-600 opacity-30 transform -translate-x-1/2"></div>

            <div className="space-y-16 md:space-y-24 relative z-10 pt-10">
                {roadmapStages.map((stage, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                        <div key={stage.id} className="relative pl-12 md:pl-0">

                            {/* Stage Marker (Orbit) */}
                            <div className="md:sticky md:top-24 z-20 flex md:justify-center mb-4 md:mb-8 pointer-events-none -ml-12 md:ml-0">
                                <div className={`px-4 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r ${stage.color} shadow-xl`}>
                                    Gravity: {stage.gravity}
                                </div>
                            </div>

                            {/* Stage Header */}
                            <div className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${isLeft ? 'md:flex-row-reverse' : ''}`}>

                                {/* Content Side */}
                                <div className={`flex-1 w-full md:w-auto text-left ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                                    <h2 className={`text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stage.color} mb-2`}>
                                        {stage.title}
                                    </h2>
                                    <p className="text-slate-400 font-light text-xs md:text-sm max-w-full md:max-w-md ml-0 md:ml-auto md:mr-auto md:mx-0">
                                        {stage.description}
                                    </p>
                                </div>

                                {/* Center Node */}
                                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 md:relative md:translate-x-0 md:left-auto flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/80 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)] z-20 top-0 md:top-auto">
                                    <span className="text-[10px] md:text-xs font-bold text-slate-500">{(index + 1).toString().padStart(2, '0')}</span>
                                    {/* Pulse */}
                                    <div className={`absolute inset-0 rounded-full animate-ping opacity-20 bg-gradient-to-r ${stage.color}`}></div>
                                </div>

                                {/* Empty Side for Balance */}
                                <div className="flex-1 hidden md:block"></div>
                            </div>

                            {/* Steps / Resources */}
                            <div className="mt-8 md:mt-12 grid gap-4 md:gap-6">
                                {stage.steps.map((step) => (
                                    <div key={step.id} className={`relative p-4 md:p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors w-full md:w-[calc(50%-24px)] ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                        {/* Connector Line (Desktop) */}
                                        <div className={`hidden md:block absolute top-1/2 w-6 h-px bg-white/10 ${isLeft ? '-left-6' : '-right-6'}`}></div>

                                        <h3 className="text-base md:text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${stage.color}`}></span>
                                            {step.label}
                                        </h3>

                                        <div className="space-y-2 md:space-y-3">
                                            {step.resourceIds.map(resId => {
                                                const resource = resourcesDB.find(r => r.id === resId);
                                                if (!resource) return null;

                                                return (
                                                    <a
                                                        key={resId}
                                                        href={resource.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-between group/item p-3 rounded-lg bg-black/20 hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                                                    >
                                                        <div className="flex items-center gap-3 overflow-hidden">
                                                            <ExternalLink size={14} className="flex-shrink-0 text-slate-600 group-hover/item:text-cyan-400 transition-colors" />
                                                            <span className="text-sm text-slate-400 group-hover/item:text-slate-200 transition-colors truncate">{resource.name}</span>
                                                        </div>
                                                        <div className="opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                            <span className="text-[9px] uppercase tracking-widest text-slate-600 hidden sm:block">OPEN</span>
                                                        </div>
                                                    </a>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    );
                })}

                {/* Final Node */}
                <div className="flex flex-col items-center justify-center pt-20 text-center relative z-20 pl-0 md:pl-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-[0_0_100px_rgba(255,255,255,0.3)] animate-pulse">
                        <span className="text-black font-black text-lg md:text-xl">∞</span>
                    </div>
                    <h3 className="mt-6 text-xl md:text-2xl font-bold text-white tracking-widest uppercase">Zero Gravity</h3>
                    <p className="text-slate-500 text-xs mt-2 font-mono">ПОЛЕТ ПРОДОЛЖАЕТСЯ</p>
                </div>

            </div>
        </div>
    );
}
