const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routesSchema = new Schema({
  name: String,
  duration: {type: String, default: 'Undefined'},
  places: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
  description: String
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Routes = mongoose.model('Routes', routesSchema);
module.exports = Routes;