const { SlashCommandBuilder } = require("@discordjs/builders"); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addevent")
        .setDescription("Add an event to your calendar"),
        options: [
            {
                name: "title",
                description: "event title",
                type: 3, 
                required: true
            },
            {
                name: "time", 
                description: "event time",
                type: 3,
                required: true
            },
            {
                name: "date",
                description: "date of event (in dd/mm/yyyy format)",
                type: 3,
                required: true
            }
        ],
    async execute(interaction) {
        // do something
        if (IsTimeCorrectlyFormatted(interaction.options.getString("time")) && IsDateCorrectlyFormatted(interaction.options.getString("date"))) {
            await interaction.reply({ content: "Event added to calendar!", ephemeral: true });  
        } else {
            interaction.reply({          
                content: "Sorry, but something is wrong with your inputs! Make sure that you are using 24-hour time and that the date you entered is in the 'dd/mm/yyyy' format"
            })
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