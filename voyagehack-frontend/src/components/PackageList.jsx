import { useState } from "react";
import axios from "axios";

const PackageList = ({ packages, userDetails }) => {
  const [bookingProbability, setBookingProbability] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const checkBookingProbability = async (pkg) => {
    try {
      const payload = {
        age: userDetails.age,
        budget: userDetails.budget,
        group_size: userDetails.group_size,
        preferences: userDetails.preferences,
        package_cost: pkg.cost,
        package_theme: pkg.theme,
      };

      console.log("Sending payload to /predict:", payload);

      const response = await axios.post("http://127.0.0.1:5000/predict", payload);
      console.log("Response from /predict:", response.data);

      setSelectedPackage(pkg);
      setBookingProbability(response.data.booking_probability);
      setShowPopup(true); // Show popup
    } catch (error) {
      console.error("Error fetching booking probability:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Recommended Packages</h2>

      <ul className="space-y-4">
        {packages.map((pkg, index) => (
          <li
            key={pkg.id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-lg font-bold">
                {index + 1}. {pkg.package_name}
              </h3>
              <p className="text-gray-600">Cost: ${pkg.cost}</p>
              <p className="text-gray-600">Theme: {pkg.theme}</p>
              <p className="text-gray-600">Match Probability: {pkg.match_probability}%</p>
            </div>
            <button
              onClick={() => checkBookingProbability(pkg)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Check Booking Probability
            </button>
          </li>
        ))}
      </ul>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-green-700 mb-2">Booking Probability</h3>
            <p>
              {selectedPackage.package_name}:{" "}
              <strong>{Math.round(bookingProbability * 100)}%</strong>
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageList;
