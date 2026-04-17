import { useEffect, useRef, useState } from "react";
import {
  getMessages,
  softDeleteMessage,
  toggleVisibility,
} from "../api/messages.api";

export default function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  const fetchMessages = async () => {
    try {
      const { data } = await getMessages();
      setMessages(data.messages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    await softDeleteMessage(id);
    setMessages((prev) => prev.filter((m) => m._id !== id));
  };

  const toggleMessageVisibility = async (id) => {
    await toggleVisibility(id);
    setMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, visible: !m.visible } : m)),
    );
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchMessages();
  }, []);

  return { messages, loading, deleteMessage, toggleMessageVisibility };
}
