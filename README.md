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
