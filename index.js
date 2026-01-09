import config from "./config.js";
import fetchJobs from "./fetch/freejobalert.js";
import qualFilter from "./filters/qualification.js";
import dedupe from "./filters/dedup.js";
import recentFilter from "./filters/daterecent.js";
import todayFilter from "./filters/datetoday.js";
import sendLog from "./actions/logger.js";

import htmlAll from "./html/allnotification.js";
import htmlLatest from "./html/latestfilter.js";
import htmlToday from "./html/todayonly.js";

import fs from "fs";

export default async function run() {
    sendLog("Automation started");

    let jobs = await fetchJobs(config.SOURCE_URL);
    jobs = qualFilter(jobs, config.QUALIFICATIONS);
    jobs = dedupe(jobs);

    const recent = recentFilter(jobs, config.LOOKBACK_DAYS);
    const today = todayFilter(jobs);

    fs.writeFileSync("html/all.html", htmlAll(jobs));
    fs.writeFileSync("html/latest.html", htmlLatest(recent));
    fs.writeFileSync("html/today.html", htmlToday(today));

    sendLog(`All:${jobs.length} Recent:${recent.length} Today:${today.length}`);
}

run();
