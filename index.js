import express from 'express';
const app = express();
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import bodyParser from 'body-parser';

import connectToDB from './dataBase/database.js';
connectToDB();

import userRouter from './routes/userRouter.js';
import itemRouter from './routes/itemRouter.js';

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.static('./assets/images/'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', userRouter);
app.use('/api/item', itemRouter);

app.listen(PORT, () => {
	console.log(`listening on PORT  ${PORT}`);
});
