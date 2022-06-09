const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('../database'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("createcalendar")
        .setDescription("Create a calendar!")
        .addStringOption(option => 
            option.setName('calendar')
                .setDescription('Calendar name')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('calendar_description')
                .setDescription('A brief description of the calendar')
                .setRequired(true)),

    async execute(interaction) {

        const calendarName = interaction.options.getString('calendar'); 
        const calendarDescription = interaction.options.getString('calendar_description'); 

        try {
            const calendar = await db['calendar'].create({
                tag: interaction.user.id,
                guildID: interaction.guild.id, 
                calendar_name: calendarName,
                calendar_description: calendarDescription, 
            }).then(res => {
                console.log(res); 
            }).catch(err => console.log(err)); 

            return interaction.reply(`Calendar ${calendarName} successfully added`);
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return interaction.reply('That tag already exists'); 
            }

            return interaction.reply(`Failed to create calendar, the following error occurred: ${error}`);
        }

    }
}