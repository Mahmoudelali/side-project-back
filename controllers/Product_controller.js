import product_model from '../models/product_model.js';

const addProduct = async (req, res) => {
	try {
		const product = { ...req.body, image: req.file };
		console.log(product);
		product_model
			.create(product)
			.then((data) => {
				if (data) {
					res.status(200).json({
						status: 200,
						data: data,
						message: 'Product added successfully',
					});
				} else {
					res.status(400).json({
						status: 400,
						message: 'adding failed',
					});
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	} catch (error) {
		console.log(error.message);
	}
};

const getAllProduct = async (req, res) => {
	try {
		const products = await product_model.find();
		if (!products) {
			return res.json({ error: 'No Products found' });
		} else {
			return res.json({ message: products });
		}
	} catch (error) {
		console.log(error.message);
	}
};

const getProductByName = async (req, res) => {
	try {
		const { name } = req.params;
		const product = await product_model.findOne({ name });
		if (!product) {
			return res.json({ message: 'Product Not found' });
		} else {
			return res.json({ message: product });
		}
	} catch (error) {
		console.log(error.message);
	}
};

const getProductsByCategory = async (req, res) => {
	try {
		const category = req.params.category.trim();
		const products = await product_model.find({ category });
		if (products) {
			return res.json({ message: products });
		} else {
			return res.json({ message: 'No Products found' });
		}
	} catch (error) {
		console.log(error.message);
	}
};

const deleteByID = async (req, res) => {
	try {
		const { id } = req.params;
		product_model.findOneAndDelete({ _id: id }).then((item) => {
			console.log(item);
			if (item) {
				console.log(item);
				res.json({ message: 'deleted successfully' });
			} else {
				res.json({ message: 'Product not found' });
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const updateProduct = async (req, res) => {
	try {
		const updates = req.body;
		const { id } = req.params;
		await product_model
			.findByIdAndUpdate(id, updates)
			.then((response) => {
				if (response) {
					console.log(response);
					response.json({
						message: 'Product updated successfully',
					});
				} else {
					response.json({ message: 'Product not found' });
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	} catch (error) {
		console.log(error);
	}
};
export {
	addProduct,
	getAllProduct,
	getProductByName,
	getProductsByCategory,
	deleteByID,
	updateProduct,
};
