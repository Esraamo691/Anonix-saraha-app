import { RouterProvider } from "react-router-dom";
import { router } from "./Routing/AppRoutes";
import AuthContextProvider from "./Context/AuthContext";

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}
