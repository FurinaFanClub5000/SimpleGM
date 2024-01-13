console.clear();
console.log(`---- SimpleGM - Make GM Requests without MUIP ----`);
console.log(`---- Initializing... ----\n`);

// ---------- Require
const axios = require('axios');

// ---------- Config
const configFile = require('./config.json');
const UID = configFile.UID;
const IP = configFile.IP;
const Port = configFile.Port;

console.log(`[Config] UID: ${UID}`);
console.log(`[Config] ReqIP: ${IP}`);
console.log(`[Config] Port: ${Port} !! DO NOT CHANGE THE PORT UNLESS YOU KNOW WHAT YOU'RE DOING !!\n`);

// ---------- R
console.log(`---- Initialized! ----\n`);
console.log(`. . . Commands . . .`);
console.log(`[gm <cmd>] Send gm command\n`);
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

process.stdin.on("data", (data) => {
  runGMCommand(data);
});
