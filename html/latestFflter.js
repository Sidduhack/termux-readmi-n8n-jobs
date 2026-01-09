export default jobs => `
<h1>Latest Jobs (Filtered)</h1>
<ul>
${jobs.map(j => `<li>${j.job_title}</li>`).join("")}
</ul>`;
