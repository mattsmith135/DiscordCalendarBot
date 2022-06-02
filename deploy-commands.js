const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const path = require("path");
const fs = require("fs"); 

const commands = []; 
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

// registers application commands
const rest = new REST({ version: '9' }).setToken(token);
(async () => {
	
	try {

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.'); 

	} catch (e) {

		console.error(e); 

	}
})(); 