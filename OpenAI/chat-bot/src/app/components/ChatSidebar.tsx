"use client";

import { Plus, Trash } from "@phosphor-icons/react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import type { Conversation } from "@/lib/conversations";

type ChatSidebarProps = {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
};

export function ChatSidebar({
  conversations,
  activeId,
  onSelect,
  onCreate,
  onDelete,
}: ChatSidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="p-2">
        <Button variant="outline" className="w-full justify-start" onClick={onCreate}>
          <Plus />
          New Chat
        </Button>
      </div>
      <ul className="flex flex-1 flex-col gap-1 overflow-auto p-2">
        {conversations.map((conversation) => {
          const isActive = conversation.id === activeId;

          return (
            <li key={conversation.id} className="group/row flex items-center gap-1">
              <button
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => onSelect(conversation.id)}
                className={cn(
                  "min-w-0 flex-1 truncate rounded-none px-2.5 py-1.5 text-left text-xs transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50",
                )}
              >
                {conversation.title}
              </button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${conversation.title}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete(conversation.id);
                }}
                className="shrink-0 opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100"
              >
                <Trash />
              </Button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
