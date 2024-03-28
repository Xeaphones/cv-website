import { createBrowserRouter } from "react-router-dom";
import { Home } from '../pages/home';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "test",
      element: <div>Test</div>,
    }
]);