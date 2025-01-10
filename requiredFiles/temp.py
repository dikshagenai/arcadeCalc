import json

# Load your JSON data from the file
def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Function to get distinct skill badges based on difficulty
def get_distinct_skill_badges_by_difficulty(data):
    difficulty_dict = {}

    # Loop through the data and organize by difficulty
    for item in data:
        difficulty = item.get('difficulty', 'Unknown')
        if difficulty not in difficulty_dict:
            difficulty_dict[difficulty] = []
        # Add skill badge if it's not already in the list for the given difficulty
        if item['skillBadge'] not in [badge['skillBadge'] for badge in difficulty_dict[difficulty]]:
            difficulty_dict[difficulty].append(item)

    return difficulty_dict

# Function to print the distinct skill badges by difficulty
def print_skill_badges_by_difficulty(difficulty_dict):
    for difficulty, badges in difficulty_dict.items():
        print(f"Difficulty: {difficulty}")
        for badge in badges:
            print(f"  - {badge['skillBadge']} ({badge['skillBadgeLink']})")
        print()

# Main function to execute the program
def main():
    file_path = 'SB_bestWay.json'  # Replace with your file path
    data = load_json(file_path)
    
    difficulty_dict = get_distinct_skill_badges_by_difficulty(data)
    
    print_skill_badges_by_difficulty(difficulty_dict)

# Run the program
if __name__ == '__main__':
    main()
