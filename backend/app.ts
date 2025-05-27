import express from 'express';
//import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';


import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import appointmentRoutes from './routes/appointment.routes';
import { errorHandler  } from './middleware/error.middleware';
import { xssSanitizer } from './middleware/xss.middleware';
import { preventHPP } from './middleware/hpp.middleware';

dotenv.config();

const app = express();



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});


// Manual CORS handler
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // or restrict to a specific origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  next();
});


// Global Middlewares
app.use(helmet()); // Sets secure HTTP headers
//app.use(cors()); // Enables CORS
app.use(express.json()); // Parses JSON body
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(mongoSanitize()); // Prevents NoSQL injections
app.use(xssSanitizer);  // Sanitizes strings for XSS
app.use(preventHPP);
app.use(limiter);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appointments', appointmentRoutes);


app.use('*', (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`) as any;
  error.status = 404;
  next(error);
});
app.use(errorHandler);



// DB Connection
connectDB(app);

export default app;
