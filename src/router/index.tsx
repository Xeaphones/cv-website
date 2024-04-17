import { createBrowserRouter } from "react-router-dom";
import { Home } from '@pages/home';
import { More } from '@pages/more';
import { Projects } from '@pages/projects';
import { Contact } from '@pages/contact';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "more",
      element: <More />,
    },
    {
      path: "projects",
      element: <Projects />,
    },
    {
      path: "contact",
      element: <Contact />,
    },
]);