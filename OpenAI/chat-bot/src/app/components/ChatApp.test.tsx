import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { STORAGE_KEY, type Conversation } from "@/lib/conversations";
import ChatApp from "@/app/components/ChatApp";

vi.mock("@/app/action", () => ({
  sendChat: vi.fn(),
}));

function seedConversations(conversations: Partial<Conversation>[]) {
  const records = conversations.map((conversation, index) => ({
    id: `id-${index}`,
    title: "Untitled",
    messages: [],
    createdAt: 0,
    updatedAt: 0,
    ...conversation,
  }));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

describe("ChatApp sidebar", () => {
  beforeEach(() => {
    window.localStorage.clear();
    seedConversations([
      { id: "a", title: "First chat" },
      { id: "b", title: "Second chat" },
    ]);
  });

  it("keeps the conversations hidden until the sidebar icon is clicked", async () => {
    const user = userEvent.setup();
    render(<ChatApp />);

    expect(screen.queryByText("First chat")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open conversations" }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "First chat" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Second chat" })).toBeInTheDocument();
  });

  it("closes the sidebar after selecting a conversation", async () => {
    const user = userEvent.setup();
    render(<ChatApp />);

    await user.click(screen.getByRole("button", { name: "Open conversations" }));
    await user.click(await screen.findByRole("button", { name: "Second chat" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes the sidebar after creating a new chat", async () => {
    const user = userEvent.setup();
    render(<ChatApp />);

    await user.click(screen.getByRole("button", { name: "Open conversations" }));
    await user.click(await screen.findByRole("button", { name: /new chat/i }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
