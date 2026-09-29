import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Conversation } from "@/lib/conversations";
import { ChatSidebar } from "@/app/components/ChatSidebar";

function makeConversation(overrides: Partial<Conversation>): Conversation {
  return {
    id: "id-1",
    title: "Untitled",
    messages: [],
    createdAt: 0,
    updatedAt: 0,
    ...overrides,
  };
}

describe("ChatSidebar", () => {
  it("renders the title of every conversation", () => {
    const conversations = [
      makeConversation({ id: "a", title: "First chat" }),
      makeConversation({ id: "b", title: "Second chat" }),
    ];

    render(
      <ChatSidebar
        conversations={conversations}
        activeId="a"
        onSelect={() => {}}
        onCreate={() => {}}
        onDelete={() => {}}
      />,
    );

    expect(screen.getByText("First chat")).toBeInTheDocument();
    expect(screen.getByText("Second chat")).toBeInTheDocument();
  });

  it("marks the active conversation", () => {
    const conversations = [
      makeConversation({ id: "a", title: "First chat" }),
      makeConversation({ id: "b", title: "Second chat" }),
    ];

    render(
      <ChatSidebar
        conversations={conversations}
        activeId="b"
        onSelect={() => {}}
        onCreate={() => {}}
        onDelete={() => {}}
      />,
    );

    expect(screen.getByRole("button", { name: "Second chat" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(screen.getByRole("button", { name: "First chat" })).not.toHaveAttribute(
      "aria-current",
      "true",
    );
  });

  it("calls onSelect with the conversation id when a row is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const conversations = [makeConversation({ id: "a", title: "First chat" })];

    render(
      <ChatSidebar
        conversations={conversations}
        activeId="a"
        onSelect={onSelect}
        onCreate={() => {}}
        onDelete={() => {}}
      />,
    );

    await user.click(screen.getByRole("button", { name: "First chat" }));

    expect(onSelect).toHaveBeenCalledWith("a");
  });

  it("calls onCreate when the new chat button is clicked", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();

    render(
      <ChatSidebar
        conversations={[]}
        activeId={null}
        onSelect={() => {}}
        onCreate={onCreate}
        onDelete={() => {}}
      />,
    );

    await user.click(screen.getByRole("button", { name: /new chat/i }));

    expect(onCreate).toHaveBeenCalled();
  });

  it("calls onDelete with the conversation id without triggering onSelect", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onDelete = vi.fn();
    const conversations = [makeConversation({ id: "a", title: "First chat" })];

    render(
      <ChatSidebar
        conversations={conversations}
        activeId="a"
        onSelect={onSelect}
        onCreate={() => {}}
        onDelete={onDelete}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Delete First chat" }));

    expect(onDelete).toHaveBeenCalledWith("a");
    expect(onSelect).not.toHaveBeenCalled();
  });
});
