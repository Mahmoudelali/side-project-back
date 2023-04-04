import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

import connectToDB from './dataBase/database.js';
connectToDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
	console.log(`listening on PORT  ${PORT}`);
});
