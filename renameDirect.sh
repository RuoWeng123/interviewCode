#!/bin/bash

# Function to recursively rename directories
rename_directories() {
    local target_dir="$1"

    # Loop through each directory in the target directory
    for dir in "$target_dir"/*/; do
        if [[ -d "$dir" ]]; then
            # Extract the content after the first underscore separator
            new_name=$(basename "$dir" | awk -F_ '{$1=""; print $0}' | sed 's/^ //')
                # Rename the directory
            mv "$dir" "$(dirname "$dir")/$new_name"
            echo "Renamed $dir to $(dirname "$dir")/$new_name"
        fi
    done

    # Recursively call function for subdirectories
    for subdir in "$target_dir"/*/; do
        if [[ -d "$subdir" ]]; then
            rename_directories "$subdir"
        fi
    done
}

# Check if an argument is provided, otherwise use current directory
if [[ -n "$1" && -d "$1" ]]; then
    target_directory="$1"
else
    target_directory="."
fi

rename_directories "$target_directory"

echo "Directory renaming complete."
