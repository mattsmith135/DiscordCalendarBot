const { SlashCommandBuilder } = require("@discordjs/builders"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("deleteevent")
        .setDescription("Delete an event from your calendar"),
    async execute(interaction) {
        // do something
        await interaction.reply('Do something'); 
    }
}
