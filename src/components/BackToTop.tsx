import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { scrollToHomeTop } from "@/lib/hooks";
import { stripLocalePrefix } from "@/lib/locale";

const SCROLL_THRESHOLD = 400;

export function BackToTop() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Button
      type="button"
      size="icon"
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-none"
      aria-label={t("backToTop")}
      onClick={() => {
        scrollToHomeTop("smooth");
        if (stripLocalePrefix(location.pathname) === "/" && location.hash) {
          navigate(
            { pathname: location.pathname, search: location.search, hash: "" },
            { replace: true, preventScrollReset: true },
          );
        }
      }}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </Button>
  );
}
