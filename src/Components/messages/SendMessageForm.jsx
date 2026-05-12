// import { useState } from "react";

// import { Button, Input } from "@heroui/react";
// import { FiMessageCircle } from "react-icons/fi";

// export const SendMessageForm = ({ onSend }) => {
//   const [text, setText] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;
//     onSend(text);
//     setText("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
//       <Input
//         variant="bordered"
//         placeholder="Write your message..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <Button
//         type="submit"
//         variant="shadow"
//         color="primary"
//         className="flex items-center gap-1"
//       >
//         <FiMessageCircle /> Send
//       </Button>
//     </form>
//   );
// };
import { useState } from "react";
import { Button, Input, Switch } from "@heroui/react";
import { FiMessageCircle } from "react-icons/fi";

export const SendMessageForm = ({ onSend }) => {
  const [text, setText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [senderName, setSenderName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text, isAnonymous, !isAnonymous ? senderName : undefined);
    setText("");
    setSenderName("");
    setIsAnonymous(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <div className="flex gap-3">
        <Input
          variant="bordered"
          placeholder="Write your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          type="submit"
          variant="shadow"
          color="primary"
          isDisabled={!text.trim()}
          className="flex items-center gap-1"
        >
          <FiMessageCircle /> Send
        </Button>
      </div>

      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">Send anonymously</p>
            <p className="text-xs text-gray-400">
              {isAnonymous
                ? "Your identity is hidden"
                : "Your name will be shown"}
            </p>
          </div>
          <Switch isSelected={isAnonymous} onValueChange={setIsAnonymous} />
        </div>

        {!isAnonymous && (
          <Input
            placeholder="Your name (optional)"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            maxLength={50}
            size="sm"
            variant="bordered"
          />
        )}
      </div>
    </form>
  );
};
