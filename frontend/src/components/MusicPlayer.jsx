import React, { useState, useEffect, useRef } from 'react';
import { Music, VolumeX, Disc } from 'lucide-react';

export default function MusicPlayer({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);

  // Nhạc nền piano/music box êm dịu tạo bằng Web Audio API (hoàn toàn tự sinh, không phụ thuộc file ngoài)
  function playMelody() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Giai điệu Canon/ballad du dương, ấm áp (tần số nốt nhạc)
      // C4, E4, G4, B4, C5, D5, E5, G5
      const notes = [
        // Cả nhà cùng hát: Happy Birthday to you...
      261.63, 261.63, 293.66, 261.63, 349.23, 329.63,
  
      // Happy Birthday to you...
      261.63, 261.63, 293.66, 261.63, 392.00, 349.23,
      
      // Happy Birthday dear friend...
      261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66,
      
      // Happy Birthday to you!
      466.16, 466.16, 440.00, 349.23, 392.00, 349.23
      ];

      let noteIndex = 0;
      function playNextNote() {
        if (!ctx || ctx.state === 'closed') return;
        const freq = notes[noteIndex % notes.length];
        noteIndex++;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Âm sắc piano ấm nhẹ (tam giác + sine)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Bao âm dịu dàng (soft attack, long decay)
        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.2);
      }

      playNextNote();
      intervalRef.current = setInterval(playNextNote, 360);
      setIsPlaying(true);
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  }

  function stopMelody() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  }

  function togglePlay() {
    if (isPlaying) {
      stopMelody();
    } else {
      playMelody();
    }
  }

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      playMelody();
    }
  }, [autoPlayTrigger]);

  useEffect(() => {
    return () => {
      stopMelody();
    };
  }, []);

  return (
    <div className="audio-control-wrapper" onClick={togglePlay} title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền du dương'}>
      <div className={`audio-toggle ${isPlaying ? 'mrotate' : ''}`}>
        <Disc size={20} strokeWidth={1.8} className="disc-icon" />
        {isPlaying ? (
          <span className="music-note-float">♪</span>
        ) : (
          <VolumeX size={12} strokeWidth={2} className="mute-icon" />
        )}
      </div>
    </div>
  );
}
