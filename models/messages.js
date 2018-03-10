const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	create_date: {
		type: Date,
		default: Date.now()
	}
});

const model = mongoose.model('messages', messageSchema);

module.exports = model;

module.exports.getMessages = function(callback,limit) {
	model.find(callback).limit(limit);
}

module.exports.getMessage = function(message, callback) {
	model.findById(message, callback);
}

module.exports.postMessage = function(message, callback) {
	model.create(message, callback);
}

module.exports.deleteMessage = function(message, callback) {
	model.remove(message, callback);
}
