<h1 align="center">🕌 Nafs</h1>

<p align="center"><i>Spiritual Self-Discipline, Engineered for the Muslim Soul.</i></p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/2997b457-d9cb-4265-9f24-c399b06f9840" width="250" />
</p>

---

## 🌱 What is Nafs?

**Nafs** helps Muslim youth build Islamic discipline through:

- 📆 Task-based challenges with streaks  
- 📖 Daily Qur’an reflections with audio & tafsir  
- 📊 Spiritual growth tracking via animated radar charts  
- 💬 Reflection journals  
- 📱 Offline-first mobile experience (TWA/PWA)  

Built around the Qur'anic idea of *nafs*, and engineered for modern Muslims.

---

## 📸 Full UI Showcase

<details>
<summary>🧭 Onboarding Flow</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/fe959822-2c2a-467e-b6a1-b7993eacd32b" width="180"/>
  <img src="https://github.com/user-attachments/assets/f96aed50-1b17-4ebc-b0a3-bfc7957aa3d7" width="180"/>
  <img src="https://github.com/user-attachments/assets/82f216f8-7516-44f2-aacd-b590c96d6d4d" width="180"/>
  <img src="https://github.com/user-attachments/assets/545fdfa2-d6f5-4443-8f78-42595f462d54" width="180"/>
  <img src="https://github.com/user-attachments/assets/7e80534d-d9af-4914-b35e-371e1ac860a8" width="180"/>
  <img src="https://github.com/user-attachments/assets/e0944cbb-54c2-4832-b685-5fccc405adde" width="180"/>
</p>
</details>

<details>
<summary>💡 Challenge & Task Engine</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/67bb02d9-6d3e-4e91-8bae-2d65e10b5292" width="180"/>
  <img src="https://github.com/user-attachments/assets/541f575e-51c1-4fd4-a1a8-cd8e37aeef8b" width="180"/>
  <img src="https://github.com/user-attachments/assets/8073fdb4-2801-4555-8cd2-a756a1e3e018" width="180"/>
  <img src="https://github.com/user-attachments/assets/937363df-adf9-406a-a3e8-35e5364c05de" width="180"/>
</p>
</details>

<details>
<summary>📊 Streaks & Radar Progress</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/42e1a75e-c011-435e-b803-6ce7896516da" width="180"/>
  <img src="https://github.com/user-attachments/assets/e365b3e7-ea96-495b-bcfe-e5855134eaa0" width="180"/>
  <img src="https://github.com/user-attachments/assets/98bab9af-27f4-4d17-8314-4b706b2b7206" width="180"/>
  <img src="https://github.com/user-attachments/assets/027ec47a-6690-4c5f-ac6b-8ddcbed7de66" width="180"/>
</p>
</details>

<details>
<summary>📖 Qur’an Viewer</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/1f2eb0cc-51db-4a73-b692-0a39de3eea4c" width="250"/>
</p>
</details>

<details>
<summary>🔐 Auth Flow</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/4189fa7d-0896-4786-a4bf-e2293634a27e" width="200"/>
  <img src="https://github.com/user-attachments/assets/1ae617fe-aba9-45a2-ae48-f9ffac57435c" width="200"/>
</p>
</details>

---

## ⚙️ Tech Stack

| Layer        | Tools                                                  |
|--------------|--------------------------------------------------------|
| Frontend     | Next.js App Router, Tailwind CSS, shadcn/ui            |
| Backend      | Next.js Server Actions, all logic in `lib/actions.ts`  |
| Database     | PostgreSQL via Prisma Accelerate                       |
| Auth         | NextAuth (JWT), middleware-protected routes            |
| Caching      | Redis (auth/session), LocalStorage (day/task state)    |
| Deployment   | Vercel                                                 |
| PWA/TWA      | Bubblewrap + Servist (custom service worker)           |
| Audio        | Qur’an CDN + `<audio>` fallback                        |

---

## 🚀 Get Started

```bash
git clone https://github.com/Usman-T/nafs.git
cd nafs
docker-compose up --build
````

Then create your `.env`:

```env
DATABASE_URL=postgresql://postgres:12345678@postgres:5432/nafs?schema=public
AUTH_SECRET=your_secret
KV_URL=...
KV_REST_API_TOKEN=...
QURAN_API_CLIENT_ID=...
QURAN_API_CLIENT_SECRET=...
```

Install and seed:

```bash
bun install
bunx prisma generate
bunx prisma migrate dev
```

Seed data via browser:

```
/api/seed/dimensions  
/api/seed/challenges  
```

---

## 🧱 Architecture

* 🧠 All business logic inside `lib/actions.ts` — composable and clean.
* 🔐 Secure auth and route-level access via middleware.
* ⚙️ SSR-first architecture with client islands for animations.
* 💾 LocalStorage for streak/task memory + Redis for session caching.
* 📦 TWA-ready with custom service worker and offline fallback.

---

## 🛣️ Roadmap

* [x] Challenge/task system with streaks
* [x] Animated radar chart growth
* [x] Qur’an explorer + reflections
* [ ] Audio player polish (ayah/surah queue)
* [ ] Manifest polish + full offline caching
* [ ] Google Play billing integration
* [ ] Contributor docs + public feedback blog

---

## 🪪 License

MIT — free to use, remix, and build with barakah.

---

<p align="center">
  <i>“He has succeeded who purifies [his soul], and he has failed who corrupts it.” — Qur’an 91:9–10</i>
</p>
