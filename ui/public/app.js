async function run() {
    await fetch("/run");
    const r = await fetch("/logs");
    document.getElementById("logs").textContent = await r.text();
}
run();
