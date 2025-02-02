import { useState } from "react";
import axios from "axios";

const UserInputForm = ({ onRecommendations, onUserDetails }) => {
  const [age, setAge] = useState("");
  const [budget, setBudget] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePreferenceChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPreferences([...preferences, value]);
    } else {
      setPreferences(preferences.filter((pref) => pref !== value));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const userDetails = {
      age: parseInt(age),
      budget: parseInt(budget),
      group_size: parseInt(groupSize),
      preferences: preferences.join(", "),
    };

    onUserDetails(userDetails);

    try {
      const response = await axios.post("http://127.0.0.1:5000/recommend", userDetails);
      console.log("Backend Recommendations Response:", response.data);
      onRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Find Your Perfect Travel Package</h2>
      <p className="text-gray-600 mb-6">Fill in the details below to get tailored recommendations for your next adventure.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
        <input
          type="number"
          placeholder="Enter your budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
        <input
          type="number"
          placeholder="Enter group size"
          value={groupSize}
          onChange={(e) => setGroupSize(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />

        <div>
          <p className="text-gray-600 mb-2">Select your preferences:</p>
          <div className="flex flex-wrap gap-3">
            {["Adventure", "Beaches", "Culture", "Luxury", "Wildlife"].map((pref) => (
              <label key={pref} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={pref}
                  onChange={handlePreferenceChange}
                  className="accent-blue-500"
                />
                <span>{pref}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition"
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>
    </div>
  );
};

export default UserInputForm;
