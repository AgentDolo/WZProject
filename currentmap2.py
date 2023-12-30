import time

# List of maps
maps_list = ["Zaravan", "Popov", "Military"]

# Counter to keep track of time elapsed
counter = 0

while True:
    # Get the current time in UTC
    now = int(time.time())

    # Set the rotation time to every 5 minutes (300 seconds) for demonstration purposes
    rotation_time = 300

    # Calculate the time until the next rotation
    time_until_rotation = rotation_time - (now % rotation_time)

    if time_until_rotation == 0:
        # If the time is up, rotate the map
        current_map_index = int(now / rotation_time) % len(maps_list)
        current_map = maps_list[current_map_index]

        # Write the current map to the file
        with open('triosResurgenceMap.txt', 'w') as file:
            file.write(current_map)

    # Wait for 1 second before checking again
    time.sleep(1)
