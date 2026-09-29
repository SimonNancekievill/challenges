"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Messages } from "@/app/action";
import {
  createConversation as createConversationRecord,
  deriveTitle,
  loadConversations,
  saveConversations,
  type Conversation,
} from "@/lib/conversations";

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // One-time hydration from localStorage, which doesn't exist during SSR: state
  // must start empty so the server and first client render match, then this
  // effect loads the real data immediately after mount.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const loaded = loadConversations();

    if (loaded.length > 0) {
      setConversations(loaded);
      setActiveId(loaded[0].id);
    } else {
      const conversation = createConversationRecord();
      setConversations([conversation]);
      setActiveId(conversation.id);
    }

    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (hydrated) {
      saveConversations(conversations);
    }
  }, [conversations, hydrated]);

  const createConversation = useCallback(() => {
    const conversation = createConversationRecord();
    setConversations((current) => [conversation, ...current]);
    setActiveId(conversation.id);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      const remaining = conversations.filter((conversation) => conversation.id !== id);

      if (remaining.length === 0) {
        const conversation = createConversationRecord();
        setConversations([conversation]);
        setActiveId(conversation.id);
        return;
      }

      setConversations(remaining);
      if (activeId === id) {
        setActiveId(remaining[0].id);
      }
    },
    [conversations, activeId],
  );

  const updateMessages = useCallback((id: string, messages: Messages[]) => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id
          ? {
              ...conversation,
              messages,
              title: deriveTitle(messages),
              updatedAt: Date.now(),
            }
          : conversation,
      ),
    );
  }, []);

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeId) ?? null,
    [conversations, activeId],
  );

  return {
    conversations,
    activeId,
    activeConversation,
    createConversation,
    selectConversation,
    deleteConversation,
    updateMessages,
  };
}
