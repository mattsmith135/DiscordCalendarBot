const { Collection, Client, Intents } = require("discord.js"); 
const Sequelize = require('sequelize'); 
const { token } = require("./config.json"); 
const fs = require("fs"); 
const path = require("path");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite', 
	logging: false,
	// SQLite only 
	storage: 'database.sqlite', 
});

const Events = sequelize.define('events', {
	eventID: {
		type: Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true,
		unique: true,
	}, 
	tag: Sequelize.STRING,
	event: Sequelize.TEXT,
	start_date: Sequelize.DATEONLY,
	end_date: Sequelize.DATEONLY,
	start_time: Sequelize.TIME,
	end_time: Sequelize.TIME,
	event_description: Sequelize.TEXT, 
	event_type: Sequelize.TEXT,
	duration: Sequelize.INTEGER
});

module.exports = {
	Events,
}

// command handler
client.commands = new Collection(); 
const commandsPath = path.join(__dirname, 'commands'); 
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); 

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
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