# NAFS

## Getting Started

Written in Next js along with shadcn/ui with tailwindcss. Using Next js form actions for the server side function callings and client and server components for partial and dynamic rendering

## Storage

Using Postgres SQL for the database along with Prisma.js for the type safety. Going to be using docker to create the postgres databases while connection is going to be handled by prisma and prisma only

## Authentication

We'll be using next-auth along with Auth.js to setup the authentication. The steps are simple, first we step up prisma and connet to our database. Then we setup our user table with the data for it.

- Setup the Postgres Database with the credentials
- Add it to the .env
- Form the prisma schema and migration
- Install next-auth and setup the auth.config.ts
- Setup the server actions
- Connect the actions with the form actions

## Authenticaton - UXs

Alright, now the form actions are correctly linked up witht he registration forms and stuff, i think we should now opt to making the Register and Login Pages more user friendly in the UX point of things, doing basic error handling like unique constraint errors and stuff

## Dashboard

The UI for the dashboard has been made and is completely static. We need dynanmic rendering now so we need to hit up the server for that
Before making _async calls to the prisma API_ we need to have a proper client and server based setup for our components
The way we do this is that there will be a top level **Server Component** and then lower level **Client Components** which handle interactivity and visual feedbacks like Animations and Gestures

To start with, extract all client side functionality based components into seperate granular components in the dashboard folder inside _components_ folder
Then, make async calls to the Prisma ORM and pass the data through props
Lastly, render and commit the changes to the frontend

## Onboarding

Onboarding component is a client component with roughly 1100 lines of code, it needs to be simplifed by modulizing it into simpler more granular components and then all of them can be merged together
We will be using server actions for the creation and enrollment of challenges as they're far performant
This is will be done in 5 commits:

- Modulize the component
- Convert it into server component
- What if we make it into a server comp, how would the steps communicate with each other?? How would step 3 and 4 know the selected challenge ID? It must be state so use client must be used
- Make basic async calls to the ORM
- Form actions of creating a challenge
- Form actions for enrolling a challenge

## Dashboard

User registration and onboarding is now completetly functional. Now we display the data on the user's dashboard one card at a time.

- Use of suspense and displaying of fallback UI
  There will be 4 commits on dashboard-finalize branch and then it will be merged. That is the NON-NEGOTIATABLE TASK for today.

## Complete Task

To compelte a task, a user must hold down the button for a set amount of time. This will hit up the API most probably. This has been completed

## Progress Page

On the progress, page we have to map the Dimension Values.

## Features to be Made:

- Complete a day (flow is complete, action is to be instantiated)
- Complet a Challegne (UI is built, the re-enrolment needs to be configured)
- User flows for streak loss
- Guidance Page
  - See Ayah of the Day
  - Tafsir and Tarjuma or ayahs
  - Ayah and Theme Explorer
  - Listen to ayahs
  - Surah Reading page
  - Tafsir Reading page
  - Search Functionality
- Payment Integration
- Flows for non-premium users

We are massively overscoping . The app has NOT EVEN STARTED YET
AHHHHHHHHHHHHHHHHHHHHH

## Today's Tasks:

- The Day Completion button and Flow must be fully functional
- The streak system must be implmeneted
- The UI for the calendar page must be updated
- The corresponding Dashboard element for the calendar must be fixed
- The breaking of streaks must be implemented as well
- UI for spiritual path page must be added as well
- UI for the guidance page must be created too

## Completed Tasks:

- Day completion flow is now functional
- Streak system has been implemented
- Calendar page has been fixed
- Its corresponding page on dashboard is also fixed
- Streaks are now checked once a day when the user visits /challenges

## Complete Day for Streaks:
You can only do complete day once in a day, and it will set a localStorage item witht he current date, the button and task completions will be disabled. A new confirmation screen will be shown before the user completes the day to ensure good work of it

## Complete a Challenge
If current streak === challenge duration, nahhh
If completions are all in consecutive *duration* days then we say challenge completed enroll in new one

Nice the UI is made, we just gotta fix up all the steps. We do that one step at a time
Like dont just go ahead and fix every fucking error in there, wire up each and every step one by one

## TODOs:
  ### feat: Guidance Page:
    - Fetch random ayah from Quran API and display on home screen (done)
    - Make daily ayah show up properly (done)
    - Add tafsir section to it (done)
    - Update database to create the following options for users:
 - Reflections
       - Recent Surahs (3) + Progression
       - Reading streak
    - View all Chapter (surahs) page to read (done)
    - View all Chapter (surahs) page to listen (done)
    - Specific Surah page (read):
      - Make Drawer trigger in the header (done)
      - Show info regarding the surah in (i) icon 
      - Fetch and map Verses on the page and (x) option
      - Create an action to create reflection of specific ayah with reference to user
      - Create action to save ayahId with reference to the user 
    - Fetch all reflections of user and display on /refs
    - Fetch all saved of user and display on /saved
    - Create specific ayah page by fetching a single ayah
    - IF REFLECTION ALREADY EXISTS, SHOW (SHOW REFLECTION) button instead of creating one
    - Audio page pointed to by the /audio will now fetch the surah info and show it for now
    - Hook up the Quran API CDN with it and use an <audio> tag
    - Then add audio suport for specific ayah page
    - Similarly use the CDN to make them work on the specific surah page
    - Create the command pallete search function which points to surahs and ayahs
    - Map the results of query properly
  
  ### fix: Bugs to be Fixed
    - Mobile users can pinch zoom (fixed)
    - Remove Header and Footer on search and guidance pages (fixed)
    - Onboarding shows up everytime the user opens app then redirects (fixed)
    - Better offline page support


## FIXES BEFORE SHIPPING
- Make the onboarding flow full screened and fix all steps 
  - Use a drawer for add tasks
  - A carousel for the challenge selection
  - Duration selection in  a mid step (based on user level)
- Add *optional tasks of the day* (worth 2 points instead of 1) at the end of onboaridng
  (not a modal)
  - Database chars for optional task
  - Show the optional task of the day modal at the start of each day
  - Show optional task everyday
- Better tracking of task days (always shows 1)
- Better streak tracking (not updated in real time)
- Streak breaking logic somehow at the start of new day (UI to be made)
- Enroll in new challenge after completing one

## TODAY WE SHIP
- Challenge completetin flow
  - whats missing
    - Duration setting (Done)
    - You do NOT choose durations, you are assigned based on level (Done)
    - Rechecking the completion status (Done)
    - proper step mapping (Done)
    - Easily the work of like 30 minutes (Not really)
  - Break a streak
    - Do when init day tasks run, if last day, even a single task was not done, then allow the user to re enroll in the same challenge with a max 2 clisk
    - orrrr create a new challenge or enroll in another one
    - UI is already made, just gotta hook up the logic and WRITE THE FUCNTION YOURSELF
    - Reset the current position in the progression system
    - Work of around 1 hour
  - Optional tasks
    - When running init day tasks, check for optional tasks if they exist 
    - Optional task pop up opens up, if not no UI update to the dash otherwise show one below all
    - Complete optional task gives 2 points
    - Should take you 1 30 minutes, one podomoro session
  - Create Progression System
    - Create the progression page
    - On dash, instead of fire, rende rthe current step icon and make the user click it (fancy clicky haha)
    - User levels up instead of just existing, you dont choooose durations, you are assigned them
    - If you loose a challenge, the current one is reset
    - Must take around like 2 hours
  - Guidance system
    - Just render the reading streak
    - Render the saved ayahs
    - Create a simple db WRITE to save an ayah
    - Create a simple db WRITE to save a reflection
    - Map the reflections and saved ayahs on the page that is there
    - Surah page, most imp, Currently 1900 lines of code (not funtional too)
      - Spend 30 mintues modulizing it
      - Create data.ts functions for the things that we fetch (ayahs, translations, tafsir, surah info, audio) - 15 minutes
      - Map the ayahs on the ayah cards - 25 minutes
      - Put in the tafsir modal for each of the ayah cards - dynamic tafsirs suck so gotta take like 20 minutes to polish
      - Hook up the save ayah and reflect functions to it
      - Create a drawer in the header that opens the settings, info and other stuff menu - 10 minutes
      - Hook up the surah info modal - 5 minutes
      - Add just audio at the bottom of the page - whole audio no per ayah scroll complexity - 15 minutes
      - Button per ayah to listen to it seperately - 10 minutes
      - Click on each word for the translation (kinda complex but we can figure it out, maybe mapping each word into an invisible div rendered same as a <p> on click shows a popover)  - 15 minutes
      - WE CAN ADD DIFFERENT TRANSLATIONS SELECTION AND DIFFERENT TASFASIR FETCHING BUT MAYBE THATS OVERKILL
    - Onboarding
      - Finally fix the actual app onboarding where the <audio> doesnt work - 10 minutes
      - The calendar is very non representative (like uses green ticks and shitty random animations nothing like the in app calendar) - 10 minutes
      - OAUTH2 BUG STILL EXISTS SOMEHOWWWW - 30 FUCKING minutes
    - Misc
      - Static offline page for when cache is not available - 5 minutes (just the dashboard layout without the content)
      - BACK TO ALL DIMENSIONS button very infuriating when seeing own progress (restyle or better to remove)
      - Toast notifs dont match the theme and are just default shadcn ones
    
    I THINK THAT IS ENOUGH TO SHIP HAHAHAHAHAAHHAHAHAH
    

## Streak Breaking
- Step 1: 


## FULL ROUTE VIEW BECAUSE THIS WAS A LOT OF WORK
```bash
├── app
│   ├── api
│   │   ├── auth
│   │   │   └── [...nextauth]
│   │   │       └── route.ts
│   │   ├── challenges
│   │   │   └── [id]
│   │   │       └── route.ts
│   │   ├── seed
│   │   │   ├── challenges
│   │   │   │   └── route.ts
│   │   │   ├── dimensions
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── session
│   │   │   └── route.ts
│   │   └── users
│   │       └── route.ts
│   ├── (auth)
│   │   ├── login
│   │   │   └── page.tsx
│   │   └── register
│   │       ├── page.tsx
│   │       └── SignOutButton.tsx
│   ├── complete-challenge
│   │   └── page.tsx
│   ├── dark-theme.css
│   ├── dashboard
│   │   ├── calendar
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── challenges
│   │   │   └── complete
│   │   │       └── [id]
│   │   │           ├── loading.tsx
│   │   │           └── page.tsx
│   │   ├── guidance
│   │   │   ├── audio
│   │   │   │   └── [surahId]
│   │   │   │       └── page.tsx
│   │   │   ├── ayah
│   │   │   │   └── [surahId]
│   │   │   │       └── [ayahId]
│   │   │   │           └── page.tsx
│   │   │   ├── learn
│   │   │   │   └── [pathId]
│   │   │   │       └── [lessonId]
│   │   │   │           └── page.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── page.tsx
│   │   │   ├── reflections
│   │   │   │   └── page.tsx
│   │   │   ├── saved
│   │   │   │   └── page.tsx
│   │   │   └── surah
│   │   │       ├── [id]
│   │   │       │   └── page.tsx
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── page.tsx
│   │   ├── progress
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   └── settings
│   │       └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── ~offline
│   │   └── page.tsx
│   ├── onboarding
│   │   └── page.tsx
│   ├── page.tsx
│   ├── streak-break
│   │   └── page.tsx
│   └── sw.ts
├── auth.config.ts
├── auth.ts
├── bun.lock
├── components
│   ├── custom
│   │   ├── calendar
│   │   │   ├── calendar-main.tsx
│   │   │   └── calendar-skeleton.tsx
│   │   ├── challenges
│   │   │   ├── challenge-completion-flow.tsx
│   │   │   ├── challenges-complete.tsx
│   │   │   ├── challenges-main
│   │   │   │   ├── challenge-info-card.tsx
│   │   │   │   ├── greeting-section.tsx
│   │   │   │   ├── streak-progress-card.tsx
│   │   │   │   ├── task-card.tsx
│   │   │   │   ├── tasks-section.tsx
│   │   │   │   ├── type.ts
│   │   │   │   └── week-calendar.tsx
│   │   │   ├── challenges-main.tsx
│   │   │   ├── challenges-skeleton.tsx
│   │   │   ├── challenge-tasks.tsx
│   │   │   ├── completed-challenge.tsx
│   │   │   ├── completion
│   │   │   │   ├── challenge
│   │   │   │   │   ├── animated-counter.tsx
│   │   │   │   │   ├── challenge-card.tsx
│   │   │   │   │   ├── challenge-welcome.tsx
│   │   │   │   │   ├── dimensions-progress.tsx
│   │   │   │   │   ├── particle.tsx
│   │   │   │   │   ├── radar-chart.tsx
│   │   │   │   │   └── steps
│   │   │   │   │       ├── celebration-step.tsx
│   │   │   │   │       ├── challenge-selection-step.tsx
│   │   │   │   │       ├── custom-challenge-step.tsx
│   │   │   │   │       └── dimension-progress-step.tsx
│   │   │   │   └── day
│   │   │   │       ├── animated-counter.tsx
│   │   │   │       ├── celebration.tsx
│   │   │   │       ├── dimension-detail.tsx
│   │   │   │       ├── particle.tsx
│   │   │   │       ├── radar-chart.tsx
│   │   │   │       ├── streak-flame.tsx
│   │   │   │       ├── streak-progression.tsx
│   │   │   │       └── task-impact.tsx
│   │   │   ├── day-completion-flow.tsx
│   │   │   └── streak-break-flow
│   │   │       └── streak-break-flow.tsx
│   │   ├── guidance
│   │   │   ├── ayah
│   │   │   │   ├── ayah-content.tsx
│   │   │   │   └── particles.tsx
│   │   │   ├── context
│   │   │   │   └── command-palette-context.tsx
│   │   │   ├── daily-ayah.tsx
│   │   │   ├── featured-surah.tsx
│   │   │   ├── quick-actions.tsx
│   │   │   ├── search.tsx
│   │   │   ├── stats-overview.tsx
│   │   │   ├── surah
│   │   │   │   └── main-content.tsx
│   │   │   └── wrappers
│   │   │       ├── command-palette-wrapper.tsx
│   │   │       ├── daily-ayah-wrapper.tsx
│   │   │       ├── featured-surah-wrapper.tsx
│   │   │       └── stats-overview-wrapper.tsx
│   │   ├── lessons
│   │   │   └── lessons-types.tsx
│   │   ├── logo.tsx
│   │   ├── onboarding
│   │   │   ├── desktop-landing.tsx
│   │   │   ├── mobile-onboarding.tsx
│   │   │   ├── onboarding-challenge-summary.tsx
│   │   │   ├── onboarding-challenge.tsx
│   │   │   ├── onboarding-header.tsx
│   │   │   ├── onboarding-navigation.tsx
│   │   │   ├── onboarding-selected-challenge.tsx
│   │   │   ├── onboarding-task-form.tsx
│   │   │   ├── onboarding-task.tsx
│   │   │   ├── onboarding.tsx
│   │   │   ├── onboarding-welcome.tsx
│   │   │   ├── steps
│   │   │   │   ├── challenge-selection.tsx
│   │   │   │   ├── custom-challenge-summary.tsx
│   │   │   │   └── custom-task-step.tsx
│   │   │   └── task-list-item.tsx
│   │   └── progress
│   │       ├── progress-main.tsx
│   │       └── progress-skelton.tsx
│   └── ui
│       ├── animated-progress.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── checkbox.tsx
│       ├── command.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── loading.tsx
│       ├── pinch-zoom.tsx
│       ├── progress.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sharing-modal.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── tabs.tsx
│       └── textarea.tsx
├── components.json
├── docker-compose.yml
├── Dockerfile
├── eslint.config.mjs
├── lib
│   ├── actions
│   │   ├── add-extra-task.ts
│   │   ├── auth.ts
│   │   ├── complete-challenge.ts
│   │   ├── complete-task.ts
│   │   ├── init-day-tasks.ts
│   │   ├── manage-challenge.ts
│   │   └── manage-streak.ts
│   ├── actions.ts
│   ├── data.ts
│   ├── hooks
│   │   ├── use-challenge-completion.ts
│   │   ├── use-challenge-onboarding.tsx
│   │   ├── use-challenges.ts
│   │   ├── use-confetti-effect.ts
│   │   ├── use-local-storage.ts
│   │   └── use-selected-challenge.ts
│   ├── iconMap.ts
│   ├── pino.ts
│   ├── redis.ts
│   └── utils
│       ├── auth.ts
│       ├── dimensionsCalculations.ts
│       ├── font.ts
│       ├── guidance.ts
│       ├── setup-logger.ts
│       ├── token.ts
│       └── utils.ts
├── middleware.ts
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── prisma
│   ├── migrations
│   │   ├── 20250628093255_init
│   │   │   └── migration.sql
│   │   ├── 20250629121416_add_authjs_tablesnpx
│   │   │   └── migration.sql
│   │   ├── 20250629124840_update_password_optionality
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seed.ts
├── prisma.ts
```