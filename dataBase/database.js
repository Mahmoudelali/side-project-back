import mongoose from 'mongoose';
mongoose.set({ strictQuery: false });

import dotenv from 'dotenv';
dotenv.config();

const connectToDB = async () => {
	try {
		mongoose.connect(process.env.MONGO_URH).then(() => {
			console.log('connected to database');
		});
	} catch (error) {
		console.log(error.message);
	}
};

export default connectToDB;
