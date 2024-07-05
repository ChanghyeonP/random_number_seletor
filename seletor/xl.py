import random
import pandas as pd

def generate_names():
    female_names = ["Anna", "Beth", "Cathy", "Diana", "Ella", "Fiona", "Grace", "Hannah", "Ivy", "Julia",
                    "Katie", "Luna", "Mia", "Nina", "Olivia", "Penny", "Quinn", "Ruby", "Sophia", "Tina",
                    "Una", "Vera", "Wendy", "Xena", "Yara", "Zara", "Amy", "Bella", "Clara", "Donna",
                    "Eva", "Freya", "Gina", "Helen", "Isla"]
    
    male_names = ["Adam", "Ben", "Charlie", "David", "Ethan", "Frank", "George", "Harry", "Ian", "Jack",
                  "Kevin", "Leo", "Mike", "Nick", "Oscar", "Paul", "Quentin", "Ray", "Sam", "Tom",
                  "Ulysses", "Victor", "Will", "Xander", "Yusuf", "Zach", "Aaron", "Brian", "Chris", "Derek",
                  "Evan", "Felix", "Gavin", "Henry", "Isaac"]

    female_selected = random.sample(female_names, 35)
    male_selected = random.sample(male_names, 35)
    
    return female_selected, male_selected

def save_to_excel(female_names, male_names, file_name="test.xlsx"):
    data = {
        "Female Names": female_names,
        "Male Names": male_names
    }
    df = pd.DataFrame(data)
    df.to_excel(file_name, index=False)
    print(f"Names saved to {file_name}")

if __name__ == "__main__":
    female_names, male_names = generate_names()
    save_to_excel(female_names, male_names)
