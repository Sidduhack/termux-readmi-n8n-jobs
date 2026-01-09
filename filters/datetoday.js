export default function todayFilter(jobs) {
    const today = new Date().toLocaleDateString("en-GB");
    return jobs.filter(j => j.post_date === today);
}
