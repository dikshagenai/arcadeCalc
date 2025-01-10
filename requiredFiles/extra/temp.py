import json

# Load the JSON data from the file
def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Function to sort the data by difficulty
def sort_by_difficulty(data):
    # Define the custom sorting order for difficulty
    difficulty_order = {'Introductory': 1, 'Intermediate': 2, 'Advanced': 3}
    
    # Sort the data based on the 'difficulty' field using the custom order
    sorted_data = sorted(data, key=lambda x: difficulty_order.get(x['difficulty'], 4))  # Default to 4 for unknown difficulties
    return sorted_data

# Save the sorted data to a new JSON file
def save_to_json(data, output_file):
    with open(output_file, 'w') as file:
        json.dump(data, file, indent=4)

# Main function to execute the program
def main():
    # File paths for the input and output files
    input_file = 'output.json'  # Replace with your file path
    output_file = 'sorted_output.json'  # Name of the sorted output file

    # Load the data from the JSON file
    data = load_json(input_file)

    # Sort the data by difficulty
    sorted_data = sort_by_difficulty(data)

    # Save the sorted data to a new JSON file
    save_to_json(sorted_data, output_file)

    print(f"Sorted data has been saved to {output_file}")

# Run the program
if __name__ == '__main__':
    main()
