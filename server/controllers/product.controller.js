const { datacatalog } = require('googleapis/build/src/apis/datacatalog');
const Products = require('../models/productModel');

class ProductFeatures {
	constructor(listProducts, queryString, totalPage) {
		this.listProducts = listProducts;
		this.queryString = queryString;
		this.totalPage = totalPage;
	}
	filterStatus() {
		const queryObj = { ...this.queryString };
		if (queryObj.status) {
			//console.log(queryObj);
			const removeProperties = ['sort', 'limit', 'page', 'type'];
			removeProperties.forEach((e) => delete queryObj[e]);
			//console.log(queryObj);
			this.listProducts.find(queryObj);
		}

		return this;
	}

	sortPrice() {
		if (this.queryString.sort) {
			// if (JSON.stringify(this.queryString.status) === JSON.stringify('2')) {
			// 	console.log('status = 2');
			// 	const queryObj = { ...this.queryString };
			// 	const removeProperties = ['sort', 'limit', 'page'];
			// 	removeProperties.forEach((e) => delete queryObj[e]);
			// 	this.listProducts
			// 		.find(
			// 			{ queryObj },
			// 			{
			// 				_id: 0,
			// 				name: 1,
			// 				discount: 1,
			// 				price: {
			// 					$subtract: ['$price', '$discount'],
			// 				},
			// 				hello: 1,
			// 			}
			// 		)
			// 		.sort(this.queryString.sort);
			// } else {
			console.log(this.queryString.sort);
			this.listProducts.sort(this.queryString.sort);
			//}
		}
		return this;
	}
}

const getProductHomePage = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		// if (endIndex > (await Products.countDocuments())) {
		// 	return res.status(400).json({ message: 'Error out of product' });
		// }

		// if (startIndex <= 0) {
		// 	return res.status(400).json({ message: 'Error index small than 0' });
		// }

		const products = await Products.find({ status: 1 })
			.skip(startIndex)
			.limit(limit);
		console.log(products.length);
		res.json(products);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getProductCategory = async (req, res) => {
	try {
		// const category = convertCategory(req.params.category);
		// let product = await Products.find(
		// 	{ status: 2 },
		// 	{
		// 		_id: 0,
		// 		name: 1,
		// 		price: 1,
		// 		discount: 1,
		// 		price: {
		// 			$subtract: ['$price', '$discount'],
		// 		},
		// 	}
		// )
		// 	.limit(5)
		// 	.sort('price');

		const category = convertCategory(req.params.category);
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const startIndex = (page - 1) * limit;
		let productFeatures;
		if (req.query.type) {
			const type = convertType(req.query.type);
			productFeatures = new ProductFeatures(
				Products.find(
					{ category, type },
					{
						_id: 1,
						name: 1,
						category: 1,
						type: 1,
						real_price: {
							$sum: ['$price', 0],
						},
						price: {
							$subtract: ['$price', '$discount'],
						},
						discount: 1,
						images: 1,
						colors: 1,
						size: 1,
						discount: 1,
						quantity: 1,
					}
				),
				req.query,
				0
			);
		} else {
			productFeatures = new ProductFeatures(
				Products.find(
					{ category },
					{
						_id: 1,
						name: 1,
						category: 1,
						type: 1,
						real_price: {
							$sum: ['$price', 0],
						},
						price: {
							$subtract: ['$price', '$discount'],
						},
						discount: 1,
						images: 1,
						colors: 1,
						size: 1,
						discount: 1,
						quantity: 1,
					}
				),
				req.query,
				0
			)
				.filterStatus()
				.sortPrice();
		}

		const products = await productFeatures.listProducts;
		const totalPage = Math.ceil(products.length / limit);
		const pageIndex = await productFeatures.listProducts
			.skip(startIndex)
			.limit(limit);
		console.log('So sp 1 trang:', pageIndex.length);
		console.log('Tong so sp:', products.length);
		console.log('Tong so trang:', totalPage);

		// const ko = await Products.aggregate([
		// 	{
		// 		$match: {
		// 			$and: [{ category: category }, { type: type }],
		// 		},
		// 	},
		// {
		// 	$project: {
		// 		_id: 1,
		// 		name: 1,
		// 		price: 1,
		// 		discount: 1,
		// 		new_price: { $subtract: ['$price', '$discount'] },
		// 	},
		// },
		// {
		// 	$sort: {
		// 		new_price: 1,
		// 	},
		// },
		// ]);
		//const asd = await Products.find({ type: 'Áo Thun Nữ' });
		//console.log(ko.length);
		//res.json(products);
		res.json({ products: pageIndex, totalpage: totalPage, page: page });
	} catch (error) {
		console.log('Loi');
		return res.status(500).json({ message: error.message });
	}
};

const convertType = (x) => {
	switch (JSON.stringify(x)) {
		case JSON.stringify('ao-the-thao'):
			console.log('AOTHETHAO');
			return 'Áo Thể Thao';
		case JSON.stringify('ao-thun-nu'):
			console.log('AOTHUNNU');
			return 'Áo Thun Nữ';
		case JSON.stringify('ao-kieu-nu'):
			console.log('AOKIEUNU');
			return 'Áo Kiểu Nữ';
		case JSON.stringify('ao-so-mi-nu'):
			console.log('AOSOMINU');
			return 'Áo Sơ Mi Nữ';
		case JSON.stringify('ao-khoac-nu'):
			console.log('AOKHOACNU');
			return 'Áo Khoác Nữ';
		case JSON.stringify('quan-dai'):
			console.log('QUANDAI');
			return 'Quần Dài';
		case JSON.stringify('quan-short-nu'):
			console.log('QUANSHORTNU');
			return 'Quần Short Nữ';
		case JSON.stringify('quan-legging'):
			console.log('QUANLEGGING');
			return 'Quần Legging';
		case JSON.stringify('chan-vay'):
			console.log('CHANVAY');
			return 'Chân Váy';
		case JSON.stringify('dam-nu'):
			console.log('DAMNU');
			return 'Đầm Nữ';
		case JSON.stringify('yem'):
			console.log('YEM');
			return 'Yếm';
		default:
			break;
	}
};

const convertCategory = (x) => {
	switch (x.toLowerCase()) {
		case 'dam-vay':
			return 'Đầm Váy';
		case 'ao':
			return 'Áo';
		case 'quan':
			return 'Quần';
		default:
			break;
	}
	// const obj = {
	// 	'dam-vay': 'Đầm Váy',
	// 	ao: 'Áo',
	// 	quan: 'Quần',
	// };
	// return obj[x.toLowerCase()];
};

module.exports = { getProductHomePage, getProductCategory };
