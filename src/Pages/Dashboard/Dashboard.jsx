import { useEffect, useState } from "react";
import { MessageActions } from "../../Components/Messages/MessageActions";
import { SendMessageForm } from "../../Components/Messages/SendMessageForm";
import { MessageList } from "../../Components/Messages/MessageList";
import { getCurrentUser } from "../../services/profileServices";
import {
  deleteMessage,
  getAllMessages,
  getFavourites,
  sendMessage,
  toggleFavourite,
} from "../../services/messageServices";
import MessageStats from "../../Components/messages/MessageStats";
import { Snippet } from "@heroui/react";
import { Tabs, Tab } from "@heroui/react";
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const favourites = messages.filter((m) => m.isFavourite);
  const [activeTab, setActiveTab] = useState("all");
  const profileUrl = userId ? `${window.location.origin}/user/${userId}` : "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        setUserId(user?.id);

        const data = await getAllMessages();
        setMessages(data?.message || []);
      } catch (err) {
        console.log("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleFav = async (messageId) => {
    try {
      await toggleFavourite(messageId);

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId
            ? { ...msg, isFavourite: !msg.isFavourite }
            : msg,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleToggleRead = (messageId) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === messageId ? { ...msg, isRead: !msg.isRead } : msg,
      ),
    );
  };

  // stats
  const handleSend = async (text, isAnonymous, senderName) => {
    if (!userId) return;
    try {
      const res = await sendMessage(userId, { message: text });
      let newMessage = res.data?.result?.message;
      if (!newMessage) return;

      newMessage = {
        ...newMessage,
        isAnonymous,
        displayName: isAnonymous
          ? null
          : senderName ||
            `${newMessage.senderId?.firstName} ${newMessage.senderId?.lastName}`.trim(),
      };

      setMessages((prev) => [newMessage, ...prev]);
    } catch (err) {
      console.log("SEND ERROR:", err);
    }
  };

  const stats = {
    totalMessages: messages.length,
    unreadMessages: messages.filter((m) => !m.isRead).length,
    likedMessages: messages.filter((m) => m.isFavourite).length,
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-3 font-bold text-white">
              Your Messages
            </h1>
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

        <Tabs
          selectedKey={activeTab}
          onSelectionChange={setActiveTab}
          color="primary"
          variant="bordered"
        >
          <Tab key="all" title="All Messages" />
          <Tab key="fav" title="Favourites" />
        </Tabs>
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
            {/* <MessageList messages={messages} onDelete={handleDelete} /> */}
            {activeTab === "all" ? (
              <MessageList
                messages={messages}
                onDelete={handleDelete}
                onToggleFav={handleToggleFav}
                onToggleRead={handleToggleRead}
              />
            ) : (
              <MessageList
                messages={favourites}
                onDelete={handleDelete}
                onToggleFav={handleToggleFav}
                onToggleRead={handleToggleRead}
              />
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6 ">
            <MessageStats {...stats} />
            {/* <ShareableLink /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
