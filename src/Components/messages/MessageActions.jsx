import { Button } from "@heroui/react";
// import { Heart, Trash2, Eye, EyeOff } from "react-icons";
import { BiHeart } from "react-icons/bi";
import { BsEye, BsTrash2 } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";

export const MessageActions = ({
  onDelete,
  onLike,
  onToggleVisible,
  isVisible,
}) => {
  return (
    <div className="flex gap-2 mt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onLike}
        className="flex items-center gap-1"
      >
        <BiHeart /> Like
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onDelete}
        className="flex items-center gap-1"
      >
        <BsTrash2 /> Delete
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleVisible}
        className="flex items-center gap-1"
      >
        {isVisible ? <FiEyeOff /> : <BsEye />} {isVisible ? "Hide" : "Show"}
      </Button>
    </div>
  );
};
