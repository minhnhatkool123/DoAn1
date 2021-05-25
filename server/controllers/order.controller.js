require('dotenv').config();
const Orders = require('../models/orderModel');
const Products = require('../models/productModel');
const addOrder = async (req, res) => {
	try {
		const { user, products } = req.body;

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
		});

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
		if (productError.length === 0) {
			await newOrder.save();
			res.json({ message: 'order add success' });
		} else {
			res.json({ message: productError });
		}
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

		res.json({ message: 'Done' });
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
		}

		result.push({ category: 'Áo', total: totalAo });
		result.push({ category: 'Quần', total: totalQuan });
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
		for (let i = 0; i < allPrice.length; i++) {
			let product = allPrice[i].products;

			if (JSON.stringify(product.category) === JSON.stringify('Áo')) {
				totalAo += product.soldQuantity;
			}
			if (JSON.stringify(product.category) === JSON.stringify('Quần')) {
				totalQuan += product.soldQuantity;
			}
		}

		result.push({ category: 'Áo', total: totalAo });
		result.push({ category: 'Quần', total: totalQuan });
		//console.log(totalQuan);

		res.json({ result });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	addOrder,
	getTotalOneMonth,
	getTotalCategory,
	getNumberSoldCategory,
};
