const { SlashCommandBuilder } = require("@discordjs/builders"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("showcalendar")
        .setDescription("Display all events in your calendar"),

    async execute(interaction) {
        // do something
        await interaction.reply('Do something'); 
    }
}
