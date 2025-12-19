import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from "morgan"
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/errorHandler.js'

//=== CREATE SERVER ====
const app = express()



// === - MIDDLEWARES - ====
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser())
app.use(express.urlencoded({extended : true}));

// === - ROUTES ===
// Base Route

app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Routes API



// === - CONNECTION TO DATABASE ===



// === - ERROR HANDLING ===
app.use(errorMiddleware);


// === Exportation de app === 
export default app