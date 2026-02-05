import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioController() {
    const [muted, setMuted] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Ambient Space Drone (Free sound or placeholder)
        // Using a reliable placeholder URL for ambient drone
        const AMBIENT_URL = "https://cdn.pixabay.com/download/audio/2022/03/24/audio_1e5b4b1c4e.mp3";

        audioRef.current = new Audio(AMBIENT_URL);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;

        if (muted) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play failed (interaction needed):", e));
        }
    }, [muted]);

    return (
        <button
            onClick={() => setMuted(!muted)}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black/50 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 backdrop-blur-md transition-all group"
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
