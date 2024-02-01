import React, { useState } from "react";

const Document = () => {
  const [file, setFile] = useState(null);
  const [plagiarismResult, setPlagiarismResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGetStarted = async () => {
    try {
      const formData = new FormData();
      formData.append("docfile", file);

      const response = await fetch("http://127.0.0.1:8000/doc_similarity/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      console.log("Plagiarism check result:", data);

      // Set the plagiarism result in state
      setPlagiarismResult(data);
    } catch (error) {
      console.error("Error occurred during plagiarism check:", error.message);
    }
  };

  return (
    <div className="bg-cover bg-center flex items-center justify-center h-screen mt-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 overflow-y-auto">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 mt-10 mb-20 mx-auto">
        <h1 className="text-3xl font-bold mt-10 mb-4 text-center text-cyan-600">
          Document Plagiarism
        </h1>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-2 text-left">Upload Document</h2>
            <input
              type="file"
              accept=".docx, .pdf, .txt"
              onChange={handleFileChange}
              className="w-full px-3 py-2 placeholder-gray-300 border rounded focus:outline-none focus:ring focus:ring-cyan-500"
            />
          </div>
          <div className="w-full max-w-lg flex flex-col items-center justify-center">
            <button
              onClick={handleGetStarted}
              disabled={!file}
              className="bg-cyan-500 text-black font-semibold px-4 py-2 rounded block w-full mb-4"
            >
              Submit
            </button>
          </div>
        </div>
        {/* Display plagiarism result if available */}
        {plagiarismResult && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Plagiarism Check Result</h2>
            <p>Similarity: {plagiarismResult.percent}%</p>
            {/* <p>Plagiarized Text: {plagiarismResult.plagiarized_text}</p> */}
            <p>Links:</p>
              <ul>
                  {Object.entries(plagiarismResult.link).map(([link, percentage]) => (
                    <li key={link}>{link}: {percentage}%</li>
                  ))}
             </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Document;
