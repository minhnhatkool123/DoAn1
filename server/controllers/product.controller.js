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
			const removeProperties = ['sort', 'limit', 'page'];
			removeProperties.forEach((e) => delete queryObj[e]);
			//console.log(queryObj);
			this.listProducts.find(queryObj);
		}

		return this;
	}

	sortPrice() {
		if (this.queryString.sort) {
			if (this.queryString.status === '2') {
				console.log('status = 2');
				// this.listProducts.sort({"$expr":{
				// 	"$and":
				// }})
			} else {
				this.listProducts.sort(this.queryString.sort);
			}
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
		const category = convertCategory(req.params.category);
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const startIndex = (page - 1) * limit;

		const productFeatures = new ProductFeatures(
			Products.find({ category }),
			req.query,
			0
		)
			.filterStatus()
			.sortPrice();

		const products = await productFeatures.listProducts;
		const totalPage = Math.ceil(products.length / limit);
		const pageIndex = await productFeatures.listProducts
			.skip(startIndex)
			.limit(limit);
		console.log('So sp 1 trang:', pageIndex.length);
		console.log('Tong so sp:', products.length);
		console.log('Tong so trang:', totalPage);

		res.json({ products: pageIndex, totalpage: totalPage, page: page });
	} catch (error) {
		console.log('Loi');
		return res.status(500).json({ message: error.message });
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
