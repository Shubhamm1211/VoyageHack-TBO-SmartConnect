import { useState } from "react";
import UserInputForm from "./components/UserInputForm";
import PackageList from "./components/PackageList";

function App() {
  const [packages, setPackages] = useState([]); 
  const [userDetails, setUserDetails] = useState(null); 

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.jpg')", 
      }}
    >
      
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> 

      {/* Content Wrapper */}
      <div className="relative z-10 min-h-screen bg-gray-100 bg-opacity-60 p-8"> 
        <div className="grid grid-cols-3 gap-6">
          {/* Left Side - Form */}
          <div className="col-span-1">
            <UserInputForm
              onRecommendations={(recommendations) => {
                console.log("Recommendations from backend:", recommendations); 
                setPackages(recommendations);
              }}
              onUserDetails={setUserDetails}
            />
          </div>
          <div className="col-span-2">
            {packages.length > 0 && userDetails && (
              <PackageList packages={packages} userDetails={userDetails} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


