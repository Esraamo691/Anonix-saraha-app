// import { useState } from "react";
// import { Card, Button, Input, Textarea, Switch } from "@heroui/react";
// import { FaPaperPlane, FaUserSecret, FaUser } from "react-icons/fa";

// export default function AnonymousMessageForm() {
//   const [message, setMessage] = useState("");
//   const [senderName, setSenderName] = useState("");
//   const [isAnonymous, setIsAnonymous] = useState(true);

//   const remainingChars = 500 - message.length;

//   return (
//     <Card className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
//       {/* Header */}
//       <div className="text-center mb-6">
//         <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-blue-600/20 flex items-center justify-center">
//           <FaUserSecret className="text-blue-500 text-xl" />
//         </div>

//         <h2 className="text-2xl font-bold text-white">
//           Send a message to <span className="text-blue-500"></span>
//         </h2>

//         <p className="text-sm text-gray-400 mt-1">
//           Totally anonymous. No one will know it’s you 👀
//         </p>
//       </div>

//       {/* Message */}
//       <div className="space-y-2 mb-6">
//         <Textarea
//           placeholder="Write your message here..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           maxLength={500}
//           minRows={5}
//           className="bg-black/40 text-white border-white/10 focus:border-blue-600"
//         />

//         <div className="flex justify-end text-xs">
//           <span
//             className={`${
//               remainingChars < 50 ? "text-red-400" : "text-gray-400"
//             }`}
//           >
//             {remainingChars} characters left
//           </span>
//         </div>
//       </div>

//       {/* Anonymous toggle */}
//       <div className="mb-6 p-4 rounded-xl bg-black/30 border border-white/10">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3 text-white">
//             <FaUser className="text-blue-400" />
//             <div>
//               <p className="text-sm font-medium">Send anonymously</p>
//               <p className="text-xs text-gray-400">
//                 {isAnonymous
//                   ? "Your identity is hidden"
//                   : "Your name will be shown"}
//               </p>
//             </div>
//           </div>

//           <Switch isSelected={isAnonymous} onValueChange={setIsAnonymous} />
//         </div>

//         {!isAnonymous && (
//           <div className="mt-4">
//             <Input
//               placeholder="Your name (optional)"
//               value={senderName}
//               onChange={(e) => setSenderName(e.target.value)}
//               maxLength={50}
//               className="bg-black/40 text-white border-white/10"
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               This name will appear with your message
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Button */}
//       <Button
//         color="primary"
//         className="w-full flex items-center gap-2"
//         isDisabled={!message.trim()}
//       >
//         <FaPaperPlane />
//         Send Message
//       </Button>

//       <p className="text-[11px] text-gray-500 text-center mt-4">
//         Please be respectful. Messages are moderated.
//       </p>
//     </Card>
//   );
// }
import { useState } from "react";
import { Card, Button, Input, Textarea, Switch } from "@heroui/react";
import { FaPaperPlane, FaUserSecret, FaUser } from "react-icons/fa";
import { sendMessage } from "../../services/messageServices";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AnonymousMessageForm() {
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [loading, setLoading] = useState(false);

  const remainingChars = 500 - message.length;

  const handleSubmit = async () => {
    if (!message.trim() || !id) return;

    try {
      setLoading(true);

      await sendMessage(id, {
        message,
      });
      // reset
      setMessage("");
      setSenderName("");
      setIsAnonymous(true);

      toast.success("Message sent successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-blue-600/20 flex items-center justify-center">
          <FaUserSecret className="text-blue-500 text-xl" />
        </div>

        <h2 className="text-2xl font-bold text-white">
          Send a message to <span className="text-blue-500">{id}</span>
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Totally anonymous. No one will know it’s you 👀
        </p>
      </div>

      {/* Message */}
      <div className="space-y-2 mb-6">
        <Textarea
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          minRows={5}
        />

        <div className="flex justify-end text-xs">
          <span
            className={remainingChars < 50 ? "text-red-400" : "text-gray-400"}
          >
            {remainingChars} characters left
          </span>
        </div>
      </div>

      {/* Anonymous toggle */}
      <div className="mb-6 p-4 rounded-xl bg-black/30 border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <FaUser className="text-blue-400" />
            <div>
              <p className="text-sm font-medium">Send anonymously</p>
              <p className="text-xs text-gray-400">
                {isAnonymous
                  ? "Your identity is hidden"
                  : "Your name will be shown"}
              </p>
            </div>
          </div>

          <Switch isSelected={isAnonymous} onValueChange={setIsAnonymous} />
        </div>

        {!isAnonymous && (
          <div className="mt-4">
            <Input
              placeholder="Your name (optional)"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              maxLength={50}
            />
          </div>
        )}
      </div>

      {/* Button */}
      <Button
        color="primary"
        className="w-full flex items-center gap-2"
        isDisabled={!message.trim() || loading}
        isLoading={loading}
        onPress={handleSubmit}
      >
        <FaPaperPlane />
        Send Message
      </Button>

      <p className="text-[11px] text-gray-500 text-center mt-4">
        Please be respectful. Messages are moderated.
      </p>
    </Card>
  );
}
