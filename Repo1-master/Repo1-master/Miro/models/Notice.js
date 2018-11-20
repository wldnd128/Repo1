var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Notice = new Schema({

   ntitle:{type: String},
   ncontent:{type: String},
   ncreated_at:{type: String, default: new Date().toLocaleString().replace(/-/g,'.')},
   like:{type: String, default:0},
   nhits: {type: String, default: 0}
});

module.exports = mongoose.model('notice', Notice);
