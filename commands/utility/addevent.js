module.exports = {
    name: "addevent",
    description: "Add an event to your calendar",

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
    ]
}
