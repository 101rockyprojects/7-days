# Technical Specification

## 1. Project Overview

**Name**: 7 Days of August  
**Type**: Single-page web application (SPA)  
**Purpose**: Interactive romantic virtual gift for long-distance partner  
**Target**: Mobile and tablet devices (portrait/landscape)

---

## 2. Technical Stack

### Core Framework
- **SvelteKit 2**: `@sveltejs/kit` v2.63.0+
- **Svelte 5**: v5.56.0+ (Runes mode exclusively)
- **Vite**: v8.0.0+

### Styling
- **Tailwind CSS**: v3.4.0+
- **PostCSS**: v8.4.0+
- **Autoprefixer**: v10.4.0+

### Animation Libraries
- **Magic CSS**: `https://www.minimamente.com/project/magic/`
  - `perspectiveRight` - Portal opening animation
  - `perspectiveLeft` - Book page turn animation
- **Animate.css**: `https://animate.style/`
  - `animate__zoomInDown` - Title entrance animation

### Data Management
- External JSON files (no hardcoded content)
- Local browser date detection
- URL query parameter overrides for testing

---

## 3. Data Architecture

### File Structure
```
src/lib/data/
├── index.json      # Global configuration
├── letters.json    # Daily letter content
├── receipt.json    # Receipt of services
├── roblox.json     # Gaming section data
└── odyssey.json    # Book chapters
```

### JSON Schemas

#### index.json
```json
{
  "partnerName": "string",
  "passcode": "string (6 digits)",
  "dateRange": {
    "start": "2024-08-01",
    "end": "2024-08-07"
  },
  "comfortMessages": ["string array"],
  "hints": ["string array"]
}
```

#### letters.json
```json
[
  {
    "day": "number (1-6)",
    "date": "string (e.g., 'August 1')",
    "text": "string (romantic message)",
    "imageUrl": "string (path to image)",
    "secretDigit": "number (0-9)"
  }
]
```

#### receipt.json
```json
[
  {
    "date": "string",
    "service": "string",
    "price": "string (e.g., '∞ love')",
    "description": "string",
    "clientNumber": "string (e.g., birthday)"
  }
]
```

#### roblox.json
```json
{
  "experiences": [
    {
      "title": "string",
      "description": "string",
      "image": "string"
    }
  ],
  "achievements": [
    {
      "title": "string",
      "icon": "string (emoji or icon name)"
    }
  ],
  "profile": {
    "username": "string",
    "bio": "string",
    "stats": {
      "hoursTalked": "number",
      "messagesSent": "number",
      "daysTogether": "number"
    }
  }
}
```

#### odyssey.json
```json
[
  {
    "pageNumber": "number",
    "title": "string (chapter title)",
    "narration": "string (epic narrative text)",
    "visualUrl": "string (image path)"
  }
]
```

---

## 4. Component Architecture

### Core Components

#### LetterCard.svelte
- **Props**: `day`, `date`, `text`, `imageUrl`, `secretDigit`, `isUnlocked`
- **State**: `$state(isVisible)`, `$state(showSecret)`
- **Behavior**: Displays romantic letter with hidden secret digit

#### DayMenu.svelte
- **Props**: `currentDay`, `unlockedDays`, `onSelect`
- **State**: `$state(selectedDay)`
- **Behavior**: Horizontal/vertical timeline navigation

#### PasscodeInput.svelte
- **Props**: `correctPasscode`, `onSuccess`, `onError`
- **State**: `$state(inputDigits)`, `$state(errorState)`, `$state(isShaking)`
- **Behavior**: 6-digit input with validation and animations

#### MainMenu.svelte
- **Props**: `onSectionSelect`
- **State**: `$state(selectedSection)`
- **Behavior**: 3D card grid for section selection

#### ReceiptSection.svelte
- **Props**: `items`
- **State**: `$state(scrollProgress)`, `$state(printedItems)`
- **Behavior**: Custom scroll printing animation

#### RobloxSection.svelte
- **Props**: `data`
- **State**: `$state(activeTab)`, `$state(selectedExperience)`
- **Behavior**: Tabbed interface with experiences, achievements, profile

#### OdysseyBook.svelte
- **Props**: `pages`
- **State**: `$state(currentPage)`, `$state(isFlipping)`
- **Behavior**: Page-turning book with 3D transitions

---

## 5. State Management

### Global State (using Svelte 5 Runes)

```javascript
// App-level state
let currentPhase = $state('letters'); // 'letters' | 'vault' | 'menu' | 'section'
let currentDay = $state(1);
let isDevMode = $state(false);
let passcodeVerified = $state(false);

// Derived state
let unlockedDays = $derived(
  isDevMode ? [1,2,3,4,5,6,7] : getUnlockedDays(currentDay)
);

let canAccessVault = $derived(
  isDevMode || currentDay >= 7
);
```

### Side Effects

```javascript
// Date checking effect
$effect(() => {
  const now = new Date();
  const month = now.getMonth(); // 0 = January
  const day = now.getDate();
  
  if (month === 7 && day >= 1 && day <= 7) { // August
    currentDay = day;
  }
});

// URL parameter parsing
$effect(() => {
  const params = new URLSearchParams(window.location.search);
  isDevMode = params.get('dev') === 'true';
  
  if (isDevMode && params.has('day')) {
    currentDay = parseInt(params.get('day'));
  }
});
```

---

## 6. Animation Specifications

### Portal Opening (Passcode Success)
1. Trigger `perspectiveRight` class on vault container
2. After 800ms, apply zoom-in effect (scale from 0.8 to 1)
3. After 1200ms, animate title with `animate__zoomInDown`

### Shake Animation (Passcode Error)
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.shake {
  animation: shake 0.5s ease-in-out;
}
```

### Receipt Printing
```css
@keyframes print {
  from { 
    clip-path: inset(0 100% 0 0);
    opacity: 0;
  }
  to { 
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
}

.print-item {
  animation: print 0.3s ease-out forwards;
}
```

### Book Page Turn
- Use `perspectiveLeft` from Magic CSS
- Apply 3D transform: `rotateY(-180deg)`
- Transition duration: 600ms
- Easing: `ease-in-out`

---

## 7. Date Handling Logic

### Auto-Unlock System
```javascript
function getUnlockedDays(currentDay) {
  const days = [];
  for (let i = 1; i <= Math.min(currentDay, 7); i++) {
    days.push(i);
  }
  return days;
}
```

### Dev Mode Override
```javascript
function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  
  return {
    isDevMode: params.get('dev') === 'true',
    simulatedDay: params.has('day') ? parseInt(params.get('day')) : null
  };
}
```

### Date Comparison
```javascript
function isDateInRange(date, start, end) {
  const d = new Date(date);
  const s = new Date(start);
  const e = new Date(end);
  
  return d >= s && d <= e;
}
```

---

## 8. Responsive Design

### Breakpoints
- **Mobile**: < 640px (base design)
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
```css
/* Base styles (mobile) */
.container {
  padding: 1rem;
}

/* Tablet */
@media (min-width: 640px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Touch Targets
- Minimum size: 44px x 44px
- Spacing between targets: 8px minimum

---

## 9. Accessibility Requirements

### Audio Controls
- Play/pause buttons with visible state
- Mute toggle with icon change
- Volume slider with labeled min/max
- Keyboard navigation (Tab, Enter, Space)
- ARIA labels for all controls

### Color Contrast
- WCAG AA compliance (4.5:1 for normal text)
- Test gold (#AC8400) on dark backgrounds
- Provide fallback colors for low contrast

### Keyboard Navigation
- All interactive elements focusable
- Visible focus indicators
- Logical tab order

---

## 10. Performance Considerations

### Image Optimization
- Use WebP format where supported
- Implement lazy loading for images
- Provide responsive image sizes

### Animation Performance
- Use `transform` and `opacity` only
- Avoid layout thrashing
- Use `will-change` for animated elements

### Bundle Size
- Code-split by route
- Tree-shake unused CSS
- Compress JSON data files

---

## 11. Deployment

### Vercel Configuration
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "build",
  "framework": "sveltekit"
}
```

### Environment Variables
No server-side environment variables required. All configuration is client-side via JSON files.

---

## 12. Parallax System

### Architecture
```
src/lib/
├── config/
│   └── parallax.js              # Centralized presets
├── components/
│   ├── ParallaxScene.svelte     # Container with input detection
│   ├── ParallaxLayer.svelte     # Depth layer component
│   └── EnvironmentCard.svelte   # Card with environment background
├── composables/
│   └── useDeviceMotion.svelte.js # Device sensor hook
└── assets/
    └── environments/            # SVG/gradient placeholders
```

### Input Source Hierarchy
1. **DeviceOrientation** (gyroscope) - Mobile primary
2. **DeviceMotion** (accelerometer) - Fallback
3. **Mouse position** - Desktop fallback
4. **Scroll position** - Additional depth
5. **Static** - No parallax, still looks good

### Device Motion API
```javascript
// iOS requires permission request
async function requestMotionPermission() {
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    const permission = await DeviceOrientationEvent.requestPermission();
    return permission === 'granted';
  }
  return true; // Non-iOS: no permission needed
}

// Capture base orientation for relative positioning
let baseOrientation = null;
window.addEventListener('deviceorientation', (e) => {
  if (!baseOrientation) {
    baseOrientation = { beta: e.beta, gamma: e.gamma };
  }
  const relBeta = e.beta - baseOrientation.beta;
  const relGamma = (e.gamma - baseOrientation.gamma) * -1;
});
```

### Parallax Layer Component
```svelte
<script>
  let { speed = 0.5, tiltX = 0, tiltY = 0, children } = $props();
  
  let layerY = $derived(tiltY * speed);
  let layerX = $derived(tiltX * speed);
</script>

<div style="transform: translate3d({layerX}px, {layerY}px, 0)">
  {@render children?.()}
</div>
```

### Performance Requirements
- Use `transform` and `opacity` only (no layout thrashing)
- `will-change: transform` for animated layers
- `requestAnimationFrame` for smooth updates
- Cleanup event listeners in `onDestroy`

---

## 13. Testing

### Manual Testing Checklist
- [ ] Date-based content unlock works correctly
- [ ] Dev mode (`?dev=true`) overrides date restrictions
- [ ] Passcode validation triggers correct animations
- [ ] All sections render properly on mobile/tablet
- [ ] Audio controls are accessible via keyboard
- [ ] Custom scroll works in receipt section
- [ ] Book page turns are smooth

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari
- Chrome for Android
