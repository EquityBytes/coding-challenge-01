# Coding Challenge 01 (~2-3hrs)

## Tasks

This challenge contains an app for managing deliveries. You are tasked with iterating on the architecture of this app.
Start by spending roughly 30minutes digesting the current monorepo and open TODOS.

Locations:

- Backend is managed under `apps/api`
- Frontend is managed under `apps/client`
- Database schema is managed under `prisma/schema.prisma`

Deliverables:

- Create an architecture diagram of the stack including HTTP flows.
- Implement outstanding backend TODOS to complete functionality.
- List possible improvements to both UX, reliability & scalability.

## Setup

Node: v18.16.0
NPM: 9.5.1

```
npm ci
```

```
npx prisma generate
```

```
npx prisma migrate deploy
```

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx serve <project>
```

Run the API:

```
npx nx serve api
```

Run the Frontend:

```
npx nx build client
```

```
npx nx run client:serve:production
```

## Still got time?

Deploy the app on Vercel.
