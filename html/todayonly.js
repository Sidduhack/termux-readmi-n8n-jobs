export default function htmlToday(jobs) {
  return `
<h1>🔥 Today Jobs</h1>
<ul>
${jobs.map(j => `<li>${j.job_title}</li>`).join("")}
</ul>`;
}
