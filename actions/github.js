import { exec } from "child_process";
import sendLog from "./logger.js";

export default function pushToGit(message = "auto update") {
  exec(
    `git add . && git commit -m "${message}" && git push`,
    () => sendLog("Git push attempted")
  );
}
