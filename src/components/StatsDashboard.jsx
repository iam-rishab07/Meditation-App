import React from 'react';

export default function StatsDashboard({ stats, onResetStats }) {
  const { totalMinutes = 0, sessionsCompleted = 0, streak = 0 } = stats;

  return (
    <div className="glass-card stats-card">
      <h3 className="section-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        Mindfulness Stats
      </h3>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-val">{totalMinutes.toFixed(1)}</div>
          <div className="stat-lbl">Mins Meditated</div>
        </div>

        <div className="stat-item">
          <div className="stat-val">{sessionsCompleted}</div>
          <div className="stat-lbl">Sessions</div>
        </div>
      </div>

      <div className="stat-item" style={{ gridColumn: 'span 2' }}>
        <div className="stat-val" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: streak > 0 ? '#ff9f43' : 'inherit' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame" style={{ fill: streak > 0 ? '#ff9f43' : 'none' }}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
          {streak} {streak === 1 ? 'Day' : 'Days'}
        </div>
        <div className="stat-lbl">Active Streak</div>
      </div>

      {(sessionsCompleted > 0 || totalMinutes > 0) && (
        <button className="btn-reset-stats" onClick={onResetStats}>
          Reset Progress
        </button>
      )}
    </div>
  );
}
