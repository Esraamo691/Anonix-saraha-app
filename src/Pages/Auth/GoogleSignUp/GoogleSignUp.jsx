import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleSignUp() {
  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential; // 👈 ده المهم

    try {
      const res = await axios.post(
        "http://sarahne.eu-4.evennode.com/auth/google-signup",
        {
          idToken: idToken,
        },
      );

      console.log("Backend response:", res.data);
    } catch (err) {
      console.log("Error:", err.response?.data);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.log("Google Login Failed");
      }}
    />
  );
}
