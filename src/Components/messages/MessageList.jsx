// import { MessageActions } from "./MessageActions";
// import { MessageCard } from "./MessageCard";

// export const MessageList = ({ messages, onDelete, onToggleFav }) => {
// const handleToggleRead = (messageId) => {
//   setMessages((prev) =>
//     prev.map((msg) =>
//       msg._id === messageId ? { ...msg, isRead: !msg.isRead } : msg,
//     ),
//   );
// };
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {messages?.length > 0 ? (
//         messages.map((msg) => (
//           <MessageCard
//             key={msg._id}
//             message={msg}
//             onDelete={onDelete}
//             onToggleFav={onToggleFav}
//           />
//         ))
//       ) : (
//         <div className="col-span-full text-center text-gray-400 py-10">
//           No messages found
//         </div>
//       )}
//       <MessageActions
//         message={message}
//         onDelete={handleDelete}
//         onToggleFav={handleToggleFav}
//         onToggleRead={handleToggleRead}
//       />
//     </div>
//   );
// };
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
