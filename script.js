document.addEventListener("DOMContentLoaded", function () {

    function checkFileModification() {
        fetch("/current-map")
          .then(response => response.json())
          .then(data => {
            if (data.modified) {
              // File has been modified, refresh the page
              window.location.reload();
            } else {
              // Update the current map
              const quadsCountdownElement = document.querySelector("#resurgenceQuads .timer");
              quadsCountdownElement.textContent = data.currentMap;
    
              // Add similar updates for other map elements if needed
            }
          })
          .catch(error => {
            console.error("Error checking file modification:", error);
          });
      }
    
      // Check for file modification every second
      setInterval(checkFileModification, 10000);

    // Define map indices for each rotation from localStorage or default to 0
    let quadsMapIndex = parseInt(localStorage.getItem('quadsMapIndex')) || 0;
    let triosMapIndex = parseInt(localStorage.getItem('triosMapIndex')) || 0;
    let duosMapIndex = parseInt(localStorage.getItem('duosMapIndex')) || 0;
    let solosMapIndex = parseInt(localStorage.getItem('solosMapIndex')) || 0;

    // Get elements for each rotation
    const quadsCountdownElement = document.querySelector("#resurgenceQuads .timer");
    const triosCountdownElement = document.querySelector("#resurgenceTrios .timer");
    const duosCountdownElement = document.querySelector("#resurgenceDuos .timer");
    const solosCountdownElement = document.querySelector("#resurgenceSolos .timer");

    // Array of maps for each rotation
    const quadsMaps = [
        { name: "VONDEL", imageUrl: "images/Vondel.webp" },
        { name: "ASHIKA ISLAND", imageUrl: "images/Ashika.webp" }
        // Add more maps as needed
    ];

    const triosMaps = [
        { name: "ZARAVAN", imageUrl: "images/Zaravan.webp" },
        { name: "POPOV", imageUrl: "images/Popov.webp" },
        { name: "MILITARY", imageUrl: "images/Military.webp" }
        // Add more maps as needed
    ];

    const duosMaps = [
        { name: "VONDEL", imageUrl: "images/Vondel.webp" },
        { name: "ASHIKA ISLAND", imageUrl: "images/Ashika.webp" }
        // Add more maps as needed
    ];

    const solosMaps = [
        { name: "ASHIKA ISLAND", imageUrl: "images/Ashika.webp" },
        { name: "VONDEL", imageUrl: "images/Vondel.webp" }
        // Add more maps as needed
    ];

    function rotateMap(mapIndex, maps) {
        // Rotate to the next map
        return (mapIndex + 1) % maps.length;
    }

    function updateCountdown(countdownElement, mapIndex, maps) {
        function updateTimer() {
            // Get the current time in UTC
            const now = new Date();
            const currentTime = now.getTime();

            // Set the rotation time to every 15 minutes for demonstration purposes
            const rotationTime = 15 * 60 * 1000; // 15 minutes in milliseconds

            // Calculate the time until the next rotation
            const timeUntilRotation = rotationTime - (currentTime % rotationTime);

            // Calculate minutes and seconds
            const minutes = Math.floor(timeUntilRotation / 60000);
            const seconds = Math.floor((timeUntilRotation % 60000) / 1000);

            // Display the countdown
            countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (timeUntilRotation <= 0) {
                mapIndex = rotateMap(mapIndex, maps);
                updateMap();

                // Refresh the browser when the timer reaches 0:00
                if (minutes === 0 && seconds === 0) {
                    window.location.reload();
                }
            }
        }

        // Initial update
        updateTimer();

        // Update the timer every second
        setInterval(function () {
            updateTimer();
        }, 1000);
    }

    function checkFileModification() {
        fetch("/current-map")
          .then(response => response.json())
          .then(data => {
            if (data.modified) {
              // File has been modified, refresh the page
              window.location.reload();
            } else {
              // Update the current map
              const quadsCountdownElement = document.querySelector("#resurgenceQuads .timer");
              quadsCountdownElement.textContent = data.currentMap;
    
              // Add similar updates for other map elements if needed
            }
          })
          .catch(error => {
            console.error("Error checking file modification:", error);
          });
      }
    
      // Check for file modification every second
      setInterval(checkFileModification, 10000);

    function updateMap() {
        quadsMapIndex = rotateMap(quadsMapIndex, quadsMaps);
        triosMapIndex = rotateMap(triosMapIndex, triosMaps);
        duosMapIndex = rotateMap(duosMapIndex, duosMaps);
        solosMapIndex = rotateMap(solosMapIndex, solosMaps);
    }

    // Start automatic image sliding and countdown
    updateCountdown(quadsCountdownElement, quadsMapIndex, quadsMaps);
    updateCountdown(triosCountdownElement, triosMapIndex, triosMaps);
    updateCountdown(duosCountdownElement, duosMapIndex, duosMaps);
    updateCountdown(solosCountdownElement, solosMapIndex, solosMaps);

    // Rotate maps every 15 minutes
    setInterval(function () {
        quadsMapIndex = rotateMap(quadsMapIndex, quadsMaps);
        triosMapIndex = rotateMap(triosMapIndex, triosMaps);
        duosMapIndex = rotateMap(duosMapIndex, duosMaps);
        solosMapIndex = rotateMap(solosMapIndex, solosMaps);
        updateMap();
    }, 15 * 60 * 1000);
});

