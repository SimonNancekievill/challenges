import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Messages } from "@/app/action";
import Chat from "@/app/components/Chat";

describe("Chat", () => {
  it("renders the messages it is given", () => {
    const messages: Messages[] = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there" },
    ];

    render(<Chat messages={messages} onSubmitMessage={async () => {}} />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there")).toBeInTheDocument();
  });

  it("submits the typed text and clears the input", async () => {
    const user = userEvent.setup();
    const onSubmitMessage = vi.fn().mockResolvedValue(undefined);

    render(<Chat messages={[]} onSubmitMessage={onSubmitMessage} />);

    const input = screen.getByPlaceholderText(/type your message here/i);
    await user.type(input, "Take me on an adventure");
    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(onSubmitMessage).toHaveBeenCalledWith("Take me on an adventure");
    expect(input).toHaveValue("");
  });

  it("does not submit when the input is empty", async () => {
    const user = userEvent.setup();
    const onSubmitMessage = vi.fn().mockResolvedValue(undefined);

    render(<Chat messages={[]} onSubmitMessage={onSubmitMessage} />);

    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(onSubmitMessage).not.toHaveBeenCalled();
  });
});
