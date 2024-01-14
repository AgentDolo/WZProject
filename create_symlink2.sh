#!/bin/bash

# Target symbolic link
symlink="duosmap.jpg"

while true; do
    # Read the content of triosResurgenceMap.txt
    map_name=$(<duosResurgenceMap.txt)

    # Check the content and create/override the symbolic link accordingly
    if [ "$map_name" == "Zaravan Suburbs" ]; then
        ln -sf images/Zaravan.webp "$symlink"
    elif [ "$map_name" == "Popov Power" ]; then
        ln -sf images/Popov.webp "$symlink"
    elif [ "$map_name" == "Orlov Military Base" ]; then
        ln -sf images/Military.webp "$symlink"
    else
        echo "Unsupported map name: $map_name"
    fi

    # Wait for 1 seconds before checking again
    sleep 1
done
