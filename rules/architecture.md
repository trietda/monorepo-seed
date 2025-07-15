# Project architectures

## Application: `web`

- Component implementation strategy:
  1. Check `@seed/ui` for reusable components and hooks
  2. If there is no existing components in `@seed/ui`. check [`shadcn`][1]
     first for any similiar components first.
  3. If there is no similiar component in `shadcn`:
     1. If the new component is a general one (i.e. can be use in any
        applications), create a new one in`@seed/ui` and reused it.
     2. If it is specific to your application, create a new one in
        corresponding package.

### Next.js strategies

- Next.js pages (i.e. `page.tsx`) and layouts (i.e. `layout.tsx`) must always
  be a server components.
- Use route group for grouping similiar pages. E.g.
  - Private pages and public pages
  - Different features in a group. E.g. user management and settings
- Prefer using cookie for storing user state so that server can access it and
  render correctly

## Package: `@seed/ui`

[1]: https://ui.shadcn.com
