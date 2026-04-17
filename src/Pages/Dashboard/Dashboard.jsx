import { useEffect, useState } from "react";
import { MessageActions } from "../../Components/Messages/MessageActions";
import { SendMessageForm } from "../../Components/Messages/SendMessageForm";
import { MessageList } from "../../Components/Messages/MessageList";
import {
  deleteMessage,
  getAllMessages,
  sendMessage,
} from "../../services/messageServices";
import MessageStats from "../../Components/messages/MessageStats";
import { Snippet } from "@heroui/react";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = "69df9b1a39b56acccd85d047";
  const profileUrl = `${window.location.origin}/user/${userId}`;
  // GET messages
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getAllMessages();

        // 🔥 IMPORTANT SAFE HANDLING
        setMessages(data?.message || []);
      } catch (err) {
        console.log("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // SEND message
  const handleSend = async (text) => {
    try {
      const res = await sendMessage(userId, { message: text });

      const newMessage = res.data?.result?.message;

      if (!newMessage) return;

      // optimistic update
      setMessages((prev) => [newMessage, ...prev]);
    } catch (err) {
      console.log("SEND ERROR:", err);
    }
  };

  // stats
  const stats = {
    totalMessages: messages.length,
    unreadMessages: messages.filter((m) => !m.isRead).length,
    likedMessages: messages.filter((m) => m.isLike).length,
    thisWeekMessages: messages.filter((m) => {
      const diff = (new Date() - new Date(m.createdAt)) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }).length,
  };

  const handleDelete = async (messageId) => {
    try {
      await deleteMessage(messageId);

      // remove from UI instantly (optimistic update)
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };
  return (
    <div className="min-h-screen  bg-[#070a10] p-10">
      <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-2xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* <div className="text-center text-white mb-6">
          <h1 className="text-4xl font-bold">ANONIX Dashboard</h1>
          <p className="text-gray-300 mt-1">
            Manage your messages anonymously with style.
          </p>
        </div> */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Messages</h1>
            <p className="text-gray-400 text-sm">
              Manage anonymous feedback in real time
            </p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
          <p className="text-white font-medium">Your Link</p>

          <div className="snippetBox bg-white/5 border border-white/10 rounded-lg p-3 text-xs">
            <Snippet
              className="w-full max-w-full break-all whitespace-pre-wrap overflow-x-auto custom-scroll"
              color="primary"
              variant="flat"
            >
              {profileUrl}
            </Snippet>
          </div>
        </div>
        <MessageActions {...stats} />

        {/* <SendMessageForm onSend={handleSend} />

        {loading ? (
          <div className="text-white text-center">Loading messages...</div>
        ) : (
          <MessageList messages={messages} onDelete={handleDelete} />
        )} */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <SendMessageForm onSend={handleSend} />
            <MessageList messages={messages} onDelete={handleDelete} />
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            <MessageStats {...stats} />
            {/* <ShareableLink /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
