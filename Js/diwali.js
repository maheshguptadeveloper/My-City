/**
 * Anand Nagar - Grand Animated Diwali Greeting System
 * Features:
 * - Divine Altar with Lord Ganesha (Left), Central Flaming Diya, and Maa Lakshmi (Right)
 * - Ultra-high performance Canvas Fireworks & Particle System
 * - Interactive Clicks on Deities & Diya with Sparkler Blessings
 * - Swaying Hanging Akash Kandils (Lanterns) & Marigold Toran
 * - Web Audio API Synthesizer (Auspicious Temple Chimes & Cracker Pops)
 * - Bilingual Greetings (Hindi & English) for Anand Nagar
 * - Non-overlapping Mobile-responsive Flex Layout
 * - Floating Replay Widget & Keyboard Accessibility (ESC to close)
 */

(function () {
    "use strict";

    // Audio synthesizer for festive temple bells, crackles, and Deep Om Chanting
    let audioCtx = null;
    let soundEnabled = true;
    let isChanting = false;
    let omChantInterval = null;
    let omMasterGain = null;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === "suspended") {
            audioCtx.resume();
        }
        return audioCtx;
    }

    // Sacred Temple Singing Bowl / Bell Chime
    function playBellChime() {
        if (!soundEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const now = ctx.currentTime;
            // Sacred healing harmonic frequencies (432Hz, 528Hz, and overtones)
            const freqs = [432, 528, 1056, 1584, 2112];
            const gains = [0.18, 0.12, 0.06, 0.03, 0.015];

            freqs.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(gains[idx], now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now);
                osc.stop(now + 3.3);
            });
        } catch (e) {
            // Audio policy graceful fallback
        }
    }

    // Firework crackle burst sound
    function playFireworkSound() {
        if (!soundEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const now = ctx.currentTime;
            const bufferSize = ctx.sampleRate * 0.25;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = "bandpass";
            filter.frequency.setValueAtTime(1000, now);
            filter.frequency.exponentialRampToValueAtTime(200, now + 0.25);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start(now);
        } catch (e) {
            // Audio policy graceful fallback
        }
    }

    let availableVoices = [];
    if ("speechSynthesis" in window) {
        availableVoices = window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
            availableVoices = window.speechSynthesis.getVoices();
        };
    }

    // Gentle sacred prayer whisper of "ॐ नमः शिवाय"
    function speakPrayerWhisper() {
        if (!soundEnabled) return;
        try {
            if ("speechSynthesis" in window) {
                window.speechSynthesis.cancel();
                const utter = new SpeechSynthesisUtterance("ॐ नमः शिवाय");
                utter.rate = 0.65; // Very slow, meditative chanting pace
                utter.pitch = 0.62; // Deep spiritual reverberant tone
                utter.volume = 0.70; // Clear sacred prayer volume

                // Try to find a Hindi or Indian English voice
                const voices = availableVoices.length ? availableVoices : window.speechSynthesis.getVoices();
                const voice = voices.find(v => v.lang.includes("hi") || v.lang.includes("IN") || v.name.toLowerCase().includes("india") || v.lang.includes("sa"));
                if (voice) {
                    utter.voice = voice;
                }
                window.speechSynthesis.speak(utter);
            }
        } catch (e) {
            // Fallback gracefully
        }
    }

    // ========================================================
    // DEEP SACRED "OOOOOOOMMMMM" & PRAYER CHANT SYNTHESIZER
    // ========================================================
    function startDeepOmChant() {
        if (!soundEnabled || isChanting) return;
        const ctx = getAudioContext();
        if (!ctx) return;

        try {
            isChanting = true;

            if (!omMasterGain) {
                omMasterGain = ctx.createGain();
                omMasterGain.connect(ctx.destination);
            }

            const now = ctx.currentTime;
            omMasterGain.gain.setValueAtTime(0.001, now);
            omMasterGain.gain.linearRampToValueAtTime(0.24, now + 1.8);

            // Single Deep Vocal "Oooohhhhm" Prayer Breath Cycle
            function chantCycle() {
                if (!isChanting || !soundEnabled) return;
                const t = ctx.currentTime;
                const cycleDur = 9.8; // seconds per breath cycle

                // Cosmic Om Fundamental: 136.1Hz with warm Sub-bass 68.05Hz
                const oscMain1 = ctx.createOscillator();
                const oscMain2 = ctx.createOscillator();
                const oscSub = ctx.createOscillator();
                const oscFifth = ctx.createOscillator();

                oscMain1.type = "sawtooth";
                oscMain1.frequency.setValueAtTime(136.1, t); // C#3 Primordial OM frequency

                oscMain2.type = "sawtooth";
                oscMain2.frequency.setValueAtTime(136.4, t); // Chorus shimmer detune

                oscSub.type = "sine";
                oscSub.frequency.setValueAtTime(68.05, t); // Deep chest sub-bass

                oscFifth.type = "sine";
                oscFifth.frequency.setValueAtTime(204.15, t); // Sacred harmonic 5th

                // Formant 1: Throat resonance ("Oooo" 480Hz -> "Mmmm" 250Hz)
                const filter1 = ctx.createBiquadFilter();
                filter1.type = "bandpass";
                filter1.Q.setValueAtTime(4.2, t);
                filter1.frequency.setValueAtTime(480, t);
                filter1.frequency.setValueAtTime(480, t + 4.8);
                filter1.frequency.exponentialRampToValueAtTime(250, t + 7.2);

                // Formant 2: Mouth/Chest resonance ("Oooo" 880Hz -> "Mmmm" 320Hz)
                const filter2 = ctx.createBiquadFilter();
                filter2.type = "bandpass";
                filter2.Q.setValueAtTime(4.8, t);
                filter2.frequency.setValueAtTime(880, t);
                filter2.frequency.setValueAtTime(880, t + 4.8);
                filter2.frequency.exponentialRampToValueAtTime(320, t + 7.2);

                // Vocal Breathing Envelope (Inhale -> "Ooooo" -> "Mmmmm" -> Fade)
                const vocalGain = ctx.createGain();
                vocalGain.gain.setValueAtTime(0.0001, t);
                vocalGain.gain.linearRampToValueAtTime(0.38, t + 2.2); // Full rich "Ooooo"
                vocalGain.gain.setValueAtTime(0.38, t + 5.2);
                vocalGain.gain.linearRampToValueAtTime(0.24, t + 7.8); // Resonant "Mmmm"
                vocalGain.gain.exponentialRampToValueAtTime(0.0001, t + cycleDur - 0.3);

                // Meditative Tanpura String Drone
                const tanpuraOsc = ctx.createOscillator();
                const tanpuraGain = ctx.createGain();
                tanpuraOsc.type = "triangle";
                tanpuraOsc.frequency.setValueAtTime(136.1, t);
                tanpuraGain.gain.setValueAtTime(0.07, t);

                // Connect audio routing
                oscMain1.connect(filter1);
                oscMain2.connect(filter1);
                oscMain1.connect(filter2);
                oscMain2.connect(filter2);
                oscSub.connect(vocalGain);
                oscFifth.connect(vocalGain);

                filter1.connect(vocalGain);
                filter2.connect(vocalGain);
                tanpuraOsc.connect(tanpuraGain);

                vocalGain.connect(omMasterGain);
                tanpuraGain.connect(omMasterGain);

                // Start chant breath
                oscMain1.start(t);
                oscMain2.start(t);
                oscSub.start(t);
                oscFifth.start(t);
                tanpuraOsc.start(t);

                oscMain1.stop(t + cycleDur);
                oscMain2.stop(t + cycleDur);
                oscSub.stop(t + cycleDur);
                oscFifth.stop(t + cycleDur);
                tanpuraOsc.stop(t + cycleDur);

                // Auspicious singing bowl chime at cycle start
                playBellChime();

                // Periodic sacred chant whisper
                setTimeout(speakPrayerWhisper, 2200);
            }

            chantCycle();
            if (omChantInterval) clearInterval(omChantInterval);
            omChantInterval = setInterval(chantCycle, 9800);

        } catch (e) {
            // Graceful fallback
        }
    }

    function stopDeepOmChant() {
        isChanting = false;
        if (omChantInterval) {
            clearInterval(omChantInterval);
            omChantInterval = null;
        }
        if (omMasterGain && audioCtx) {
            try {
                const now = audioCtx.currentTime;
                omMasterGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
            } catch (e) { }
        }
        if ("speechSynthesis" in window) {
            try { window.speechSynthesis.cancel(); } catch (e) { }
        }
    }

    // Shared SVG Gradients and Defs
    const SVG_SHARED_DEFS = `
        <svg style="display:none; position:absolute; width:0; height:0;" aria-hidden="true">
            <defs>
                <linearGradient id="deityGoldGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop stop-color="#fff9c4"/>
                    <stop offset="0.3" stop-color="#ffd54f"/>
                    <stop offset="0.7" stop-color="#ffb300"/>
                    <stop offset="1" stop-color="#ff8f00"/>
                </linearGradient>
                <linearGradient id="deitySkinGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop stop-color="#ffecb3"/>
                    <stop offset="0.6" stop-color="#ffe082"/>
                    <stop offset="1" stop-color="#ffca28"/>
                </linearGradient>
                <linearGradient id="ganeshaClothGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop stop-color="#ff6f00"/>
                    <stop offset="0.6" stop-color="#e65100"/>
                    <stop offset="1" stop-color="#bf360c"/>
                </linearGradient>
                <linearGradient id="lakshmiSareeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop stop-color="#e91e63"/>
                    <stop offset="0.5" stop-color="#c2185b"/>
                    <stop offset="1" stop-color="#880e4f"/>
                </linearGradient>
                <linearGradient id="lotusGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop stop-color="#ff80ab"/>
                    <stop offset="0.5" stop-color="#f06292"/>
                    <stop offset="1" stop-color="#c2185b"/>
                </linearGradient>
                <radialGradient id="ganeshaHaloGrad" cx="50%" cy="50%" r="50%">
                    <stop stop-color="#ffd700" stop-opacity="0.9"/>
                    <stop offset="60%" stop-color="#ff9100" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#ff6f00" stop-opacity="0"/>
                </radialGradient>
                <radialGradient id="lakshmiHaloGrad" cx="50%" cy="50%" r="50%">
                    <stop stop-color="#ffe082" stop-opacity="0.95"/>
                    <stop offset="60%" stop-color="#f06292" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#c2185b" stop-opacity="0"/>
                </radialGradient>
            </defs>
        </svg>
    `;

    // Lord Ganesha SVG Illustration
    const SVG_GANESHA = `
        <svg class="diwali-deity-svg" viewBox="0 0 120 125" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Aura Halo -->
            <circle cx="60" cy="46" r="36" fill="url(#ganeshaHaloGrad)" opacity="0.38"/>
            <circle cx="60" cy="46" r="30" stroke="#ffd700" stroke-width="1.2" stroke-dasharray="3 3"/>

            <!-- Ornate Mukut (Crown) -->
            <polygon points="60,6 74,28 46,28" fill="url(#deityGoldGrad)" stroke="#ffd700" stroke-width="1.2"/>
            <circle cx="60" cy="16" r="3.2" fill="#d50000"/>
            <circle cx="60" cy="4" r="2.2" fill="#ffd700"/>
            <path d="M48 28 Q60 32 72 28" stroke="#ffd700" stroke-width="2" fill="none"/>

            <!-- Left & Right Ears -->
            <path d="M48 34 C30 32 20 44 26 60 C32 72 44 64 48 56" fill="url(#deitySkinGrad)" stroke="#ffd700" stroke-width="1.2"/>
            <path d="M72 34 C90 32 100 44 94 60 C88 72 76 64 72 56" fill="url(#deitySkinGrad)" stroke="#ffd700" stroke-width="1.2"/>
            <circle cx="30" cy="50" r="3" fill="#ffd700" stroke="#ff8f00" stroke-width="0.8"/>
            <circle cx="90" cy="50" r="3" fill="#ffd700" stroke="#ff8f00" stroke-width="0.8"/>

            <!-- Head & Forehead -->
            <ellipse cx="60" cy="44" rx="15" ry="12" fill="url(#deitySkinGrad)"/>
            <!-- Tilak / Trishul -->
            <path d="M58 33 H62 V42 H58 Z" fill="#d50000"/>
            <path d="M54 36 Q60 41 66 36" stroke="#ffd700" stroke-width="1.6" fill="none"/>
            <circle cx="60" cy="39" r="1.5" fill="#ffd700"/>

            <!-- Divine Eyes -->
            <path d="M52 44 Q55 42 57 45" stroke="#3e1205" stroke-width="1.4" stroke-linecap="round"/>
            <path d="M68 44 Q65 42 63 45" stroke="#3e1205" stroke-width="1.4" stroke-linecap="round"/>

            <!-- Trunk curving to Modak -->
            <path d="M58 50 C58 62 53 72 47 73 C41 74 39 68 43 64 C46 61 49 65 47 66" fill="none" stroke="url(#deityGoldGrad)" stroke-width="4.5" stroke-linecap="round"/>
            <circle cx="42" cy="66" r="3.5" fill="#ffd54f" stroke="#ff6f00" stroke-width="1"/> <!-- Modak -->

            <!-- Single White Tusk -->
            <path d="M63 52 L66 57" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>

            <!-- Body & Saffron Dhoti -->
            <path d="M42 66 C35 76 28 88 34 96 C40 104 80 104 86 96 C92 88 85 76 78 66" fill="url(#ganeshaClothGrad)" stroke="#ffd700" stroke-width="1.2"/>
            <ellipse cx="60" cy="82" rx="18" ry="13" fill="url(#deitySkinGrad)" stroke="#ffd700" stroke-width="1"/>
            <path d="M48 81 Q60 88 72 81" stroke="#ffd700" stroke-width="1.6" fill="none"/>

            <!-- Right Hand (Abhaya Blessing Mudra with ॐ) -->
            <circle cx="33" cy="71" r="6.5" fill="url(#deitySkinGrad)" stroke="#ffd700" stroke-width="1"/>
            <text x="33" y="74.5" font-size="7" text-anchor="middle" fill="#d50000" font-weight="bold">ॐ</text>

            <!-- Left Hand with Modak bowl -->
            <path d="M82 72 Q88 74 86 82" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
            <ellipse cx="86" cy="80" rx="5" ry="3" fill="#ffb300"/>
            <circle cx="85" cy="77" r="2" fill="#ffe082"/>
            <circle cx="87" cy="77" r="2" fill="#ffd700"/>

            <!-- Lotus Base -->
            <path d="M22 101 Q60 93 98 101 Q60 116 22 101 Z" fill="url(#lotusGrad)" stroke="#ffd700" stroke-width="1.2"/>
            <path d="M32 103 Q60 112 88 103" stroke="#ff80ab" stroke-width="1.5" fill="none"/>
        </svg>
    `;

    // Maa Lakshmi SVG Illustration
    const SVG_LAKSHMI = `
        <svg class="diwali-deity-svg" viewBox="0 0 120 125" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Aura Halo -->
            <circle cx="60" cy="42" r="36" fill="url(#lakshmiHaloGrad)" opacity="0.4"/>
            <circle cx="60" cy="42" r="30" stroke="#ffd700" stroke-width="1.2" stroke-dasharray="3 3"/>

            <!-- Ornate Mukut (Crown) -->
            <polygon points="60,5 74,26 46,26" fill="url(#deityGoldGrad)" stroke="#ffd700" stroke-width="1.2"/>
            <circle cx="60" cy="15" r="3.2" fill="#c2185b"/>
            <circle cx="60" cy="3" r="2.2" fill="#ffd700"/>
            <path d="M48 26 Q60 30 72 26" stroke="#ffd700" stroke-width="2" fill="none"/>

            <!-- Divine Face -->
            <ellipse cx="60" cy="40" rx="14" ry="12" fill="url(#deitySkinGrad)" stroke="#ffd700" stroke-width="1"/>
            <!-- Bindi -->
            <circle cx="60" cy="35" r="1.8" fill="#c2185b"/>
            <!-- Graceful Eyes & Lips -->
            <path d="M51 40 Q55 38 57 41" stroke="#3e1205" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M69 40 Q65 38 63 41" stroke="#3e1205" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M57 45 Q60 48 63 45" stroke="#c2185b" stroke-width="1.3" stroke-linecap="round" fill="none"/>

            <!-- Kundan Earrings -->
            <circle cx="43" cy="43" r="3" fill="#ffd700" stroke="#ff8f00" stroke-width="0.8"/>
            <circle cx="77" cy="43" r="3" fill="#ffd700" stroke="#ff8f00" stroke-width="0.8"/>

            <!-- Crimson Divine Saree & Gold Ornaments -->
            <path d="M45 53 C39 64 33 80 39 93 C45 101 75 101 81 93 C87 80 81 64 75 53" fill="url(#lakshmiSareeGrad)" stroke="#ffd700" stroke-width="1.2"/>
            <!-- Gold Necklaces -->
            <path d="M52 52 Q60 59 68 52" stroke="#ffd700" stroke-width="1.8" fill="none"/>
            <path d="M49 57 Q60 67 71 57" stroke="#ffd700" stroke-width="1.5" fill="none"/>
            <circle cx="60" cy="65" r="2.5" fill="#d50000"/>

            <!-- Upper Left Hand holding Pink Lotus -->
            <path d="M44 57 Q32 47 28 36" stroke="url(#deitySkinGrad)" stroke-width="2.8" stroke-linecap="round"/>
            <g transform="translate(26, 26) scale(0.6)">
                <path d="M10 0 C16 10 16 18 10 24 C4 18 4 10 10 0 Z" fill="#ff4081" stroke="#ffd700" stroke-width="1"/>
                <path d="M5 8 C-2 15 0 22 8 24 Z" fill="#f48fb1"/>
                <path d="M15 8 C22 15 20 22 12 24 Z" fill="#f48fb1"/>
            </g>

            <!-- Upper Right Hand holding Pink Lotus -->
            <path d="M76 57 Q88 47 92 36" stroke="url(#deitySkinGrad)" stroke-width="2.8" stroke-linecap="round"/>
            <g transform="translate(86, 26) scale(0.6)">
                <path d="M10 0 C16 10 16 18 10 24 C4 18 4 10 10 0 Z" fill="#ff4081" stroke="#ffd700" stroke-width="1"/>
                <path d="M5 8 C-2 15 0 22 8 24 Z" fill="#f48fb1"/>
                <path d="M15 8 C22 15 20 22 12 24 Z" fill="#f48fb1"/>
            </g>

            <!-- Lower Right Hand: Varada Mudra Raining Golden Coins -->
            <circle cx="34" cy="74" r="5.5" fill="url(#deitySkinGrad)" stroke="#ffd700" stroke-width="0.8"/>
            <g class="diwali-coin-stream">
                <circle cx="33" cy="83" r="2.8" fill="#ffd700" stroke="#ff8f00" stroke-width="0.7"/>
                <circle cx="36" cy="90" r="2.5" fill="#ffe082" stroke="#ffb300" stroke-width="0.7"/>
                <circle cx="31" cy="97" r="3" fill="#ffd700" stroke="#ff8f00" stroke-width="0.7"/>
                <circle cx="35" cy="104" r="2.2" fill="#ffd54f" stroke="#ff6f00" stroke-width="0.7"/>
            </g>

            <!-- Lower Left Hand holding Golden Kalash -->
            <circle cx="86" cy="74" r="5.5" fill="url(#deitySkinGrad)" stroke="#ffd700" stroke-width="0.8"/>
            <g transform="translate(80, 74) scale(0.65)">
                <ellipse cx="14" cy="12" rx="10" ry="12" fill="url(#deityGoldGrad)" stroke="#ffd700" stroke-width="1.5"/>
                <path d="M6 6 H22 V2 H6 Z" fill="#ffd700"/>
                <circle cx="14" cy="-1" r="4" fill="#2e7d32"/>
                <circle cx="14" cy="-5" r="3" fill="#ff9800"/>
            </g>

            <!-- Lotus Throne (Kamalasan) Base -->
            <path d="M18 99 Q60 89 102 99 Q60 117 18 99 Z" fill="url(#lotusGrad)" stroke="#ffd700" stroke-width="1.2"/>
            <path d="M26 101 Q60 113 94 101" stroke="#ff80ab" stroke-width="1.8" fill="none"/>
        </svg>
    `;

    // Sacred Rotating Om (ॐ) Corner Emblem
    const SVG_OM_CORNER = `
        <svg class="diwali-om-spinner" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="omGlowGrad" cx="50%" cy="50%" r="50%">
                    <stop stop-color="#ffd700" stop-opacity="0.8"/>
                    <stop offset="60%" stop-color="#ff9100" stop-opacity="0.35"/>
                    <stop offset="100%" stop-color="#ff6f00" stop-opacity="0"/>
                </radialGradient>
            </defs>
            <!-- Radiant Background Glow Disc -->
            <circle cx="30" cy="30" r="28" fill="url(#omGlowGrad)"/>
            <!-- Outer Golden Beaded / Rays Ring -->
            <circle cx="30" cy="30" r="26" stroke="#ffd700" stroke-width="1.6" stroke-dasharray="3.5 2.5"/>
            <circle cx="30" cy="30" r="22" stroke="#ffb300" stroke-width="1"/>
            
            <!-- 8 Divine Sunburst Solar Rays -->
            <g stroke="#ff9100" stroke-width="1.5" stroke-linecap="round" opacity="0.9">
                <line x1="30" y1="2" x2="30" y2="7"/>
                <line x1="30" y1="53" x2="30" y2="58"/>
                <line x1="2" y1="30" x2="7" y2="30"/>
                <line x1="53" y1="30" x2="58" y2="30"/>
                <line x1="10" y1="10" x2="14" y2="14"/>
                <line x1="46" y1="46" x2="50" y2="50"/>
                <line x1="50" y1="10" x2="46" y2="14"/>
                <line x1="14" y1="46" x2="10" y2="50"/>
            </g>

            <!-- Center Gold Medallion Core -->
            <circle cx="30" cy="30" r="17.5" fill="url(#deityGoldGrad)" stroke="#ffd700" stroke-width="1.2"/>
            <circle cx="30" cy="30" r="14.5" stroke="#ff8f00" stroke-width="0.8" stroke-dasharray="2 1.5"/>

            <!-- Sacred ॐ (Om) Symbol in Holy Vermilion Red with Gold Edge -->
            <text x="30" y="32" font-family="'Noto Sans Devanagari', 'DM Sans', serif" font-size="20" font-weight="900" text-anchor="middle" dominant-baseline="central" fill="#b71c1c" stroke="#ffe082" stroke-width="0.5">ॐ</text>
        </svg>
    `;

    // Rotating Mandala Aura
    const SVG_MANDALA = `
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" stroke="#ffd700" stroke-width="1.5" stroke-dasharray="4 4"/>
            <circle cx="100" cy="100" r="75" stroke="#ffb300" stroke-width="1"/>
            <circle cx="100" cy="100" r="55" stroke="#ff8f00" stroke-width="1.5"/>
            <circle cx="100" cy="100" r="30" stroke="#ffd700" stroke-width="2"/>
            <g stroke="#ffd700" stroke-width="1.2" opacity="0.8">
                ${Array.from({ length: 12 }).map((_, i) => {
        const angle = i * 30;
        return `<path d="M100 25 C115 50 115 70 100 85 C85 70 85 50 100 25 Z" transform="rotate(${angle} 100 100)"/>`;
    }).join("")}
            </g>
            <g stroke="#ffab00" stroke-width="1" opacity="0.7">
                ${Array.from({ length: 12 }).map((_, i) => {
        const angle = i * 30 + 15;
        return `<circle cx="100" cy="45" r="4" fill="#ff6f00" transform="rotate(${angle} 100 100)"/>`;
    }).join("")}
            </g>
        </svg>
    `;

    // Hanging Indian Lantern (Akash Kandil)
    const SVG_LANTERN = `
        <svg width="55" height="140" viewBox="0 0 60 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="30" y1="0" x2="30" y2="35" stroke="#ffd54f" stroke-width="1.5" stroke-dasharray="2 2"/>
            <polygon points="30,30 45,42 15,42" fill="#c2185b" stroke="#ffd700" stroke-width="1.2"/>
            <polygon points="30,42 54,68 30,94 6,68" fill="url(#lanternGrad)" stroke="#ffd700" stroke-width="1.8"/>
            <circle cx="30" cy="68" r="12" fill="#ffe082" opacity="0.9" filter="drop-shadow(0 0 8px #ff9100)"/>
            <polygon points="18,94 42,94 30,104" fill="#c2185b" stroke="#ffd700" stroke-width="1.2"/>
            <path d="M22,104 Q20,125 24,148" stroke="#ffb300" stroke-width="2" stroke-linecap="round"/>
            <path d="M26,104 Q28,125 27,150" stroke="#c2185b" stroke-width="2" stroke-linecap="round"/>
            <path d="M30,104 Q30,125 30,152" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M34,104 Q32,125 33,150" stroke="#ff5722" stroke-width="2" stroke-linecap="round"/>
            <path d="M38,104 Q40,125 36,148" stroke="#ffb300" stroke-width="2" stroke-linecap="round"/>
            <defs>
                <linearGradient id="lanternGrad" x1="6" y1="42" x2="54" y2="94" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#e91e63"/>
                    <stop offset="0.5" stop-color="#ff9800"/>
                    <stop offset="1" stop-color="#ffd54f"/>
                </linearGradient>
            </defs>
        </svg>
    `;

    // Terracotta Diya Base SVG
    const SVG_DIYA_BASE = `
        <svg class="diwali-diya-base-svg" viewBox="0 0 100 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="clayGrad" x1="50" y1="12" x2="50" y2="52" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#e65100"/>
                    <stop offset="0.4" stop-color="#bf360c"/>
                    <stop offset="0.9" stop-color="#4e1606"/>
                </linearGradient>
                <linearGradient id="oilGrad" x1="15" y1="18" x2="85" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#ffd54f"/>
                    <stop offset="0.5" stop-color="#ff8f00"/>
                    <stop offset="1" stop-color="#d84315"/>
                </linearGradient>
                <linearGradient id="goldBorderGrad" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#ffe082"/>
                    <stop offset="0.5" stop-color="#ffb300"/>
                    <stop offset="1" stop-color="#ffd700"/>
                </linearGradient>
            </defs>
            <ellipse cx="50" cy="48" rx="28" ry="5" fill="#3e1205" opacity="0.6"/>
            <path d="M12 18 C12 36 28 50 50 50 C72 50 88 36 88 18 C88 16 82 14 50 14 C18 14 12 16 12 18 Z" fill="url(#clayGrad)" stroke="url(#goldBorderGrad)" stroke-width="1.5"/>
            <ellipse cx="50" cy="18" rx="34" ry="7" fill="url(#oilGrad)"/>
            <path d="M26 30 Q50 44 74 30" stroke="#ffd700" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.9"/>
            <circle cx="38" cy="35" r="2" fill="#ffd700"/>
            <circle cx="50" cy="38" r="2.5" fill="#ffe082"/>
            <circle cx="62" cy="35" r="2" fill="#ffd700"/>
            <path d="M50 14 C48 10 52 10 50 14 Z" fill="#2d1205"/>
        </svg>
    `;

    // Toran / Marigold Garland SVG
    const SVG_TORAN = `
        <svg class="diwali-toran-svg" viewBox="0 0 1000 42" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 4 Q250 20 500 4 Q750 20 1000 4" stroke="#ffb300" stroke-width="2.5" fill="none"/>
            ${Array.from({ length: 23 }).map((_, i) => {
        const x = i * 44 + 8;
        const isFlower = i % 2 === 0;
        if (isFlower) {
            return `
                        <circle cx="${x}" cy="14" r="7" fill="#ff6f00"/>
                        <circle cx="${x}" cy="14" r="4.5" fill="#ffb300"/>
                        <circle cx="${x}" cy="14" r="1.8" fill="#ffe082"/>
                    `;
        } else {
            return `
                        <path d="M${x} 6 C${x + 5} 16 ${x + 7} 30 ${x} 38 C${x - 7} 30 ${x - 5} 16 ${x} 6 Z" fill="#2e7d32" stroke="#1b5e20" stroke-width="0.8"/>
                    `;
        }
    }).join("")}
        </svg>
    `;

    // Build Modal DOM Structure
    function createDiwaliModal() {
        if (document.getElementById("diwaliModalOverlay")) return;

        // Inject Shared Defs
        const defsContainer = document.createElement("div");
        defsContainer.innerHTML = SVG_SHARED_DEFS;
        document.body.appendChild(defsContainer.firstElementChild);

        const overlay = document.createElement("div");
        overlay.id = "diwaliModalOverlay";
        overlay.className = "diwali-modal-overlay";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "Diwali Greetings from Anand Nagar");

        overlay.innerHTML = `
            <!-- Fireworks Canvas -->
            <canvas id="diwaliCanvas" class="diwali-fireworks-canvas"></canvas>

            <!-- Hanging Toran -->
            <div class="diwali-toran-container">
                ${SVG_TORAN}
            </div>

            <!-- Hanging Lanterns -->
            <div class="diwali-hanging-lantern left">
                ${SVG_LANTERN}
            </div>
            <div class="diwali-hanging-lantern right">
                ${SVG_LANTERN}
            </div>

            <!-- Main Festive Greeting Card -->
            <div class="diwali-card" id="diwaliCard">
                <!-- Animated Sacred Om (ॐ) Marquee Border Running on All 4 Sides -->
                <div class="diwali-card-border-marquee" aria-hidden="true">
                    <div class="diwali-marquee-track top">
                        <span>ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦</span>
                        <span>ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦</span>
                    </div>
                    <div class="diwali-marquee-track bottom">
                        <span>ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦</span>
                        <span>ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦</span>
                    </div>
                    <div class="diwali-marquee-track left">
                        <span>ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ</span>
                        <span>ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ</span>
                    </div>
                    <div class="diwali-marquee-track right">
                        <span>ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ</span>
                        <span>ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ ✦ ॐ ✨ ॐ</span>
                    </div>
                </div>

                <!-- Sacred Rotating Om (ॐ) Emblems on the 4 Sides (Top, Bottom, Left, Right - NOT in corners) -->
                <div class="diwali-om-side top" title="ॐ">${SVG_OM_CORNER}</div>
                <div class="diwali-om-side bottom" title="ॐ">${SVG_OM_CORNER}</div>
                <div class="diwali-om-side left" title="ॐ">${SVG_OM_CORNER}</div>
                <div class="diwali-om-side right" title="ॐ">${SVG_OM_CORNER}</div>

                <!-- Rotating Mandala in BG -->
                <div class="diwali-mandala-bg">${SVG_MANDALA}</div>

                <!-- Card Header Bar (Corner Credit | Portal Badge | Controls) -->
                <div class="diwali-card-header">
                    <div class="diwali-corner-credit" title="Diwali Greetings by Mahesh Gupta">
                        <span class="corner-by-label">by</span>
                        <span class="corner-by-name">Mahesh Gupta</span>
                        <span class="corner-by-sparkle">✨</span>
                    </div>

                    <div class="diwali-portal-badge">
                        <span>✨</span>
                        <span>Anand Nagar Portal</span>
                        <span>✨</span>
                    </div>

                    <div class="diwali-header-controls">
                        <button type="button" class="diwali-sound-toggle-btn" id="diwaliSoundToggle" title="ॐ Sound ON / OFF" aria-label="Toggle Sound">🔊</button>
                        <button type="button" class="diwali-close-btn" id="diwaliCloseBtn" aria-label="Close Diwali Greeting">✕</button>
                    </div>
                </div>

                <!-- Sacred Divine Altar: Lord Ganesha, Flaming Diya, Maa Lakshmi -->
                <div class="diwali-puja-altar">
                    <!-- Lord Ganesha (Left) -->
                    <div class="diwali-deity-card" id="ganeshaCard" title="भगवान श्री गणेश (Click for blessings)">
                        <div class="diwali-deity-halo"></div>
                        ${SVG_GANESHA}
                        <span class="diwali-deity-caption">श्री गणेश · सिद्धि</span>
                    </div>

                    <!-- Center Grand Diya -->
                    <div class="diwali-diya-unit" id="centerDiya" title="दीपक (Click to brighten)">
                        <div class="diwali-flame-wrapper">
                            <div class="diwali-flame-halo"></div>
                            <div class="diwali-flame"></div>
                            <div class="diwali-flame-core"></div>
                        </div>
                        ${SVG_DIYA_BASE}
                    </div>

                    <!-- Maa Lakshmi (Right) -->
                    <div class="diwali-deity-card" id="lakshmiCard" title="माँ महालक्ष्मी (Click for blessings)">
                        <div class="diwali-deity-halo"></div>
                        ${SVG_LAKSHMI}
                        <span class="diwali-deity-caption">माँ लक्ष्मी · समृद्धि</span>
                    </div>
                </div>

                <!-- Greetings Headings -->
                <h1 class="diwali-heading-hindi">✨ शुभ दीपावली ✨</h1>
                <h2 class="diwali-heading-english">Happy Diwali & Prosperous New Year</h2>

                <!-- Festive Message -->
                <div class="diwali-message">
                    <span class="diwali-message-hindi">
                        आनंद नगर वासियों एवं समस्त देशवासियों को प्रकाश पर्व दीपावली की हार्दिक शुभकामनाएँ!
                    </span>
                    May Maa Lakshmi and Lord Ganesha bless your life with boundless joy, good health, peace, prosperity, and success.
                </div>

                <!-- Interactive Buttons -->
                <div class="diwali-actions-grid">
                    <button type="button" class="diwali-btn-interactive" id="btnBurstCrackers">
                        <span>🎆</span>
                        <span>Burst Fireworks / पटाखे</span>
                    </button>
                    <button type="button" class="diwali-btn-interactive" id="btnLightDiya">
                        <span>🪔</span>
                        <span>Light More Diyas / दीप</span>
                    </button>
                </div>

                <!-- Primary Enter Site CTA -->
                <div>
                    <button type="button" class="diwali-enter-btn" id="btnEnterSite">
                        <span>शहर में प्रवेश करें · Enter Anand Nagar</span>
                        <span>➔</span>
                    </button>
                </div>

                <!-- Bottom Corner Signature Credit by Mahesh Gupta -->
                <div class="diwali-card-corner-credit">
                    <span class="diwali-credit-sparkle">✨</span>
                    <span class="diwali-credit-text">Celebration & Wishes by <strong class="diwali-credit-author">Mahesh Gupta</strong></span>
                    <span class="diwali-credit-sparkle">✨</span>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Also create Floating Replay Pill at bottom right
        createReopenPill();

        // Setup event handlers and canvas
        initFireworksEngine();
        bindEvents();

        // Open modal on home page
        openModal();
    }

    function createReopenPill() {
        if (document.getElementById("diwaliReopenPill")) return;

        const pill = document.createElement("button");
        pill.id = "diwaliReopenPill";
        pill.className = "diwali-reopen-pill";
        pill.setAttribute("type", "button");
        pill.setAttribute("title", "Open Diwali Greeting");
        pill.innerHTML = `
            <span>🪔</span>
            <span>Diwali Wishes / शुभकामनाएँ</span>
            <span>✨</span>
        `;
        pill.addEventListener("click", () => {
            playBellChime();
            openModal();
        });
        document.body.appendChild(pill);
    }

    function openModal() {
        const overlay = document.getElementById("diwaliModalOverlay");
        if (overlay) {
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
            soundEnabled = true;
            // Play the sacred Om Namah Shivaya sound
            startDeepOmChant();
            if (window.diwaliCanvasEngine) {
                window.diwaliCanvasEngine.start();
                // Launch initial celebratory barrage
                window.diwaliCanvasEngine.burstBarrage(4);
            }
        }
    }

    function closeModal() {
        const overlay = document.getElementById("diwaliModalOverlay");
        if (overlay) {
            overlay.classList.remove("active");
            document.body.style.overflow = "";
            stopDeepOmChant();
            if (window.diwaliCanvasEngine) {
                window.diwaliCanvasEngine.stop();
            }
        }
    }

    // Canvas Fireworks Engine
    function initFireworksEngine() {
        const canvas = document.getElementById("diwaliCanvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        let animationFrameId = null;
        let isRunning = false;
        let lastAutoLaunch = 0;

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const rockets = [];
        const sparklers = [];

        const PALETTES = [
            ["#ffd700", "#ffb300", "#ff6f00", "#fff"], // Gold & Saffron
            ["#ff1744", "#f50057", "#ff80ab", "#ffd700"], // Ruby & Rose
            ["#00e676", "#1de9b6", "#69f0ae", "#ffd700"], // Emerald & Mint
            ["#00b0ff", "#2979ff", "#80d8ff", "#ffffff"], // Cyan & Sky
            ["#d500f9", "#aa00ff", "#ea80fc", "#ffd700"], // Royal Violet
            ["#ff9100", "#ff3d00", "#ffea00", "#ffffff"]  // Flame Cascade
        ];

        class Rocket {
            constructor(startX, startY, targetX, targetY, colorPalette) {
                this.x = startX;
                this.y = startY;
                this.startX = startX;
                this.startY = startY;
                this.targetX = targetX;
                this.targetY = targetY;
                this.palette = colorPalette || PALETTES[Math.floor(Math.random() * PALETTES.length)];
                this.color = this.palette[0];
                this.speed = 3 + Math.random() * 3;
                this.angle = Math.atan2(targetY - startY, targetX - startX);
                this.distanceToTarget = Math.hypot(targetX - startX, targetY - startY);
                this.distanceTraveled = 0;
                this.trail = [];
                this.trailLength = 4;
            }

            update() {
                this.trail.push({ x: this.x, y: this.y });
                if (this.trail.length > this.trailLength) {
                    this.trail.shift();
                }

                const vx = Math.cos(this.angle) * this.speed * 2.2;
                const vy = Math.sin(this.angle) * this.speed * 2.2;

                this.x += vx;
                this.y += vy;
                this.distanceTraveled += Math.hypot(vx, vy);

                if (Math.random() < 0.4) {
                    sparklers.push(new Sparkler(this.x, this.y, "#ffcc00"));
                }

                if (this.distanceTraveled >= this.distanceToTarget) {
                    this.explode();
                    return false;
                }
                return true;
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                for (let i = this.trail.length - 1; i >= 0; i--) {
                    ctx.lineTo(this.trail[i].x, this.trail[i].y);
                }
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 2.5;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 8;
                ctx.stroke();
                ctx.restore();
            }

            explode() {
                playFireworkSound();
                const particleCount = 65 + Math.floor(Math.random() * 45);
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle(this.targetX, this.targetY, this.palette));
                }
            }
        }

        class Particle {
            constructor(x, y, palette) {
                this.x = x;
                this.y = y;
                this.palette = palette;
                this.color = palette[Math.floor(Math.random() * palette.length)];
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 6 + 1.5;
                this.friction = 0.95;
                this.gravity = 0.08 + Math.random() * 0.04;
                this.alpha = 1;
                this.decay = Math.random() * 0.015 + 0.01;
                this.size = Math.random() * 2.6 + 1.2;
                this.vx = Math.cos(this.angle) * this.speed;
                this.vy = Math.sin(this.angle) * this.speed;
                this.flicker = Math.random() > 0.5;
            }

            update() {
                this.vx *= this.friction;
                this.vy *= this.friction;
                this.vy += this.gravity;
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.decay;
                return this.alpha > 0;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = Math.max(0, this.flicker && Math.random() < 0.2 ? this.alpha * 0.4 : this.alpha);
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 6;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        class Sparkler {
            constructor(x, y, color) {
                this.x = x + (Math.random() * 8 - 4);
                this.y = y + (Math.random() * 8 - 4);
                this.color = color || "#ffd700";
                this.alpha = 1;
                this.decay = Math.random() * 0.04 + 0.03;
                this.size = Math.random() * 1.8 + 0.6;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = Math.random() * 1.5 + 0.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.decay;
                return this.alpha > 0;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = Math.max(0, this.alpha);
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 4;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        function launchRandomRocket() {
            const startX = Math.random() * width * 0.8 + width * 0.1;
            const targetX = Math.random() * width * 0.8 + width * 0.1;
            const targetY = Math.random() * (height * 0.45) + height * 0.08;
            rockets.push(new Rocket(startX, height + 10, targetX, targetY));
        }

        function burstBarrage(count) {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const startX = Math.random() * width * 0.8 + width * 0.1;
                    const targetX = Math.random() * width * 0.8 + width * 0.1;
                    const targetY = Math.random() * (height * 0.42) + height * 0.08;
                    rockets.push(new Rocket(startX, height + 10, targetX, targetY));
                }, i * 220);
            }
        }

        function createBurstAt(x, y) {
            playFireworkSound();
            const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
            const count = 55 + Math.floor(Math.random() * 35);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(x, y, palette));
            }
        }

        function loop(timestamp) {
            if (!isRunning) return;

            ctx.fillStyle = "rgba(10, 2, 16, 0.24)";
            ctx.fillRect(0, 0, width, height);

            if (timestamp - lastAutoLaunch > 900) {
                launchRandomRocket();
                lastAutoLaunch = timestamp;
            }

            for (let i = rockets.length - 1; i >= 0; i--) {
                if (!rockets[i].update()) {
                    rockets.splice(i, 1);
                } else {
                    rockets[i].draw();
                }
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                if (!particles[i].update()) {
                    particles.splice(i, 1);
                } else {
                    particles[i].draw();
                }
            }

            for (let i = sparklers.length - 1; i >= 0; i--) {
                if (!sparklers[i].update()) {
                    sparklers.splice(i, 1);
                } else {
                    sparklers[i].draw();
                }
            }

            animationFrameId = requestAnimationFrame(loop);
        }

        window.diwaliCanvasEngine = {
            start: () => {
                if (!isRunning) {
                    isRunning = true;
                    ctx.clearRect(0, 0, width, height);
                    lastAutoLaunch = performance.now();
                    animationFrameId = requestAnimationFrame(loop);
                }
            },
            stop: () => {
                isRunning = false;
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            },
            burstBarrage: burstBarrage,
            createBurstAt: createBurstAt,
            addSparkleTrail: (x, y) => {
                for (let i = 0; i < 3; i++) {
                    sparklers.push(new Sparkler(x, y, "#ffd700"));
                }
            }
        };

        canvas.addEventListener("pointerdown", (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            createBurstAt(x, y);
        });

        window.addEventListener("pointermove", (e) => {
            if (isRunning && Math.random() < 0.6) {
                window.diwaliCanvasEngine.addSparkleTrail(e.clientX, e.clientY);
            }
        });
    }

    function spawnFloatingDiya() {
        playBellChime();
        const overlay = document.getElementById("diwaliModalOverlay");
        if (!overlay) return;

        const count = 4;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const diya = document.createElement("div");
                diya.className = "diwali-floating-extra-diya";
                diya.style.left = (15 + Math.random() * 70) + "%";
                diya.style.bottom = (10 + Math.random() * 30) + "px";
                diya.innerHTML = `
                    <div style="transform: scale(${0.7 + Math.random() * 0.5})">
                        <div class="diwali-flame-wrapper">
                            <div class="diwali-flame-halo"></div>
                            <div class="diwali-flame"></div>
                            <div class="diwali-flame-core"></div>
                        </div>
                        ${SVG_DIYA_BASE}
                    </div>
                `;
                overlay.appendChild(diya);

                setTimeout(() => {
                    diya.remove();
                }, 4600);
            }, i * 180);
        }
    }

    function bindEvents() {
        const closeBtn = document.getElementById("diwaliCloseBtn");
        const enterBtn = document.getElementById("btnEnterSite");
        const overlay = document.getElementById("diwaliModalOverlay");
        const card = document.getElementById("diwaliCard");
        const soundBtn = document.getElementById("diwaliSoundBtn");
        const soundLabel = document.getElementById("soundLabel");
        const soundIcon = document.getElementById("soundIcon");
        const btnBurst = document.getElementById("btnBurstCrackers");
        const btnLight = document.getElementById("btnLightDiya");

        if (closeBtn) closeBtn.addEventListener("click", closeModal);
        if (enterBtn) enterBtn.addEventListener("click", closeModal);

        if (overlay) {
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) {
                    closeModal();
                }
            });
        }

        if (card) {
            card.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        }

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && overlay && overlay.classList.contains("active")) {
                closeModal();
            }
        });

        const soundToggle = document.getElementById("diwaliSoundToggle");
        if (soundToggle) {
            soundToggle.addEventListener("click", () => {
                soundEnabled = !soundEnabled;
                if (soundEnabled) {
                    soundToggle.textContent = "🔊";
                    soundToggle.classList.remove("muted");
                    startDeepOmChant();
                    speakPrayerWhisper();
                } else {
                    soundToggle.textContent = "🔇";
                    soundToggle.classList.add("muted");
                    stopDeepOmChant();
                }
            });
        }

        // Auto unlock and start sacred Om Namah Shivaya chanting on first gesture
        const unlockAudioOnGesture = () => {
            soundEnabled = true;
            const ctx = getAudioContext();
            if (ctx && ctx.state === "suspended") {
                ctx.resume().then(() => {
                    if (!isChanting) startDeepOmChant();
                }).catch(() => {
                    if (!isChanting) startDeepOmChant();
                });
            } else {
                if (!isChanting) startDeepOmChant();
            }
            window.removeEventListener("pointerdown", unlockAudioOnGesture);
            window.removeEventListener("keydown", unlockAudioOnGesture);
        };
        window.addEventListener("pointerdown", unlockAudioOnGesture, { once: true });
        window.addEventListener("keydown", unlockAudioOnGesture, { once: true });

        if (btnBurst) {
            btnBurst.addEventListener("click", () => {
                if (window.diwaliCanvasEngine) {
                    window.diwaliCanvasEngine.burstBarrage(5);
                }
            });
        }

        if (btnLight) {
            btnLight.addEventListener("click", () => {
                spawnFloatingDiya();
            });
        }

        // Center Diya Click
        const centerDiya = document.getElementById("centerDiya");
        if (centerDiya) {
            centerDiya.addEventListener("click", () => {
                playBellChime();
                spawnFloatingDiya();
            });
        }

        // Lord Ganesha Click
        const ganeshaCard = document.getElementById("ganeshaCard");
        if (ganeshaCard) {
            ganeshaCard.addEventListener("click", () => {
                playBellChime();
                if (window.diwaliCanvasEngine) {
                    const rect = ganeshaCard.getBoundingClientRect();
                    window.diwaliCanvasEngine.createBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
                }
            });
        }

        // Maa Lakshmi Click
        const lakshmiCard = document.getElementById("lakshmiCard");
        if (lakshmiCard) {
            lakshmiCard.addEventListener("click", () => {
                playBellChime();
                if (window.diwaliCanvasEngine) {
                    const rect = lakshmiCard.getBoundingClientRect();
                    window.diwaliCanvasEngine.createBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
                }
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", createDiwaliModal);
    } else {
        createDiwaliModal();
    }
})();
