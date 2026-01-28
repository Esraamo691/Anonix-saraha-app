// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { HeroUIProvider } from "@heroui/react";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <HeroUIProvider>
//       <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//         <App />
//       </GoogleOAuthProvider>
//     </HeroUIProvider>
//   </StrictMode>,
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <GoogleOAuthProvider clientId="960701293742-gj16aod0dh79561lfj8373tms0mco9p2.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </HeroUIProvider>
  </StrictMode>,
);
