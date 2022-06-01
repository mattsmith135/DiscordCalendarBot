const { Collection, Client, Intents } = require("discord.js"); 
const { REST } = require("@discordjs/rest"); 
const { Routes } = require("discord-api-types/v9"); 
const { token } = require("./config.json"); 
const fs = require("fs"); 
const path = require("path");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// command handler
client.commands = new Collection(); 
const commandFolders = fs.readdirSync("./commands"); 

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js")); 
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`); 
        client.commands.set(command.data.name, command);  
    }
}

// event handler         
const eventsPath = path.join(__dirname, 'events'); 
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')); 

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token); 