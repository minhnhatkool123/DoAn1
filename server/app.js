const express = require('express');
const db = require('./configs/connectDB');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/user', require('./routes/user.routes'));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

db.connectDB;

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
