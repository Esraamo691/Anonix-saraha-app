import { useState } from "react";
import { Button } from "@heroui/react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import { MessageActions } from "./MessageActions";
// export const MessageCard = ({
//   message,
//   onDelete,
//   onToggleFav,
//   onToggleRead,
// }) => {
//   const [isFav, setIsFav] = useState(message.isFavourite);
//   const handleFav = async () => {
//     try {
//       await onToggleFav(message._id);
//       setIsFav((prev) => !prev);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
//       <div className="flex justify-between ">
//         <div className="max-w-[70%]">
//           <p className="text-white wrap-break-word whitespace-pre-wrap leading-relaxed">
//             {message.content}
//           </p>
//           <span className="text-xs text-gray-400">
//             {new Date(message.createdAt).toLocaleString()}
//           </span>
//         </div>
//         {/*
//         <div className="flex flex-col gap-2 ml-4">

//           <Button
//             variant="ghost"
//             size="sm"
//             className="text-red-500"
//             onClick={() => onDelete(message._id)}
//           >
//             <BsTrash2 />
//           </Button>

//           <Button onClick={handleFav} variant="ghost" size="sm">
//             <BiHeart
//               className={
//                 isFav ? "text-pink-500 text-xl hidden" : "text-gray-400 text-xl"
//               }
//             />

//             <BiSolidHeart
//               className={isFav ? "text-pink-500 text-xl" : "hidden"}
//             />
//           </Button>

//         </div>
//           */}
//         <div className="">
//           <MessageActions
//             message={message}
//             onDelete={onDelete}
//             onToggleFav={onToggleFav}
//             onToggleRead={onToggleRead}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
export const MessageCard = ({
  message,
  onDelete,
  onToggleFav,
  onToggleRead,
}) => {
  const [isFav, setIsFav] = useState(message.isFavourite);

  const handleFav = async () => {
    try {
      await onToggleFav(message._id);
      setIsFav((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const senderLabel = message.isAnonymous
    ? "Anonymous"
    : message.displayName ||
      (typeof message.senderId === "object"
        ? `${message.senderId?.firstName} ${message.senderId?.lastName}`.trim()
        : null);
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <div className="flex justify-between">
        <div className="max-w-[70%]">
          {/* اسم المرسل */}
          {senderLabel && (
            <p className="text-xs text-blue-400 font-medium mb-1">
              {senderLabel}
            </p>
          )}

          <p className="text-white wrap-break-word whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>

          <span className="text-xs text-gray-400">
            {new Date(message.createdAt).toLocaleString()}
          </span>
        </div>

        <div>
          <MessageActions
            message={message}
            onDelete={onDelete}
            onToggleFav={onToggleFav}
            onToggleRead={onToggleRead}
          />
        </div>
      </div>
    </div>
  );
};
