import time
from datetime import datetime, timedelta

# List of maps
maps_list = ["Ashika", "Vondel"]

# Get the current time
now = datetime.now()

# Set the start time for rotation at 6 pm
rotation_start_time = datetime(now.year, now.month, now.day, 18, 0, 0)

# Calculate the time until the next rotation
time_until_rotation = (rotation_start_time - now).total_seconds() % 900

# Wait until the next rotation time
time.sleep(time_until_rotation)

while True:
    # Get the current time
    now = datetime.now()

    # Rotate the map every 15 minutes
    current_map_index = int((now - rotation_start_time).total_seconds() / 900) % len(maps_list)
    current_map = maps_list[current_map_index]

    # Write the current map to the file
    with open('quadsResurgenceMap.txt', 'w') as file:
        file.write(current_map)

    # Wait for 15 minutes before the next rotation
    time.sleep(900)
