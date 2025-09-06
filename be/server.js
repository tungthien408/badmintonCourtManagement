

import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import env from "./env.js"

import authoRouter from "./routes/authenciation.js"
import branchRouter from "./routes/branches.js"
import courtRouter from "./routes/courts.js"
import humanRouter from "./routes/human.js"
import priiceListRouter from "./routes/pricelist.js"
import reginterRouter from "./routes/register.js"


const app = express();
const PORT = env.PORT;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());


app.use("/api/auth", authoRouter);
app.use("/api/branches", branchRouter);
app.use("/api/courts", courtRouter);
app.use("/api/human", humanRouter);
app.use("/api/priceList", priiceListRouter);
app.use("/api/register", reginterRouter);

mongoose.connect(env.MONGODB_URI)
  .then(() => console.log('🍃 Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
