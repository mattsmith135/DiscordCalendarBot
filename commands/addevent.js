const { SlashCommandBuilder } = require("@discordjs/builders"); 

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
            option.setName('event_type')
                .setDescription('Handles for recurring events')
                .addChoices(
                    { name: 'Daily', value: 'daily' },
                    { name: 'Weekly', value: 'weekly' },
                    { name: 'Monthly', value: 'monthly' }, 
                    { name: 'Yearly', value: 'yearly' }
                )), 
            
    async execute(interaction) {
        
        /**
         * Validation will be implemented when DB design is complete
         * This is where: 
         * - inputs will be validated
         * - event will be added to DB
         */
        interaction.reply({ content: "addevent execute reached" })
    
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