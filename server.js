const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes'); 
const thoughtRoutes = require('./routes/thoughtRoutes'); 

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Debugging middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`➡️ Incoming Request: ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// ✅ Connect routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Log MongoDB connection status
mongoose.connection.on('connected', () => {
  console.log('🌿 MongoDB Connected Successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Connection Error:', err);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
