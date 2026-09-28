"use client";

import { useState } from "react";
import { sendChat } from "../action";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");

    const assistantMessage = await sendChat(updatedMessages);
    setMessages([...updatedMessages, assistantMessage]);
  }

  return (
    <>
      <div className="flex flex-col m-8 max-w-full h-full">
        <div className="max-h-75 border-1 rounded-lg scroll-smooth overflow-auto">
          <ul className="flex flex-col w-full min-h-50 py-2 px-1">
            {messages.map((message, index) =>
              message.role === "user" ? (
                <li
                  key={index}
                  className="border-1 rounded py-2 pl-4 text-xs bg-gray-300 self-end h-auto w-2/5"
                >
                  {message.content}
                </li>
              ) : (
                <li
                  key={index}
                  className="border-1 rounded py-2 pl-4 text-xs bg-gray-100 self-start h-auto w-2/5"
                >
                  {message.content}
                </li>
              ),
            )}
          </ul>
        </div>
        <form
          className="flex flex-row-2 justify-between gap-6"
          onSubmit={handleSubmit}
        >
          <input
            className=" border-1 rounded py-2 pl-4 w-full text-xs"
            name="message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            id="message"
            placeholder="type your message here..."
          />
          <button type="submit" className="">
            send
          </button>
        </form>
      </div>
    </>
  );
}
