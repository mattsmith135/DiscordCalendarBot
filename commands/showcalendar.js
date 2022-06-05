const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js'); 
const db = require('../database'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("showcalendar")
        .setDescription("Display all events in your calendar"),

    async execute(interaction) {
        const showCalendarEmbed = new MessageEmbed()
            .setColor('#45C2B1')
            .setTitle(`${interaction.user.username} | Calendar`)
            .setDescription('This is an embed listing all of the events currently in your calendar')
            .setTimestamp()
            .setFooter(interaction.user.tag, interaction.user.displayAvatarURL()); 

        const userEvents = await db['event'].findAll({
            where: {
                tag: interaction.user.id
            }
        })

        userEvents.forEach(entry => {
            showCalendarEmbed.addField('Event ID', entry.dataValues.eventID.toString(), true); 
            showCalendarEmbed.addField('Event', entry.dataValues.event.toString(), true);
            showCalendarEmbed.addField('Event Description', entry.dataValues.event_description.toString(), true);
        })

        await interaction.reply({ embeds: [showCalendarEmbed] }); 
    }
}
