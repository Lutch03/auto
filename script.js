const mainBotToken = "8076780041:AAGxkQ5h3WOp4n1tQ3ZoAQqBcs_30i91hDQ";
const adminToken = "8086004144:AAH0y6sDfMbY7S9JJB9H4ge1qBS32_q1JpQ";
const adminChatId = "6460579707";

let lastUpdateId = 0;
let userList = new Set();
let groupList = new Set();
let autoReplyIntervals = {};

const autoText = `*Share Tools Spam & Retas Bot Telegram*
https://vt.tiktok.com/ZSS9QLN5n/
(Bantu Like + Follow nnti gw fb)

*Share Tools Spam & Retas Bot Telegram*
https://vt.tiktok.com/ZSS9QLN5n/
(Bantu Like + Follow nnti gw fb)

*Share Tools Spam & Retas Bot Telegram*
https://vt.tiktok.com/ZSS9QLN5n/
(Bantu Like + Follow nnti gw fb)

*Share Tools Spam & Retas Bot Telegram*
https://vt.tiktok.com/ZSS9QLN5n/
(Bantu Like + Follow nnti gw fb)

*Share Tools Spam & Retas Bot Telegram*
https://vt.tiktok.com/ZSS9QLN5n/
(Bantu Like + Follow nnti gw fb)`;

const shareText = `╭─❰ 𝗣𝗘𝗡𝗚𝗜𝗥𝗜𝗠𝗔𝗡 𝗦𝗘𝗟𝗘𝗦𝗔𝗜 ❱─╮
✅ 𝗕𝗲𝗿𝗵𝗮𝘀𝗶𝗹 𝗧𝗲𝗿𝗸𝗶𝗿𝗶𝗺 𝗞𝗲 : 900 𝗥𝗼𝗼𝗺 👾
❌ 𝗚𝗮𝗴𝗮𝗹 𝗧𝗲𝗿𝗸𝗶𝗿𝗶𝗺 𝗞𝗲 : 201 𝗥𝗼𝗼𝗺 🐣
⏳ 𝗝𝗲𝗱𝗮 : 𝟱-𝟭𝟬 𝗠𝗲𝗻𝗶𝘁 𝗞𝗲𝗱𝗲𝗽𝗮𝗻 ⏱️
╰────────────────────╯`;

function getInfoText(username) {
return `┏─────────────────────────⊰
│ꪶ あ ꫂ 𝗕𝗢𝗧 𝗝𝗔𝗦𝗛𝗘𝗥 𝗩𝗨𝗟𝗡𝗧𝗔
┗─────────────────────────⊰
( 👋🏻 ) - Hello, *@${username}*!
I Am Jasher Vulnta Bot Version 1.0 By @cristianvalta
┌─────────────────────────>
├── 𝗝𝗔𝗦𝗛𝗘𝗥 𝗩𝗨𝗟𝗡𝗧𝗔 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 🤖
├── 👤 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿 : @cristianvalta
├── 🐣 𝗩𝗲𝗿𝘀𝗶𝗼𝗻 𝗕𝗼𝘁 : 1.0
├── ⚙️ 𝗦𝗰𝗿𝗶𝗽𝘁 𝗡𝗮𝗺𝗲 : 𝗝𝗔𝗦𝗛𝗘𝗥 𝗩𝗨𝗟𝗡𝗧𝗔 𝗩𝟭
├── 📢 𝗧𝗼𝘁𝗮𝗹 𝗚𝗿𝘂𝗽 : 55
├── 🍌 𝗬𝗼𝘂𝗿 𝗦𝘁𝗮𝘁𝘂𝘀 : 🪐 Belum Premium
├── ⏰ 𝗥𝘂𝗻 𝗧𝗶𝗺𝗲 𝗝𝗔𝗦𝗛𝗘𝗥 𝗩𝗨𝗟𝗡𝗧𝗔 𝗕𝗼𝘁
├── ╰➤ 1 Hari, 17 Jam, 20 Menit, 39 Detik
└─────────────────────────>
┌── ⧼ 𝗖𝗔𝗥𝗔 𝗗𝗔𝗣𝗔𝗧𝗜𝗡 𝗣𝗥𝗘𝗠 ⧽ ────╮
├ ᴍᴀsᴜᴋɪɴ ʙᴏᴛ ᴋᴇ 2 ʀᴏᴏᴍ ᴘᴜʙʟɪᴄ
├ ᴋʟᴏ ᴜᴅʜ, sᴇɴᴅ ᴛᴇᴋs ʟᴜ ᴋᴇ ʙᴏᴛ 1× 
├ ʙᴏᴛ ᴀᴋᴀɴ sʜᴀʀᴇ ᴛᴇᴋs ʟᴜ ᴏᴛᴏᴍᴀᴛɪs
├ ɢᴏsᴀʜ sᴘᴀᴍ ʙᴏᴛ ᴀsᴜ ᴡᴀʟᴀᴜᴘᴜɴ ғʀᴇᴇ
╰────────────────────────`;
}

async function sendMessage(token, chatId, text) {
await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
method: 'POST',
headers: {'Content-Type': 'application/json'},
body: JSON.stringify({chat_id: chatId, text: text, parse_mode: "Markdown"})
});
}

async function getBotInfo(token) {
const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
return res.json();
}

async function startBot() {
const botInfo = await getBotInfo(mainBotToken);
const botName = botInfo.ok ? botInfo.result.first_name : 'Bot';

console.log(`✅ Bot ${botName} berjalan...`);

setInterval(async () => {
const updates = await fetch(`https://api.telegram.org/bot${mainBotToken}/getUpdates?offset=${lastUpdateId + 1}`).then(r=>r.json());
if (updates.ok) {
for (const update of updates.result) {
lastUpdateId = update.update_id;

if (update.message) {
const chatId = update.message.chat.id;
const userId = update.message.from.id;
const userName = update.message.from.first_name;
const usernameHandle = update.message.from.username ? update.message.from.username : userName;
const text = update.message.text || '';
const chatType = update.message.chat.type;

// Jika bot ditambahkan ke grup
if (update.message.new_chat_members) {
const newMembers = update.message.new_chat_members;
newMembers.forEach(async member => {
if (member.username === botInfo.result.username) {
await sendMessage(mainBotToken, chatId, getInfoText(usernameHandle));
console.log(`✅ Info dikirim ke grup ${chatId}`);

// Tunggu 30 detik lalu mulai auto spam
setTimeout(() => {
if (!groupList.has(chatId)) {
groupList.add(chatId);
autoReplyIntervals[chatId] = setInterval(() => {
sendMessage(mainBotToken, chatId, autoText);
console.log(`⏱ Auto pesan grup terkirim ke ${chatId}`);
}, 30000);
}
}, 30000);
}
});
}

// Jika user kirim /share
if (text.startsWith("/share")) {
await sendMessage(mainBotToken, chatId, shareText);
console.log(`✅ /share dikirim ke ${chatId}`);
}

// Jika chat private
if (chatType === "private") {
if (text.startsWith("/start") || text.startsWith("/help")) {
await sendMessage(mainBotToken, chatId, getInfoText(usernameHandle));
console.log(`✅ Info bot dikirim ke ${userName}`);

// Tunggu 30 detik lalu auto spam
setTimeout(() => {
if (!userList.has(chatId)) {
userList.add(chatId);
autoReplyIntervals[chatId] = setInterval(() => {
sendMessage(mainBotToken, chatId, autoText);
console.log(`⏱ Auto pesan PM terkirim ke ${userName}`);
}, 30000);
}
}, 30000);
}
}
}
}
}
}, 3000);
}

startBot();
