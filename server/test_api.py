import requests
import json
import os

# The URL of your local FastAPI server
url = "http://127.0.0.1:8000/predict/"

# The path to the image you want to test
file_path = "C:/Users/routp/Downloads/skin.jpg"

try:
    # Open the file in binary mode for reading
    with open(file_path, 'rb') as f:
        # Create a dictionary with a tuple: (filename, file_object, content_type)
        files = {
            'file': (os.path.basename(file_path), f, 'image/') 
        }
        
        # Send the POST request with the 'files' parameter
        response = requests.post(url, files=files)
        
    # Check for a successful response
    response.raise_for_status() # Raises an exception for bad status codes
    prediction_result = response.json()
    
    print("API Response:")
    print(json.dumps(prediction_result, indent=4))
    
except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")