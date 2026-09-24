import { useEffect, useState } from "react";

const AGENT_UA =
  /HeadlessChrome|curl\.md|GPTBot|ClaudeBot|Google-Extended|Applebot|bingbot|Bytespider|CCBot|Diffbot|FacebookBot|meta-externalagent/i;

/**
 * True for headless browsers / known agent crawlers (e.g. curl.md).
 * Used to serve a compact document instead of the marketing homepage.
 */
export function usePreferMachineReadable(): boolean {
  const [prefer, setPrefer] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent ?? "";
    setPrefer(navigator.webdriver === true || AGENT_UA.test(ua));
  }, []);

  return prefer;
}
