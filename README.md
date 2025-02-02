# 🚀 TBO SmartConnect – A Travel Agent Suite  
**Travel Recommender for Personalized and Data-Driven Travel Planning**  


---

##  Overview  
TBO SmartConnect is an **ML-driven travel recommendation system** that helps travel agents provide **personalized, data-backed travel package suggestions** based on customer preferences.  

🔹 **Machine Learning-Powered Recommendations** – Smart ranking of packages with booking probability predictions.  
🔹 **Seamless API Integration** – Built with Flask backend and a robust ML model.  
🔹 **Modern UI** – A sleek, responsive React.js frontend with Tailwind CSS.  
🔹 **Future-Ready** – Designed for scalability, integrating **AR/VR** & live travel APIs.  

---

##  Tech Stack  
### **Frontend**  
- React.js (Vite) – Fast & modern UI  
- Tailwind CSS – Responsive styling  
- Axios – API communication  

### **Backend**  
- Flask (Python) – REST API for ML processing  
- Joblib – ML Model Deployment  
- Pandas & NumPy – Data Processing  

### **Machine Learning**  
- Logistic Regression (Scikit-learn) – Predictive modeling  
- Feature Engineering – Age, Budget, Preferences, Package Cost  
- One-Hot Encoding – Handling categorical features  

### **Deployment**  
- **Frontend:** Vercel  
- **Backend:** Render / PythonAnywhere  
- **Database:** CSV-based prototype (Future: PostgreSQL/MongoDB)  

---

##  Features  
✔ **Smart Travel Recommendations** – Suggests the best packages based on user preferences.  
✔ **Booking Probability Prediction** – AI estimates the likelihood of a user booking a package.  
✔ **Real-Time API Response** – Optimized Flask backend with response time <200ms.  
✔ **Mobile-Friendly UI** – Built with React.js & Tailwind for a smooth experience.  
✔ **Scalability & API Integration** – Ready for third-party travel APIs (Expedia, Amadeus).  
✔ **Future Enhancements** – AR/VR travel previews, NLP-based customer sentiment analysis.  

---

##  Quick Start  
### **1️. Clone the Repository**  
```bash  
git clone https://github.com/yourusername/TBO-SmartConnect.git  
cd TBO-SmartConnect  
```

### **2️. Setup Backend (Flask API)**  
```bash  
cd backend  
python -m venv venv  
source venv/bin/activate   # On Windows: venv\Scripts\activate  
pip install -r requirements.txt  
python app.py  # Runs on http://127.0.0.1:5000  
```

### **3️. Setup Frontend (React.js)**  
```bash  
cd frontend  
npm install  
npm run dev  # Runs on http://localhost:5173  
```

---

##  API Endpoints  
| **Endpoint** | **Method** | **Description** |  
|-------------|-----------|----------------|  
| `/predict` | `POST` | Returns **booking probability** for a travel package |  
| `/recommend` | `POST` | Returns **top-ranked travel packages** |  

**Sample `/recommend` Response:**  
```json  
[  
  {  
    "package_id": "C",  
    "package_name": "Thailand Island Hopping",  
    "match_probability": 82.5  
  },  
  {  
    "package_id": "A",  
    "package_name": "Adventure in the Himalayas",  
    "match_probability": 76.3  
  }  
]  
```


##  Future Enhancements  
🔹 **Live Travel API Integration** – Connect with Booking.com, Expedia, and real-time pricing.  
🔹 **AR/VR Travel Previews** – Virtual exploration of destinations before booking.  
🔹 **AI Chatbot for Travel Agents** – NLP-powered assistant to enhance customer engagement.  
🔹 **Serverless Backend Scaling** – AWS Lambda for high-traffic scenarios.  


## 🛡️ License  
This project is licensed under the **MIT License** – feel free to use, modify, and distribute.  


