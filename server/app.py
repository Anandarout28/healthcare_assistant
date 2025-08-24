import io
import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# --- Load the trained model ---
# Use a relative path to find your model file within the 'notebooks' folder
MODEL_PATH = os.path.join('notebooks', 'cancer_model.h5')

# We use a try-except block to handle errors if the model file is not found
try:
    model = load_model(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    raise RuntimeError(f"Failed to load the model: {e}")

# --- Define the API endpoint for prediction ---
# --- Define the API endpoint for prediction ---
@app.post("/predict/")
async def predict_skin_disease(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Please upload an image."
        )

    try:
        # Read the image and preprocess
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = image.resize((224, 224))
        img_array = np.array(image, dtype=np.float32)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0

        # Make a prediction with the MULTI-CLASS model
        prediction = model.predict(img_array)
        
        # This list of classes must match your training data's folder names
        class_names = [
    "Acne",
    "Actinic Keratosis",
    "Basal Cell Carcinoma",
    "Chickenpox",
    "Dermato Fibroma",
    "Dyshidrotic Eczema",
    "Melanoma",
    "Nail Fungus",
    "Nevus",
    "Normal Skin",
    "Pigmented Benign Keratosis",
    "Ringworm",
    "Seborrheic Keratosis",
    "Squamous Cell Carcinoma",
    "Vascular Lesion"
]

        # Get the predicted class (acronym)
        predicted_class_index = np.argmax(prediction)
        predicted_acronym = class_names[predicted_class_index]
        confidence = float(prediction[0][predicted_class_index])
        
        # --- NEW LOGIC: Check if it's a cancer ---
        CANCER_CLASSES = ['AK', 'BCC', 'MEL', 'SCC']
        is_cancer = predicted_acronym in CANCER_CLASSES
        
        # Use the map from a previous conversation to get the full name
        full_names_map = {
            "Acne": "Acne",
            "AK": "Actinic Keratosis",
            "BCC": "Basal Cell Carcinoma",
            "Chickenpox": "Chickenpox",
            "Dermato Fibroma": "Dermato Fibroma",
            "Dyshidrotic Eczema": "Dyshidrotic Eczema",
            "MEL": "Melanoma",
            "Nail Fungus": "Nail Fungus",
            "Nevus": "Nevus",
            "Normal Skin": "Normal Skin",
            "Pigmented Benign Keratosis": "Pigmented Benign Keratosis",
            "Ringworm": "Ringworm",
            "Seborrheic Keratosis": "Seborrheic Keratosis",
            "SCC": "Squamous Cell Carcinoma",
            "Vascular Lesion": "Vascular Lesion"
        }
      
        predicted_full_name = full_names_map.get(predicted_acronym, "Unknown")
        
        # Return the response with all the new information
        result = {
            "prediction": predicted_full_name,
            "is_cancer": is_cancer,
            "confidence": f"{confidence * 100:.2f}%"
        }
        print(f"Prediction result: {result}")  # Print to terminal
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))