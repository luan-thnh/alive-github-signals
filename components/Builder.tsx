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
  | "social"
  | "status";

type PreviewState = "loading" | "ready" | "error";

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
  { value: "social", label: "Social Button" },
  { value: "status", label: "Status" },
];

const socialOptions = [
  "github", "youtube", "facebook", "linkedin", "instagram", "tiktok",
  "x", "discord", "telegram", "zalo", "website", "email",
];

const iconOptions = ["arrow", "code", "plus", "play", ...socialOptions];

const requiresUsername = (endpoint: Endpoint): boolean =>
  !["button", "social", "status"].includes(endpoint);

function useDebouncedValue<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [delay, value]);
  return debounced;
}

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
  const [demo, setDemo] = useState(false);
  const [socialPlatform, setSocialPlatform] = useState("github");
  const [handle, setHandle] = useState("@luan-thnh");
  const [buttonIcon, setButtonIcon] = useState("arrow");
  const [brandColor, setBrandColor] = useState(false);
  const [period, setPeriod] = useState<"year" | "all">("year");
  const [previewState, setPreviewState] = useState<PreviewState>("loading");
  const [refreshNonce, setRefreshNonce] = useState(0);
  const [copied, setCopied] = useState<"url" | "markdown" | "html" | null>(null);

  useEffect(() => setOrigin(window.location.origin), []);

  const deferredUsername = useDebouncedValue(username.trim(), 520);
  const deferredRepo = useDebouncedValue(repo.trim(), 520);

  const url = useMemo(() => {
    const params = new URLSearchParams();
    if (requiresUsername(endpoint)) params.set("username", deferredUsername || "luan-thnh");
    if (endpoint === "repo") params.set("repo", deferredRepo || "alive-github-signals");
    params.set("theme", theme);
    if (accent && accent.toUpperCase() !== "C8FF4D") params.set("accent", accent.replace(/^#/, ""));
    if (title) params.set("title", title);
    if (animate) params.set("animate", "true");
    if (demo && requiresUsername(endpoint)) params.set("demo", "true");
    if (requiresUsername(endpoint)) params.set("period", period);
    if (requiresUsername(endpoint)) params.set("cache_seconds", "300");

    if (endpoint === "stats") params.set("variant", variant);
    if (endpoint === "languages") params.set("layout", variant === "orbit" ? "orbit" : "field");
    if (endpoint === "badge") {
      params.set("metric", "commits");
      params.set("label", title || "COMMITS");
      params.set("variant", variant === "bracket" ? "bracket" : "signal");
    }
    if (endpoint === "button") {
      params.set("label", title || "VIEW SYSTEM");
      params.set("variant", variant === "bracket" ? "bracket" : "rail");
      params.set("icon", buttonIcon);
    }
    if (endpoint === "social") {
      params.set("platform", socialPlatform);
      params.set("label", title || socialPlatform.toUpperCase());
      if (handle) params.set("handle", handle);
      params.set("variant", ["bracket", "compact", "stack"].includes(variant) ? variant : "rail");
      if (brandColor) params.set("brand", "true");
    }
    if (endpoint === "status") {
      params.set("label", title || "AVAILABLE FOR WORK");
      params.set("state", "online");
    }
    if (endpoint === "profile") params.set("avatar", "true");

    return `${origin}/api/${endpoint}?${params.toString()}`;
  }, [accent, animate, brandColor, buttonIcon, deferredRepo, deferredUsername, demo, endpoint, handle, origin, period, socialPlatform, theme, title, variant]);

  const previewUrl = useMemo(() => {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}_preview=${refreshNonce}`;
  }, [refreshNonce, url]);

  useEffect(() => setPreviewState("loading"), [previewUrl]);

  const markdown = `![Alive ${endpoint}](${url})`;
  const html = `<img src="${url}" alt="Alive ${endpoint}" />`;

  const changeEndpoint = (next: Endpoint) => {
    setEndpoint(next);
    if (next === "social") setVariant("stack");
    else if (next === "button") setVariant("bracket");
    else if (next === "languages") setVariant("editorial");
    else if (!["editorial", "orbit", "bracket"].includes(variant)) setVariant("editorial");
  };

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
              <small>Live GitHub data is the default. Inputs are debounced to protect API limits.</small>
            </div>
          </div>

          <label>
            <span>Card type</span>
            <select value={endpoint} onChange={(event: ChangeEvent<HTMLSelectElement>) => changeEndpoint(event.target.value as Endpoint)}>
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

          {endpoint === "social" && (
            <div className="control-pair">
              <label>
                <span>Social network</span>
                <select value={socialPlatform} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSocialPlatform(event.target.value)}>
                  {socialOptions.map((platform) => <option key={platform} value={platform}>{platform.toUpperCase()}</option>)}
                </select>
              </label>
              <label>
                <span>Handle / detail</span>
                <input value={handle} onChange={(event: ChangeEvent<HTMLInputElement>) => setHandle(event.target.value)} placeholder="@username" />
              </label>
            </div>
          )}

          {requiresUsername(endpoint) && (
            <label>
              <span>Commit period</span>
              <select value={period} onChange={(event: ChangeEvent<HTMLSelectElement>) => setPeriod(event.target.value as "year" | "all")}>
                <option value="year">Last 12 months</option>
                <option value="all">All-time authored commits</option>
              </select>
            </label>
          )}

          {endpoint === "button" && (
            <label>
              <span>Button icon</span>
              <select value={buttonIcon} onChange={(event: ChangeEvent<HTMLSelectElement>) => setButtonIcon(event.target.value)}>
                {iconOptions.map((icon) => <option key={icon} value={icon}>{icon.toUpperCase()}</option>)}
              </select>
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
                <option value="editorial">Editorial / Rail</option>
                <option value="orbit">Orbit</option>
                <option value="bracket">Bracket</option>
                {endpoint === "social" && <option value="compact">Compact Icon</option>}
                {endpoint === "social" && <option value="stack">Stacked Social</option>}
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
            {endpoint === "social" && (
              <label className="toggle">
                <input type="checkbox" checked={brandColor} onChange={(event: ChangeEvent<HTMLInputElement>) => setBrandColor(event.target.checked)} />
                <span /> Brand color
              </label>
            )}
            {requiresUsername(endpoint) && (
              <label className="toggle">
                <input type="checkbox" checked={demo} onChange={(event: ChangeEvent<HTMLInputElement>) => setDemo(event.target.checked)} />
                <span /> Demo data
              </label>
            )}
          </div>

          {demo && requiresUsername(endpoint) && (
            <div className="demo-warning">DEMO MODE OVERRIDES LIVE METRICS. Disable it to fetch the entered GitHub username.</div>
          )}
        </div>

        <div className="builder-preview">
          <div className="preview-topline">
            <span className={`data-source ${demo ? "is-demo" : "is-live"}`}><i /> {demo ? "DEMO DATA" : "LIVE GITHUB"}</span>
            <span>{endpoint.toUpperCase()} / {theme.toUpperCase()}</span>
            <button className="refresh-preview" type="button" onClick={() => setRefreshNonce(Date.now())}>REFRESH ↻</button>
          </div>
          <div className={`preview-stage is-${previewState}`}>
            {previewState === "loading" && <div className="preview-loader"><span /> FETCHING SIGNAL</div>}
            {previewState === "error" && <div className="preview-loader is-error">PREVIEW IMAGE FAILED TO LOAD</div>}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={previewUrl}
              src={previewUrl}
              alt={`Alive ${endpoint} preview`}
              onLoad={() => setPreviewState("ready")}
              onError={() => setPreviewState("error")}
            />
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
