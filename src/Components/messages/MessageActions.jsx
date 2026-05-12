import { Button } from "@heroui/react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { FiEyeOff, FiEye } from "react-icons/fi";

export const MessageActions = ({
  message,
  onDelete,
  onToggleFav,
  onToggleRead,
}) => {
  const isFav = message.isFavourite;
  const isRead = message.isRead;

  return (
    <div className="flex flex-col gap-2 mt-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggleFav(message._id)}
        className="flex items-center gap-1"
      >
        {isFav ? (
          <BiSolidHeart className="text-pink-500 text-xl" />
        ) : (
          <BiHeart className="text-gray-400 text-xl" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggleRead(message._id)}
        className="flex items-center gap-1"
      >
        {isRead ? (
          <FiEye className="text-green-400" />
        ) : (
          <FiEyeOff className="text-gray-400" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(message._id)}
        className="text-red-500"
      >
        <BsTrash2 />
      </Button>
    </div>
  );
};
