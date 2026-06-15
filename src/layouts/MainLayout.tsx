import { Outlet } from "react-router-dom";

import { BackToTop } from "@/components/BackToTop";
import Header from "@/components/header";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { Toaster } from "@/components/ui/toaster";

export function MainLayout() {
  return (
    <>
      <PersonJsonLd />
      <Header />
      <Outlet />
      <BackToTop />
      <Toaster />
    </>
  );
}
