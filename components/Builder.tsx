"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";

type Endpoint =
  | "signal"
  | "stats"
  | "languages"
  | "repo"
  | "streak"
  | "activity"
  | "profile"
  | "terminal"
  | "badge"
  | "button"
  | "status";

const endpointOptions: Array<{ value: Endpoint; label: string }> = [
  { value: "signal", label: "Full Signal" },
  { value: "stats", label: "Stats" },
  { value: "languages", label: "Languages" },
  { value: "repo", label: "Repository" },
  { value: "streak", label: "Streak" },
  { value: "activity", label: "Activity" },
  { value: "profile", label: "Profile" },
  { value: "terminal", label: "Terminal" },
  { value: "badge", label: "Badge" },
  { value: "button", label: "Button" },
  { value: "status", label: "Status" },
];

const requiresUsername = (endpoint: Endpoint): boolean =>
  !["button", "status"].includes(endpoint);

export function Builder() {
  const [origin, setOrigin] = useState("https://your-domain.vercel.app");
  const [endpoint, setEndpoint] = useState<Endpoint>("signal");
  const [username, setUsername] = useState("luan-thnh");
  const [repo, setRepo] = useState("alive-github-signals");
  const [theme, setTheme] = useState("alive");
  const [variant, setVariant] = useState("editorial");
  const [accent, setAccent] = useState("C8FF4D");
  const [title, setTitle] = useState("");
  const [animate, setAnimate] = useState(true);
  const [demo, setDemo] = useState(true);
  const [copied, setCopied] = useState<"url" | "markdown" | "html" | null>(null);

  useEffect(() => setOrigin(window.location.origin), []);

  const url = useMemo(() => {
    const params = new URLSearchParams();
    if (requiresUsername(endpoint)) params.set("username", username || "luan-thnh");
    if (endpoint === "repo") params.set("repo", repo || "alive-github-signals");
    params.set("theme", theme);
    if (accent && accent.toUpperCase() !== "C8FF4D") params.set("accent", accent.replace(/^#/, ""));
    if (title) params.set("title", title);
    if (animate) params.set("animate", "true");
    if (demo && requiresUsername(endpoint)) params.set("demo", "true");

    if (endpoint === "stats") params.set("variant", variant);
    if (endpoint === "languages") params.set("layout", variant === "orbit" ? "orbit" : "field");
    if (endpoint === "badge") {
      params.set("metric", "commits");
      params.set("label", "COMMITS");
      params.set("variant", variant === "bracket" ? "bracket" : "signal");
    }
    if (endpoint === "button") {
      params.set("label", title || "VIEW SYSTEM");
      params.set("variant", variant === "bracket" ? "bracket" : "rail");
    }
    if (endpoint === "status") {
      params.set("label", title || "AVAILABLE FOR WORK");
      params.set("state", "online");
    }
    if (endpoint === "profile") params.set("avatar", "true");

    return `${origin}/api/${endpoint}?${params.toString()}`;
  }, [accent, animate, demo, endpoint, origin, repo, theme, title, username, variant]);

  const markdown = `![Alive ${endpoint}](${url})`;
  const html = `<img src="${url}" alt="Alive ${endpoint}" />`;

  const copy = async (type: "url" | "markdown" | "html", value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(type);
    window.setTimeout(() => setCopied(null), 1400);
  };

  return (
    <section className="builder" id="builder">
      <div className="section-rail">
        <span>03 / SIGNAL BUILDER</span>
        <span>QUERY → SVG → README</span>
      </div>

      <div className="builder-grid">
        <div className="builder-controls">
          <div className="control-heading">
            <span className="signal-dot" />
            <div>
              <strong>Compose an endpoint</strong>
              <small>Every option becomes a query parameter.</small>
            </div>
          </div>

          <label>
            <span>Card type</span>
            <select value={endpoint} onChange={(event: ChangeEvent<HTMLSelectElement>) => setEndpoint(event.target.value as Endpoint)}>
              {endpointOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          {requiresUsername(endpoint) && (
            <label>
              <span>GitHub username</span>
              <input value={username} onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)} spellCheck={false} />
            </label>
          )}

          {endpoint === "repo" && (
            <label>
              <span>Repository</span>
              <input value={repo} onChange={(event: ChangeEvent<HTMLInputElement>) => setRepo(event.target.value)} spellCheck={false} />
            </label>
          )}

          <div className="control-pair">
            <label>
              <span>Theme</span>
              <select value={theme} onChange={(event: ChangeEvent<HTMLSelectElement>) => setTheme(event.target.value)}>
                <option value="alive">Alive Acid</option>
                <option value="paper">Alive Paper</option>
                <option value="cobalt">Alive Cobalt</option>
                <option value="ember">Alive Ember</option>
                <option value="mono">Alive Mono</option>
              </select>
            </label>
            <label>
              <span>Composition</span>
              <select value={variant} onChange={(event: ChangeEvent<HTMLSelectElement>) => setVariant(event.target.value)}>
                <option value="editorial">Editorial</option>
                <option value="orbit">Orbit</option>
                <option value="bracket">Bracket</option>
              </select>
            </label>
          </div>

          <div className="control-pair">
            <label>
              <span>Accent hex</span>
              <input value={accent} onChange={(event: ChangeEvent<HTMLInputElement>) => setAccent(event.target.value)} spellCheck={false} maxLength={8} />
            </label>
            <label>
              <span>Custom title / label</span>
              <input value={title} onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)} placeholder="optional" />
            </label>
          </div>

          <div className="toggle-row">
            <label className="toggle">
              <input type="checkbox" checked={animate} onChange={(event: ChangeEvent<HTMLInputElement>) => setAnimate(event.target.checked)} />
              <span /> SVG motion
            </label>
            {requiresUsername(endpoint) && (
              <label className="toggle">
                <input type="checkbox" checked={demo} onChange={(event: ChangeEvent<HTMLInputElement>) => setDemo(event.target.checked)} />
                <span /> Demo data
              </label>
            )}
          </div>
        </div>

        <div className="builder-preview">
          <div className="preview-topline">
            <span>LIVE PREVIEW</span>
            <span>{endpoint.toUpperCase()} / {theme.toUpperCase()}</span>
          </div>
          <div className="preview-stage">
            {/* Dynamic SVG endpoints are intentionally rendered with a normal image tag. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={url} src={url} alt={`Alive ${endpoint} preview`} />
          </div>
          <div className="output-stack">
            <div className="output-row">
              <code>{url}</code>
              <button type="button" onClick={() => copy("url", url)}>{copied === "url" ? "COPIED" : "COPY URL"}</button>
            </div>
            <div className="output-row">
              <code>{markdown}</code>
              <button type="button" onClick={() => copy("markdown", markdown)}>{copied === "markdown" ? "COPIED" : "MARKDOWN"}</button>
            </div>
            <div className="output-row">
              <code>{html}</code>
              <button type="button" onClick={() => copy("html", html)}>{copied === "html" ? "COPIED" : "HTML"}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
