## Packages
framer-motion | Complex page transitions and hover effects
recharts | Radial bar charts and Radar charts for skill analysis
three | 3D library
@react-three/fiber | React renderer for Three.js
@react-three/drei | Helpers for React Three Fiber
clsx | Utility for constructing className strings conditionally
tailwind-merge | Utility for merging Tailwind CSS classes

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  sans: ["var(--font-sans)"],
  mono: ["var(--font-mono)"],
  display: ["var(--font-display)"],
}
API Endpoint: POST /api/analyze accepts FormData (file) and returns AnalysisResult
Theme: Dark mode only, neon accents, glassmorphism
