# File name conventions

## General React files name conventions:

- Reusable React components should be in `/src/components` folder and in
  SentenceCase with `.tsx` extension.

  E.g. `Button.tsx`

- Each component should be in a separated file. I.e 2 components should be in 2
  files
- (Optional) if a React component requires a CSS module file, the file name
  should be in camelCase and end with `.module.css` extension.

  E.g. a CSS module
  for `Button` should be `button.module.css`

- Reusable hooks should be in `/src/hooks` folder, and in camelCase format with
  `use` prefix and a descriptive name.

  E.g. A hook that handle login should be named `useHandleLogin` and place in
  `/src/hooks/useHandleLogin.ts`.
  - Use `tsx` extension when using JSX in the hook
  - Use `ts` extension for simple cases

- Reusable contexts should be in `/src/contexts` folder, and in SentenceCase
  format with `.tsx` extension.
  E.g. `AuthContext.tsx`
- Storybook stories should be named as `<componentName>.stories.(ts|tsx)`
  - Use `tsx` extension when using JSX in the story
  - Use `ts` extension for simple cases

## Next.js file name conventions

- Reusable server actions should be in `/src/actions`, and in camelCase format
  without postfix "action".

  E.g. do not name it "loginAction", use "login" instead

## Zustand file name conventions

- Reuseable stores should be in `src/stores`, in camelCase format. File name
  should be a noun and should be consistent with the exported hook.

  E.g. if the store is manage a global counter, the hook should be named
  `useCounterStore` and the file should be named `counter.ts`