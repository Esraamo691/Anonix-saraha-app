import { useState, useEffect } from "react";
import { Card } from "@heroui/react";
import { FaUserSecret } from "react-icons/fa";
import AnonymousMessageForm from "../../Components/AnonymousMessageForm/AnonymousMessageForm";
import { useParams } from "react-router-dom";
import { getSharedProfile } from "../../services/profileServices";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const data = await getSharedProfile(id);
        setUser(data);
      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="min-h-screen relative py-10 bg-[#070a10] flex items-center justify-center px-4">
      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-[120px]" />

      <div className="relative z-10 w-full max-w-4xl">
        <Card className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-3">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-600 to-indigo-900 flex items-center justify-center text-white text-xl font-semibold shadow-md">
              {user?.firstName?.[0] || "U"}
              {user?.lastName?.[0] || ""}
            </div>

            {/* Name */}
            <div className="space-y-1">
              <h1 className="text-xl font-semibold text-white">
                {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
              </h1>
              <p className="text-sm text-gray-400">
                @{user?.userName || "username"}
              </p>
            </div>

            {/* Tag */}
            <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <FaUserSecret className="text-blue-400" />
              Anonymous messages
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-white/10" />

          {/* Message Section */}
          <div className="space-y-3">
            <div className="text-center">
              <h2 className="text-base font-medium text-white">
                Send a Message
              </h2>
              <p className="text-gray-400 text-xs">
                You can stay anonymous or reveal yourself
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              {/* 👇 مهم جدًا تبعت الـ userId */}
              <AnonymousMessageForm userId={id} />
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-[11px] text-gray-500 mt-5">
          Powered by <span className="text-blue-500 font-medium">ANONIX</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;

// // import { useState } from "react";
// // import { Card } from "@heroui/react";
// // import { FaPaperPlane, FaUserSecret } from "react-icons/fa";
// // import AnonymousMessageForm from "../../Components/AnonymousMessageForm/AnonymousMessageForm";
// // import { useParams } from "react-router-dom";
// // const Profile = () => {
// //   const [user, setUser] = useState(null);
// //   const [content, setContent] = useState("");

// //   return (
// //     <div className="min-h-screen relative bg-[#070a10] flex items-center justify-center px-4">
// //       {/* Glow */}
// //       <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-3xl" />
// //       <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-[120px]" />

// //       <div className="relative z-10 w-full max-w-xl">
// //         <Card className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
// //           {/* Avatar */}
// //           <div className="flex flex-col items-center text-center space-y-4">
// //             <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-600 to-indigo-900 flex items-center justify-center text-white text-3xl font-bold">
// //               Esraa Mohamed
// //             </div>

// //             <div>
// //               <h1 className="text-2xl font-bold text-white">user.fullName</h1>
// //               <p className="text-gray-400">@user.userName</p>
// //             </div>

// //             <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-full">
// //               <FaUserSecret />
// //               Send anonymous message
// //             </div>
// //           </div>
// //           {/* Message Form */}

// //           <div className="space-y-4">
// //             <div className="text-center">
// //               <h2 className="text-xl font-semibold mb-2">Send a Message</h2>
// //               <p className="text-muted-foreground text-sm">
// //                 Choose to send anonymously or reveal your identity - it's up to
// //                 you!
// //               </p>
// //             </div>
// //             <AnonymousMessageForm />
// //           </div>
// //         </Card>

// //         {/* Footer */}
// //         <p className="text-center text-xs text-gray-500 mt-6">
// //           Powered by <span className="text-blue-500 font-semibold">ANONIX</span>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;
// import { useState } from "react";
// import { Card } from "@heroui/react";
// import { FaUserSecret } from "react-icons/fa";
// import AnonymousMessageForm from "../../Components/AnonymousMessageForm/AnonymousMessageForm";

// const Profile = () => {
//   const [user, setUser] = useState(null);

//   return (
//     <div className="min-h-screen relative bg-[#070a10] flex items-center justify-center px-4">
//       {/* Glow (سيبناه زي ما هو 🔥) */}
//       <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-3xl" />
//       <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-[120px]" />

//       <div className="relative z-10 w-full max-w-md">
//         <Card className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
//           {/* Header */}
//           <div className="flex flex-col items-center text-center space-y-3">
//             {/* Avatar */}
//             <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center text-white text-xl font-semibold shadow-md">
//               {user?.firstName?.[0] || "U"}
//               {user?.lastName?.[0] || ""}
//             </div>

//             {/* Name */}
//             <div className="space-y-1">
//               <h1 className="text-xl font-semibold text-white">
//                 {user?.firstName} {user?.lastName}
//               </h1>
//               <p className="text-sm text-gray-400">
//                 @{user?.userName || "username"}
//               </p>
//             </div>

//             {/* Tag */}
//             <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
//               <FaUserSecret className="text-blue-400" />
//               Anonymous messages
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="my-5 h-px bg-white/10" />

//           {/* Message Section */}
//           <div className="space-y-3">
//             <div className="text-center">
//               <h2 className="text-base font-medium text-white">
//                 Send a Message
//               </h2>
//               <p className="text-gray-400 text-xs">
//                 You can stay anonymous or reveal yourself
//               </p>
//             </div>

//             <div className="bg-white/5 border border-white/10 rounded-xl p-3">
//               <AnonymousMessageForm />
//             </div>
//           </div>
//         </Card>

//         {/* Footer */}
//         <p className="text-center text-[11px] text-gray-500 mt-5">
//           Powered by <span className="text-blue-500 font-medium">ANONIX</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Profile;
