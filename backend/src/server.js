import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import notesRoutes from './routes/notesRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware must come BEFORE routes
app.use(express.json());
app.use((req,res,next)=>{
  console.log('we are just got a new request')
  next();
})

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/notes', notesRoutes);

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});


//mongodb+srv://ishtiaqanwarabir_db_user:AfWZ01Du2F0PGfIA@cluster0.8pukwcg.mongodb.net/?appName=Cluster0