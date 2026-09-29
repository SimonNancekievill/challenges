# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — production build (also runs the TypeScript type check)
- `npm run lint` — ESLint (flat config: next core-web-vitals + typescript)
- `npx tsc --noEmit` — type check only

- `npm test` — Vitest (jsdom + Testing Library) run once; `npm run test:watch` for watch mode. Tests sit next to their source as `*.test.ts(x)`.

Requires `OPENAI_API_KEY` in `.env` (see `.env.example`). `.env` is gitignored.

## Architecture

A Next.js 16 App Router app (React 19, React Compiler enabled in `next.config.ts`): a single-page text-adventure chatbot backed by OpenAI.

Request flow:
1. `src/app/page.tsx` renders the client component `src/app/components/ChatApp.tsx`.
2. `ChatApp` gets multiple conversations from `useConversations` (`src/hooks/`), which saves them to `localStorage` via `src/lib/conversations.ts`. It renders `Chat` (messages + input) and a header icon that opens `ChatSidebar` (the conversation list) in a left overlay `Sheet` covering half the screen. Picking or creating a chat closes the sheet. On submit, `ChatApp` calls the server action `sendChat` with the active conversation's full history. Responses are not streamed.
3. `src/app/action.ts` (`"use server"`) puts the game-master system prompt in front of the history and calls `openai.chat.completions.create` with `gpt-4o-mini`. It returns one `{ role: "assistant", content }` message. The `Messages` type is exported from here.
4. `src/lib/openai.ts` exports the shared OpenAI client. Only import it from server code, because it reads the API key.

To change the bot's persona or game rules, edit `systemPrompt` in `action.ts`.

## UI conventions

- Tailwind CSS v4 through `@tailwindcss/postcss`. There is no `tailwind.config`; theme tokens live in `src/app/globals.css`.
- shadcn is configured with the `base-lyra` style, Base UI primitives (`@base-ui/react`) and Phosphor icons (`components.json`). Add components with `npx shadcn add <name>`; they land in `src/components/ui/`. The sandbox firewall blocks the shadcn registry, so `sheet.tsx` was written by hand on top of `@base-ui/react/dialog`.
- `cn` comes from the `cn` npm package, not the usual clsx/tailwind-merge helper. `src/lib/utils.ts` just re-exports it.
- `button` and `sheet` are used by `ChatApp`/`ChatSidebar`. `message`, `message-scroller` and `empty` are installed but `Chat.tsx` doesn't use them yet; it builds its UI from raw Tailwind markup.
- Path alias `@/*` → `src/*`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
