const express = require('express');
const path = require('path');

const app = express();
const port = 80; // Use port 80 for HTTP

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve the HTML file for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
