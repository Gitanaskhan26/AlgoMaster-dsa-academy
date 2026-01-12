import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const CodeBlock = ({ code, language = "cpp", title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting for C++
  const highlightCode = (code: string) => {
    return code
      .replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>')
      .replace(/\b(int|void|return|for|while|if|else|class|struct|template|typename|const|auto|bool|char|double|float|long|short|unsigned|signed|static|virtual|override|public|private|protected|namespace|using|new|delete|nullptr|true|false|this)\b/g, '<span class="code-keyword">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="code-string">"$1"</span>')
      .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="code-function">$1</span>(');
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-border bg-card">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
          <span className="text-sm font-mono text-muted-foreground">{title}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-mono">
            {language}
          </span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto">
          <code
            className="font-mono text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
          />
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded-lg bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          title="Copy code"
        >
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;
