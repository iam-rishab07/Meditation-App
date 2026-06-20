import React, { useState, useEffect } from 'react';

export default function BreathingGuide({ isPlaying, isEnabled, onToggleEnabled }) {
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale, rest
  const [secondsInPhase, setSecondsInPhase] = useState(0);

  useEffect(() => {
    if (!isEnabled || !isPlaying) {
      setPhase('inhale');
      setSecondsInPhase(0);
      return;
    }

    const interval = setInterval(() => {
      setSecondsInPhase((prevSecs) => {
        const nextSecs = prevSecs + 1;
        
        // Cycle is 16 seconds total: 4s inhale, 4s hold, 4s exhale, 4s hold
        if (nextSecs >= 16) {
          setPhase('inhale');
          return 0;
        } else if (nextSecs === 12) {
          setPhase('hold'); // Hold empty
        } else if (nextSecs === 8) {
          setPhase('exhale');
        } else if (nextSecs === 4) {
          setPhase('hold'); // Hold full
        }
        
        return nextSecs;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isEnabled, isPlaying]);

  // Determine current label and class
  let text = 'Prepare';
  let animationClass = '';

  if (isEnabled && isPlaying) {
    if (secondsInPhase < 4) {
      text = 'Inhale...';
      animationClass = 'inhale';
    } else if (secondsInPhase < 8) {
      text = 'Hold Breath';
      animationClass = 'hold';
    } else if (secondsInPhase < 12) {
      text = 'Exhale...';
      animationClass = 'exhale';
    } else {
      text = 'Rest';
      animationClass = 'exhale'; // stay contracted
    }
  }

  return (
    <div className="glass-card breathing-card">
      <div style={{ width: '100%' }}>
        <h3 className="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wind"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 15.6A1.5 1.5 0 1 0 18 13H2"/><path d="M9.8 9.6A2 2 0 1 0 11 6H2"/></svg>
          Breathing Guide
        </h3>
      </div>

      <button 
        className={`btn-primary breathing-toggle-btn ${isEnabled ? '' : 'btn-secondary'}`}
        onClick={onToggleEnabled}
        style={{
          background: isEnabled ? 'var(--theme-accent)' : 'rgba(255,255,255,0.08)',
          color: isEnabled ? '#fff' : 'var(--text-primary)'
        }}
      >
        {isEnabled ? 'Disable Assistant' : 'Enable Assistant'}
      </button>

      {isEnabled && (
        <div className="breathing-box">
          <div className="breathing-ring-wrapper">
            <div className="breathing-ring-bg"></div>
            <div className={`breathing-ring ${animationClass}`}>
              <span className="breathing-text">{text}</span>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1rem', textAlign: 'center' }}>
            Follow the expanding circle to pace your breathing
          </p>
        </div>
      )}
    </div>
  );
}
