#!/bin/bash

# Target symbolic link
symlink="triosmap.jpg"

while true; do
    # Read the content of triosResurgenceMap.txt
    map_name=$(<triosResurgenceMap.txt)

    # Check the content and create/override the symbolic link accordingly
    if [ "$map_name" == "Zaravan" ]; then
        ln -sf images/Zaravan.webp "$symlink"
    elif [ "$map_name" == "Popov" ]; then
        ln -sf images/Popov.webp "$symlink"
    elif [ "$map_name" == "Military" ]; then
        ln -sf images/Military.webp "$symlink"
    else
        echo "Unsupported map name: $map_name"
    fi

    # Wait for 5 seconds before checking again
    sleep 5
done
