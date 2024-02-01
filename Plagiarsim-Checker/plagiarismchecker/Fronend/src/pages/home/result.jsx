import React from "react";
import { useParams } from "react-router-dom";

const ResultPage = () => {
    const { data } = useParams();

    return (
        <div className="bg-cover bg-center flex items-center justify-center h-screen">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 mt-10 mb-20 mx-auto w-full max-w-3xl py-20">
                <h1 className="text-3xl font-bold mt-10 mb-4 text-center text-cyan-600">
                    Result
                </h1>
                {data && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2">API Result</h2>
                        <pre className="overflow-auto p-4 border rounded bg-gray-100">
                            {data}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultPage;
