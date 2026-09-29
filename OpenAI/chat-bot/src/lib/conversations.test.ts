import { describe, it, expect, beforeEach } from "vitest";
import type { Messages } from "@/app/action";
import {
  createConversation,
  deriveTitle,
  loadConversations,
  saveConversations,
  STORAGE_KEY,
  type Conversation,
} from "@/lib/conversations";

beforeEach(() => {
  localStorage.clear();
});

describe("createConversation", () => {
  it("returns a conversation with a unique id, default title and no messages", () => {
    const conversation = createConversation();

    expect(conversation.id).toBeTruthy();
    expect(conversation.title).toBe("New chat");
    expect(conversation.messages).toEqual([]);
    expect(typeof conversation.createdAt).toBe("number");
    expect(typeof conversation.updatedAt).toBe("number");
  });

  it("generates a different id for each conversation", () => {
    const a = createConversation();
    const b = createConversation();

    expect(a.id).not.toBe(b.id);
  });
});

describe("deriveTitle", () => {
  it("falls back to 'New chat' when there is no user message", () => {
    const messages: Messages[] = [
      { role: "assistant", content: "Hello there" },
    ];

    expect(deriveTitle(messages)).toBe("New chat");
  });

  it("falls back to 'New chat' for an empty message list", () => {
    expect(deriveTitle([])).toBe("New chat");
  });

  it("uses the first user message as the title", () => {
    const messages: Messages[] = [
      { role: "user", content: "Take me on an adventure" },
      { role: "assistant", content: "Very well..." },
    ];

    expect(deriveTitle(messages)).toBe("Take me on an adventure");
  });

  it("truncates long titles with an ellipsis", () => {
    const longContent =
      "This is a very long first message that should be truncated because it exceeds the limit";
    const messages: Messages[] = [{ role: "user", content: longContent }];

    const title = deriveTitle(messages);

    expect(title.length).toBeLessThanOrEqual(41);
    expect(title.endsWith("...")).toBe(true);
  });
});

describe("saveConversations / loadConversations", () => {
  it("returns an empty array when nothing has been stored", () => {
    expect(loadConversations()).toEqual([]);
  });

  it("round-trips conversations through localStorage", () => {
    const conversations: Conversation[] = [createConversation()];

    saveConversations(conversations);

    expect(loadConversations()).toEqual(conversations);
  });

  it("returns an empty array when the stored data is malformed", () => {
    localStorage.setItem(STORAGE_KEY, "not valid json");

    expect(loadConversations()).toEqual([]);
  });
});
