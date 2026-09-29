import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { Messages } from "@/app/action";
import { STORAGE_KEY, type Conversation } from "@/lib/conversations";
import { useConversations } from "@/hooks/useConversations";

beforeEach(() => {
  localStorage.clear();
});

function readStoredConversations(): Conversation[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

describe("useConversations", () => {
  it("creates and activates a conversation when storage is empty", async () => {
    const { result } = renderHook(() => useConversations());

    await waitFor(() => expect(result.current.conversations).toHaveLength(1));

    expect(result.current.activeId).toBe(result.current.conversations[0].id);
    expect(result.current.activeConversation?.title).toBe("New chat");
  });

  it("loads pre-existing conversations from localStorage on mount", async () => {
    const seeded: Conversation = {
      id: "seeded-1",
      title: "Seeded chat",
      messages: [],
      createdAt: 1,
      updatedAt: 1,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([seeded]));

    const { result } = renderHook(() => useConversations());

    await waitFor(() => expect(result.current.conversations).toHaveLength(1));

    expect(result.current.conversations[0]).toEqual(seeded);
    expect(result.current.activeId).toBe("seeded-1");
  });

  it("createConversation adds a new conversation and makes it active", async () => {
    const { result } = renderHook(() => useConversations());
    await waitFor(() => expect(result.current.conversations).toHaveLength(1));
    const firstId = result.current.conversations[0].id;

    act(() => {
      result.current.createConversation();
    });

    expect(result.current.conversations).toHaveLength(2);
    expect(result.current.activeId).not.toBe(firstId);
    expect(result.current.activeConversation?.id).toBe(result.current.activeId);
  });

  it("selectConversation switches the active conversation", async () => {
    const { result } = renderHook(() => useConversations());
    await waitFor(() => expect(result.current.conversations).toHaveLength(1));
    const firstId = result.current.conversations[0].id;

    act(() => {
      result.current.createConversation();
    });
    const secondId = result.current.activeId;

    act(() => {
      result.current.selectConversation(firstId);
    });

    expect(result.current.activeId).toBe(firstId);
    expect(secondId).not.toBe(firstId);
  });

  it("deleteConversation removes a non-active conversation", async () => {
    const { result } = renderHook(() => useConversations());
    await waitFor(() => expect(result.current.conversations).toHaveLength(1));
    const firstId = result.current.conversations[0].id;

    act(() => {
      result.current.createConversation();
    });
    const activeId = result.current.activeId;

    act(() => {
      result.current.deleteConversation(firstId);
    });

    expect(result.current.conversations).toHaveLength(1);
    expect(result.current.activeId).toBe(activeId);
  });

  it("deleteConversation re-activates another conversation when the active one is deleted", async () => {
    const { result } = renderHook(() => useConversations());
    await waitFor(() => expect(result.current.conversations).toHaveLength(1));
    const firstId = result.current.conversations[0].id;

    act(() => {
      result.current.createConversation();
    });
    const secondId = result.current.activeId!;

    act(() => {
      result.current.deleteConversation(secondId);
    });

    expect(result.current.conversations).toHaveLength(1);
    expect(result.current.activeId).toBe(firstId);
  });

  it("deleteConversation creates a fresh conversation when the last one is deleted", async () => {
    const { result } = renderHook(() => useConversations());
    await waitFor(() => expect(result.current.conversations).toHaveLength(1));
    const firstId = result.current.conversations[0].id;

    act(() => {
      result.current.deleteConversation(firstId);
    });

    expect(result.current.conversations).toHaveLength(1);
    expect(result.current.conversations[0].id).not.toBe(firstId);
    expect(result.current.activeId).toBe(result.current.conversations[0].id);
  });

  it("updateMessages updates the conversation's messages, derives a title, and persists", async () => {
    const { result } = renderHook(() => useConversations());
    await waitFor(() => expect(result.current.conversations).toHaveLength(1));
    const id = result.current.conversations[0].id;
    const messages: Messages[] = [{ role: "user", content: "Hello world" }];

    act(() => {
      result.current.updateMessages(id, messages);
    });

    expect(result.current.activeConversation?.messages).toEqual(messages);
    expect(result.current.activeConversation?.title).toBe("Hello world");

    await waitFor(() => {
      expect(readStoredConversations()[0].messages).toEqual(messages);
    });
  });
});
