const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');

var feed = fs.readFileSync('./data/trips.json', 'utf8');
var trips = JSON.parse(feed);

(async () => {
    const query = await Trip.deleteMany({});
    console.log(query);

    await Trip.insertMany(trips);

    // Close the MongoDB connection and exit
    mongodb = mongoose.connection;
    await mongodb.close();
    process.exit(0);
})();