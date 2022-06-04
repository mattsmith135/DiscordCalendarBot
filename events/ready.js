const { Events } = require('../index'); 

module.exports = {
    name: 'ready', 
    once: true,
    execute() {
        Events.sync({ force: true }); 

        console.log('CalendarBot is online!'); 
    }
}