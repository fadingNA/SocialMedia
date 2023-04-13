import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import multer from "multer";
import helmet from "helmet";
import morgan from 'morgan';
import path from 'path';
import authRoute from "./routes/auth.js";
import userRoutes from './routes/users.js';
import {fileURLToPath} from 'url';
import {register} from './controllers/auth.js';
import {verifyToken} from "./middleware/auth.js";

/* Configurations */
/* MiddleWare*/
const fileName = fileURLToPath(import.meta.url);
const directoryName = path.dirname(fileName);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
}));
app.use(morgan('common'));
app.use(bodyParser.json({
    limit: '30mb', extended: true
}))
app.use(bodyParser.urlencoded({
    limit: '30mb', extended: true
}))
app.use(cors());
app.use('/assets', express.static(path.join(directoryName, 'public/assets')));

/* File Storage */
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/assets');
    },
    filename(req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({storage});

/* Authentication */

app.post('/auth/register', upload.single('picture'), register);

/*Routes*/
app.use('/auth', authRoute);

app.use('/users', userRoutes);

/* Mongoose Set up */
const PORT = process.env.PORT || 6000;
mongoose.connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
}).catch((err) => console.log(`Error : ${err}`));
