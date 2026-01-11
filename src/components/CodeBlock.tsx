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
  // Uses placeholder tokens to prevent regex from corrupting already-highlighted HTML
  const highlightCode = (code: string) => {
    const placeholders: string[] = [];
    let result = code;

    // Helper to replace with placeholder - uses alphabetic markers to avoid conflicts with number regex
    const protect = (html: string): string => {
      const index = placeholders.length;
      placeholders.push(html);
      return `\x00PH_${index}_HP\x00`;
    };

    // 1. Highlight strings first (highest priority, prevents keyword matching inside strings)
    result = result.replace(/"([^"]*)"/g, (match, content) =>
      protect(`<span class="code-string">"${content}"</span>`)
    );

    // 2. Highlight comments (prevents keyword matching inside comments)
    result = result.replace(/(\/\/.*$)/gm, (match) =>
      protect(`<span class="code-comment">${match}</span>`)
    );

    // 3. Highlight keywords
    result = result.replace(/\b(int|void|return|for|while|if|else|class|struct|template|typename|const|auto|bool|char|double|float|long|short|unsigned|signed|static|virtual|override|public|private|protected|namespace|using|new|delete|nullptr|true|false|this)\b/g, (match) =>
      protect(`<span class="code-keyword">${match}</span>`)
    );

    // 4. Highlight numbers
    result = result.replace(/\b(\d+)\b/g, (match) =>
      protect(`<span class="code-number">${match}</span>`)
    );

    // 5. Highlight function calls
    result = result.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, (match, funcName) =>
      protect(`<span class="code-function">${funcName}</span>`) + '('
    );

    // Restore all placeholders - matches the PH_{index}_HP format
    result = result.replace(/\x00PH_(\d+)_HP\x00/g, (_, index) => placeholders[parseInt(index)]);

    return result;
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
