"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";

type Endpoint =
  | "signal"
  | "stats"
  | "pulse"
  | "radar"
  | "languages"
  | "constellation"
  | "timeline"
  | "year"
  | "streak"
  | "activity"
  | "repos"
  | "repo"
  | "compare"
  | "profile"
  | "terminal"
  | "ticker"
  | "badge"
  | "social"
  | "button"
  | "status"
  | "overview"
  | "projects"
  | "signal-board"
  | "year-board";

type PreviewState = "loading" | "ready" | "error";

type EndpointOption = {
  value: Endpoint;
  label: string;
  group: "Profile" | "Activity" | "Repository" | "Compact";
};

const endpointOptions: EndpointOption[] = [
  { value: "overview", label: "System Overview Board", group: "Profile" },
  { value: "signal-board", label: "Asymmetric Signal Board", group: "Profile" },
  { value: "year-board", label: "Asymmetric Year Board", group: "Profile" },
  { value: "signal", label: "Full Signal Panel", group: "Profile" },
  { value: "stats", label: "Core Statistics", group: "Profile" },
  { value: "radar", label: "Developer Radar", group: "Profile" },
  { value: "compare", label: "User Comparison", group: "Profile" },
  { value: "profile", label: "Profile Identity", group: "Profile" },
  { value: "terminal", label: "Terminal Identity", group: "Profile" },
  { value: "pulse", label: "Contribution Pulse", group: "Activity" },
  { value: "timeline", label: "12-Month Timeline", group: "Activity" },
  { value: "year", label: "Year In Code", group: "Activity" },
  { value: "streak", label: "Streak Index", group: "Activity" },
  { value: "activity", label: "Contribution Calendar", group: "Activity" },
  { value: "languages", label: "Language Field", group: "Activity" },
  { value: "constellation", label: "Language Constellation", group: "Activity" },
  { value: "projects", label: "Asymmetric Project Board", group: "Repository" },
  { value: "repos", label: "Recent Repository Stack", group: "Repository" },
  { value: "repo", label: "Repository Specimen", group: "Repository" },
  { value: "ticker", label: "Live Metrics Ticker", group: "Compact" },
  { value: "badge", label: "Metric Badge", group: "Compact" },
  { value: "social", label: "GitHub Social Signal", group: "Compact" },
  { value: "button", label: "Action Button", group: "Compact" },
  { value: "status", label: "Status Broadcast", group: "Compact" },
];

const socialOptions = [
  "github", "youtube", "facebook", "linkedin", "instagram", "tiktok",
  "x", "discord", "telegram", "zalo", "website", "email",
];
const iconOptions = ["arrow", "code", "plus", "play", ...socialOptions];
const metricOptions = [
  "contributions", "commits", "stars", "followers", "repositories",
  "prs", "issues", "streak",
];

const requiresUsername = (endpoint: Endpoint): boolean =>
  !["button", "status"].includes(endpoint);
const supportsPeriod = (endpoint: Endpoint): boolean =>
  !["button", "status", "social", "repo"].includes(endpoint);
const supportsLanguageCount = (endpoint: Endpoint): boolean =>
  ["languages", "constellation"].includes(endpoint);
const supportsCount = (endpoint: Endpoint): boolean => endpoint === "repos";

function useDebouncedValue<T>(value: T, delay = 520): T {
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
  const [compareUsername, setCompareUsername] = useState("torvalds");
  const [repo, setRepo] = useState("music-player");
  const [theme, setTheme] = useState("alive");
  const [variant, setVariant] = useState("editorial");
  const [accent, setAccent] = useState("C8FF4D");
  const [title, setTitle] = useState("");
  const [animate, setAnimate] = useState(true);
  const [socialPlatform, setSocialPlatform] = useState("github");
  const [buttonIcon, setButtonIcon] = useState("arrow");
  const [brandColor, setBrandColor] = useState(false);
  const [period, setPeriod] = useState<"year" | "all">("year");
  const [count, setCount] = useState(6);
  const [languageCount, setLanguageCount] = useState(8);
  const [badgeMetric, setBadgeMetric] = useState("contributions");
  const [previewState, setPreviewState] = useState<PreviewState>("loading");
  const [refreshNonce, setRefreshNonce] = useState(0);
  const [copied, setCopied] = useState<"url" | "markdown" | "html" | null>(null);

  useEffect(() => setOrigin(window.location.origin), []);

  const deferredUsername = useDebouncedValue(username.trim());
  const deferredCompareUsername = useDebouncedValue(compareUsername.trim());
  const deferredRepo = useDebouncedValue(repo.trim());

  const url = useMemo(() => {
    const params = new URLSearchParams();
    if (requiresUsername(endpoint)) params.set("username", deferredUsername || "luan-thnh");
    if (endpoint === "compare") params.set("compare_username", deferredCompareUsername || "torvalds");
    if (endpoint === "repo") params.set("repo", deferredRepo || "music-player");
    params.set("theme", theme);
    params.set("animate", String(animate));
    params.set("cache_seconds", "300");
    if (accent && accent.toUpperCase() !== "C8FF4D") params.set("accent", accent.replace(/^#/, ""));
    if (title) params.set("title", title);
    if (supportsPeriod(endpoint)) params.set("period", period);
    if (supportsLanguageCount(endpoint)) params.set("langs_count", String(languageCount));
    if (supportsCount(endpoint)) params.set("count", String(count));

    if (endpoint === "stats") params.set("variant", variant);
    if (endpoint === "languages") params.set("layout", variant === "orbit" ? "orbit" : "field");
    if (endpoint === "badge") {
      params.set("metric", badgeMetric);
      params.set("label", title || badgeMetric.toUpperCase());
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
      params.set("variant", ["bracket", "compact", "stack"].includes(variant) ? variant : "rail");
      if (brandColor) params.set("brand", "true");
    }
    if (endpoint === "status") {
      params.set("label", title || "AVAILABLE FOR WORK");
      params.set("state", "online");
    }
    if (endpoint === "profile") params.set("avatar", "true");

    return `${origin}/api/${endpoint}?${params.toString()}`;
  }, [
    accent, animate, badgeMetric, brandColor, buttonIcon, count,
    deferredCompareUsername, deferredRepo, deferredUsername, endpoint,
    languageCount, origin, period, socialPlatform, theme, title, variant,
  ]);

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
    else if (["button", "badge"].includes(next)) setVariant("bracket");
    else if (["languages", "constellation"].includes(next)) setVariant("orbit");
    else setVariant("editorial");
  };

  const copy = async (type: "url" | "markdown" | "html", value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(type);
    window.setTimeout(() => setCopied(null), 1400);
  };

  const groups = ["Profile", "Activity", "Repository", "Compact"] as const;

  return (
    <section className="builder" id="builder">
      <div className="section-rail">
        <span>03 / LIVE BUILDER</span>
        <span>QUERY PARAMETERS → SVG</span>
      </div>

      <div className="builder-grid">
        <div className="builder-controls">
          <div className="control-heading">
            <span className="signal-dot" />
            <div>
              <strong>Generate a real GitHub component</strong>
              <small>Every user metric is fetched from GitHub. Errors stay errors; no bundled profile or number fallback is used.</small>
            </div>
          </div>

          <label>
            <span>Component</span>
            <select value={endpoint} onChange={(event: ChangeEvent<HTMLSelectElement>) => changeEndpoint(event.target.value as Endpoint)}>
              {groups.map((group) => (
                <optgroup key={group} label={group}>
                  {endpointOptions.filter((option) => option.group === group).map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          {requiresUsername(endpoint) && (
            <label>
              <span>GitHub username</span>
              <input value={username} onChange={(event) => setUsername(event.target.value)} spellCheck={false} />
            </label>
          )}

          {endpoint === "compare" && (
            <label>
              <span>Compare with GitHub user</span>
              <input value={compareUsername} onChange={(event) => setCompareUsername(event.target.value)} spellCheck={false} />
            </label>
          )}

          {endpoint === "repo" && (
            <label>
              <span>Repository owned by user</span>
              <input value={repo} onChange={(event) => setRepo(event.target.value)} spellCheck={false} />
            </label>
          )}

          {endpoint === "social" && (
            <>
              <label>
                <span>Network published on GitHub profile</span>
                <select value={socialPlatform} onChange={(event) => setSocialPlatform(event.target.value)}>
                  {socialOptions.map((platform) => <option key={platform} value={platform}>{platform.toUpperCase()}</option>)}
                </select>
              </label>
              <div className="live-data-note">The destination and handle are resolved from the selected user&apos;s public GitHub profile.</div>
            </>
          )}

          {supportsPeriod(endpoint) && (
            <label>
              <span>Commit period</span>
              <select value={period} onChange={(event) => setPeriod(event.target.value as "year" | "all")}>
                <option value="year">Last 12 months</option>
                <option value="all">All-time authored commits</option>
              </select>
            </label>
          )}

          {supportsCount(endpoint) && (
            <label>
              <span>Repositories shown</span>
              <input type="number" min={2} max={10} value={count} onChange={(event) => setCount(Number(event.target.value))} />
            </label>
          )}

          {supportsLanguageCount(endpoint) && (
            <label>
              <span>Languages shown</span>
              <input type="number" min={3} max={12} value={languageCount} onChange={(event) => setLanguageCount(Number(event.target.value))} />
            </label>
          )}

          {endpoint === "badge" && (
            <label>
              <span>Real metric</span>
              <select value={badgeMetric} onChange={(event) => setBadgeMetric(event.target.value)}>
                {metricOptions.map((metric) => <option key={metric} value={metric}>{metric.toUpperCase()}</option>)}
              </select>
            </label>
          )}

          {endpoint === "button" && (
            <label>
              <span>Button icon</span>
              <select value={buttonIcon} onChange={(event) => setButtonIcon(event.target.value)}>
                {iconOptions.map((icon) => <option key={icon} value={icon}>{icon.toUpperCase()}</option>)}
              </select>
            </label>
          )}

          <div className="control-pair">
            <label>
              <span>Theme</span>
              <select value={theme} onChange={(event) => setTheme(event.target.value)}>
                <option value="alive">Alive Acid</option>
                <option value="paper">Alive Paper</option>
                <option value="cobalt">Alive Cobalt</option>
                <option value="ember">Alive Ember</option>
                <option value="mono">Alive Mono</option>
              </select>
            </label>
            <label>
              <span>Composition</span>
              <select value={variant} onChange={(event) => setVariant(event.target.value)}>
                <option value="editorial">Editorial</option>
                <option value="orbit">Orbit</option>
                <option value="bracket">Bracket</option>
                {endpoint === "social" && <option value="compact">Compact</option>}
                {endpoint === "social" && <option value="stack">Stacked</option>}
              </select>
            </label>
          </div>

          <div className="control-pair">
            <label>
              <span>Accent hex</span>
              <input value={accent} onChange={(event) => setAccent(event.target.value)} spellCheck={false} maxLength={8} />
            </label>
            <label>
              <span>Custom title / label</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="optional" />
            </label>
          </div>

          <div className="toggle-row">
            <label className="toggle">
              <input type="checkbox" checked={animate} onChange={(event) => setAnimate(event.target.checked)} />
              <span /> SVG motion
            </label>
            {endpoint === "social" && (
              <label className="toggle">
                <input type="checkbox" checked={brandColor} onChange={(event) => setBrandColor(event.target.checked)} />
                <span /> Brand color
              </label>
            )}
          </div>
        </div>

        <div className="builder-preview">
          <div className="preview-topline">
            <span className={`data-source ${requiresUsername(endpoint) ? "is-live" : "is-static"}`}><i /> {requiresUsername(endpoint) ? "LIVE GITHUB" : "QUERY SVG"}</span>
            <span>{endpoint.toUpperCase()} / {theme.toUpperCase()}</span>
            <button className="refresh-preview" type="button" onClick={() => setRefreshNonce(Date.now())}>REFRESH ↻</button>
          </div>
          <div className={`preview-stage is-${previewState}`}>
            {previewState === "loading" && <div className="preview-loader"><span /> FETCHING GITHUB</div>}
            {previewState === "error" && <div className="preview-loader is-error">SVG REQUEST FAILED — CHECK TOKEN OR QUERY</div>}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={previewUrl} src={previewUrl} alt={`Alive ${endpoint} preview`} onLoad={() => setPreviewState("ready")} onError={() => setPreviewState("error")} />
          </div>
          <div className="output-stack">
            <div className="output-row"><code>{url}</code><button type="button" onClick={() => copy("url", url)}>{copied === "url" ? "COPIED" : "COPY URL"}</button></div>
            <div className="output-row"><code>{markdown}</code><button type="button" onClick={() => copy("markdown", markdown)}>{copied === "markdown" ? "COPIED" : "MARKDOWN"}</button></div>
            <div className="output-row"><code>{html}</code><button type="button" onClick={() => copy("html", html)}>{copied === "html" ? "COPIED" : "HTML"}</button></div>
          </div>
        </div>
      </div>
    </section>
  );
}
