<div align="center">

<img src="public/logo.png" alt="FitLog logo" width="56" />

# FitLog

**A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.**

</div>

## Description

FitLog is a workout library and daily planner built from a Figma design. Browse twelve lifts, open a full breakdown of each one, then add it to today's plan or save it for later. Plan and Saved counters in the navbar stay in sync, and everything persists in the browser between visits.

## Technologies Used

| Technology | Purpose |
| --- | --- |
| Next.js 15 (App Router) | Routing, server rendering, API proxy route |
| React 19 | UI and state |
| Tailwind CSS 4 | Styling and responsive layout |
| Lucide React | Icons |
| Fontsource (Oswald, Inter) | Display and body typography |

## Key Features

1. **Workout library** with a responsive 3-column grid of cards showing muscle tags, equipment, duration, calories and rating.
2. **Sort dropdown** to reorder the library by Duration, Calories or Rating.
3. **Detail page** with a two-column layout, key specs, four-step instructions, and Add to today's plan / Save for later actions.
4. **My Plan page** with live Exercises, Minutes and Calories metrics, Today's Plan and Saved tabs, Mark as Done, and Remove.
5. **Live navbar counters** and toast notifications that react to every plan action, with a five-lift daily cap.
6. **Resilient data layer** that falls back to the alternative API and shows loading, error and empty states.
7. **Custom 404 page** and reload-safe routes on every page.

## API

- Primary: `https://api.abcz.workers.dev/api/fitlog`
- Fallback: `https://api.api-store.workers.dev/api/fitlog`
- Single item: append `/:id`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Deployment

Deploy to Vercel by importing the repository. No environment variables are required.
