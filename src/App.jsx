import React, { useState, useEffect, useRef } from 'react';
import ThemeSelector, { themes } from './components/ThemeSelector';
import TimerDisplay from './components/TimerDisplay';
import TimeControls from './components/TimeControls';
import BreathingGuide from './components/BreathingGuide';
import VolumeControl from './components/VolumeControl';
import StatsDashboard from './components/StatsDashboard';
import QuoteSection from './components/QuoteSection';
import './App.css';

export default function App() {
  // Theme & Media State
  const [activeTheme, setActiveTheme] = useState('rain');
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  // Timer State
  const [duration, setDuration] = useState(600); // Default 10 Mins (600s)
  const [timeLeft, setTimeLeft] = useState(600);
  const [isPlaying, setIsPlaying] = useState(false);

  // Assistant State
  const [breathingEnabled, setBreathingEnabled] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  // Stats State (Loaded from LocalStorage)
  const [stats, setStats] = useState({
    totalMinutes: 0,
    sessionsCompleted: 0,
    streak: 0,
    lastMeditationDate: ''
  });

  // Media Refs
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  // Initialize stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('mindspace_meditation_stats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (err) {
        console.error("Error parsing meditation stats:", err);
      }
    }
  }, []);

  // Sync theme changes
  useEffect(() => {
    const currentTheme = themes.find(t => t.id === activeTheme);
    if (!currentTheme) return;

    // Load new assets
    if (audioRef.current && videoRef.current) {
      audioRef.current.src = currentTheme.sound;
      videoRef.current.src = currentTheme.video;
      audioRef.current.load();
      videoRef.current.load();

      // Sync volume and mute state
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.muted = isMuted;

      // Keep playing if it was already playing
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio autoplay block:", e));
        videoRef.current.play().catch(e => console.log("Video autoplay block:", e));
      }
    }
  }, [activeTheme]);

  // Sync playback state
  useEffect(() => {
    if (!audioRef.current || !videoRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(e => {
        console.log("Audio play failed:", e);
        setIsPlaying(false);
      });
      videoRef.current.play().catch(e => console.log("Video play failed:", e));
    } else {
      audioRef.current.pause();
      videoRef.current.pause();
    }
  }, [isPlaying]);

  // Sync volume state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Timer Tick Interval
  useEffect(() => {
    let interval = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Timer Finished
            clearInterval(interval);
            setIsPlaying(false);
            handleSessionComplete();
            return duration; // Reset
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Handle Session Completion (Stats & Streaks)
  const handleSessionComplete = () => {
    const minutesAdded = duration / 60;
    const today = new Date().toISOString().split('T')[0];

    // Yesterday's date
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];

    setStats((prevStats) => {
      let newStreak = prevStats.streak || 0;

      if (prevStats.lastMeditationDate === today) {
        // Streak already updated today, keep it the same
      } else if (prevStats.lastMeditationDate === yesterday) {
        // Meditated yesterday, increment streak
        newStreak += 1;
      } else {
        // Broke streak, reset to 1
        newStreak = 1;
      }

      const updated = {
        totalMinutes: prevStats.totalMinutes + minutesAdded,
        sessionsCompleted: prevStats.sessionsCompleted + 1,
        streak: newStreak,
        lastMeditationDate: today
      };

      localStorage.setItem('mindspace_meditation_stats', JSON.stringify(updated));
      return updated;
    });

    // Play a gentle notification sound if desired, or reset timeline
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  // Change entire duration
  const handleChangeDuration = (newSecs) => {
    setDuration(newSecs);
    setTimeLeft(newSecs);
    setIsPlaying(false); // Stop session when resetting duration
  };

  // Reset all user statistics
  const handleResetStats = () => {
    if (window.confirm("Are you sure you want to clear your meditation progress?")) {
      const cleared = {
        totalMinutes: 0,
        sessionsCompleted: 0,
        streak: 0,
        lastMeditationDate: ''
      };
      setStats(cleared);
      localStorage.removeItem('mindspace_meditation_stats');
    }
  };

  // Toggle fullscreen/focus mode
  const handleToggleFocus = () => {
    setFocusMode(!focusMode);
  };

  // Determine current ambient video source
  const activeThemeObj = themes.find(t => t.id === activeTheme) || themes[0];

  return (
    <div
      className={`app-container ${focusMode ? 'focus-mode' : ''}`}
      data-theme={activeTheme}
    >
      {/* Background Media */}
      <div className="bg-video-container">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
        >
          <source src={activeThemeObj.video} type="video/mp4" />
        </video>
      </div>
      <div className="bg-overlay"></div>

      <audio
        ref={audioRef}
        loop
      >
        <source src={activeThemeObj.sound} type="audio/mp3" />
      </audio>

      {/* Exit Focus Mode floating button */}
      <button
        className="btn-primary btn-exit-focus"
        onClick={handleToggleFocus}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minimize"><path d="M4 14h6v6" /><path d="M20 10h-6V4" /><path d="m14 10 6-6" /><path d="m10 14-6 6" /></svg>
        Exit Focus Mode
      </button>

      {/* Header */}
      <header className="app-header">
        <div className="logo-section">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2Z" />
            <path d="M12 6a6 6 0 0 1 6 6c0 3.314-2.686 6-6 6s-6-2.686-6-6a6 6 0 0 1 6-6Z" fill="currentColor" fillOpacity="0.2" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
          <span className="logo-text">MindSpace</span>
        </div>

        {/* Quick Volume control in Header */}
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onChangeVolume={setVolume}
          onToggleMute={() => setIsMuted(!isMuted)}
        />
      </header>

      {/* Main Content Dashboard Grid */}
      <main className="dashboard-grid">
        {/* Left Column: Customizations & Settings */}
        <section className="side-panel">
          <ThemeSelector
            activeTheme={activeTheme}
            onSelectTheme={setActiveTheme}
          />
          <TimeControls
            duration={duration}
            onChangeDuration={handleChangeDuration}
          />
        </section>

        {/* Center Column: Interactive Circular Timer */}
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TimerDisplay
            timeLeft={timeLeft}
            duration={duration}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            statusText={breathingEnabled ? "Breathe" : "Meditate"}
          />
        </section>

        {/* Right Column: Breathing & Stats */}
        <section className="side-panel">
          <BreathingGuide
            isPlaying={isPlaying}
            isEnabled={breathingEnabled}
            onToggleEnabled={() => setBreathingEnabled(!breathingEnabled)}
          />
          <StatsDashboard
            stats={stats}
            onResetStats={handleResetStats}
          />
        </section>
      </main>

      {/* Footer / Quote Section */}
      <footer className="footer-area" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <QuoteSection />

        <div className="app-footer">
          <div>Made with ❤️ by RISHI</div>
          <div className="footer-actions">
            <button className="footer-btn" onClick={handleToggleFocus}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-maximize"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
              Focus Mode
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
