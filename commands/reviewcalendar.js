const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js'); 
const db = require('../database'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reviewcalendar")
        .setDescription("Displays calendar properties")
        .addStringOption(option => 
            option.setName('calendar')
                .setDescription('calendar name')
                .setRequired(true)),

    async execute(interaction) {

        const calendarName = interaction.options.getString('calendar'); 

        try {
            const guildCalendar = await db['calendar'].findOne({
                where: {
                    calendar_name: calendarName.trim()
                }
            })

            const reviewCalendarEmbed = new MessageEmbed()
                .setColor('#45C2B1')
                .setTitle(`${guildCalendar.calendar_name} | Calendar`)
                .setDescription('This is an embed listing the details of a specific calendar event')
                .addField('Description', guildCalendar.calendar_description)
                .setTimestamp()
                .setFooter(interaction.user.tag, interaction.user.displayAvatarURL()); 

            const guildCalendarEvents = await db['event'].findAll({
                where: {
                    calendarID: guildCalendar.calendarID
                }
            })

            let eventIDs = []; 
            let eventNames = []; 

            guildCalendarEvents.forEach(entry => {
                eventIDs.push(entry.dataValues.eventID.toString())
                eventNames.push(entry.dataValues.event_name.toString())
            })

            let eventIDsStringed = eventIDs.join('\n');
            let eventNamesStringed = eventNames.join('\n'); 
            
            reviewCalendarEmbed.addField('Event ID', eventIDsStringed, true); 
            reviewCalendarEmbed.addField('Event', eventNamesStringed, true); 

            await interaction.reply({ embeds: [reviewCalendarEmbed] }); 
            
        } catch(error) {
            return interaction.reply(`Failed to review calendar, the following error occurred: ${error}`);
        }
    }
}