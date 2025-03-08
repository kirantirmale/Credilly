import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmitedataStepper = () => {
  const handleSubmit = () => {
    localStorage.clear(); // Clear local storage
    toast.success('Data submitted successfully!'); // Show toast notification
    setTimeout(() => {
        window.location.reload(); // Refresh the page after 3 seconds
    }, 3000);
};


  return (
    <>
     <ToastContainer position="top-center" autoClose={3000} />
    <div className="otp-actions">
      <h2 className="text-xl font-semibold mb-4">Submit Data</h2>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Submit Data
      </button>
    </div>
    </>
  );
};

export default SubmitedataStepper;
