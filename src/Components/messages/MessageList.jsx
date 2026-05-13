import { MessageCard } from "../messages/MessageCard";

export const MessageList = ({
  messages,
  onDelete,
  onToggleFav,
  onToggleRead,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {messages?.length > 0 ? (
        messages.map((msg) => (
          <MessageCard
            key={msg._id}
            message={msg}
            onDelete={onDelete}
            onToggleFav={onToggleFav}
            onToggleRead={onToggleRead}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-400 py-10">
          No messages found
        </div>
      )}
    </div>
  );
};
