const { exec } = require('child_process');
const fs = require('fs');

// Schedule the restart at 02:29:58
const restartTime = new Date();
restartTime.setHours(3, 29, 58);

// Calculate the delay until the restart time
const delay = restartTime.getTime() - Date.now();

if (delay > 0) {
  setTimeout(() => {
    // Run the command
    exec('pm2 restart all', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
      }
      
      // Log completion to a file
      const logEntry = `COMPLETE - ${new Date().toLocaleString()}\n`;
      fs.appendFile('autoStartLog.txt', logEntry, (err) => {
        if (err) {
          console.error(`Error appending to log file: ${err.message}`);
        } else {
          console.log('Restart complete. Logged to autoStartLog.txt');
        }
      });
    });
  }, delay);
} else {
  console.log('Invalid restart time. Please set a future time for restart.');
}
