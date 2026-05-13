import { useState } from "react";
import { Button } from "@heroui/react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import { MessageActions } from "./MessageActions";

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
    : typeof message.senderId === "object"
      ? `${message.senderId.firstName} ${message.senderId.lastName}`
      : "User";
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
