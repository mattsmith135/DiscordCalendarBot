const { SlashCommandBuilder } = require("@discordjs/builders"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("editevent")
        .setDescription("Edit an event in your calendar"),
    async execute(interaction) {
        // do something
        await interaction.reply('Do something'); 
    }
}
