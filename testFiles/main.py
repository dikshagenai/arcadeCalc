import json

# Load the JSON data from the file with UTF-8 encoding
with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Remove the specified keys from each object
keys_to_remove = ['description', 'level', 'duration', 'type']
for obj in data:
    for key in keys_to_remove:
        obj.pop(key, None)  # Remove the key if it exists

# Save the modified data back to the file
with open('data.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=4)

print("Keys removed successfully!")
