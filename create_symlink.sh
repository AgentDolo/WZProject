#!/bin/bash

# Target symbolic link
symlink="quadsmap.jpg"

while true; do
    # Read the content of quadsResurgenceMap.txt
    map_name=$(<quadsResurgenceMap.txt)

    # Check the content and create/override the symbolic link accordingly
    if [ "$map_name" == "Ashika" ]; then
        ln -sf https://wzmaprotationimages.s3.amazonaws.com/Ashika.webp "$symlink"
    elif [ "$map_name" == "Vondel" ]; then
        ln -sf https://wzmaprotationimages.s3.amazonaws.com/Vondel.webp "$symlink"
    else
        echo "Unsupported map name: $map_name"
    fi

    # Wait for 15 seconds before checking again
    sleep 1
done
