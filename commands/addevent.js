const { SlashCommandBuilder } = require("@discordjs/builders"); 
const db = require('../database'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addevent")
        .setDescription("Add an event to the calendar")
        
        .addStringOption(option => 
            option.setName('event')
                .setDescription('Event name')
                .setRequired(true))

        .addStringOption(option => 
            option.setName('start_date')
                .setDescription('Event start date')
                .setRequired(true))

        .addStringOption(option => 
            option.setName('end_date')
                .setDescription('Event end date')
                .setRequired(true))

        .addStringOption(option => 
            option.setName('start_time')
                .setDescription('Event start time')
                .setRequired(true))

        .addStringOption(option => 
            option.setName('end_time')
                .setDescription('Event end time')
                .setRequired(true))

        .addStringOption(option => 
            option.setName('event_description')
                .setDescription('A brief description of the event'))

        .addStringOption(option => 
            option.setName('event_type')
                .setDescription('Handles for recurring events')
                .addChoice('Daily', 'daily' )
                .addChoice('Weekly', 'weekly' )
                .addChoice('Monthly', 'monthly' )
                .addChoice('Yearly', 'yearly' )), 

    async execute(interaction) {
        
        /**
         * Validation will be implemented when DB design is complete
         * This is where: 
         * - inputs will be validated
         * - event will be added to DB
         */
        
        const eventName = interaction.options.getString('event'); 
        const startDate = interaction.options.getString('start_date'); 
        const endDate = interaction.options.getString('end_date');
        const startTime = interaction.options.getString('start_time'); 
        const endTime = interaction.options.getString('end_time'); 
        const eventDescription = interaction.options.getString('event_description'); 
        const eventType = interaction.options.getString('event_type'); 

        try {
            const event = await db['event'].create({
                tag: interaction.user.id,
                event: eventName,
                start_date: startDate,
                end_date: endDate,
                start_time: startTime, 
                end_time: endTime,
                event_description: eventDescription, 
                event_type: eventType,
            }).then(res => {
                console.log(res); 
            }).catch(err => console.log(err)); 

            return interaction.reply(`Event ${eventName} successfully added`);
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return interaction.reply('That tag already exists'); 
            }

			return interaction.reply('Something went wrong with adding the event');
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