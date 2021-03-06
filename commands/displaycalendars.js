const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js'); 
const db = require('../database'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("displaycalendars")
        .setDescription("Display all calendars for your guild"),

    async execute(interaction) {

        try {
            const displayCalendarsEmbed = new MessageEmbed()
                .setColor('#45C2B1')
                .setTitle(`${interaction.guild.name} | Calendars`)
                .setDescription('This is an embed listing all of the calendars for your guild')
                .setTimestamp()
                .setFooter(interaction.user.tag, interaction.user.displayAvatarURL()); 

            const guildCalendars = await db['calendar'].findAll({
                where: {
                    guildID: interaction.guild.id
                }
            })

            // creating table display within embed

            let calendarIDs = []; 
            let calendarNames = []; 

            guildCalendars.forEach(entry => {
                calendarIDs.push(entry.dataValues.calendarID.toString()); 
                calendarNames.push(entry.dataValues.calendar_name.toString()); 
            })

            let calendarIDsStringed = calendarIDs.join('\n');
            let calendarNamesStringed = calendarNames.join('\n'); 
            
            displayCalendarsEmbed.addField('Calendar ID', calendarIDsStringed, true); 
            displayCalendarsEmbed.addField('Calendar', calendarNamesStringed, true); 

            await interaction.reply({ embeds: [displayCalendarsEmbed] }); 
        } catch(error) {
            return interaction.reply(`Failed to display calendars, the following error occurred: ${error}`);
        }
        
    }
}