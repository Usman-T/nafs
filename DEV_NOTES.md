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
If completions are all in consecutive _duration_ days then we say challenge completed enroll in new one

Nice the UI is made, we just gotta fix up all the steps. We do that one step at a time
Like dont just go ahead and fix every fucking error in there, wire up each and every step one by one

## TODOs:

### feat: Guidance Page:

    - Fetch random ayah from Quran API and display on home screen (done)
    - Make daily ayah show up properly (done)
    - Add tafsir section to it (done)
    - Update database to create the following options for users:

- Reflections - Recent Surahs (3) + Progression - Reading streak
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
  - Duration selection in a mid step (based on user level)
- Add _optional tasks of the day_ (worth 2 points instead of 1) at the end of onboaridng
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
      - Click on each word for the translation (kinda complex but we can figure it out, maybe mapping each word into an invisible div rendered same as a <p> on click shows a popover) - 15 minutes
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

- Step 1: Streak Break + Countdown Animation + Left Tasks Summary
- Step 2: Radar chart showing decrease in left point
- Step 3: Enroll same challenge + Start new one -> End if same
- Step 4: Predefind Challenges Carousel + Create custom challenge
- Step 5: Selected Challenge Task Selection
- Step 6: Selected Challenge Challenge start
- Step 5: Custom Task form
- Step 6: Custom Challenge start

Change of plans, only 4 steps, there is branching on the 3rd step otherwise you go straight to the summary page
Branching is pretty good like this:

- Select the current -> Go to summary
- Selct new -> See pre defs and custom
  - Select a pre def -> select tasks
  - Select a custom -> create tasks
    - Then Go to summary

## Next features:

- Fix the progress page (like responsiveness ig) --- done
- Create the level page, just visuals and simple data hooking --- skip
- For the gudance page, just make two 0's render and im happy --- done
  - Then for it, write 2 functions nothing more for saving refs and ayahs
  - Then just write data.ts 2 funcs to fetch and rende rthose
  - Hook those funcs to their corresponding buttons and we're good to go
  - Fetch specific ayah audio and play it with the Data Service
  - Fetch full surah audio and play it with the Data Service
  - Fix the scrolling in surah page
- Implement the streak break (MOST IMPORTANT)
- Settings
  - Change name
  - Change password

## What we are doing today:
- Streak break redirection logic will work perfectly
- Update the Custom Task Form
- Work on the Mobile Onboarding (finish it)
- Make the General and Account Pages in settings

## 29th July 2025

- The user is in no way punished for missing tasks and just restarts the challenge (streak-break-flow needs to be hooked up)
- When holding down ANY `link`, you get a chrome pop up menu
- The `header` inside the surah viewer needs to plop up and down properly (it hides instead of sticking)
- Having `toast promises` instead of `clear toasts` would make give it a much more polished look (ok I made that work now)
- Search of guidance page is broken
- Can't listen to surahs
- When enrolling a challenge, custom challenge form must be more prominent and would have a Dropdown Based Task Selector (would make it much nicer to get an idea from pre-existing tasks)

## Last time im writing here:
Only a few things are there that need to be done
- Firstly, rewrite `startChallenge`, `completeTask`, `checkUserStreak`, `breakUserStreak` to only spawn tasks based on conditions (done)
- Secondly, add swipe indicator to the onboaridng page (done)
- Thirdly, 
  - the quran viewer must be made very performant by rendering 20 cards at a time (done)
  - the quran viewer must have the scroll to ayah working (done)
  - the header must be ploppy instead of absolute (done)
  - clicking or holding an ayah should open its specific `ayah/` view
  - call abdul basit's recording only from Quran.com
  - wrap in <audio> tag based on context
- Fourthly,
  - remove the ability to be able to hold down links and see pop ups (done)
  - add offline fallback when registering
  - redirect all auth pages to /dashboard if logged in or offline


Basically, 
We check at the same exact TIME DOWN TO THE SECONDS to check for missed tasks when in reality it is a spectrum from that day to the end of that day
If any tasks within that SPECTRUM are not completed, we break the streak em else we dont...

Brother last things:
- Settings page finalize it (1 hour max)
- Surah page, make the tafsir and reflectoin and saving work, thats all
- Clicking ayah should take to specified ayah page
- Polish the search thing (30 minutes max no more)
- Bundle apk and push

