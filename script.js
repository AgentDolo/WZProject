document.addEventListener("DOMContentLoaded", function () {
    // Define map indices for each rotation from localStorage or default to 0
    let quadsMapIndex = parseInt(localStorage.getItem('quadsMapIndex')) || 0;
    let triosMapIndex = parseInt(localStorage.getItem('triosMapIndex')) || 0;
    let duosMapIndex = parseInt(localStorage.getItem('duosMapIndex')) || 0;
    let solosMapIndex = parseInt(localStorage.getItem('solosMapIndex')) || 0;

    // Get elements for each rotation
    const quadsMapImageElement = document.querySelector("#resurgenceQuads .map-image");
    const quadsMapOverlayElement = document.querySelector("#resurgenceQuads .map-overlay");
    const quadsCountdownElement = document.querySelector("#resurgenceQuads .timer");

    const triosMapImageElement = document.querySelector("#resurgenceTrios .map-image");
    const triosMapOverlayElement = document.querySelector("#resurgenceTrios .map-overlay");
    const triosCountdownElement = document.querySelector("#resurgenceTrios .timer");

    const duosMapImageElement = document.querySelector("#resurgenceDuos .map-image");
    const duosMapOverlayElement = document.querySelector("#resurgenceDuos .map-overlay");
    const duosCountdownElement = document.querySelector("#resurgenceDuos .timer");

    const solosMapImageElement = document.querySelector("#resurgenceSolos .map-image");
    const solosMapOverlayElement = document.querySelector("#resurgenceSolos .map-overlay");
    const solosCountdownElement = document.querySelector("#resurgenceSolos .timer");

    // Array of maps for each rotation
    const quadsMaps = [
        { name: "VONDEL", imageUrl: "images/Vondel.jpg" },
        { name: "ASHIKA ISLAND", imageUrl: "images/Ashika%20Island.jpg" }
        // Add more maps as needed
    ];

    const triosMaps = [
        { name: "ASHIKA ISLAND", imageUrl: "images/Ashika%20Island.jpg" },
        { name: "VONDEL", imageUrl: "images/Vondel.jpg" }
        // Add more maps as needed
    ];

    const duosMaps = [
        { name: "DUOS MAP 1", imageUrl: "images/Vondel.jpg" },
        { name: "DUOS MAP 2", imageUrl: "images/Ashika%20Island.jpg" }
        // Add more maps as needed
    ];

    const solosMaps = [
        { name: "SOLOS MAP 1", imageUrl: "images/Ashika%20Island.jpg" },
        { name: "SOLOS MAP 2", imageUrl: "images/Vondel.jpg" }
        // Add more maps as needed
    ];

    function updateQuadsMap() {
        quadsMapImageElement.src = quadsMaps[quadsMapIndex].imageUrl;
        quadsMapOverlayElement.innerHTML = `${quadsMaps[quadsMapIndex].name}`;
    }

    function updateTriosMap() {
        triosMapImageElement.src = triosMaps[triosMapIndex].imageUrl;
        triosMapOverlayElement.innerHTML = `${triosMaps[triosMapIndex].name}`;
    }

    function updateDuosMap() {
        duosMapImageElement.src = duosMaps[duosMapIndex].imageUrl;
        duosMapOverlayElement.innerHTML = `${duosMaps[duosMapIndex].name}`;
    }

    function updateSolosMap() {
        solosMapImageElement.src = solosMaps[solosMapIndex].imageUrl;
        solosMapOverlayElement.innerHTML = `${solosMaps[solosMapIndex].name}`;
    }

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
            }
        }

        // Initial update
        updateTimer();

        // Update the timer every second
        setInterval(function () {
            updateTimer();
        }, 1000);
    }

    function updateMap() {
        quadsMapIndex = rotateMap(quadsMapIndex, quadsMaps);
        triosMapIndex = rotateMap(triosMapIndex, triosMaps);
        duosMapIndex = rotateMap(duosMapIndex, duosMaps);
        solosMapIndex = rotateMap(solosMapIndex, solosMaps);
        updateQuadsMap();
        updateTriosMap();
        updateDuosMap();
        updateSolosMap();

    }

    // Initial map setup
    updateMap();

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
        updateQuadsMap();
        updateTriosMap();
        updateDuosMap();
        updateSolosMap();
    }, 15 * 60 * 1000);
});
