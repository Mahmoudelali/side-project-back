import { Schema, model } from 'mongoose';

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
			type: Object,
		},
		category: {
			required: true,
			type: String,
		},
		onPage: {
			type: Boolean,
			required: true,
		},
	},
	{
		collection: 'products',
	},
);

export default model('Product', Product_Model);
