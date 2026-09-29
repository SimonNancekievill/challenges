"use client";

import { useState } from "react";
import { SidebarSimple } from "@phosphor-icons/react";
import { sendChat } from "@/app/action";
import { useConversations } from "@/hooks/useConversations";
import { ChatSidebar } from "@/app/components/ChatSidebar";
import Chat from "@/app/components/Chat";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ChatApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    conversations,
    activeId,
    activeConversation,
    createConversation,
    selectConversation,
    deleteConversation,
    updateMessages,
  } = useConversations();

  async function handleSubmitMessage(content: string) {
    if (!activeConversation) {
      return;
    }

    const updatedMessages = [
      ...activeConversation.messages,
      { role: "user" as const, content },
    ];
    updateMessages(activeConversation.id, updatedMessages);

    const assistantMessage = await sendChat(updatedMessages);
    updateMessages(activeConversation.id, [...updatedMessages, assistantMessage]);
  }

  function handleSelect(id: string) {
    selectConversation(id);
    setSidebarOpen(false);
  }

  function handleCreate() {
    createConversation();
    setSidebarOpen(false);
  }

  return (
    <div className="flex h-full flex-col">
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <header className="flex items-center border-b border-border p-2">
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open conversations"
              />
            }
          >
            <SidebarSimple />
          </SheetTrigger>
        </header>
        <SheetContent side="left" className="w-1/2 bg-sidebar">
          <SheetHeader className="border-b border-sidebar-border pr-10">
            <SheetTitle>Conversations</SheetTitle>
          </SheetHeader>
          <div className="min-h-0 flex-1">
            <ChatSidebar
              conversations={conversations}
              activeId={activeId}
              onSelect={handleSelect}
              onCreate={handleCreate}
              onDelete={deleteConversation}
            />
          </div>
        </SheetContent>
      </Sheet>
      <div className="min-h-0 min-w-0 flex-1">
        <Chat
          messages={activeConversation?.messages ?? []}
          onSubmitMessage={handleSubmitMessage}
        />
      </div>
    </div>
  );
}
