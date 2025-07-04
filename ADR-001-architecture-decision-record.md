# ADR-001: Architecture Decision Record – Rick & Morty Episode Viewer

**Status:** Accepted  
**Date:** 2025-07-04

## Context
We are building a Netflix-inspired episode viewer for Rick & Morty using React, TypeScript, MobX, Apollo Client, and Tailwind CSS. The application features infinite scroll episode browsing, modal episode details with tabbed navigation, and character detail views, closely following modern UI/UX standards. 

**Key requirements:**
- Use MobX for all local state management (UI, modals, tabs, selections, etc.)
- Use Apollo Client only for fetching/querying GraphQL data (not for local state)
- Follow the provided folder structure for `data-access` and `ui` domains in `libs` and `app`
- Adhere to frontend code quality guidelines (TypeScript, ESLint, separation of concerns, etc.)
- Ensure full responsiveness of the UI for all device sizes

---

## 1. Folder Structure & Code Boundaries

**Decision:**  
Follow the attached structure under `libs` and `apps`, with strict separation of `data-access` (API, stores, models, etc.) and `ui` (components, controllers, routes, etc.).

**Reasoning:**
- Promotes maintainability and clarity.
- `data-access` contains all API logic, MobX stores, models, and related utilities.
- `ui` contains only presentational and interaction logic; it can access its own and other libs' `data-access` and `ui` as needed.
- Grouping and refactoring of common logic is encouraged for DRYness.
- Special cases (e.g., global constants, utility hooks, CSS) are handled as described.

**Trade-offs:**
- Slightly more boilerplate, but much better long-term maintainability.

---

## 2. Local State Management

**Decision:**  
Use **MobX** for all local state (UI state, modal/tab open/close, selections, etc.).

**Reasoning:**
- MobX offers simple, reactive state management well-suited for UI state.
- Keeps all local state in one place, avoids mixing concerns with Apollo Client cache.
- MobX stores reside in `data-access` as per structure.

**Trade-offs:**
- Slight learning curve for MobX newcomers.
- MobX state is not persisted across reloads (unless explicitly handled).

---

## 3. GraphQL Data Fetching

**Decision:**  
Use **Apollo Client** only for fetching/querying GraphQL data.  
**Do not** use Apollo cache for local state.

**Reasoning:**
- Apollo Client is robust and well-documented for GraphQL operations.
- Keeping Apollo strictly for data fetching avoids confusion and keeps local state in MobX.
- Apollo hooks are used in UI components/controllers to fetch data as needed.

**Trade-offs:**
- Slightly more code to wire up MobX and Apollo, but results in cleaner separation.

---

## 4. Modal Component

**Decision:**  
Use **Headless UI Dialog**.

**Reasoning:**
- Accessible, unstyled, and integrates perfectly with Tailwind CSS.
- Allows full control for Netflix-like UI.

---

## 5. Infinite Scroll Implementation

**Decision:**  
Use **React Infinite Scroll Component**.

**Reasoning:**
- Simple to use, reliable, and abstracts away scroll detection logic.

---

## 6. Tab Implementation

**Decision:**  
Use **Headless UI Tabs**.

**Reasoning:**
- Accessible, unstyled, and easily customized for Netflix UI.

---

## 7. Frontend Code Guidelines

- Use TypeScript for type safety.
- Use ESLint/Prettier for code quality and formatting.
- Separate logic (MobX stores, API) from presentation (React components).
- Use hooks for reusable logic.
- Write modular, testable code.
- Use Tailwind CSS for styling.
- Ensure accessibility (a11y) in all interactive components.
- **Ensure full responsiveness**: All UI must adapt gracefully to mobile, tablet, and desktop screens using Tailwind's responsive utilities and best practices.

---

## Summary Table

| Area                  | Decision/Tool                | Reasoning/Trade-off                                                  |
|-----------------------|------------------------------|----------------------------------------------------------------------|
| Folder Structure      | Provided structure           | Maintainability, clarity, clear boundaries                           |
| Local State           | MobX (data-access/stores)    | Reactive, simple, avoids mixing with Apollo                          |
| Data Fetching         | Apollo Client (fetch only)   | Robust GraphQL, separation of concerns                               |
| Modal                 | Headless UI Dialog           | Accessible, custom styling                                           |
| Infinite Scroll       | React Infinite Scroll Comp   | Simple, reliable                                                     |
| Tabs                  | Headless UI Tabs             | Accessible, customizable                                             |
| Code Guidelines       | TypeScript, ESLint, etc.     | Maintainable, readable, accessible, testable code                    |
| Responsiveness        | Tailwind responsive classes  | Modern UX, supports all device sizes                                 |

---

## Special Notes

- **MobX stores should be defined in `data-access` and only global stores should be exposed via `<LIB>StoresProvider`.**
- **UI components should not store state except for ephemeral local state (e.g., input value).**
- **Apollo Client should not be used for local state.**
- **Common utilities and constants should be refactored into shared libs as they grow.**
- **Follow best practices for accessibility, responsiveness, and code maintainability.**

---

## Conclusion

This ADR formalizes the architectural and technological choices for the Rick & Morty episode viewer, ensuring a maintainable, scalable, responsive, and high-quality frontend codebase.
