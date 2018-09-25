const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routesSchema = new Schema({
  name: String,
  duration: String,
  places: Array,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Routes = mongoose.model('Routes', routesSchema);
module.exports = Routes;