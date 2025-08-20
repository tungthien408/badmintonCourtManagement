const { app } = require('../config/config');

app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Badminton Court Management API!',
    status: 'Server is running successfully' 
  });
});