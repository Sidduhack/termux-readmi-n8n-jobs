import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function fetchJobs(url) {
    const res = await fetch(url);
    const html = await res.text();
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
}
