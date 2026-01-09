import * as cheerio from "cheerio";
import sendLog from "../actions/logger.js";

async function fetchWithTimeout(url, timeout = 20000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return await res.text();
  } finally {
    clearTimeout(id);
  }
}

export default async function fetchJobs(url, retries = 3) {
  for (let i = 1; i <= retries; i++) {
    try {
      sendLog(`Fetching jobs (attempt ${i})`);
      const html = await fetchWithTimeout(url);
      const $ = cheerio.load(html);

      const jobs = [];
      $(".lattrbord").each((_, el) => {
        jobs.push({
          post_date: $(el).find(".latcpb").text().trim(),
          job_title: $(el).find(".latceb").text().trim(),
          qualification: $(el).find(".latcqb").text().trim(),
          last_date: $(el).find(".latclb").text().trim(),
          link: $(el).find(".latcmb a").attr("href")
        });
      });
      return jobs;
    } catch {
      sendLog(`Fetch failed attempt ${i}`);
      if (i === retries) throw new Error("Fetch failed");
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}
