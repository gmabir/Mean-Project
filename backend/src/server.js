import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import notesRoutes from './routes/notesRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware must come BEFORE routes
app.use(express.json());

app.use(rateLimiter);

app.use((req,res,next)=>{
  console.log('Req methoid:', req.method, 'Req URL:', req.url);
  next();
})

// Connect to MongoDB
connectDB().then(()=>{
  console.log('✅ Connected to MongoDB');
}).catch((error)=>{
  console.error('❌ MongoDB connection error:', error);
});

// Routes
app.use('/api/notes', notesRoutes);

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
