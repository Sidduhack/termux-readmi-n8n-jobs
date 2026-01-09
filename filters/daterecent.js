export default function recentFilter(jobs, days) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return jobs.filter(j => {
        const d = parse(j.post_date);
        return d && d >= cutoff;
    });
}

function parse(str) {
    if (!str) return null;
    const p = str.replace(/\//g, "-").split("-");
    let y = p[2]; if (y.length === 2) y = "20" + y;
    return new Date(`${y}-${p[1]}-${p[0]}`);
}
