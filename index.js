import fs from "fs";

import config from "./config.js";
import fetchJobs from "./fetch/freejobalert.js";
import qualFilter from "./filters/qualification.js";
import dedupe from "./filters/dedupe.js";
import recentFilter from "./filters/daterecent.js";
import todayFilter from "./filters/datetoday.js";

import htmlAll from "./html/allnotification.js";
import htmlLatest from "./html/latestfilter.js";
import htmlToday from "./html/todayonly.js";

import sendLog from "./actions/logger.js";
import pushToGit from "./actions/github.js";

export default async function run() {
  sendLog("Automation started");

  let jobs = [];
  try {
    jobs = await fetchJobs(config.SOURCE_URL);
  } catch {
    sendLog("Fetch failed completely");
    return;
  }

  jobs = qualFilter(jobs, config.QUALIFICATIONS);
  jobs = dedupe(jobs);

  const recent = recentFilter(jobs, config.LOOKBACK_DAYS);
  const today = todayFilter(jobs);

  fs.writeFileSync("html/all.html", htmlAll(jobs));
  fs.writeFileSync("html/latest.html", htmlLatest(recent));
  fs.writeFileSync("html/today.html", htmlToday(today));

  sendLog(`All:${jobs.length} Recent:${recent.length} Today:${today.length}`);

  pushToGit("update job html");
}

run();
