import React from 'react';

export default function TimerDisplay({
  timeLeft,
  duration,
  isPlaying,
  onTogglePlay,
  statusText = "Focus"
}) {
  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Circle Geometry
  const radius = 140;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius; // Approx 879.64
  
  // Calculate current elapsed time
  const elapsed = duration - timeLeft;
  
  // Calculate progress offset:
  // Offset of 879.64 = empty circle
  // Offset of 0 = full circle
  const progressOffset = circumference - (elapsed / duration) * circumference;

  return (
    <div className="player-outer">
      <div className="player-core">
        {/* SVG Progress Circle */}
        <svg className="timer-rings" width="320" height="320" viewBox="0 0 320 320">
          {/* Background Track */}
          <circle
            className="track-outline"
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
          />
          {/* Moving Outline */}
          <circle
            className="moving-outline"
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={isNaN(progressOffset) ? circumference : progressOffset}
          />
        </svg>

        {/* Central Controls */}
        <div className="center-controls" onClick={onTogglePlay}>
          <button className="play-pause-btn" aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? (
              // Pause Icon
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              // Play Icon
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <div className="time-display">{formatTime(timeLeft)}</div>
          <div className="timer-subtext">{isPlaying ? statusText : "Ready"}</div>
        </div>
      </div>
    </div>
  );
}
