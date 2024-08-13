import React, { useState } from 'react';
import axios from 'axios';

const ResumeQASystem = () => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState('');
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !questions) {
            alert('Please upload a resume and enter questions');
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        formData.append('questions', questions);

        try {
            const response = await axios.post('http://localhost:5000/process', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setAnswers(response.data);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your request');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-5xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-4xl mx-auto">
                        <div>
                            <h1 className="text-3xl font-semibold text-center mb-10">Resume QA System</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="flex flex-col md:flex-row md:space-x-8">
                                <div className="w-full md:w-1/3 space-y-4">
                                    <div>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded inline-flex items-center w-full justify-center"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                            </svg>
                                            {file ? file.name : 'Upload Resume'}
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                            Job Description (optional)
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows="4"
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Paste the job description here..."
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-2/3">
                                    <label htmlFor="questions" className="block text-sm font-medium text-gray-700 mb-1">
                                        Paste all the questions separated by commas
                                    </label>
                                    <textarea
                                        id="questions"
                                        name="questions"
                                        value={questions}
                                        onChange={(e) => setQuestions(e.target.value)}
                                        rows="10"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="e.g., What is your experience in Python?, Describe a challenging project you worked on, ..."
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-blue-600 transition-colors"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Processing...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                        {answers.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-2xl font-semibold mb-4">Answers:</h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    {answers.map((answer, index) => (
                                        <li key={index} className="text-gray-700">{answer}</li>
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

export default ResumeQASystem;