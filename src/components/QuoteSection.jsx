import React, { useState, useEffect } from 'react';

const quotes = [
  { text: "Quiet the mind and the soul will speak.", author: "Ma Jaya Sati Bhagavati" },
  { text: "Breathe in deeply to bring your mind home to your body.", author: "Thich Nhat Hanh" },
  { text: "The present moment is filled with joy. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
  { text: "Feelings come and go like clouds. Conscious breathing is my anchor.", author: "Thich Nhat Hanh" },
  { text: "Within you, there is a stillness and a sanctuary to which you can retreat.", author: "Hermann Hesse" },
  { text: "Mindfulness isn't difficult, we just need to remember to do it.", author: "Sharon Salzberg" },
  { text: "The soul always knows what to do to heal itself. The challenge is to silence the mind.", author: "Caroline Myss" }
];

export default function QuoteSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Change quote every 15 seconds (matches the 15s CSS animation cycle)
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[index];

  return (
    <div className="glass-card quote-card">
      {/* Key is set to force re-render and trigger CSS animation on change */}
      <p key={`text-${index}`} className="quote-text">
        "{currentQuote.text}"
      </p>
      <div key={`author-${index}`} className="quote-author">
        — {currentQuote.author}
      </div>
    </div>
  );
}
