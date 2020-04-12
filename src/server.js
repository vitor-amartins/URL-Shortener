import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import 'dotenv/config';

import LinkRoutes from './routes/link';

// ================ MONGO DB ================ //
mongoose.connect(process.env.MONGO_URL || process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;

connection.on('error', () => console.log('Failed to establish connection with MongoDB'));
connection.once('open', () => console.log('MongoDB connection established sucessfully'));

// ================ APPLICATION ================ //

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// ---------------- ROUTES ---------------- //

app.use(LinkRoutes);

// ================ RUN SERVER ================ //

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
