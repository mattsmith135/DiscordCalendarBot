const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteractionOptionResolver } = require("discord.js");
const db = require('../database'); 

module.exports = {
    data: new SlashCommandBuilder() 
            .setName('eventdelete')
            .setDescription('Delete an event!')
            .addStringOption(option =>
                option.setName('eventid')
                    .setDescription('Event ID')
                    .setRequired(true)),

    async execute(interaction) {

        const EventID = Number(interaction.options.getString('eventid'));   

        try {
            await db['event'].destroy({
                where: {
                    eventID: EventID
                }
            })

            const event = await db['event'].findOne({
                where: {
                    eventID: EventID
                }
            })

            return interaction.reply(`Event ${event.event_name} successfully deleted`); 
        } 
        catch(error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return interaction.reply('That tag already exists'); 
            }

            return interaction.reply(`Failed to delete event, the following error occurred: ${error}`);
        }
    }
}