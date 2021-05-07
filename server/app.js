const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./configs/connectDB');
const route = require('./routers/root.router');
const app = express();
const cors = require('cors')
app.use(cors())

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

route(app);


db.connectDB;

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
