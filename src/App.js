import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login, { loginAction } from "./pages/Login";
import Home from "./pages/Home";
import { checkAuthLoader, checkIsLoggedIn } from "./util/auth";
import ErrorPage from "./pages/Error";
import CtxProvider from "./util/reducer";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: checkAuthLoader,
  },
  {
    path: "/login",
    element: <Login />,
    loader: checkIsLoggedIn,
    action: loginAction,
  },
]);
const App = () => {
  return (
    <CtxProvider>
      <RouterProvider router={router} />
    </CtxProvider>
  );
};

export default App;
