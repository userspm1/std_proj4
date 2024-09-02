const express = require("express");
const app = express();
const dbconfig = require('./src/db_connect/db_connect');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const orderRoutes = require('./src/routes/orderRoute');

// Initialize database connection
dbconfig();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies 

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', orderRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
