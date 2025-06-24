const express = require('express');

const app = express();

//It means all files inside your frontend folder are publicly accessible by the browser.
app.use(express.static(path.join(__dirname, '../frontend')));


// Route for homepage
app.get('/', (req, res) => {
  res.send("Hello there");
});





// Start the server on port 3000
app.listen(3000, () => {
  console.log('✅ Server is running on http://localhost:3000');
});
