import React from 'react';

export const themes = [
  {
    id: 'rain',
    label: 'Rainy Evening',
    desc: 'Relaxing rainfall for deep focus & sleep',
    sound: '/sounds/rain.mp3',
    video: '/video/rain.mp4',
    icon: '/svg/rain.svg'
  },
  {
    id: 'beach',
    label: 'Ocean Breeze',
    desc: 'Gentle ocean waves for anxiety relief',
    sound: '/sounds/beach.mp3',
    video: '/video/beach.mp4',
    icon: '/svg/beach.svg'
  }
];

export default function ThemeSelector({ activeTheme, onSelectTheme }) {
  return (
    <div className="theme-selector-container">
      <h3 className="section-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
        Select Atmosphere
      </h3>
      <div className="themes-grid">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`theme-card ${activeTheme === theme.id ? 'active' : ''}`}
            onClick={() => onSelectTheme(theme.id)}
          >
            <div className="theme-icon-box">
              <img src={theme.icon} alt={theme.label} />
            </div>
            <div className="theme-label">{theme.label}</div>
            <div className="theme-desc">{theme.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
