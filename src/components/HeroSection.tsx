import React, { useEffect, useState } from 'react';
import { ArrowDownCircle, Rocket } from 'lucide-react';

export function HeroSection({ onStart }: { onStart: () => void }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

            {/* Dynamic Data Overlay */}
            <div className="absolute top-20 left-10 hidden md:block opacity-30 font-mono text-[10px] text-cyan-500 space-y-2 text-left">
                <p>COORDS: 45.922, -12.004</p>
                <p>STATUS: AWAITING LAUNCH</p>
                <p>TRAJECTORY: OPTIMAL</p>
            </div>

            <div className="absolute bottom-20 right-10 hidden md:block opacity-30 font-mono text-[10px] text-purple-500 space-y-2 text-right">
                <p>SYSTEM CONNECTED</p>
                <p>GRAVITY: 0%</p>
            </div>

            <div className={`transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-900/10 text-cyan-400 text-[10px] tracking-[0.2em] mb-8 font-mono uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    Incoming Transmission
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 mb-6 tracking-tighter">
                    ZERO GRAVITY<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">DEV</span>
                </h1>

                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                    Покиньте орбиту новичка. Интерактивная карта ресурсов, инструментов и знаний для выхода в открытый космос профессиональной разработки.
                </p>

                <button
                    onClick={onStart}
                    className="group relative px-8 py-4 bg-white text-black rounded-lg font-bold tracking-widest uppercase text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg -z-10 blur-xl"></div>
                    <span className="flex items-center gap-3">
                        <Rocket size={18} className="group-hover:-translate-y-1 transition-transform" />
                        Начать Миссию
                    </span>
                </button>
            </div>

            <div className="absolute bottom-10 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={onStart}>
                <ArrowDownCircle size={32} className="text-white" />
            </div>
        </div>
    );
}
