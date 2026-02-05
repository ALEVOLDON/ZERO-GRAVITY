import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioController() {
    const [muted, setMuted] = useState(true);
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const sourcesRef = useRef<AudioScheduledSourceNode[]>([]);
    const lfoRef = useRef<OscillatorNode | null>(null);
    const driftTimerRef = useRef<number | null>(null);

    // Initialize Audio Engine
    useEffect(() => {
        return () => stopAudio();
    }, []);

    const createNoiseBuffer = (ctx: AudioContext) => {
        const length = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < length; i += 1) {
            const white = Math.random() * 2 - 1;
            data[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = data[i];
            data[i] *= 3.5;
        }
        return buffer;
    };

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

        // Ambient mix bus
        const mixGain = ctx.createGain();
        mixGain.gain.value = 0.8;
        mixGain.connect(masterGain);

        // Soft pad layer
        const pad1 = ctx.createOscillator();
        const pad2 = ctx.createOscillator();
        pad1.type = 'triangle';
        pad2.type = 'sine';
        pad1.frequency.setValueAtTime(110, ctx.currentTime);
        pad2.frequency.setValueAtTime(165, ctx.currentTime);
        pad1.detune.setValueAtTime(-6, ctx.currentTime);
        pad2.detune.setValueAtTime(7, ctx.currentTime);

        const padGain = ctx.createGain();
        padGain.gain.value = 0.12;
        pad1.connect(padGain);
        pad2.connect(padGain);
        padGain.connect(mixGain);

        // Noise layer with slow filter sweep
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = createNoiseBuffer(ctx);
        noiseSource.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(700, ctx.currentTime);
        noiseFilter.Q.setValueAtTime(0.6, ctx.currentTime);

        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.05;

        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(mixGain);

        // LFO to gently move the filter cutoff
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.03, ctx.currentTime);
        lfoGain.gain.value = 300;
        lfo.connect(lfoGain);
        lfoGain.connect(noiseFilter.frequency);
        lfo.start();
        lfoRef.current = lfo;

        // Subtle spacey delay
        const delay = ctx.createDelay(1.0);
        const feedback = ctx.createGain();
        const delaySend = ctx.createGain();
        delay.delayTime.value = 0.45;
        feedback.gain.value = 0.2;
        delaySend.gain.value = 0.15;

        mixGain.connect(delaySend);
        delaySend.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(masterGain);

        pad1.start();
        pad2.start();
        noiseSource.start();

        sourcesRef.current = [pad1, pad2, noiseSource];

        // Slow random drifts for evolving ambience
        const scheduleDrift = () => {
            const now = ctx.currentTime;
            const t = now + 6;

            pad1.frequency.cancelScheduledValues(now);
            pad2.frequency.cancelScheduledValues(now);
            noiseFilter.frequency.cancelScheduledValues(now);
            delay.delayTime.cancelScheduledValues(now);

            pad1.frequency.linearRampToValueAtTime(95 + Math.random() * 35, t);
            pad2.frequency.linearRampToValueAtTime(140 + Math.random() * 60, t);
            noiseFilter.frequency.linearRampToValueAtTime(450 + Math.random() * 900, t);
            delay.delayTime.linearRampToValueAtTime(0.3 + Math.random() * 0.3, t);
        };

        scheduleDrift();
        driftTimerRef.current = window.setInterval(() => {
            scheduleDrift();
        }, 9000 + Math.floor(Math.random() * 7000));

        // Fade In
        masterGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 3);
    };

    const stopAudio = () => {
        if (gainNodeRef.current && audioContextRef.current) {
            // Fade Out
            gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5);

            setTimeout(() => {
                sourcesRef.current.forEach(source => {
                    try {
                        source.stop();
                    } catch {
                        // ignore
                    }
                });
                sourcesRef.current = [];
                if (lfoRef.current) {
                    try {
                        lfoRef.current.stop();
                    } catch {
                        // ignore
                    }
                    lfoRef.current = null;
                }
                if (driftTimerRef.current !== null) {
                    window.clearInterval(driftTimerRef.current);
                    driftTimerRef.current = null;
                }

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
            if (sourcesRef.current.length === 0) {
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
