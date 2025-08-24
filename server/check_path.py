import os

MODEL_PATH = os.path.join('\server\notebooks', 'final_skin_disease_model.h5')

if os.path.exists(MODEL_PATH):
    print(f"Success! The file exists at: {os.path.abspath(MODEL_PATH)}")
else:
    print(f"Error! The file was NOT found at: {os.path.abspath(MODEL_PATH)}")
    
    # You can also check if the notebooks folder exists
    if not os.path.exists('notebooks'):
        print("The 'notebooks' folder does not exist in this directory.")