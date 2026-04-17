import { useState } from "react";

import { Button, Input } from "@heroui/react";
import { FiMessageCircle } from "react-icons/fi";

export const SendMessageForm = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <Input
        variant="bordered"
        placeholder="Write your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        type="submit"
        variant="shadow"
        color="primary"
        className="flex items-center gap-1"
      >
        <FiMessageCircle /> Send
      </Button>
    </form>
  );
};
