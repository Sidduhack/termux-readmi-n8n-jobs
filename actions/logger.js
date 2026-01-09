import fs from "fs";

export default function sendLog(message) {
    if (!fs.existsSync("logs")) fs.mkdirSync("logs");
    const time = new Date().toISOString();
    fs.appendFileSync("logs/run.log", `[${time}] ${message}\n`);
}
