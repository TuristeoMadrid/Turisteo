const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const routesSchema = new Schema({
 name: String,
 duration: Number,
 places:  Array,
});

const Routes = mongoose.model('Routes', routesSchema);
module.exports = Routes;