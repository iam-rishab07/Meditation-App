import React from 'react';

export default function VolumeControl({ volume, isMuted, onChangeVolume, onToggleMute }) {
  const handleSliderChange = (e) => {
    const vol = parseFloat(e.target.value);
    onChangeVolume(vol);
  };

  // Render different speaker icons based on volume/mute status
  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return (
        // Mute Icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>
      );
    }
    if (volume < 0.5) {
      return (
        // Low Volume Icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-1"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
      );
    }
    return (
      // High Volume Icon
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
    );
  };

  return (
    <div className="volume-control-container">
      <button 
        className="volume-icon-btn" 
        onClick={onToggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {renderVolumeIcon()}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={isMuted ? 0 : volume}
        onChange={handleSliderChange}
        className="volume-slider"
        style={{ width: '120px' }}
      />
    </div>
  );
}
