import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter, useLocation } from "react-router-dom";

import { LocaleLayout } from "@/layouts/LocaleLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { localeFromPathname, withLocalePrefix } from "@/lib/locale";

const Home = lazy(() => import("@/pages/home").then((module) => ({ default: module.Home })));
const Profile = lazy(() =>
  import("@/pages/profile").then((module) => ({ default: module.Profile })),
);
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
  import("@/pages/NotFound").then((module) => ({ default: module.NotFoundPage })),
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

function HomeFallback() {
  return <div className="h-[100dvh] w-full bg-background2" aria-hidden />;
}

function withSuspense(element: JSX.Element, fallback = <RouteLoadingFallback />) {
  return <Suspense fallback={fallback}>{element}</Suspense>;
}

/** Keep old `/more` links working after the profile URL rename. */
function LegacyMoreRedirect() {
  const { pathname, search, hash } = useLocation();
  const locale = localeFromPathname(pathname);
  return <Navigate to={withLocalePrefix(`/profile${search}${hash}`, locale)} replace />;
}

function createPageChildren() {
  return [
    {
      index: true,
      element: withSuspense(<Home />, <HomeFallback />),
    },
    {
      path: "profile",
      element: withSuspense(<Profile />),
    },
    {
      path: "more",
      element: <LegacyMoreRedirect />,
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
  ];
}

function localeBranch(path: "/" | "/fr" | "/en", locale: "fr" | "en") {
  return {
    path,
    element: <MainLayout />,
    children: [
      {
        element: <LocaleLayout locale={locale} />,
        children: createPageChildren(),
      },
    ],
  };
}

// Explicit /en and /fr (RR6 has no /:lang(fr|en) regex). `/` = default FR.
export const router = createBrowserRouter([
  localeBranch("/en", "en"),
  localeBranch("/fr", "fr"),
  localeBranch("/", "fr"),
]);
