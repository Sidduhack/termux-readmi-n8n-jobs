export default function dedupe(jobs) {
    const seen = new Set();
    return jobs.filter(j => {
        const key = j.job_title + j.link;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}
