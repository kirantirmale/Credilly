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
        <h2 className="resume-title">User Data</h2>

        <div className="resume-content">
          <div className="resume-flex">
            {/* Personal Information Section */}
            <div className="resume-section left">
              <h3 className="resume-heading">Personal Information</h3>
              {data?.bookCarData?.nationalId && <p><strong>National ID:</strong> {data.bookCarData.nationalId}</p>}
              {data?.bookCarData?.dob && <p><strong>Date of Birth:</strong> {data.bookCarData.dob}</p>}
              {data?.bookCarData?.phoneNumber && (
                <p><strong>Phone:</strong> {`${data.bookCarData.countryCode || ""} ${data.bookCarData.phoneNumber}`}</p>
              )}
              {data?.bookCarData?.financingType && <p><strong>Financing Type:</strong> {data.bookCarData.financingType}</p>}
              {data?.bookCarData?.make && <p><strong>Make:</strong> {data.bookCarData.make}</p>}
              {data?.bookCarData?.model && <p><strong>Model:</strong> {data.bookCarData.model}</p>}
              {data?.bookCarData?.carPrice && (
                <p><strong>Car Price:</strong> {parseFloat(data.bookCarData.carPrice).toLocaleString("en-IN")}</p>
              )}
              {data?.bookCarData?.downPayment && (
                <p><strong>Down Payment:</strong> {parseFloat(data.bookCarData.downPayment).toLocaleString("en-IN")}</p>
              )}
              {data?.bookCarData?.financeAmount && (
                <p><strong>Finance Amount:</strong> {parseFloat(data.bookCarData.financeAmount).toLocaleString("en-IN")}</p>
              )}
              {data?.bookCarData?.incomeSource && <p><strong>Income Type:</strong> {data.bookCarData.incomeSource}</p>}
              {data?.bookCarData?.salary && <p><strong>Salary:</strong> {data.bookCarData.salary}</p>}
              {data?.bookCarData?.companyName && <p><strong>Company Name:</strong> {data.bookCarData.companyName}</p>}
              {data?.bookCarData?.organizationName && <p><strong>Organization Name:</strong> {data.bookCarData.organizationName}</p>}
              {data?.bookCarData?.monthlyIncome && <p><strong>Monthly Income:</strong> {data.bookCarData.monthlyIncome}</p>}
              {data?.bookCarData?.monthlyExpenses && <p><strong>Monthly Expenses:</strong> {data.bookCarData.monthlyExpenses}</p>}
              {data?.bookCarData?.bank && <p><strong>Bank:</strong> {data.bookCarData.bank}</p>}
            </div>

            {/* Selected Plan Section */}
            <div className="resume-section ">
              <h3 className="resume-heading">Selected Plan</h3>
              {Object.entries(data?.selectedPlan || {}).map(([key, value]) =>
                key !== "image" && value ? (
                  <p key={key}><strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong> {value}</p>
                ) : null
              )}
              {/* Plan Image (Small Size) */}
              {data?.selectedPlan?.image && (
                <div className="plan-image-container">
                  <p><strong>Plan Image:</strong></p>
                  <img src={data.selectedPlan.image} alt="Selected Plan" className="plan-image" />
                </div>
              )}
            </div>
          </div>

          {/* Uploaded Documents Section */}
          {Object.values(data?.uploadedDocuments || {}).some(doc => doc) && (
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
          )}
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
