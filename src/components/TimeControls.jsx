import React from 'react';

const presets = [
  { label: '2 Min', seconds: 120 },
  { label: '5 Min', seconds: 300 },
  { label: '10 Min', seconds: 600 }
];

export default function TimeControls({ duration, onChangeDuration }) {
  // Convert current duration (seconds) to minutes for the slider
  const durationInMinutes = Math.floor(duration / 60);

  const handleSliderChange = (e) => {
    const mins = parseInt(e.target.value, 10);
    onChangeDuration(mins * 60);
  };

  return (
    <div className="glass-card">
      <h3 className="section-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-timer"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="12" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>
        Session Duration
      </h3>
      
      {/* Preset Buttons */}
      <div className="time-presets">
        {presets.map((preset) => (
          <button
            key={preset.seconds}
            className={`btn-secondary ${duration === preset.seconds ? 'active' : ''}`}
            onClick={() => onChangeDuration(preset.seconds)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Custom Slider */}
      <div className="custom-time-section">
        <div className="slider-labels">
          <span>Custom Length</span>
          <span style={{ fontWeight: 600, color: 'var(--theme-accent)' }}>
            {durationInMinutes} {durationInMinutes === 1 ? 'Minute' : 'Minutes'}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="60"
          value={durationInMinutes}
          onChange={handleSliderChange}
          className="time-slider"
        />
        <div className="slider-labels" style={{ fontSize: '0.7rem', opacity: 0.6 }}>
          <span>1m</span>
          <span>60m</span>
        </div>
      </div>
    </div>
  );
}
