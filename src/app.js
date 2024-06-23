import express from 'express';
import cors from 'cors';
import path from 'path';
import 'dotenv/config.js';
import { connectDB } from './db/config.js';
import syncDb from './db/init.js';
import allRoutes from './routes/allRoutes.js';
import './models/associations.js';

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:\/)/, '$1');

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', allRoutes);

connectDB();
syncDb();

const httpPort = process.env.PORT || 3000;
app.listen(httpPort, () => {
  console.log(`HTTP Server running on http://localhost:${httpPort}`);
});
