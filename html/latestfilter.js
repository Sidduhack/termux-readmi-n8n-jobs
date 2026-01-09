export default function htmlLatest(jobs) {
  return `
<h1>Latest Jobs</h1>
<ul>
${jobs.map(j => `<li>${j.job_title}</li>`).join("")}
</ul>`;
}
