# Parallax System Plan

## Overview

Mobile-first parallax system for the cards section (MainMenu). Uses device orientation/gyroscope as primary input, with mouse/scroll fallbacks. Reusable components with centralized configuration.

## Architecture

```
src/lib/
├── config/
│   └── parallax.js          # Centralized parallax presets (environments, speeds, assets)
├── components/
│   ├── ParallaxScene.svelte  # Container that detects input source and provides values
│   ├── ParallaxLayer.svelte  # Individual depth layer (background, mid, foreground)
│   └── EnvironmentCard.svelte # Card with parallax environment background
├── composables/
│   └── useDeviceMotion.svelte.js  # Device orientation/motion hook with fallbacks
└── assets/
    └── environments/         # SVG illustrations for each environment
```

## Environment Presets

| Environment | Background | Mid Elements | Foreground Elements | Speed Multiplier |
|-------------|-----------|--------------|---------------------|------------------|
| Field | Sky gradient, distant hills | Flowers, tall grass | Butterfly, dandelion | 0.8 |
| Mountains | Blue-purple sky, distant peaks | Pine trees, clouds | Eagle, snowflakes | 1.0 |
| Forest | Dark canopy, misty light | Trees, ferns | Fireflies, leaves | 0.6 |
| Palace | Interior columns, arched ceiling | Candelabras, curtains | Floating petals | 0.9 |
| Beach | Ocean horizon, sunset sky | Waves, palm trees | Seagulls, shells | 0.7 |
| Sky | Clouds, stars | Sun/moon, birds | Floating lanterns | 1.2 |

## Input Source Hierarchy

1. **DeviceOrientation** (gyroscope) - Primary for mobile
2. **DeviceMotion** (accelerometer) - Fallback for devices without gyroscope
3. **Mouse position** - Desktop fallback
4. **Scroll position** - Additional depth effect
5. **Static** - No parallax, still looks good

## Mobile Adaptations

- No hover states on touch devices
- Tap to interact instead of hover
- Permission request button for iOS motion sensors
- `prefers-reduced-motion` respected
- Touch-friendly hit targets (min 44px)

## Files to Create

### 1. `src/lib/config/parallax.js`
Centralized configuration for all parallax environments.

### 2. `src/lib/composables/useDeviceMotion.svelte.js`
Svelte 5 rune-based composable for device sensors.

### 3. `src/lib/components/ParallaxScene.svelte`
Container component that manages input sources and provides tilt values.

### 4. `src/lib/components/ParallaxLayer.svelte`
Individual depth layer with speed-based transform.

### 5. `src/lib/components/EnvironmentCard.svelte`
Card component with parallax environment background.

### 6. `static/assets/environments/*.svg`
SVG illustrations for each environment (placeholders with gradients).

### 7. Update `DESIGN.md`
Add mobile-first rules and parallax guidelines.

### 8. Update `SPEC.md`
Add parallax system specification and API documentation.

## Visual Design

### Environment Card Structure
```
┌─────────────────────────────────┐
│  [Background Layer - slowest]   │  Sky, distant elements
│  ┌─────────────────────────┐    │
│  │  [Mid Layer - medium]   │    │  Trees, buildings, waves
│  │  ┌─────────────────┐    │    │
│  │  │ [Card Content]  │    │    │  Title, description, icon
│  │  └─────────────────┘    │    │
│  │  [Foreground - fastest] │    │  Particles, close elements
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

### Color Palette per Environment
- **Field**: Greens (#4CAF50, #81C784), sky blue (#87CEEB)
- **Mountains**: Purples (#9C27B0, #7B1FA2), snow white (#FFFFFF)
- **Forest**: Dark greens (#1B5E20, #2E7D32), misty gray (#9E9E9E)
- **Palace**: Golds (#FFD700, #FFA000), deep reds (#B71C1C)
- **Beach**: Ocean blues (#0288D1, #03A9F4), sand (#F5DEB3)
- **Sky**: Light blues (#03A9F4, #29B6F6), sunset orange (#FF9800)

## Implementation Notes

- Use `transform: translate3d()` for GPU acceleration
- CSS custom properties bridge JS sensors to CSS transforms
- All animations wrapped in `@media (prefers-reduced-motion: no-reduce)`
- `requestAnimationFrame` for smooth updates
- Cleanup event listeners in `onDestroy`/`$effect` cleanup
