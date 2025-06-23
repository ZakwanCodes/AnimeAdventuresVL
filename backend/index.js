const express = require('express');

const app = express();

// Route for homepage
app.get('/', (req, res) => {
  res.send("Hello there");
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('✅ Server is running on http://localhost:3000');
});
