function route(app) {
	app.use('/user', require('../routers/user.router'));
	app.get('/', (req, res) => {
		res.send('Hello World!');
	});
}

module.exports = route;
