import { MessageCard } from "./MessageCard";
// export const MessageList = ({ messages }) => {
//   if (!messages) return null;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {messages.length > 0 ? (
//         messages.map((msg) => <MessageCard key={msg._id} message={msg} />)
//       ) : (
//         <div className="col-span-full text-center text-gray-400 py-10">
//           No messages found
//         </div>
//       )}
//     </div>
//   );
// };
export const MessageList = ({ messages, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {messages?.length > 0 ? (
        messages.map((msg) => (
          <MessageCard key={msg._id} message={msg} onDelete={onDelete} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-400 py-10">
          No messages found
        </div>
      )}
    </div>
  );
};
