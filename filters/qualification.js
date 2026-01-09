export default function qualificationFilter(jobs, allowed) {
    return jobs.filter(j =>
        allowed.some(q =>
            (j.qualification || "").toLowerCase().includes(q)
        )
    );
}
