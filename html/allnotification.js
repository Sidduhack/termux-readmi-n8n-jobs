export default function htmlAll(jobs) {
  return `
<h1>All Jobs</h1>
<ul>
${jobs.map(j => `
<li>
<b>${j.job_title}</b> |
${j.qualification} |
<a href="${j.link}" target="_self">Apply</a>
</li>`).join("")}
</ul>`;
}
