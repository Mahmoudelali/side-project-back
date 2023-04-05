import multer from 'multer';
import path from 'path';
const __dirname = path.resolve();

// determine where , name , duplications
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/assets/images');
	},
	filename: (req, file, cb) => {
		//file is a variable containing the actual file
		console.log(file);
		cb(null, Date.now() + file.originalname); //(error <null> , <filename>)
	},
});

// middleware
export const upload = multer({ storage }); //obj contains all the information related to the storage
