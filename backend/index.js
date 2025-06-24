const express = require('express');        // Import express
const path = require('path');              // Import path for joining file paths
const fs = require('fs');                  // Import fs for reading the JSON file
const cors = require('cors');              // Import cors

const app = express();
const port = 3000;

// Allow frontend (if opened directly) to access backend
app.use(cors());

// Serve frontend static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));



// Route to get the units from JSON file
app.get('/api/units', (req, res) => {
  fs.readFile(path.join(__dirname, 'UnitInfo.json'), 'utf8', (error, data) => {
    if (error) {
      console.error('Failed to read UnitInfo.json:', error);
      res.status(500).send('Error reading unit data');
      return;
    }

    const unitList = JSON.parse(data);
    res.send(unitList);
  });
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});
