// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../../Context/AuthContext";

// export default function GoogleSignIn({ setApiError }) {
//   const navigate = useNavigate();
//   const { setToken } = useContext(AuthContext);

//   const handleSuccess = async (credentialResponse) => {
//     console.log("Google Credential Response:", credentialResponse);

//     const idToken = credentialResponse?.credential;
//     if (!idToken) {
//       setApiError("Google token not received");
//       return;
//     }

//     try {
//       const { data } = await axios.post(
//         "http://sarahne.eu-4.evennode.com/auth/google-login",
//         {
//           idToken,
//           provider: "google",
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             accept: "*/*",
//           },
//         },
//       );

//       console.log("Backend response:", data);

//       if (data?.accessToken) {
//         // تخزين التوكن في localStorage وفي الـ Context
//         localStorage.setItem("token", data.accessToken);
//         setToken(data.accessToken);

//         // إعادة توجيه للدashboard
//         navigate("/dashboard");
//       } else {
//         setApiError("Login failed. No token returned.");
//       }
//     } catch (error) {
//       console.log("Full error object:", error);
//       console.log("Response data:", error.response?.data);
//       console.log("Response status:", error.response?.status);
//       setApiError(
//         error.response?.data?.message ||
//           "Google login failed. Please try again.",
//       );
//     }
//   };

//   return (
//     <div className="mt-6 flex justify-center">
//       <div
//         className="
//           rounded-xl overflow-hidden
//           border border-white/10
//           bg-white/5
//           backdrop-blur-sm
//         "
//       >
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={() => setApiError("Google authentication failed")}
//           theme="filled_blue"
//           size="large"
//           shape="circle"
//           width="100"
//           text="continue_with"
//         />
//       </div>
//     </div>
//   );
// }
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

export default function GoogleSignIn({ setApiError }) {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleSuccess = async (credentialResponse) => {
    console.log("Google Credential Response:", credentialResponse);

    const id = credentialResponse?.credential;
    if (!id) {
      setApiError("Google token not received");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://sarahne.eu-4.evennode.com/auth/google-login",
        {
          idToken,
          provider: "google",
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
        },
      );

      console.log("Backend response:", data);

      if (data?.accessToken) {
        localStorage.setItem("token", data.accessToken);
        setToken(data.accessToken);
        navigate("/dashboard");
      } else {
        setApiError("Login failed. No token returned.");
      }
    } catch (error) {
      console.log("Full error object:", error);
      console.log("Response data:", error.response?.data);
      console.log("Response status:", error.response?.status);
      setApiError(
        error.response?.data?.message ||
          "Google login failed. Please try again.",
      );
    }
  };

  return (
    <div className="mt-6 flex justify-center">
      <div
        className="
          rounded-xl overflow-hidden
          border border-white/10
          bg-white/5
          backdrop-blur-sm
        "
      >
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => setApiError("Google authentication failed")}
          theme="filled_blue"
          size="large"
          shape="circle"
          width="100"
          text="continue_with"
        />
      </div>
    </div>
  );
}
