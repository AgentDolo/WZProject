#!/bin/bash

# Target symbolic link
symlink="quadsmap.jpg"

while true; do
    # Read the content of solosResurgenceMap.txt
    map_name=$(<quadsResurgenceMap.txt)

    # Check the content and create/override the symbolic link accordingly
    if [ "$map_name" == "Vondel" ]; then
        ln -sf images/Vondel.webp "$symlink"
    elif [ "$map_name" == "Ashika" ]; then
        ln -sf images/Ashika.webp "$symlink"
    else
        echo "Unsupported map name: $map_name"
    fi

    # Wait for 1 minutes before checking again
    sleep 1
done
