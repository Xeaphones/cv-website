import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light";

import { useToast } from "@/components/ui/use-toast";
import { useResolvedTheme } from "@/lib/hooks/useResolvedTheme";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  language: string;
  title?: string;
  highlights?: number[];
  isTerminal?: boolean;
  noTitle?: boolean;
};

function CodeHighlighter({
  code,
  language,
  highlights,
  isDark,
}: Pick<CodeBlockProps, "code" | "language" | "highlights"> & { isDark: boolean }) {
  const highlightSet = new Set(highlights ?? []);

  return (
    <SyntaxHighlighter
      language={language}
      style={isDark ? oneDark : oneLight}
      wrapLines
      showLineNumbers
      showInlineLineNumbers={false}
      lineNumberContainerStyle={{ display: "none" }}
      lineProps={(lineNumber) => ({
        className: highlightSet.has(lineNumber) ? "code-line-highlight" : undefined,
        style: { display: "block" },
      })}
      customStyle={{
        margin: 0,
        padding: "1rem",
        background: "transparent",
        fontSize: "0.875rem",
      }}
      codeTagProps={{
        className: "font-mono",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}

function CopyButton({
  copied,
  onCopy,
  className,
  compact,
}: {
  copied: boolean;
  onCopy: () => void;
  className?: string;
  compact?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={t("copyCode")}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground",
        copied && "text-primary",
        className,
      )}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {!compact && <span className="hidden sm:inline">{copied ? t("copied") : t("copy")}</span>}
    </button>
  );
}

function CodeBlockChrome({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("code-block not-prose my-6", className)}>{children}</div>;
}

export function CodeBlock({
  code,
  language,
  title,
  highlights = [],
  isTerminal = false,
  noTitle = false,
}: CodeBlockProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const isDark = useResolvedTheme() === "dark";
  const windowLabel = title ?? language;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast({
        variant: "success",
        title: t("codeCopied"),
        duration: 3000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        variant: "destructive",
        title: t("codeCopyError"),
        duration: 3000,
      });
    }
  };

  if (noTitle) {
    return (
      <CodeBlockChrome className="code-block--no-title">
        <CopyButton copied={copied} onCopy={copyCode} compact className="code-block-copy" />
        <CodeHighlighter code={code} language={language} highlights={highlights} isDark={isDark} />
      </CodeBlockChrome>
    );
  }

  if (isTerminal) {
    return (
      <CodeBlockChrome className="code-block--terminal">
        <div className="code-block-terminal-header">
          <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{language}</span>
          <span className="truncate text-center text-sm text-foreground/90">{title ?? ""}</span>
          <CopyButton copied={copied} onCopy={copyCode} />
        </div>
        <CodeHighlighter code={code} language={language} highlights={highlights} isDark={isDark} />
      </CodeBlockChrome>
    );
  }

  return (
    <CodeBlockChrome className="code-block--window">
      <div className="code-block-window-chrome">
        <div className="code-block-window-tab">
          <span className="truncate">{windowLabel}</span>
        </div>
        <CopyButton copied={copied} onCopy={copyCode} className="mb-1 shrink-0" />
      </div>
      <div className="code-block-window-body">
        <CodeHighlighter code={code} language={language} highlights={highlights} isDark={isDark} />
      </div>
    </CodeBlockChrome>
  );
}
