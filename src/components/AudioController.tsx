import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioController() {
    const [muted, setMuted] = useState(true);
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const oscillatorsRef = useRef<OscillatorNode[]>([]);

    // Initialize Audio Engine
    useEffect(() => {
        return () => stopAudio();
    }, []);

    const startAudio = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const ctx = audioContextRef.current;

        // Create Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Create Oscillators for "Space Drone"
        // Osc 1: Deep Bass
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(60, ctx.currentTime); // 60Hz Low Drone

        // Osc 2: Detuned slightly for "shimmer" (Binaural effect)
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(62, ctx.currentTime); // 62Hz

        // Osc 3: Harmonic
        const osc3 = ctx.createOscillator();
        osc3.type = 'triangle';
        osc3.frequency.setValueAtTime(120, ctx.currentTime); // 120Hz Harmonic

        // Individual Gains
        const osc1Gain = ctx.createGain(); osc1Gain.gain.value = 0.4;
        const osc2Gain = ctx.createGain(); osc2Gain.gain.value = 0.4;
        const osc3Gain = ctx.createGain(); osc3Gain.gain.value = 0.05; // Quiet harmonic

        osc1.connect(osc1Gain); osc1Gain.connect(masterGain);
        osc2.connect(osc2Gain); osc2Gain.connect(masterGain);
        osc3.connect(osc3Gain); osc3Gain.connect(masterGain);

        osc1.start();
        osc2.start();
        osc3.start();

        oscillatorsRef.current = [osc1, osc2, osc3];

        // Fade In
        masterGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 2);
    };

    const stopAudio = () => {
        if (gainNodeRef.current && audioContextRef.current) {
            // Fade Out
            gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5);

            setTimeout(() => {
                oscillatorsRef.current.forEach(osc => osc.stop());
                oscillatorsRef.current = [];

                // Don't close context, just stop oscillators to allow restart
            }, 500);
        }
    };

    useEffect(() => {
        if (muted) {
            stopAudio();
        } else {
            if (audioContextRef.current?.state === 'suspended') {
                audioContextRef.current.resume();
            }
            if (oscillatorsRef.current.length === 0) {
                startAudio();
            }
        }
    }, [muted]);

    return (
        <button
            onClick={() => setMuted(!muted)}
            className="fixed bottom-6 right-4 md:right-6 z-50 p-2 md:p-3 rounded-full bg-black/50 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 backdrop-blur-md transition-all group scale-90 md:scale-100"
            aria-label="Toggle Audio"
        >
            {muted ? (
                <VolumeX size={20} />
            ) : (
                <div className="relative">
                    <Volume2 size={20} />
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                </div>
            )}

            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-[10px] uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {muted ? 'Sound Systems Offline' : 'Atmosphere Active'}
            </span>
        </button>
    );
}
