from flask import Flask, request, jsonify
import joblib
import pandas as pd
import logging
from flask_cors import CORS
  # Enables CORS for all routes

# Enable logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)
CORS(app)
# Load trained ML model and scaler
try:
    model = joblib.load("notebooks/voyagehack_model.pkl")  # Update path if needed
    scaler = joblib.load("notebooks/voyagehack_scaler.pkl")
    app.logger.info("Model and scaler loaded successfully!")
except Exception as e:
    app.logger.error(f"Error loading model or scaler: {str(e)}")

# Exact feature columns from training (must match `X_train.columns` exactly)
feature_columns = [
    'age', 'budget', 'group_size', 'package_cost',
    'pref_Beaches', 'pref_History', 'pref_Culture', 'pref_Luxury',
    'pref_Adventure', 'pref_Wildlife',
    'theme_Adventure', 'theme_Beach', 'theme_Culture', 'theme_Luxury', 'theme_Wildlife'
]

# Dummy travel package database (for recommendation testing)
packages = [
    {"id": "A", "name": "Adventure in the Himalayas", "cost": 1200, "theme": "Adventure"},
    {"id": "B", "name": "Maldives Beach Getaway", "cost": 2000, "theme": "Beach, Luxury"},
    {"id": "C", "name": "Thailand Island Hopping", "cost": 1400, "theme": "Adventure, Beach"},
    {"id": "D", "name": "European Cultural Tour", "cost": 2500, "theme": "Culture"},
    {"id": "E", "name": "Local Safari Adventure", "cost": 900, "theme": "Wildlife"},
]

@app.route("/")
def home():
    return "VoyageHack Backend is Running!"

# Prediction API: Checks if a user will book a single package
@app.route("/predict", methods=["POST"])
def predict():
    app.logger.info("Predict endpoint hit!")

    try:
        data = request.get_json(force=True)
        app.logger.info(f"Request Data: {data}")
        age = data.get("age")
        budget = data.get("budget")
        group_size = data.get("group_size")
        preferences = data.get("preferences")
        package_cost = data.get("package_cost")
        package_theme = data.get("package_theme")

        
        user_features = {col: 0 for col in feature_columns}

        
        user_features["age"] = age
        user_features["budget"] = budget
        user_features["group_size"] = group_size
        user_features["package_cost"] = package_cost

        
        for pref in ["Beaches", "History", "Culture", "Luxury", "Adventure", "Wildlife"]:
            user_features[f"pref_{pref}"] = 1 if pref in preferences else 0

       
        for theme in ["Adventure", "Beach", "Culture", "Luxury", "Wildlife"]:
            user_features[f"theme_{theme}"] = 1 if theme in package_theme else 0

       
        expected_feature_order = ['age', 'budget', 'group_size', 'package_cost', 'pref_Adventure', 'pref_Beaches', 'pref_History', 'pref_Culture', 'pref_Wildlife', 'pref_Luxury', 'theme_Adventure', 'theme_Beach', 'theme_Culture', 'theme_Wildlife', 'theme_Luxury']
        df_new = pd.DataFrame([[user_features[col] for col in expected_feature_order]], columns=expected_feature_order)

        # Debugging: Check final order before passing to model
        app.logger.info(f"Final Feature Order in df_new: {df_new.columns.tolist()}")


        # Debug: Check the feature order before scaling
        app.logger.info(f"Feature Order in df_new: {df_new.columns.tolist()}")

        # Scale the features
        df_new_scaled = scaler.transform(df_new)

        # Make prediction
        prediction = model.predict(df_new_scaled)[0]
        probability = model.predict_proba(df_new_scaled)[0][1]

        return jsonify({"prediction": int(prediction), "booking_probability": round(probability, 2)})

    except Exception as e:
        app.logger.error(f"Error in /predict: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()

    # Debugging: Log received data
    print("Received user details:", data)

    recommendations = []

    for pkg in packages:
        package_cost = pkg["cost"]
        package_theme = pkg["theme"]

        # Debugging: Log each package details
        print(f"Processing Package: {pkg['name']}, Cost: {package_cost}, Theme: {package_theme}")

        recommendations.append({
            "package_id": pkg["id"],
            "package_name": pkg["name"],
            "cost": package_cost,  # Include cost
            "theme": package_theme,  # Include theme
            "match_probability": 95  # Example match probability
        })

    # Debugging: Log the response
    print("Response to frontend:", recommendations)

    return jsonify(recommendations)


if __name__ == "__main__":
    app.run(debug=True)
