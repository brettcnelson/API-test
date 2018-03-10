const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Messages = require('./models/messages');

const app = express();
const port = 4040;

mongoose.connect('mongodb://localhost/API');
const db = mongoose.connection;

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Use <code>/api</code> to acces API');
});

app.get('/api/messages', (req, res) => {
	Messages.getMessages((err, messages) => {
		if (err) {
			throw err;
		}
		res.json(messages);
	});
});

app.get('/api/messages/:id', (req, res) => {
	Messages.getMessage(req.params.id, (err, message) => {
		if (err) {
			throw err;
		}
		res.json(message);
	});
});

app.post('/api/messages', (req, res) => {
	var message = req.body;
	Messages.postMessage(message, (err, message) => {
		if (err) {
			throw err;
		}
		res.json(message);
	});
});

app.delete('/api/messages/:id', (req, res) => {
	Messages.deleteMessage({_id: req.params.id}, (err, message) => {
		if (err) {
			throw err;
		}
		res.json(message);
	});
});

app.listen(port, () => console.log(`listening on port ${port}`));
