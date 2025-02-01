const db = require('./db'); // Import the database connection

// Keep the process running until you see the success or error message
db.on('connected', () => {
  console.log('Database connection test completed. Exiting...');
  process.exit(0); // Exit the script
});

db.on('error', () => {
  process.exit(1); // Exit with error code
});