import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Image = () => {
  const [image, setImage] = useState(null);
  const [apiResult, setApiResult] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGetStarted = async () => {
    // Check if image is available
    if (!image) {
      console.error("No image available for submission");
      return;
    }
  
    // Create FormData object to send the image as multipart/form-data
    const formData = new FormData();
    formData.append("image", image);
  
    // Make API call on submit
    try {
      const response = await fetch("http://127.0.0.1:8000/image_plagiarism_check/", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Plagiarism check result:", result);
  
        // Set the result data in state
        setApiResult(result);
      } else {
        console.error("API request failed");
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  return (
    <div className="bg-cover bg-center flex items-center justify-center h-screen mt-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 overflow-y-auto">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 mt-10 mb-20 mx-auto">
        <h1 className="text-3xl font-bold mt-10 mb-4 text-center text-cyan-600">
          Image Plagiarism
        </h1>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-2 text-left">Upload Image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 placeholder-gray-300 border rounded focus:outline-none focus:ring focus:ring-cyan-500"
            />
          </div>
          <div className="w-full max-w-lg flex flex-col items-center justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-cyan-500 text-black font-semibold px-4 py-2 rounded block w-full mb-4"
            >
              Submit
            </button>
            {/* Conditionally render the result */}
            {apiResult && (
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">Result</h2>
                <p>Plagiarism Percentage: {apiResult.percent}%</p>
                {/* <p>Plagiarized Text: {apiResult.plagiarized_text}</p> */}
                <p>Links:</p>
                <ul>
                  {Object.entries(apiResult.link).map(([link, percentage]) => (
                    <li key={link}>{link}: {percentage}%</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
