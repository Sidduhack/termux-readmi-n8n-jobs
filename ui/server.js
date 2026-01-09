import express from "express";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");

app.use(express.static(path.join(__dirname, "public")));

app.get("/run", (_, res) => {
    exec("node index.js", { cwd: ROOT }, () =>
        res.json({ success: true })
    );
});

app.get("/logs", (_, res) => {
    res.sendFile(path.join(ROOT, "logs/run.log"));
});

app.listen(PORT, () =>
    console.log(`GUI running at http://127.0.0.1:${PORT}`)
);
