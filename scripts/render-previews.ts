import fs from "node:fs";
import path from "node:path";
import { demoProfile, demoRepo } from "../lib/demo";
import { buildContext } from "../lib/render";
import {
  renderActivity,
  renderBadge,
  renderButton,
  renderLanguages,
  renderProfile,
  renderRepo,
  renderSignal,
  renderSocial,
  renderStats,
  renderStatus,
  renderTerminal,
} from "../lib/render/cards";

const output = path.resolve("docs/previews");
fs.mkdirSync(output, { recursive: true });

const write = (name: string, svg: string) =>
  fs.writeFileSync(path.join(output, `${name}.svg`), svg, "utf8");

write("signal", renderSignal(demoProfile, buildContext("signal", new URLSearchParams({ animate: "true" }))));
write("stats-editorial", renderStats(demoProfile, buildContext("stats", new URLSearchParams())));
write("stats-orbit", renderStats(demoProfile, buildContext("stats", new URLSearchParams({ variant: "orbit", theme: "cobalt" }))));
write("languages-field", renderLanguages(demoProfile, buildContext("languages", new URLSearchParams())));
write("languages-orbit", renderLanguages(demoProfile, buildContext("languages", new URLSearchParams({ layout: "orbit", theme: "ember" }))));
write("repo", renderRepo(demoRepo, buildContext("repo", new URLSearchParams())));
write("profile", renderProfile(demoProfile, buildContext("profile", new URLSearchParams())));
write("activity", renderActivity(demoProfile, buildContext("activity", new URLSearchParams())));
write("terminal", renderTerminal(demoProfile, buildContext("terminal", new URLSearchParams({ animate: "true" }))));
write("badge", renderBadge(demoProfile, buildContext("badge", new URLSearchParams({ metric: "commits", label: "COMMITS" }))));
write("social-youtube", renderSocial(buildContext("social", new URLSearchParams({ platform: "youtube", label: "YOUTUBE", handle: "@luanthnh", variant: "stack", animate: "true" }))));
write("social-facebook", renderSocial(buildContext("social", new URLSearchParams({ platform: "facebook", label: "FACEBOOK", handle: "luanthnh.dev", variant: "bracket" }))));
write("social-icons", renderSocial(buildContext("social", new URLSearchParams({ platform: "instagram", variant: "compact" }))));
write("button", renderButton(buildContext("button", new URLSearchParams({ label: "VIEW SYSTEM", variant: "bracket" }))));
write("status", renderStatus(buildContext("status", new URLSearchParams({ label: "AVAILABLE FOR WORK", state: "online", animate: "true" }))));

console.log(`Rendered previews to ${output}`);
