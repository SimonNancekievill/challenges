"use client";

import { useState } from "react";
import { sendChat } from "../application";

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

import { ArrowUpIcon, MessageCircleDashedIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { Button } from "@/components/ui/button";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!input.trim() || isBusy) {
      return;
    }

    const updatedMessages: Message[] = [
      ...messages,
      {
        role: "user",
        content: input.trim(),
      },
    ];

    setMessages(updatedMessages);
    setInput("");
    setIsBusy(true);

    try {
      const assistantMessage = await sendChat(updatedMessages);

      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <MessageScrollerProvider>
      <div className="relative mx-auto flex h-140 w-full max-w-2xl flex-col overflow-hidden rounded-xl border">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h2 className="font-semibold">New Chat</h2>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setMessages([])}
            disabled={isBusy}
          >
            New chat
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            <Empty className="h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircleDashedIcon />
                </EmptyMedia>

                <EmptyTitle>Morning!</EmptyTitle>

                <EmptyDescription>
                  What are we working on today?
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent className="flex flex-col gap-4 p-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}

                  {isBusy && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                        Thinking...
                      </div>
                    </div>
                  )}
                </MessageScrollerContent>
              </MessageScrollerViewport>

              <MessageScrollerButton />
            </MessageScroller>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Message..."
              disabled={isBusy}
              className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />

            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isBusy}
            >
              <ArrowUpIcon />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </MessageScrollerProvider>
  );
}
