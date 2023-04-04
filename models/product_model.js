import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
	name: {
		required: true,
		type: String,
	},
});

const Product_Model = new Schema(
	{
		name: {
			required: true,
			type: String,
		},
		price: {
			required: true,
			type: Number,
		},
		description: {
			required: true,
			type: String,
		},
		image: {
			required: true,
			type: String,
		},
		category: {
			required: true,
			type: String,
		},
	},
	{
		collection: 'products',
	},
);

export default model('Product', Product_Model);
