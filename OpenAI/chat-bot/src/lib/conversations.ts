import type { Messages } from "@/app/action";

export type Conversation = {
  id: string;
  title: string;
  messages: Messages[];
  createdAt: number;
  updatedAt: number;
};

export const STORAGE_KEY = "chat-bot:conversations";

const DEFAULT_TITLE = "New chat";
const TITLE_MAX_LENGTH = 38;

export function createConversation(): Conversation {
  const now = Date.now();

  return {
    id: crypto.randomUUID(),
    title: DEFAULT_TITLE,
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function deriveTitle(messages: Messages[]): string {
  const firstUserMessage = messages.find((message) => message.role === "user");

  if (!firstUserMessage || !firstUserMessage.content.trim()) {
    return DEFAULT_TITLE;
  }

  const content = firstUserMessage.content.trim();

  if (content.length <= TITLE_MAX_LENGTH) {
    return content;
  }

  return `${content.slice(0, TITLE_MAX_LENGTH)}...`;
}

export function loadConversations(): Conversation[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveConversations(conversations: Conversation[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
}
