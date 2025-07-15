# Project brief

We're using NX to manage monorepo applications and packages. Thus the top level
folder structure will follow NX standard:

- Existing (and new) application(s) should be in the `apps` folder
  - `web`: our main entry point
- Existing (and new) package(s) should be in the `packages` folder
  - `@seed/tsconfig`: include reusable tsconfig files
  - `@seed/ui`: include reusable components

# Technologi stacks

## `web` application

- Typescript
- React, Next.js as React framework
- Tailwindcss
- Zustand for global state management
- Vite

## `@seed/ui` package
kkk
- Typescript
- React
- Tailwindcss
- Storybook
- Vite
