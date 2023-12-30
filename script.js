document.addEventListener("DOMContentLoaded", function () {

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
        { name: "Zaravan", imageUrl: "images/Zaravan.webp" },
        { name: "Popov", imageUrl: "images/Popov.webp" },
        { name: "Military", imageUrl: "images/Military.webp" }
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

    function updateMap() {
        quadsMapIndex = rotateMap(quadsMapIndex, quadsMaps);
        triosMapIndex = rotateMap(triosMapIndex, triosMaps);
        duosMapIndex = rotateMap(duosMapIndex, duosMaps);
        solosMapIndex = rotateMap(solosMapIndex, solosMaps);

        // Update the map image source
        document.querySelector("#resurgenceQuads .map-image").src = quadsMaps[quadsMapIndex].imageUrl;
        document.querySelector("#resurgenceTrios .map-image").src = triosMaps[triosMapIndex].imageUrl;
        document.querySelector("#resurgenceDuos .map-image").src = duosMaps[duosMapIndex].imageUrl;
        document.querySelector("#resurgenceSolos .map-image").src = solosMaps[solosMapIndex].imageUrl;
    }

    function updateCountdown(countdownElement, mapIndex, maps) {
        function updateTimer() {
            // Get the current time in UTC
            const now = new Date();
            const currentTime = now.getTime();

            // Set the rotation time to every 5 seconds for testing purposes
            const rotationTime = 10 * 1000; // 5 seconds in milliseconds

            // Calculate the time until the next rotation
            const timeUntilRotation = rotationTime - (currentTime % rotationTime);

            // Calculate minutes and seconds
            const minutes = Math.floor(timeUntilRotation / 60000);
            const seconds = Math.floor((timeUntilRotation % 60000) / 1000);

            // Display the countdown
            countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            console.log('Current Time:', now);
            console.log('Current Time in milliseconds:', currentTime);
            console.log('Rotation Time:', rotationTime);
            console.log('Time Until Rotation:', timeUntilRotation);
            console.log('Minutes:', minutes);
            console.log('Seconds:', seconds);

            if (timeUntilRotation <= 0) {
                console.log('Time is up!');

                // If the time is up, rotate the map and update the timer
                mapIndex = rotateMap(mapIndex, maps);
                updateMap();

                // Refresh the browser when the timer reaches 0:00
                if (minutes === 0 && seconds === 0) {
                    console.log('Refreshing the browser...');
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

    // Start automatic image sliding and countdown
    updateCountdown(quadsCountdownElement, quadsMapIndex, quadsMaps);
    updateCountdown(triosCountdownElement, triosMapIndex, triosMaps);
    updateCountdown(duosCountdownElement, duosMapIndex, duosMaps);
    updateCountdown(solosCountdownElement, solosMapIndex, solosMaps);

    // Rotate maps every 5 seconds for testing
    setInterval(function () {
        quadsMapIndex = rotateMap(quadsMapIndex, quadsMaps);
        triosMapIndex = rotateMap(triosMapIndex, triosMaps);
        duosMapIndex = rotateMap(duosMapIndex, duosMaps);
        solosMapIndex = rotateMap(solosMapIndex, solosMaps);
        updateMap();
    }, 10 * 1000);
});

