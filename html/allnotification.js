export function buildAllJobsHTML(jobs) {
    return `
  <html><body>
  <h1>All Jobs</h1>
  <ul>
    ${jobs.map(j => `
      <li>
        <b>${j.job_title}</b> |
        ${j.qualification} |
        <a href="${j.link}" target="_blank">Apply</a>
      </li>`).join("")}
  </ul>
  </body></html>`;
}
