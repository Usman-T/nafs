# Nafs

**Nafs** is a modern Islamic self-discipline and behavior design platform built for Muslim youth. It combines Islamic principles with structured habit-building, Qur'anic reflection, and challenge-based progression — delivered through a high-performance, mobile-first Progressive Web App (PWA) architecture.

<p align="center">
  <img src="https://github.com/user-attachments/assets/2997b457-d9cb-4265-9f24-c399b06f9840" />
</p>

---

## Overview

Nafs is not just a habit tracker. It’s a spiritual framework modeled around the Islamic understanding of *Nafs* — the inner self — and engineered as a daily driver for self-correction (`tazkiyah`), consistency (`mujahada`), and intentionality (`niyyah`). Through task completion, challenge systems, streaks, and daily Qur’anic guidance, users can actively realign behavior to higher values.

---

## Tech Stack

| Layer           | Toolset                                                                 |
|----------------|-------------------------------------------------------------------------|
| Frontend        | Next.js (App Router), Tailwind CSS, shadcn/ui                          |
| Backend Logic   | Next.js Server Actions (no `/api`), Prisma ORM                         |
| Database        | PostgreSQL via Prisma Accelerate                                       |
| Authentication  | Next-Auth (JWT strategy), route protection via middleware              |
| State & Caching | LocalStorage (task/day state), Redis (auth/session token caching)      |
| Deployment      | Vercel                                                                  |
| PWA/TWA Support | Bubblewrap (for TWA), Servist (custom service worker)                  |
| CDN Audio       | Quran CDN integration with native `<audio>` fallback                    |

---

## Core Features

### Authentication

- Google OAuth + Email/Password login.
- Stateless JWT session system via Next-Auth.
- Middleware enforcement for route-level access.

<p align="center">
  <img src="https://github.com/user-attachments/assets/4189fa7d-0896-4786-a4bf-e2293634a27e" width="240"/>
  <img src="https://github.com/user-attachments/assets/1ae617fe-aba9-45a2-ae48-f9ffac57435c" width="240"/>
</p>

---

### Onboarding Flow
<p align="center">
  <img src="https://github.com/user-attachments/assets/fe959822-2c2a-467e-b6a1-b7993eacd32b" width="220"/>
  <img src="https://github.com/user-attachments/assets/f96aed50-1b17-4ebc-b0a3-bfc7957aa3d7" width="220"/>
  <img src="https://github.com/user-attachments/assets/82f216f8-7516-44f2-aacd-b590c96d6d4d" width="220"/>
  <img src="https://github.com/user-attachments/assets/545fdfa2-d6f5-4443-8f78-42595f462d54" width="220"/>
  <img src="https://github.com/user-attachments/assets/7e80534d-d9af-4914-b35e-371e1ac860a8" width="220"/>
  <img src="https://github.com/user-attachments/assets/e0944cbb-54c2-4832-b685-5fccc405adde" width="220"/>
</p>

---

### Challenge & Task Engine

- Auto-enrollment into spiritual or behavioral challenges.
- Dual-task system: required (1 pt) and optional (2 pts).
- Completion gates: daily completion, challenge duration, and streak reset.

<p align="center">
  <img src="https://github.com/user-attachments/assets/67bb02d9-6d3e-4e91-8bae-2d65e10b5292" width="220"/>
  <img src="https://github.com/user-attachments/assets/541f575e-51c1-4fd4-a1a8-cd8e37aeef8b" width="220"/>
  <img src="https://github.com/user-attachments/assets/8073fdb4-2801-4555-8cd2-a756a1e3e018" width="220"/>
  <img src="https://github.com/user-attachments/assets/937363df-adf9-406a-a3e8-35e5364c05de" width="220"/>
</p>

---

### Streaks & Progression

- Streak resolution logic based on time deltas and challenge state.
- Radar chart reflects growth across spiritual dimensions (Iman, discipline, etc.).
- Fallback and streak-breaking logic handled in `/challenges`.

<p align="center">
  <img src="https://github.com/user-attachments/assets/42e1a75e-c011-435e-b803-6ce7896516da" width="220"/>
  <img src="https://github.com/user-attachments/assets/e365b3e7-ea96-495b-bcfe-e5855134eaa0" width="220"/>
  <img src="https://github.com/user-attachments/assets/98bab9af-27f4-4d17-8314-4b706b2b7206" width="220"/>
  <img src="https://github.com/user-attachments/assets/027ec47a-6690-4c5f-ac6b-8ddcbed7de66" width="220"/>
</p>

---

## Qur’an Guidance

- “Ayah of the Day” with dynamic tafsir and CDN-backed audio streaming.
- Surah and ayah explorer with individual tafsir pages.
- Save and reflect on specific verses via personal journal system.

<p align="center">
  <img src="https://github.com/user-attachments/assets/1f2eb0cc-51db-4a73-b692-0a39de3eea4c" />
</p>

---

##  Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/nafs.git
cd nafs
docker-compose up --build
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:12345678@postgres:5432/nafs?schema=public
AUTH_SECRET=...
KV_URL=...
KV_REST_API_TOKEN=...
QURAN_API_CLIENT_ID=...
QURAN_API_CLIENT_SECRET=...
```

Run DB setup:

```bash
bun install
bunx prisma generate
bunx prisma migrate dev
```

Seed data (in browser):

```
/api/seed/dimensions
/api/seed/challenges
```

## Architecture Notes

* **Rendering Strategy**: Server Components for all SSR routes with granular Client Components nested for interactivity (animations, gestures).
* **Form Actions**: All side-effects (e.g. challenge completion, reflections) go through `app/actions.ts` using Next 13+ actions pipeline.
* **Fetching**: All data fetching logic is colocated in `data.ts` and parameterized by session.
* **Security**: Middleware-based route guards, token signature validation, and session state enforcement.
* **Offline Support**: Custom `offline.tsx`, Bubblewrap + Servist handles TWA/PWA logic.

---

## Roadmap

* [x] Onboarding flow
* [x] Challenge/task completion
* [x] Streak system & day-lock
* [x] Qur’an explorer + reflections
* [ ] Audio player (ayah/surah level)
* [ ] Offline caching / manifest polish
* [ ] Google Play Billing integration
* [ ] Launch blog + open feedback
* [ ] Contributor guide and schema docs

---

## License

MIT — Free to use, fork, and contribute.
