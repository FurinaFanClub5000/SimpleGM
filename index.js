console.clear();
console.log(`---- SimpleGM - Make GM Requests without MUIP ----`);
console.log(`. . .Initializing\n`);

// ---------- Require
const axios = require('axios');
const fs = require("node:fs");
const path = require("node:path");

// ---------- Config
const configFile = require('./config.json');
let UID = configFile.UID;
let IP = configFile.IP;
let Port = configFile.Port;
async function refreshConfig() {
  delete require.cache[require.resolve("./config.json")];
  const configFile = require('./config.json');
  UID = configFile.UID;
  IP = configFile.IP;
  Port = configFile.Port;
  console.log(`[Config] UID: ${UID}`);
  console.log(`[Config] ReqIP: ${IP}`);
  console.log(`[Config] Port: ${Port}\n`);
}

refreshConfig()

// ---------- R
console.log(`. . . Initialized!\n`);
console.log(`--- Commands ---`);
console.log(`[<cmd>] Send gm command`);
console.log(`[Ex. Usage] item add 203 200\n`);
console.log(`[config <UID/IP/Port] Change config (Case Sensitive)`)
console.log(`[Ex. Usage] config UID 2\n`);
console.log(`---- Console ----\n`);

async function runGMCommand(inp) {
  try {
    console.log(`[GM_Send] Sending command: ${inp}`);
    const netURL = `http://${IP}:${Port}/api?region=dev_docker&ticket=GM&cmd=1116&uid=${UID}&msg=${inp}`;
    const response = await axios.get(netURL);

    if (response.data.msg) {
      console.log(`[GM_Response] ${response.data.data.retmsg} || ${response.data.msg}\n`);
    }
  } catch (error) {
    console.error(`[GM_Error] ${error.message}\n`);
  }
}
async function editConfig(obj, newv) {
  console.log(`[Config] Attempting to change ${obj} to ${newv}...`)
  const t = path.join(__dirname, "./config.json");
  const u = fs.readFileSync(t);
  const v = JSON.parse(u);
  if (["UID", "IP", "Port"].includes(obj)) {
    v[obj] = newv;
    fs.writeFileSync(t, JSON.stringify(v));
    console.log(`[Config] Successfully changed ${obj} to ${newv}`)
    refreshConfig()
  } else {
    console.error('[Config] Invalid Arguments!\n')
  }
}

process.stdin.on("data", (data) => {
  data = data.toString().trim();
  if (!data || /^\s*$/.test(data)) {
    return;
  } else if (data.startsWith('config')) {
    const args = data.split(" ");
    let e = args[0]
    let r = args[1]
    let s = args[2]
    editConfig(r, s)
  } else {
    runGMCommand(data);
  }
});

