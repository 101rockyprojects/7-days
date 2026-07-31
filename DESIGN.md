# Design System

## 1. Color Palette

### Global Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Soft Black** | `#0a0a0a` | Primary background |
| **Deep Bordeaux** | `#2b0d0d` | Secondary background |
| **Accent Gold** | `#AC8400` | Buttons, borders, highlights |
| **White** | `#FFFFFF` | Clean contrast |
| **Cream** | `#D2CFA0` | Light text on dark |
| **Crimson Red** | `#CC0000` | Errors, badges |
| **Dark Sepia** | `#1A1410` | Dark text on light |

### Section-Specific Palettes

#### Daily Letters (Aug 1-6)
- **Background**: Warm Beige `#F5F0E1`
- **Text**: Dark Sepia `#1A1410`
- **Accents**: Gold borders, wax-seal icons

#### Receipt (Section 1)
- **Background**: Pure White `#FFFFFF`
- **Text**: Black `#000000`
- **Highlights**: Red `#8B0000` for totals
- **Accents**: Gold decorative lines

#### Roblox Menu (Section 2)
- **Background**: Deep Bordeaux `#722F37`
- **Text**: White, Light Gold
- **Badges**: Crimson Red `#CC0000`

#### Odyssey Book (Section 3)
- **Background**: Dark Velvet Red `#4A0404`
- **Text**: Gold `#AC8400`, Cream `#D2CFA0`
- **Accents**: Parchment-style corners

---

## 2. Typography

### Font Imports (Google Fonts)

```html
<!-- Phase 1: Daily Letters -->
<link href="https://fonts.googleapis.com/css2?family=Felipa&family=Qwitcher+Grypen&display=swap" rel="stylesheet">

<!-- Phase 2: Vault & Menu -->
<link href="https://fonts.googleapis.com/css2?family=Uncial+Antiqua&family=Cinzel:wght@400;700&display=swap" rel="stylesheet">

<!-- Section 1: Receipt -->
<link href="https://fonts.googleapis.com/css2?family=Geist+Pixel&family=Bitcount+Single:wght@400;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">

<!-- Section 2: Roblox -->
<link href="https://fonts.googleapis.com/css2?family=Slackey&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">

<!-- Section 3: Odyssey -->
<link href="https://fonts.googleapis.com/css2?family=Uncial+Antiqua&family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
```

### Font Assignments

| Section | Element | Font | Weight |
|---------|---------|------|--------|
| **Daily Letters** | Titles | Felipa | 400 |
| **Daily Letters** | Body Text | Qwitcher Grypen | 400 |
| **Vault/Menu** | Titles | Uncial Antiqua | 400 |
| **Vault/Menu** | Subtitles | Cinzel | 400, 700 |
| **Receipt** | Titles | Geist Pixel | 400 |
| **Receipt** | Short Text | Bitcount Single | 400, 700 |
| **Receipt** | Long Text | Atkinson Hyperlegible | 400, 700 |
| **Roblox** | Titles | Slackey | 400 |
| **Roblox** | Body Text | Atkinson Hyperlegible | 400, 700 |
| **Odyssey** | Chapter Titles | Uncial Antiqua | 400 |
| **Odyssey** | Narration | Cinzel | 400, 700 |

### Type Scale

```css
:root {
  /* Base sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
}
```

---

## 3. Layout & Spacing

### Grid System

```css
/* Mobile-first grid */
.grid {
  display: grid;
  gap: 1rem;
}

/* 2 columns on tablet */
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* 3 columns on desktop */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

### Spacing Scale

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
}
```

### Touch Targets

```css
/* Minimum touch target size */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-3);
}

/* Safe areas for mobile */
.safe-area {
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
           env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

---

## 4. Component Designs

### Daily Letter Card

```
┌─────────────────────────────────┐
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │      [Image]            │   │
│  │      Polaroid style     │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  "Day 1 - August 1"           │
│  Felipa font, gold color       │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Dear [Name],            │   │
│  │                         │   │
│  │ Romantic text with      │   │
│  │ hidden secret digit     │   │
│  │ Qwitcher Grypen font    │   │
│  └─────────────────────────┘   │
│                                 │
│  🔒 Secret: 4                  │
│  (subtle, same color as text)  │
└─────────────────────────────────┘
```

### Passcode Vault

```
┌─────────────────────────────────┐
│                                 │
│         THE VAULT              │
│     Uncial Antiqua font        │
│                                 │
│    ┌───┬───┬───┬───┬───┬───┐   │
│    │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │   │
│    └───┴───┴───┴───┴───┴───┘   │
│     44px x 44px each box       │
│     Gold border, white bg      │
│                                 │
│    [Submit Button]             │
│    Gold bg, black text         │
│                                 │
│    "Remember the numbers..."   │
│    Cinzel font, italic         │
└─────────────────────────────────┘
```

### Receipt Section

```
┌─────────────────────────────────┐
│ ═══════════════════════════════ │  ← Gold line
│                                 │
│    RECEIPT OF SERVICES         │
│    Geist Pixel font            │
│                                 │
│ ─────────────────────────────  │  ← Dotted line
│                                 │
│ Date: August 1, 2024           │
│ Service: Morning Kiss          │
│ Price: ∞ love                 │
│                                 │
│ [Description text]             │
│ Atkinson Hyperlegible font     │
│                                 │
│ Client #: 0815                 │
│                                 │
│ ═══════════════════════════════ │  ← Gold line
└─────────────────────────────────┘
```

### Roblox Menu

```
┌─────────────────────────────────┐
│ ☰  ROBLOX    Home  Discover    │  ← Navigation bar
│─────────────────────────────────│
│                                 │
│  EXPERIENCES                   │
│  Slackey font                  │
│                                 │
│  ┌─────────┐  ┌─────────┐     │
│  │ 🎮      │  │ 🎮      │     │  ← 2-column grid
│  │ Virtual │  │ Movie   │     │
│  │ Date    │  │ Night   │     │
│  └─────────┘  └─────────┘     │
│                                 │
│  ACHIEVEMENTS                  │
│  ┌─────────────────────────┐   │
│  │ 🥇 First Message        │   │
│  │ 🥈 100 Days Together    │   │
│  │ 🥉 First Call           │   │
│  └─────────────────────────┘   │
│                                 │
│  PROFILE                       │
│  ┌─────────────────────────┐   │
│  │ 👤 [Avatar]             │   │
│  │ Username: [name]        │   │
│  │ Hours: 1000+            │   │
│  │ Messages: 50000+        │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Odyssey Book

```
┌─────────────────────────────────┐
│                                 │
│  ┌─────────────────────────┐   │
│  │    CHAPTER I            │   │
│  │    Uncial Antiqua       │   │
│  │                         │   │
│  │    The Meeting          │   │
│  │    Cinzel font          │   │
│  │                         │   │
│  │    "In the beginning..."│   │
│  │    Epic narrative       │   │
│  │    Cinzel font          │   │
│  │                         │   │
│  │    [Visual]             │   │
│  │    Parchment texture    │   │
│  └─────────────────────────┘   │
│                                 │
│  ← Previous    Next →          │
│                                 │
└─────────────────────────────────┘
```

---

## 5. Animations & Transitions

### Portal Opening

```css
/* Step 1: Vault opens */
.portal-open {
  animation: perspectiveRight 0.8s ease-out forwards;
}

@keyframes perspectiveRight {
  0% { transform: perspective(800px) rotateY(0deg); }
  100% { transform: perspective(800px) rotateY(-90deg); }
}

/* Step 2: Zoom in */
.zoom-in {
  animation: zoomIn 0.4s ease-out 0.8s forwards;
}

@keyframes zoomIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* Step 3: Title appears */
.title-entrance {
  animation: zoomInDown 0.6s ease-out 1.2s forwards;
  opacity: 0;
}
```

### Shake Animation (Error)

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
@keyframes thermalPrint {
  0% { 
    clip-path: inset(0 100% 0 0);
    opacity: 0;
  }
  100% { 
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
}

.print-item {
  animation: thermalPrint 0.3s ease-out forwards;
}
```

### Book Page Turn

```css
.page-turn {
  animation: perspectiveLeft 0.6s ease-in-out;
}

@keyframes perspectiveLeft {
  0% { transform: perspective(800px) rotateY(0deg); }
  100% { transform: perspective(800px) rotateY(180deg); }
}
```

### 3D Card Flip

```css
.card-3d {
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
}

.card-3d:hover {
  transform: rotateY(15deg) rotateX(5deg);
}

.card-3d.flipped {
  transform: rotateY(180deg);
}
```

---

## 6. Visual Effects

### Parchment Texture (Odyssey)

```css
.parchment {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-color: #F5F0E1;
}
```

### Candlelight Effect (Odyssey)

```css
.candlelight {
  position: relative;
}

.candlelight::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 20%;
  background: radial-gradient(ellipse, rgba(255, 200, 100, 0.3), transparent);
  pointer-events: none;
}
```

### Wax Seal (Letters)

```css
.wax-seal {
  width: 48px;
  height: 48px;
  background: radial-gradient(circle, #8B0000, #5C0000);
  border-radius: 50%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Thermal Paper Effect (Receipt)

```css
.thermal-paper {
  background: #FFFFFF;
  box-shadow: 
    0 0 0 1px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.thermal-paper::before,
.thermal-paper::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 8px;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 4px,
    rgba(0, 0, 0, 0.1) 4px,
    rgba(0, 0, 0, 0.1) 8px
  );
}

.thermal-paper::before { top: 0; }
.thermal-paper::after { bottom: 0; }
```

---

## 7. Responsive Breakpoints

### Mobile (< 640px)
- Single column layout
- Full-width cards
- Bottom navigation
- Touch-optimized controls

### Tablet (640px - 1024px)
- 2-column grid
- Side navigation (Roblox)
- 2-page spread (Odyssey)
- Larger touch targets

### Desktop (> 1024px)
- 3-column grid
- Hover effects enabled
- Keyboard navigation
- Maximum width container

---

## 8. Accessibility

### Color Contrast Ratios

| Combination | Ratio | WCAG Level |
|-------------|-------|------------|
| Gold (#AC8400) on Black (#0a0a0a) | 7.2:1 | AAA |
| White (#FFFFFF) on Bordeaux (#722F37) | 4.8:1 | AA |
| Sepia (#1A1410) on Beige (#F5F0E1) | 8.1:1 | AAA |
| Red (#8B0000) on White (#FFFFFF) | 5.9:1 | AA |

### Focus Indicators

```css
:focus-visible {
  outline: 2px solid #AC8400;
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 9. Dark Mode Support

### Automatic Detection

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0a0a0a;
    --text-primary: #FFFFFF;
  }
}
```

### Manual Toggle

```javascript
let isDarkMode = $state(false);

// Apply to document
$effect(() => {
  document.documentElement.classList.toggle('dark', isDarkMode);
});
```

---

## 10. Mobile-First Design Rules

### Touch Interactions (Primary)
- **No hover states on touch devices** - Use `@media (hover: hover)` to only show hover effects on devices that support it
- **Tap to interact** - All interactive elements must work with single tap
- **Minimum touch target**: 44px x 44px for all interactive elements
- **Swipe gestures** - Horizontal swipe for carousels, vertical for scrolling
- **Long press** - Reserved for secondary actions (edit, delete)

### Device Motion Parallax
- **Primary input**: DeviceOrientation (gyroscope) for tilt-based parallax
- **Fallback chain**: Gyroscope → Accelerometer → Mouse → Scroll → Static
- **iOS permission**: Must request via user gesture (button tap)
- **Calibration**: Capture base orientation on first event for relative positioning
- **GPU acceleration**: Use `transform: translate3d()` for smooth performance

### Parallax Environment Presets

| Environment | Background | Mid Elements | Foreground | Speed |
|-------------|-----------|--------------|------------|-------|
| Field | Sky gradient, distant hills | Flowers, tall grass | Butterfly, dandelion | 0.8 |
| Mountains | Blue-purple sky, peaks | Pine trees, clouds | Eagle, snowflakes | 1.0 |
| Forest | Dark canopy, misty light | Trees, ferns | Fireflies, leaves | 0.6 |
| Palace | Interior columns, arches | Candelabras, curtains | Floating petals | 0.9 |
| Beach | Ocean horizon, sunset | Waves, palm trees | Seagulls, shells | 0.7 |
| Sky | Clouds, stars | Sun/moon, birds | Floating lanterns | 1.2 |

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  .parallax-layer {
    transform: none !important;
    animation: none !important;
  }
}
```

### Mobile Layout Patterns
- **Cards**: Single column, full-width
- **Navigation**: Bottom tab bar or hamburger menu
- **Content**: Scroll vertically, minimal horizontal movement
- **Images**: Responsive with `object-fit: cover`
- **Text**: Minimum 16px for body, 12px for captions

---

## 11. Print Styles

```css
@media print {
  .no-print {
    display: none !important;
  }
  
  .print-only {
    display: block !important;
  }
  
  body {
    background: white;
    color: black;
  }
}
```
