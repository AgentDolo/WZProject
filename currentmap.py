import time

# Define the list
locations = ["Vondel", "Ashika"]

# Specify the file names
file_name = "quadsResurgenceMap.txt"
times_file_name = "quadsTimes.txt"

# Calculate the start time (6 pm UTC)
start_time_utc = time.mktime(time.strptime(time.strftime("%Y-%m-%d 16:00:10", time.gmtime()), "%Y-%m-%d %H:%M:%S"))

# Define the time increment (900 seconds or 15 minutes)
time_increment = 900

# Get the time it takes to execute one iteration
iteration_execution_time = time.time() % 900

while True:
    current_time_utc = time.mktime(time.gmtime())

    # Calculate the time difference since 6 pm UTC, considering execution time
    time_difference = current_time_utc - start_time_utc - iteration_execution_time

    # Determine the current location based on time difference
    current_location_index = int((time_difference // time_increment) % len(locations))
    current_location = locations[current_location_index]

    # Open the file in write mode to override existing content
    with open(file_name, "w") as file:
        # Write the current location to the file
        file.write(current_location)

    # Append the current time and location to the times file
    with open(times_file_name, "a") as times_file:
        # Write the current time and location to the file
        times_file.write(f"{time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime())} - {current_location}\n")

    # Wait for the specified time increment
    time.sleep(time_increment)

    # Check if the current time exceeds 6 am the next day, and exit the loop if true
    if current_time_utc > start_time_utc + 24 * 3600:
        exit()
