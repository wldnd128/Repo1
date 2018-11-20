var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var board = new Schema({
   title:  {type: String},
   author: {type: String},
   content: {type: String},
   created_at: {type: String, default: new Date().toLocaleString().replace(/-/g,'.')},
   modified_at:  {type: String},
   ntitle:{type: String},
   ncontent:{type: String},
   hits: {type: String, default: 0},
   like:{type: String, default:0}
});

module.exports = mongoose.model('board', board);
