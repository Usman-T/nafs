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
Alright, now the form actions are correctly linked up witht he registration forms and stuff, i think we should now opt to making the Register and Login Pages more user friendly in the UX point of things, doing basic error handling like "unique" constraint errors and stuff

## Dashboard
The UI for the dashboard has been made and is completely static. We need dynanmic rendering now so we need to hit up the server for that
Before making *async calls to the prisma API* we need to have a proper client and server based setup for our components
The way we do this is that there will be a top level **Server Component** and then lower level **Client Components** which handle interactivity and visual feedbacks like Animations and Gestures

To start with, extract all client side functionality based components into seperate granular components in the dashboard folder inside *components* folder
Then, make async calls to the Prisma ORM and pass the data through props
Lastly, render and commit the changes to the frontend

## Onboarding
Onboarding component is a client component with roughly 1100 lines of code, it needs to be simplifed by modulizing it into simpler more granular components and then all of them can be merged together
We will be using server actions for the creation and enrollment of challenges as they're far performant
This is will be done in 5 commits:
- Modulize the component
- Convert it into server component
- What if we make it into a server comp, how would the steps communicate with each other?? How would step 3 and 4 know the selected challenge ID? It must be state so "use client" must be used
- Make basic async calls to the ORM 
- Form actions of creating a challenge
- Form actions for enrolling a challenge
