import { Client, GatewayIntentBits, ActivityType } from "discord.js"; 
import 'dotenv/config';
import * as fs from 'fs';
import { join } from 'path';

const client = new Client({
    intents : [ 
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: "Beautiful People 👀",
            type: ActivityType.Watching,
        }],
    },
})

// Event Handling 
const eventsFolder = join(__dirname, 'events');
function loadEvents() {
    const eventFiles = fs.readdirSync(eventsFolder).filter(file => file.endsWith('.ts'));
    for (const file of eventFiles) {
        const { default: event } = require(join(eventsFolder, file));
        if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client, process.env.BOT_TOKEN, process.env.CLIENT_ID, process.env.GUILD_ID));
        } else {
        client.on(event.name, (...args) => event.execute(...args, client, process.env.BOT_TOKEN, process.env.CLIENT_ID, process.env.GUILD_ID));
        }
    }
}

// Login Into Bot
client.login(process.env.BOT_TOKEN).then(()=>{
    loadEvents();
}).catch(err => {
    console.log(`There is error : ${err}`);
})