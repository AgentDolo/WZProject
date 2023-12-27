import time

# List of maps
maps_list = ["Ashika", "Vondel"]

# Counter to keep track of time elapsed
counter = 0

while True:
    # Check if it's time to display the next map every 15 seconds
    if counter % 100 == 0:
        # Output the current map to the file
        current_map_index = counter // 10 % len(maps_list)
        current_map = maps_list[current_map_index]
        
        # Write the current map to the file
        with open('quadsResurgenceMap.txt', 'w') as file:
            file.write(current_map)

    # Increment the counter every second
    counter += 1

    # Wait for 1 second before checking again
    time.sleep(1)
