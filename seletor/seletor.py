import pandas as pd
import tkinter as tk
from tkinter import filedialog, messagebox
import random

def create_pairs(file_path):
    df = pd.read_excel(file_path)

    men = df['Men'].tolist()
    women = df['Women'].tolist()

    if len(men) > 40 or len(women) > 40:
        messagebox.showerror("Error", "엑셀 파일에는 남자와 여자가 각각 최대 40명 이하 있어야 합니다.")
        return None

    random.shuffle(men)
    random.shuffle(women)

    pairs = []
    for i in range(min(len(men), len(women))):
        pairs.append((men[i], women[i]))

    return pairs

def display_pairs(pairs):
    if not pairs:
        return

    root = tk.Tk()
    root.title("자리 배정 표시")

    root.attributes('-fullscreen', True)
    root.configure(bg='white')

    header = tk.Label(root, text="정면", font=('Malgun Gothic', 40), bg='lightgreen', width=100, anchor="center")
    header.pack(pady=10)

    frame = tk.Frame(root, bg='white')
    frame.pack(expand=True)

    sub_frame = tk.Frame(frame, bg='white')
    sub_frame.pack(expand=True)

    for col in range(7):
        tk.Label(sub_frame, text="x", font=('Malgun Gothic', 12), bg='white', relief=tk.SOLID, width=10, height=2, anchor="center").grid(row=0, column=col, padx=10, pady=5, sticky="nsew")

    num_pairs = len(pairs)
    num_columns = 7
    num_rows = (num_pairs + num_columns - 1) // num_columns

    for row in range(num_rows):
        for col in range(num_columns):
            index = row * num_columns + col
            if index < num_pairs:
                pair_text = f"{pairs[index][1]} | {pairs[index][0]}"
                
                tk.Label(sub_frame, text=pair_text, font=('Malgun Gothic', 12), bg='white', relief=tk.SOLID, width=20, height=3, anchor="center").grid(row=2 + row * 2, column=col, padx=10, pady=5, sticky="nsew")

    contact_label = tk.Label(root, text="Made : 오둥이 \n Contact: parkchang12332@gmail.com", font=('Malgun Gothic', 12), bg='white', anchor="center")
    contact_label.pack(pady=10)

    exit_button = tk.Button(root, text="종료", command=root.destroy, font=('Malgun Gothic', 14), width=10)
    exit_button.pack(pady=20)

    root.mainloop()

def open_file():
    file_path = filedialog.askopenfilename()
    if file_path:
        pairs = create_pairs(file_path)
        display_pairs(pairs)

app = tk.Tk()
app.title("자리 배정 프로그램")

button = tk.Button(app, text="엑셀 파일 열기", command=open_file, font=('Malgun Gothic', 14), width=15, bg='white', highlightbackground='black', borderwidth=2)
button.pack(pady=20)

app.configure(bg='white')

app.mainloop()
