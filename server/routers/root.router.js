function route(app) {
	app.use('/user', require('../routers/user.router'));
	app.use('/api/product', require('../routers/product.router'));
	app.get('/', (req, res) => {
<<<<<<< HEAD
		res.send('Hello World1!23');
=======
		res.send('Hello World1dsdsssd!');
>>>>>>> master
	});
}

module.exports = route;
