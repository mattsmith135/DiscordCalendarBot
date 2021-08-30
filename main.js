const Discord = require("discord.js"); 
const { REST } = require("@discordjs/rest"); 
const { Routes } = require("discord-api-types/v9"); 
const fs = require("fs"); 
const { token, clientID, guildID } = require("./config.json"); 

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

client.once("ready", () => {
    console.log("CalendarBot is online!"); 
});

class Event {
    constructor(title, date, time){
        this.title = title; 
        this.date = date;  
        this.time = time; 
    }
    isEventValid() // checks that the event has been initialized in the right format (i.e date = dd/mm/yyyy)
    {
    
    }
}

client.commands = new Discord.Collection(); 

const commandFolders = fs.readdirSync("./commands"); 

// populating client.commands collection with commands
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js")); // fetches in js file in the commands folder
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`); 
        client.commands.set(command.name, command);  
    }
}

const rest = new REST({ version: "9" }).setToken(token); 

// registering each command within client.commands as a slash command
(async () => {
    try {
        console.log("Started refreshing application (/) commands."); 

        await rest.put(
           // sub in this line when done so that command is global and can be used in all servers/guilds
           // Routes.applicationCommands(clientID), { body: client.commands } 
           Routes.applicationGuildCommands(clientID, guildID),
           { body: client.commands }
        ); 

        console.log("Successfully reloaded application (/) commands."); 
    } catch (error) {
        console.error(error); 
    }
})(); 

// configuring slash command responses 
client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return; 

    if (interaction.commandName == "addevent") {
        await interaction.reply({ content: "Event added to calendar!", ephemeral: true });  
    }
})

client.login(token); 