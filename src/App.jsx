import { RouterProvider } from "react-router-dom";
import { router } from "./Routing/AppRoutes";
import AuthContextProvider from "./Context/AuthContext";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
