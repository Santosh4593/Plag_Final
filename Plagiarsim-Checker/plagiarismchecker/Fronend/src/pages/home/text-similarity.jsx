import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Text = () => {
  const [textInput, setTextInput] = useState('');
  const [result, setResult] = useState(null); // State to store the result
  const navigate = useNavigate();

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleGetStarted = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('q', textInput);
  
      const response = await fetch("http://127.0.0.1:8000/text_similarity/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      console.log("Plagiarism check result:", data);

      // Set the result data in state
      setResult(data);
      // navigate(`/result${data}`);
    } catch (error) {
      console.error("Error occurred during plagiarism check:", error.message);
    }
  };

  return (
    <div className="bg-cover bg-center flex items-center justify-center h-screen mt-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 overflow-y-auto">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 mt-10 mb-20 mx-auto">
        <h1 className="text-3xl font-bold mt-10 mb-4 text-center text-cyan-600">
          Text Plagiarism
        </h1>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-2 text-left">Enter Text</h2>
            <textarea
              value={textInput}
              onChange={handleTextInputChange}
              className="w-full px-3 py-2 placeholder-gray-300 border rounded focus:outline-none focus:ring focus:ring-cyan-500"
              rows="5"
              placeholder="Enter your text here..."
            ></textarea>
          </div>
          <div className="w-full max-w-lg flex flex-col items-center justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-cyan-500 text-black font-semibold px-4 py-2 rounded block w-full mb-4"
            >
              Submit
            </button>
            {/* Conditionally render the result */}
            {result && (
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">Result</h2>
                <p>Plagiarism Percentage: {result.percent}%</p>
                <p>Plagiarized Text: {result.plagiarized_text}</p>
                <p>Links:</p>
                <ul>
                  {Object.entries(result.link).map(([link, percentage]) => (
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

export default Text;
