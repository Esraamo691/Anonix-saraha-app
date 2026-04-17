// import { Button } from "@heroui/react";
// // import { Heart, Trash2 } from "react-icons";
// import { BiHeart } from "react-icons/bi";
// import { BsTrash2 } from "react-icons/bs";
// import { CgLock } from "react-icons/cg";

// export const MessageCard = ({ message }) => {
//   return (
//     <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300">
//       <div className="flex justify-between items-start">
//         <div>
//           <div className="flex items-center gap-2 mb-2">
//             <div
//               className={`w-3 h-3 rounded-full ${message.isRead ? "bg-muted" : "bg-blue-500 animate-pulse"}`}
//             />
//             <span className="text-gray-300 text-xs flex items-center gap-1">
//               <CgLock className="h-3 w-3" />
//               {message.createdAt}
//             </span>
//             {message.fromName && (
//               <span className="text-blue-400 text-sm">
//                 from {message.fromName}
//               </span>
//             )}
//           </div>
//           <p className={`text-white ${!message.isRead ? "font-medium" : ""}`}>
//             {message.content}
//           </p>
//           <div className="flex gap-2 mt-2 text-xs">
//             {!message.isRead && (
//               <span className="bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full">
//                 New
//               </span>
//             )}
//             {message.isLike && (
//               <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded-full">
//                 Liked
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="flex flex-col gap-2 ml-4">
//           <Button
//             variant="ghost"
//             size="sm"
//             className="h-8 w-8 p-0 text-red-500 hover:bg-red-500/10"
//           >
//             <BsTrash2 className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="sm"
//             className="h-8 w-8 p-0 text-red-500 hover:bg-red-500/10"
//           >
//             <BiHeart
//               className={`h-4 w-4 ${message.isLike ? "fill-red-500 stroke-red-500" : ""}`}
//             />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
import { Button } from "@heroui/react";
import { BiHeart } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { CgLock } from "react-icons/cg";

// export const MessageCard = ({ message }) => {
//   return (
//     <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
//       <div className="flex justify-between">
//         <div>
//           <div className="flex items-center gap-2 mb-2">
//             <span className="text-gray-300 text-xs flex items-center gap-1">
//               <CgLock className="h-3 w-3" />
//               {new Date(message.createdAt).toLocaleString()}
//             </span>
//           </div>

//           <p className="text-white">{message.content}</p>

//           <div className="flex gap-2 mt-2 text-xs">
//             {message.isRead === false && (
//               <span className="bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full">
//                 New
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="flex flex-col gap-2 ml-4">
//           <Button variant="ghost" size="sm" className="text-red-500">
//             <BsTrash2 />
//           </Button>

//           <Button variant="ghost" size="sm">
//             <BiHeart className={message.isLike ? "text-red-500" : ""} />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
export const MessageCard = ({ message, onDelete }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <div className="flex justify-between">
        <div>
          <p className="text-white">{message.content}</p>

          <span className="text-xs text-gray-400">
            {new Date(message.createdAt).toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col gap-2 ml-4">
          {/* DELETE */}
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500"
            onClick={() => onDelete(message._id)}
          >
            <BsTrash2 />
          </Button>

          <Button variant="ghost" size="sm">
            <BiHeart className={message.isLike ? "text-red-500" : ""} />
          </Button>
        </div>
      </div>
    </div>
  );
};
