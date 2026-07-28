# 7 Days of August

An interactive romantic virtual gift for a long-distance partner. A single-page web application featuring daily letter reveals (Aug 1-6) and a passcode-protected vault with three interactive sections celebrating 3 years of love.

## Overview

This project creates a magical, multi-phase experience:

- **Phase 1 (Aug 1-6)**: Daily letters with romantic messages and hidden secret digits
- **Phase 2 (Aug 7)**: A passcode vault that unlocks the main portal
- **Phase 3**: Three interactive sections representing relationship milestones:
  - The Receipt of Services (humorous love "receipt")
  - Roblox Menu (nostalgic gaming memories)
  - The Odyssey Book (epic relationship narrative)

## Tech Stack

- **Framework**: SvelteKit 2
- **Language**: Svelte 5 (Runes only: `$state`, `$effect`, `$derived`, `$props`)
- **Styling**: Tailwind CSS
- **Animations**: 
  - [Magic CSS](https://www.minimamente.com/project/magic/) (perspectiveRight, perspectiveLeft)
  - [Animate.css](https://animate.style/) (zoomInDown)
- **Data**: External JSON files for all content

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Development Mode

To test all dates without waiting, add `?dev=true` to the URL:

```
http://localhost:5173/?dev=true
```

In dev mode, you can also use `?day=1` through `?day=7` to simulate specific days.

## Project Structure

```
7-days-august/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── LetterCard.svelte
│   │   │   ├── DayMenu.svelte
│   │   │   ├── PasscodeInput.svelte
│   │   │   ├── MainMenu.svelte
│   │   │   ├── ReceiptSection.svelte
│   │   │   ├── RobloxSection.svelte
│   │   │   └── OdysseyBook.svelte
│   │   ├── data/
│   │   │   ├── index.json
│   │   │   ├── letters.json
│   │   │   ├── receipt.json
│   │   │   ├── roblox.json
│   │   │   └── odyssey.json
│   │   └── utils/
│   │       └── dateUtils.js
│   ├── routes/
│   │   ├── +layout.svelte
│   │   └── +page.svelte
│   ├── app.css
│   └── app.html
├── static/
│   └── images/
├── SPEC.md
├── DESIGN.md
└── package.json
```

## Customization

### Adding Your Content

1. **Replace images**: Add your photos to `static/images/`
2. **Edit text**: Modify the JSON files in `src/lib/data/`
3. **Update dates**: Change the date range in `src/lib/data/index.json`

### JSON Data Files

- `index.json`: Global config (partner name, passcode, date range)
- `letters.json`: Daily letter content (6 letters)
- `receipt.json`: Receipt of services items
- `roblox.json`: Gaming experiences and achievements
- `odyssey.json`: Book chapters for the relationship narrative

## Deployment

This project is ready for deployment on:

- **Vercel**: `vercel deploy`
- **Netlify**: Connect your Git repository
- **Static hosting**: Run `pnpm build` and upload the `build` folder

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-optimized (iOS Safari, Chrome for Android)
- Responsive design for tablets and desktops

## License

Private project - All rights reserved.
