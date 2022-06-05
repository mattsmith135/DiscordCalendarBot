const Sequelize = require('sequelize'); 
const fs = require('fs'); 
const path = require('path'); 

db = {}; 

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite', 
	logging: false,
	// SQLite only 
	storage: 'database.sqlite', 
});

db.sequelize = sequelize; 
db.Sequelize = Sequelize; 

db.checkConnection = async function() {
    sequelize.authenticate().then(() => {

        console.log('Sequelize authenticated successfully!'); 
    
        // import db models
        fs.readdirSync(path.join(__dirname, 'models')).forEach(file => {
            var model = require(path.join(__dirname, 'models', file))(sequelize);
            console.log(model.name); 
            db[model.name] = model;  
        });

    });

    sequelize.sync({ 
        force: true    
    }).then(() => {
        console.log('Sequelize models synced!'); 
    }).catch(err => {
        console.error(`Sequelize models failed to sync: ${err}`); 
    })
}

module.exports = db; 