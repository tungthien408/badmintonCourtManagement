const { app, PORT } = require('./config/config');
const Court = require('./models/Court');

// Import routes
require('./routes/test');
require('./routes/courts');
require('./routes/authenciation');
require('./routes/register');

// Helper function to add sample data if database is empty
async function initializeSampleData() {
  try {
    const courtCount = await Court.countDocuments();
    if (courtCount === 0) {
      console.log('📝 Adding sample courts to database...');
      await Court.create([
        { name: "A", isAvailable: false },
        { name: "B", isAvailable: true },
        { name: "C", isAvailable: true }
      ]);
      console.log('✅ Sample courts added!');
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`🏸 Badminton Court Management Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  
  // Add sample data if database is empty
  await initializeSampleData();
});
