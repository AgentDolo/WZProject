document.addEventListener("DOMContentLoaded", function () {
    let mapIndex = 0; // Initial map index
    const mapImageElement = document.getElementById("map-image");
    const mapOverlayElement = document.getElementById("map-overlay");
    const countdownElement = document.getElementById("timer");

    // Array of maps with their names and image locations
    const maps = [
        { name: "ASHIKA ISLAND", imageUrl: "/temp/WZAPP/images/Ashika Island.jpg" },
        { name: "VONDEL", imageUrl: "/temp/WZAPP/images/Vondel.jpg" }
        // Add more maps as needed
    ];

    function updateMap() {
        // Update map overlay and image
        mapOverlayElement.textContent = "Map Name: " + maps[mapIndex].name;
        mapImageElement.src = maps[mapIndex].imageUrl;
    }

    function updateCountdown() {
        // Set the initial countdown time (15 minutes)
        let countdownTime = 15 * 60;

        // Update the countdown every second
        setInterval(function () {
            const minutes = Math.floor(countdownTime / 60);
            const seconds = countdownTime % 60;

            countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            // Decrease the countdown time
            countdownTime--;

            // If the countdown reaches zero, switch to the next map and reset countdown
            if (countdownTime < 0) {
                mapIndex = (mapIndex + 1) % maps.length;
                updateMap();
                countdownTime = 15 * 60; // Reset countdown time to 15 minutes
            }
        }, 1000);
    }

    // Initial map setup
    updateMap();

    // Start automatic image sliding and countdown
    updateCountdown();
});
