const express = require('express');
const fs = require('fs');
const app = express();

// List of maps
const mapsList = ["Orlov Military Base", "Zaravan Suburbs", "Popov Power"];

// Counter to keep track of time elapsed
let counter = 0;
let lastModifiedTime;

// Serve static files from the current directory
app.use(express.static(__dirname));

app.get('/current-map', (req, res) => {
  // Check if the file has been modified
  const stats = fs.statSync('quadsResurgenceMap.txt');
  if (lastModifiedTime && stats.mtime > lastModifiedTime) {
    // File has been modified, send a notification to the client
    lastModifiedTime = stats.mtime;
    res.send({ currentMap: getCurrentMap(), modified: true });
  } else {
    res.send({ currentMap: getCurrentMap(), modified: false });
  }
});

function getCurrentMap() {
  const currentMapIndex = Math.floor(counter / 10) % mapsList.length;
  return mapsList[currentMapIndex];
}

app.listen(80, () => {
  console.log('Server is running on port 80');
});

// Increment the counter every second
setInterval(() => {
  counter += 1;
}, 1000);

// Periodically check for file modifications (every second in this example)
setInterval(() => {
  const stats = fs.statSync('quadsResurgenceMap.txt');
  if (!lastModifiedTime || stats.mtime > lastModifiedTime) {
    lastModifiedTime = stats.mtime;
  }
}, 1000);
