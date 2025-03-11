import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResumeDisplay = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const bookCarData = JSON.parse(localStorage.getItem("bookCarData")) || {};
    const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan")) || {};
    const uploadedDocuments = JSON.parse(localStorage.getItem("uploadedDocuments")) || {};
    setData({ bookCarData, selectedPlan, uploadedDocuments });
  }, []);

  const handleSubmit = () => {
    localStorage.clear();
    toast.success("Data submitted successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handlePrint = () => {
    window.print();
  };
  

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div id="resume-container" className="resume-container">
        <h2 className="resume-title">User Resume</h2>

        <div className="resume-content">
          <div className="resume-flex">
            <div className="resume-section left">
              <h3 className="resume-heading">Personal Information</h3>
              <p><strong>Company Name:</strong> {data?.bookCarData?.companyName}</p>
              <p><strong>Salary:</strong> {data?.bookCarData?.salary}</p>
              <p><strong>Income Source:</strong> {data?.bookCarData?.incomeSource}</p>
              <p><strong>Bank:</strong> {data?.bookCarData?.bank}</p>
              <p><strong>National ID:</strong> {data?.bookCarData?.nationalId}</p>
              <p><strong>Phone:</strong> {data?.bookCarData?.phoneNumber}</p>
              <p><strong>Year & Month:</strong> {data?.bookCarData?.year}, {data?.bookCarData?.month}</p>
            </div>

            <div className="resume-section right">
              <h3 className="resume-heading">Selected Plan</h3>
              <p><strong>Plan Name:</strong> {data?.selectedPlan?.name}</p>
              <p><strong>Price:</strong> {data?.selectedPlan?.price}</p>
              <p><strong>APR:</strong> {data?.selectedPlan?.apr}</p>
              <p><strong>Installment:</strong> {data?.selectedPlan?.installment}</p>
              <p><strong>Residual:</strong> {data?.selectedPlan?.residual}</p>
              {data?.selectedPlan?.image && <img src={data.selectedPlan.image} alt="Plan Logo" className="small-image" />}
            </div>
          </div>

          <div className="resume-section">
            <h3 className="resume-heading">Uploaded Documents</h3>
            <div className="document-grid">
              {data?.uploadedDocuments?.aadhar && (
                <div className="document-item">
                  <p><strong>Aadhar Card</strong></p>
                  <img src={data.uploadedDocuments.aadhar.data} alt="Aadhar" className="document-image" />
                </div>
              )}
              {data?.uploadedDocuments?.pan && (
                <div className="document-item">
                  <p><strong>PAN Card</strong></p>
                  <img src={data.uploadedDocuments.pan.data} alt="PAN" className="document-image" />
                </div>
              )}
              {data?.uploadedDocuments?.license && (
                <div className="document-item">
                  <p><strong>Driving License</strong></p>
                  <img src={data.uploadedDocuments.license.data} alt="Licence" className="document-image" />
                </div>
              )}
              {data?.uploadedDocuments?.photo && (
                <div className="document-item">
                  <p><strong>Profile Photo</strong></p>
                  <img src={data.uploadedDocuments.photo.data} alt="Profile" className="profile-image" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="button-container">
          <button onClick={handleSubmit} className="submit-button">Submit Data</button>
          <button onClick={handlePrint} className="print-button">Print / Download</button>
        </div>
      </div>
    </>
  );
};

export default ResumeDisplay;
