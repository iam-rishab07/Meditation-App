# 🧘 MindSpace — Immersive Mindfulness & Breathwork

Welcome to **MindSpace**, a premium, highly immersive meditation and breathwork companion designed to help you quiet your mind, breathe consciously, and cultivate daily focus. 

Built using **React + Vite** and styled with a state-of-the-art **Glassmorphic Design System**, MindSpace transforms your web browser into a serene sanctuary free from distractions.

---

## ✨ Immersive Features

### 🌅 Dynamic Atmospheres
Instantly transition between beautifully crafted audio-visual environments that shift the app's mood, color palette, and glowing gradients:
- **Rainy Evening**: Soothing misty-blue aesthetic with ambient rainfall and deep-focus audio.
- **Ocean Breeze**: Warm, sunset-gold aesthetic with gentle rolling waves and anxiety-relieving shore sounds.

### ⏱️ Flexible Session Timer
Control your meditation lengths with ease:
- **Presets**: Quick-select 2-minute, 5-minute, or 10-minute focus sessions.
- **Custom Duration**: Use the custom slider to set any duration from **1 minute to 60 minutes**.
- **Interactive Progress**: An animated SVG progress circle wraps the timer, dynamically filling up as your session progresses.

### 💨 Guided Box Breathing
Synchronize your breath with an interactive breathing guide. The breathing ring dynamically expands, glows, and contracts, walking you through:
- **Inhale** (4 seconds)
- **Hold** (4 seconds)
- **Exhale** (4 seconds)
- **Rest** (4 seconds)

### 📈 Persistent Mindfulness Stats
Stay motivated and monitor your journey. All stats are tracked automatically and stored persistently in `localStorage`:
- **Total Minutes Meditated** (cumulative duration)
- **Sessions Completed** (total sessions)
- **Active Daily Streak** (flame indicator tracking consecutive days of meditation)

### 📺 Fullscreen Focus Mode
Enter a distraction-free state. Toggling **Focus Mode** hides all sidebars, custom controls, and widgets, leaving only the breathing circle and countdown timer floating on top of the cross-fading ambient video background.

### 🧠 Mindful Quotes
Receive gentle reminders to stay present. The footer area features a rotating, fading selection of mindfulness quotes from zen masters and philosophers, changing every 15 seconds.

---

## 🎨 Premium Design System

MindSpace is designed to deliver a modern, premium UX:
- **Glassmorphism**: Elegant transparency effects (`backdrop-filter: blur(18px)`) with thin borders that adapt to the ambient environment.
- **Harmonious Palettes**: Curated dark modes tailored around active theme accents (teal glow for Rain, orange-gold glow for Beach).
- **Smooth Animations**: Pulse effects, scale transitions for cards, and keyframe-fading quotes.
- **Elegant Typography**: Utilizing Google Fonts `Outfit` for high-impact titles and `Inter` for highly legible stats and body text.

---

## 🛠️ Technical Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler & Tooling**: [Vite 8](https://vite.dev/)
- **Styling**: Vanilla CSS (Custom HSL properties, Glassmorphism, CSS keyframe animations)
- **Icons**: Custom vector inline SVGs
- **Database**: LocalStorage for persistent user statistics

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iam-rishab07/Meditation-App.git
   cd Meditation-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser to experience MindSpace.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled assets will be built into the `dist/` directory.

---

## 📂 Project Structure

```
Meditation-App/
├── public/                 # Static assets
│   ├── sounds/             # Ambient audio files (.mp3)
│   ├── video/              # Ambient background loops (.mp4)
│   └── svg/                # SVG assets (play, pause, clouds, waves)
├── src/
│   ├── components/         # Modular React Components
│   │   ├── BreathingGuide.jsx
│   │   ├── QuoteSection.jsx
│   │   ├── StatsDashboard.jsx
│   │   ├── ThemeSelector.jsx
│   │   ├── TimeControls.jsx
│   │   ├── TimerDisplay.jsx
│   │   └── VolumeControl.jsx
│   ├── App.css             # Component overrides
│   ├── App.jsx             # Main Application State & Layout
│   ├── index.css           # Design System tokens & global styles
│   └── main.jsx            # React root mount point
├── index.html              # Shell HTML
├── vite.config.js          # Vite configuration
└── package.json            # Project dependencies & scripts
```

---

## 🤝 Contribution & Credits

Designed and developed with ❤️ by [Rishi](https://github.com/iam-rishab07). Feel free to fork this project, open issues, or submit pull requests to enhance the mindfulness experience!
