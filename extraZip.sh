#!/bin/bash

# Function to recursively extract zip files
extract_zip() {
    local target_dir="$1"

    # Loop through each file in the target directory
    for file in "$target_dir"/*; do
        if [[ -f "$file" && "$file" =~ \.zip$ ]]; then
            echo "Extracting $file ..."
            unzip -q "$file" -d "${file%.zip}"
            rm "$file" # Optionally remove the zip file after extraction
        elif [[ -d "$file" ]]; then
            extract_zip "$file" # Recursively call function for directories
        fi
    done
}

# Check if an argument is provided, otherwise use current directory
if [[ -n "$1" && -d "$1" ]]; then
    target_directory="$1"
else
    target_directory="."
fi

# Start extracting from the target directory
extract_zip "$target_directory"

echo "Extraction complete."
