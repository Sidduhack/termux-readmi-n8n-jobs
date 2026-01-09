import { exec } from "child_process";
import sendLog from "./logger.js";

export default function pushToGit(message = "auto update") {
    exec(
        `git add . && git commit -m "${message}" && git push`,
        (err, stdout, stderr) => {
            if (err) sendLog("Git push failed");
            else sendLog("Git pushed successfully");
        }
    );
}
