require('dotenv').config();
const Orders = require('../models/orderModel');
const Products = require('../models/productModel');

const getOrder = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		let queryObj = {
			user: req.params.id,
		};
		if (Object.values(req.body).length !== 0) {
			if (req.body.timeStart && req.body.timeEnd) {
				console.log('co time');
				queryObj = {
					user: req.params.id,
					status: req.body.status,
					date: {
						$gte: new Date(req.body.timeStart),
						$lt: new Date(req.body.timeEnd),
					},
				};
			} else {
				console.log('khong time');
				queryObj = {
					user: req.params.id,
					status: req.body.status,
				};
			}
		}

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const countOrders = await Orders.countDocuments(queryObj);
		const orders = await Orders.find(queryObj)
			.populate({
				path: 'user',
				select: 'name type district city address phone email',
			})
			.skip(startIndex)
			.limit(limit);

		if (orders)
			res.json({
				message: 'Get order done',
				orders,
				totalPages: countOrders,
				page: page,
			});
		else res.json({ message: 'Get order failed' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getAllOrders = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		let queryObj = null;
		if (Object.values(req.body).length !== 0) {
			if (req.body.timeStart && req.body.timeEnd) {
				console.log('co time');
				queryObj = {
					status: req.body.status,
					date: {
						$gte: new Date(req.body.timeStart),
						$lt: new Date(req.body.timeEnd),
					},
				};
			} else {
				console.log('khong time');
				queryObj = {
					status: req.body.status,
				};
			}
		}

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		console.log(req.body.timeStart);

		const countOrders = await Orders.countDocuments(queryObj);
		const orders = await Orders.find(queryObj)
			.populate({
				path: 'user',
				select: 'name type district city address phone email',
			})
			.skip(startIndex)
			.limit(limit);

		if (orders)
			res.json({
				message: 'Get all order done',
				orders,
				totalPages: countOrders,
				page: page,
			});
		else res.json({ message: 'Get all order failed' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const addOrder = async (req, res) => {
	try {
		const { user, products, receiverInfo, paymentMethod } = req.body;

		let total = 0;
		let productError = [];
		products.forEach((e) => {
			if (e.status.includes(2)) {
				total += (e.price - e.discount) * e.soldQuantity;
			} else {
				total += e.price * e.soldQuantity;
			}
		});
		const newOrder = new Orders({
			user,
			products,
			date: new Date(),
			total,
			receiverInfo,
			paymentMethod,
		});

		for (let i = 0; i < products.length; i++) {
			const oneProduct = await Products.findById({ _id: products[i]._id });
			if (oneProduct.quantity < products[i].soldQuantity)
				productError.push(
					`Số lượng còn lại của ${oneProduct.name} là ${oneProduct.quantity}`
				);
		}

		if (productError.length !== 0) {
			return res.status(400).json({ error: productError });
		}

		for (let i = 0; i < products.length; i++) {
			await Products.findByIdAndUpdate(
				{ _id: products[i]._id },
				{
					$inc: {
						quantity: -products[i].soldQuantity,
						soldQuantity: products[i].soldQuantity,
					},
					// $set: {
					// 	quantity: {
					// 		$cond: [
					// 			{ $lte: ['$quantity', 0] },
					// 			{ $sum: ['$quantity', products[i].soldQuantity] },
					// 			{ $subtract: ['$quantity', products[i].soldQuantity] },
					// 		],
					// 	},
					// },
				}
				// (err, data) => {
				// 	if (err) return;
				// 	if (data.quantity < 0) {
				// 		console.log('Quantity < 0');
				// 		productError.push(`${data.name} sold out`);
				// 	}
				// }
			);
		}

		//if (productError.length === 0) {
		await newOrder.save();
		res.json({ message: 'Order add success' });
		//} else {
		//res.json({ message: productError });
		//}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getTotalOneMonth = async (req, res) => {
	try {
		//let month = 5;

		let a = Date.now();
		let b = new Date(a);
		let dataTotal = [];
		//console.log(b.getFullYear());
		for (let i = 1; i <= 12; i++) {
			const allPrice = await Orders.aggregate([
				{
					$match: {
						date: {
							$gte: new Date(`2021-${i}`),
							$lt: new Date(`2021-${i + 1}`),
						},
					},
				},
				{
					$group: {
						_id: {
							year: { $year: '$date' },
							month: { $month: '$date' },
						},
						total: { $sum: '$total' },
					},
				},
				{
					$project: {
						_id: 0,
						total: 1,
						month: { $sum: [i, 0] },
					},
				},
			]);

			if (allPrice.length !== 0) {
				dataTotal.push(allPrice[0]);
			} else {
				let fakeResult = {
					total: 0,
					month: i,
				};
				dataTotal.push(fakeResult);
			}
		}
		console.log(dataTotal);

		res.json({ message: 'Done', data: dataTotal });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getTotalCategory = async (req, res) => {
	try {
		const allPrice = await Orders.aggregate([
			// {
			// 	$match: {
			// 		products: {
			// 			$elemMatch: {
			// 				category: 'Quần',
			// 			},
			// 		},
			// 	},
			// },
			{
				$unwind: '$products',
			},
		]);

		let result = [];
		let totalAo = 0;
		let totalQuan = 0;
		let totalDamVay = 0;
		for (let i = 0; i < allPrice.length; i++) {
			let product = allPrice[i].products;

			if (JSON.stringify(product.category) === JSON.stringify('Áo')) {
				if (product.status.includes(2))
					totalAo += (product.price - product.discount) * product.soldQuantity;
				else {
					totalAo += product.price * product.soldQuantity;
				}
			}
			if (JSON.stringify(product.category) === JSON.stringify('Quần')) {
				if (product.status.includes(2))
					totalQuan +=
						(product.price - product.discount) * product.soldQuantity;
				else {
					totalQuan += product.price * product.soldQuantity;
				}
			}

			if (product.category === 'Đầm Váy') {
				if (product.status.includes(2))
					totalDamVay +=
						(product.price - product.discount) * product.soldQuantity;
				else {
					totalDamVay += product.price * product.soldQuantity;
				}
			}
		}

		result.push({ category: 'Áo', total: totalAo });
		result.push({ category: 'Quần', total: totalQuan });
		result.push({ category: 'Đầm Váy', total: totalDamVay });
		//console.log(totalQuan);

		res.json({ result });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getNumberSoldCategory = async (req, res) => {
	try {
		const allPrice = await Orders.aggregate([
			{
				$unwind: '$products',
			},
		]);

		let result = [];
		let totalAo = 0;
		let totalQuan = 0;
		let totalDamVay = 0;
		for (let i = 0; i < allPrice.length; i++) {
			let product = allPrice[i].products;

			if (JSON.stringify(product.category) === JSON.stringify('Áo')) {
				totalAo += product.soldQuantity;
			}
			if (JSON.stringify(product.category) === JSON.stringify('Quần')) {
				totalQuan += product.soldQuantity;
			}
			if (product.category === 'Đầm Váy') {
				totalDamVay += product.soldQuantity;
			}
		}

		result.push({ category: 'Áo', total: totalAo });
		result.push({ category: 'Quần', total: totalQuan });
		result.push({ category: 'Đầm Váy', total: totalDamVay });
		//console.log(totalQuan);

		res.json({ result });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getOrder,
	getAllOrders,
	addOrder,
	getTotalOneMonth,
	getTotalCategory,
	getNumberSoldCategory,
};
