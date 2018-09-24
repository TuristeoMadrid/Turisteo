const mongoose = require("mongoose");
const poi = require('../models/PlaceOfInterest');

mongoose.connect('mongodb://localhost/turisteo', {useNewUrlParser: true})
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
})
.catch(err => {
  console.error('Error connecting to mongo', err);
});

data = [
  {
    name: 'Puerta del Sol',
    description: 'Plaza con una estatua ecuestre del rey Carlos III y kilómetro 0 de las carreteras radiales españolas.',
    location: {type: 'Point', coordinates: [40.4171525,-3.7070937]},
    photo: '../public/images/puerta-del-sol-madrid.jpg'
  },
  {
    name: 'Plaza de España',
    description: 'Plaza arbolada rodeada de construcciones imponentes, con una estatua ecuestre de Cervantes de piedra y bronce.',
    location: {type: 'Point', coordinates: [40.421988,-3.7110311]},
    photo: '../public/images/plaza-de-espana-madrid.jpg'
  }
];

poi.deleteMany()
.then(() => poi.create(data))
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})