import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";

const Home = lazy(() => import("@/pages/home").then((module) => ({ default: module.Home })));
const More = lazy(() => import("@/pages/more").then((module) => ({ default: module.More })));
const Projects = lazy(() =>
  import("@/pages/projects").then((module) => ({ default: module.Projects })),
);
const Contact = lazy(() =>
  import("@/pages/contact").then((module) => ({ default: module.Contact })),
);
const BlogList = lazy(() =>
  import("@/pages/blog").then((module) => ({ default: module.BlogList })),
);
const BlogPost = lazy(() =>
  import("@/pages/blog/post").then((module) => ({ default: module.BlogPost })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/not-found").then((module) => ({ default: module.NotFoundPage })),
);

function RouteLoadingFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <div className="space-y-4">
        <div className="h-5 w-40 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-3/4 animate-pulse rounded-md bg-muted/80" />
        <div className="h-4 w-full animate-pulse rounded-md bg-muted/70" />
        <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted/70" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-32 animate-pulse rounded-xl border border-border/60 bg-card/50" />
        <div className="h-32 animate-pulse rounded-xl border border-border/60 bg-card/50" />
        <div className="h-32 animate-pulse rounded-xl border border-border/60 bg-card/50" />
      </div>
    </div>
  );
}

function withSuspense(element: JSX.Element) {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      {element}
    </Suspense>
  );
}

export const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: withSuspense(<Home />),
        },
        {
          path: "more",
          element: withSuspense(<More />),
        },
        {
          path: "projects",
          element: withSuspense(<Projects />),
        },
        {
          path: "blog",
          element: withSuspense(<BlogList />),
        },
        {
          path: "blog/:section/:slug",
          element: withSuspense(<BlogPost />),
        },
        {
          path: "contact",
          element: withSuspense(<Contact />),
        },
        {
          path: "*",
          element: withSuspense(<NotFoundPage />),
        },
      ],
    },
]);
