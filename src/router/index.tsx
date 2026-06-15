import { createBrowserRouter } from "react-router-dom";
import { Home } from '@pages/home';
import { More } from '@pages/more';
import { Projects } from '@pages/projects';
import { Contact } from '@pages/contact';
import { BlogList } from '@pages/blog';
import { BlogPost } from '@pages/blog/post';
import { NotFoundPage } from "@pages/not-found";
import { MainLayout } from "@/layouts/MainLayout";

export const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
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
          path: "blog",
          element: <BlogList />,
        },
        {
          path: "blog/:section/:slug",
          element: <BlogPost />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
]);
