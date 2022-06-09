const { SlashCommandBuilder } = require("@discordjs/builders"); 
const db = require('../database'); 

module.exports = {
    data: new SlashCommandBuilder() 
            .setName('addevent')   
            .setDescription('Create an event!')
            .addStringOption(option => 
                option.setName('event')
                    .setDescription('Event name')
                    .setRequired(true))

            .addStringOption(option => 
                option.setName('event_description')
                    .setDescription('A brief description of the event')
                    .setRequired(true))
    
            .addStringOption(option => 
                option.setName('start')
                    .setDescription('Event start [yyyy] [MM] [dd] (hh) (mm)')
                    .setRequired(true))
    
            .addStringOption(option => 
                option.setName('end')
                    .setDescription('Event end [yyyy] [MM] [dd] (hh) (mm)')
                    .setRequired(true))

            .addStringOption(option =>
                option.setName('calendar')
                    .setDescription('Calendar the event will be added to')
                    .setRequired(true)),
    
    async execute(interaction) {

        const eventName = interaction.options.getString('event');
        const eventDescription = interaction.options.getString('description'); 
        const eventStart = interaction.options.getString('start'); 
        const eventEnd = interaction.options.getString('end');
        const eventCalendar = interaction.options.getString('calendar'); 

        const calendar = await db['calendar'].findOne({
            where: {
                calendar_name: eventCalendar
            }
        })

        try {
            const event = await db['event'].create({
                calendarID: calendar.calendarID, 
                tag: interaction.user.id,
                guildID: interaction.guild.id, 
                event_name: eventName,
                event_description: eventDescription, 
                event_start: eventStart,
                event_end: eventEnd,
            }).then(res => {
                console.log(res); 
            }).catch(err => console.log(err)); 

            return interaction.reply(`Event ${eventName} successfully added`);
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return interaction.reply('That tag already exists'); 
            }

            return interaction.reply(`Failed to add event, the following error occurred: ${error}`);
        }
    }
} 

// returns true if the passed-in time is in the 24-hour format 
function IsTimeCorrectlyFormatted(time) {
    valid = false; 

    var regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; 

    if (time.trim().match(regex) != null) {
        valid = true; 
    }

    if (valid) {
        return true; 
    } else {
        return false; 
    }
}

// returns true if the passed-in date is in the 'dd/mm/yyyy' format
function IsDateCorrectlyFormatted(date) {
    valid = false; 

    var regex = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;

    if (date.trim().match(regex) != null) {
        valid = true; 
    }

    if (valid) {
        return true;
    } else {
        return false;
    }
}