console.clear();
console.log(`---- SimpleGM - Make GM Requests without MUIP ----`);
console.log(`---- Initalizing... ----\n`);

// ---------- Require
const XMLHttpRequest = require('xhr2');

// ---------- Config
const configFile = require('./config.json')
const UID = configFile.UID
const IP = configFile.IP
const Port = configFile.Port

console.log(`[Config] UID: ${UID}`)
console.log(`[Config] ReqIP: ${IP}`)
console.log(`[Config] Port: ${Port}\n`)

// ---------- R
console.log(`---- Initialized! ----\n`);
console.log(`. . . Commands . . .`);
console.log(`[gm <cmd>] Send gm command\n`);
console.log(`---- Console ----\n`);

function runGMCommand(inp) {
  console.log(`[GM] sending command...`)
  const Http = new XMLHttpRequest();
  const netURL = `http://${IP}:${Port}/api?region=dev_docker&ticket=GM&cmd=1116&uid=${UID}&msg=${inp}`
  Http.open("GET", netURL);
  Http.send();

  Http.onreadystatechange = (e) => {
    if (Http.responseText == "" || Http.responseText == null) {
      console.log(`[GM Response] N/A\n`)
    } else {
      console.log(`[GM Response] ${Http.responseText}\n`)
    }
  }
}

process.stdin.on("data", (data) => {

  const input = data.toString().trim();
  const args = input.split(" ");
    if (args[0] === "gm") {
      const command = args[0];
      const cmd = args[1];
      runGMCommand(cmd)
    }
  }
);
