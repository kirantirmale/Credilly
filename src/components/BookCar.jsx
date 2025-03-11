import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { englishMonths, hijriMonths, englishYears, hijriYears } from "../data/Calender";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { validationSchema } from '../schema/bookCar'
import { toast, ToastContainer } from "react-toastify";
import OtpInput from "react-otp-input";
import MainStepper from "./MainStepper";
import Select from "react-select";
import { customStyles } from '../styles/bookcar/costomcss'
import { carOptions, aircraftOptions, amountOptions, bankOptions } from '../data/MakeCar'

const BookCar = () => {

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(validationSchema) }, {
    defaultValues: {
      make: "Make",
    },
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isHijri, setIsHijri] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [incomeSource, setIncomeSource] = useState("salaried");
  const [submittedData, setSubmittedData] = useState(null);
  const showSalariedFields = incomeSource === "salaried";
  const [countryCode, setCountryCode] = useState("966");
  const [phoneNumber, setPhoneNumber] = useState("");

  console.log("submittedData", submittedData)

  useEffect(() => {
    const storedData = localStorage.getItem("bookCarData");
    if (storedData) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleNationalIdChange = (e) => {
    const id = e.target.value;
    setNationalId(id);
    setValue("nationalId", id);
    trigger("nationalId");
    setIsHijri(id.startsWith("1"));
  };

  const handleTermsChange = () => {
    setIsTermsAccepted((prevState) => !prevState);
  };

  const handleIncomeSourceChange = (e) => {
    setIncomeSource(e.target.value);
  };

  const onSubmit = async (data) => {
    if (!isTermsAccepted) {
      setResponseMessage("Please accept the terms and conditions.");
      return;
    }

    const finalData = {
      ...data,
      phoneNumber,  // Only the number without country code
      countryCode,  // Store separately
    };

    console.log("finalData", finalData);
    setSubmittedData(finalData);
    setIsOtpOpen(true);
  };

  const handleOtpSubmit = () => {
    if (otp === "1234") {
      toast.success("Data submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      if (submittedData) {
        localStorage.setItem("bookCarData", JSON.stringify(submittedData)); // Save correctly formatted data
      }

      setLoading(true);
      setResponseMessage("");
      setIsAuthenticated(true);
      setIsOtpOpen(false);
      setOtp("");

      reset({
        nationalId: "",
        phoneNumber: "",
        countryCode: "966",  // Reset to default
        incomeSource: "salaried",
      });

      setNationalId("");
      setPhoneNumber("");
      setCountryCode("966"); // Reset to default country code
      setIsHijri(false);
      setIsTermsAccepted(false);
      setSubmittedData(null); // Clear submitted data
    } else {
      toast.error("Invalid OTP. Try again.");
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("bookCarData"); // Remove saved data
    toast.error("OTP verification canceled. Please try again!", {
      position: "top-right",
      autoClose: 3000,
    });

    setIsOtpOpen(false); // Close modal
    setOtp(""); // Clear OTP field



    setResponseMessage(""); // Clear response messages
  };

  return (
    <section className="user-contact-section">
      <ToastContainer />
      <div className="form-container">
        {isAuthenticated ? (
          <MainStepper />
        ) : (
          <>

            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="form-title">Easiest Financing. Let’s apply!</h2>

              <div className="grid-container">
                {/* National ID */}
                <div className="input-container">
                  <input
                    {...register("nationalId")}
                    placeholder="National ID / Iqama No"
                    maxLength={10}
                    className={`input-field ${errors.nationalId ? "input-error" : ""}`}
                    value={nationalId}
                    onChange={handleNationalIdChange}
                  />
                  {errors.nationalId && <p className="error-message">{errors.nationalId.message}</p>}
                </div>


                {/* Month Dropdown */}
                <div className="input-container">
                  <Select
                    options={(isHijri ? hijriMonths : englishMonths).map((month) => ({ value: month, label: month }))}
                    placeholder="Select Month"
                    classNamePrefix="react-select"
                    styles={customStyles}
                    isSearchable
                    onChange={(selectedOption) => {
                      setValue("month", selectedOption?.value, { shouldValidate: true }); // Set value & trigger validation
                    }}
                  />
                  {errors.month && <p className="error-message">{errors.month.message}</p>}
                </div>

                {/* Year Dropdown */}
                <div className="input-container">
                  <Select
                    options={(isHijri ? hijriYears : englishYears).map((year) => ({ value: year, label: year }))}
                    placeholder="Select Year"
                    classNamePrefix="react-select"
                    isSearchable
                    styles={customStyles}
                    onChange={
                      (selectedOption) => setValue("year", selectedOption?.value, { shouldValidate: true })
                    }
                  />
                  {errors.year && <p className="error-message">{errors.year.message}</p>}
                </div>


                {/* Make */}

                <div className="input-container">
                  <Controller
                    name="make"
                    control={control}
                    rules={{ required: "Car make is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={carOptions}
                        isSearchable
                        placeholder="Select a car make..."
                        classNamePrefix="react-select"
                        styles={customStyles}
                        value={carOptions.find((option) => option.value === field.value)}
                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                      />
                    )}
                  />
                  {errors.make && <p className="error-message">{errors.make.message}</p>}
                </div>

                {/* Phone Input */}
                <div className="input-container">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue="966"
                    rules={{
                      required: "Mobile number is required",
                      validate: (value) => {
                        if (!value) return "Mobile number is required";

                        const cleanedValue = value.replace(/\D/g, ""); // Remove non-numeric characters
                        const saudiRegex = /^966\d{9}$/;
                        const indiaRegex = /^91\d{10}$/;

                        return saudiRegex.test(cleanedValue) || indiaRegex.test(cleanedValue)
                          ? true
                          : "Enter a valid Saudi (966XXXXXXXXX) or Indian (91XXXXXXXXXX) number";
                      },
                    }}
                    render={({ field }) => (
                      <PhoneInput
                        country={countryCode === "966" ? "sa" : "in"} // Set default country
                        value={phoneNumber ? `${countryCode}${phoneNumber}` : ""}
                        onChange={(value, country) => {
                          const code = country.dialCode;
                          const cleanedNumber = value.replace(/\D/g, "").replace(new RegExp(`^${code}`), ""); // Ensure only numbers

                          setCountryCode(code);
                          setPhoneNumber(cleanedNumber);

                          // Store phone number with country code for validation
                          setValue("phoneNumber", `${code}${cleanedNumber}`, { shouldValidate: true });
                        }}
                        inputStyle={{
                          backgroundColor: "#111827",
                          color: "white",
                          fontSize: "16px",
                          borderRadius: "8px",
                          paddingLeft: "50px",
                          height: "45px",
                        }}
                        dropdownStyle={{
                          backgroundColor: "#111827",
                          width: "230px",
                        }}
                      />
                    )}
                  />
                  {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
                </div>


                {/* Model Dropdown */}
                <div className="input-container">
                  <Controller
                    name="model"
                    control={control}
                    rules={{ required: "Aircraft model is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={aircraftOptions}
                        isSearchable
                        placeholder="Search or select model..."
                        classNamePrefix="react-select"
                        styles={customStyles}
                        value={aircraftOptions.find(option => option.value === field.value)}
                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                      />
                    )}
                  />

                  {errors.model && <p className="error-message">{errors.model.message}</p>}
                </div>

                {/* Estimated Amount */}
                <div className="input-container">
                  <Select
                    options={amountOptions}
                    placeholder="Select Estimated Amount"
                    classNamePrefix="react-select"
                    styles={customStyles}
                    isSearchable
                    onChange={(selectedOption) => setValue("estimatedAmount", selectedOption?.value, { shouldValidate: true })}
                  />
                  {errors.estimatedAmount && <p className="error-message">{errors.estimatedAmount.message}</p>}
                </div>
              </div>

              <div className="radio-main">
                <div className="radio-group">
                  <p>Financing Type :</p>
                  <input type="radio" value="New Car" id="New Car" name="financingType" {...register("financingType")} />
                  <label htmlFor="New Car">New Car</label>
                  <input type="radio" value="50 / 50 Plan" id="50 / 50 Plan" name="financingType" {...register("financingType")} />
                  <label htmlFor="50 / 50 Plan">50 / 50 Plan</label>
                  <input type="radio" value="Certified Pre-Owned" id="Certified Pre-Owned" name="financingType" {...register("financingType")} />
                  <label htmlFor="Certified Pre-Owned">Certified Pre-Owned</label>
                </div>

                <div className="radio-group">
                  <p>Income Source :</p>
                  <input
                    type="radio"
                    value="salaried"
                    id="salaried"
                    name="incomeSource"
                    {...register("incomeSource")}
                    checked={incomeSource === "salaried"}
                    onChange={handleIncomeSourceChange}
                  />
                  <label htmlFor="salaried">Salaried</label>
                  <input
                    type="radio"
                    value="self-employed"
                    id="self-employed"
                    name="incomeSource"
                    {...register("incomeSource")}
                    checked={incomeSource === "self-employed"}
                    onChange={handleIncomeSourceChange}
                  />
                  <label htmlFor="self-employed">Self-Employed</label>

                  <input
                    type="radio"
                    value="business"
                    id="business"
                    name="incomeSource"
                    {...register("incomeSource")}
                    checked={incomeSource === "business"}
                    onChange={handleIncomeSourceChange}
                  />
                  <label htmlFor="business">Business
                  </label>
                  <input
                    type="radio"
                    value="retired"
                    id="retired"
                    name="incomeSource"
                    {...register("incomeSource")}
                    checked={incomeSource === "retired"}
                    onChange={handleIncomeSourceChange}
                  />
                  <label htmlFor="retired">Retired
                  </label>
                </div>
              </div>

              {showSalariedFields && (
                <div className="grid-container">
                  <div className="input-container">
                    <input {...register("salary")} defaultValue={"55002"} placeholder="Income / Salary" className={`input-field ${errors.salary ? "input-error" : ""}`} />
                    {errors.salary && <p className="error-message">{errors.salary.message}</p>}
                  </div>

                  {/* Company Name */}
                  <div className="input-container">
                    <input
                      {...register("companyName")}
                      placeholder="Company Name"
                      defaultValue={"xyz"}
                      className={`input-field ${errors.companyName ? "input-error" : ""}`}
                    />
                    {errors.companyName && <p className="error-message">{errors.companyName.message}</p>}
                  </div>

                  <div className="input-container">
                    <Controller
                      name="bank"
                      control={control}
                      rules={{ required: "Bank selection is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={bankOptions}
                          isSearchable
                          placeholder="Select a bank..."
                          classNamePrefix="react-select"
                          styles={customStyles}
                          value={bankOptions.find((option) => option.value === field.value)}
                          onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                        />
                      )}
                    />
                    {errors.bank && <p className="error-message">{errors.bank.message}</p>}
                  </div>

                </div>
              )}

              {/* Terms and Submit Button */}
              <div className="terms-checkbox">
                <input type="checkbox" id="terms" checked={isTermsAccepted} onChange={handleTermsChange} />
                <label htmlFor="terms">I accept the terms and conditions</label>
              </div>


              <div className="submit-btn">
                <button className="Here" type="submit" disabled={loading || !isTermsAccepted}>
                  {loading ? "Sending..." : "Here We Go!"}
                </button>
              </div>
            </form>

          </>
        )}
      </div>

      {isOtpOpen && (
        <div className="otp-modal">
          <div className="otp-content">
            <h3>Enter OTP</h3>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "5rem",
                    height: "5rem",
                    fontSize: "1.7rem",
                    textAlign: "center",
                    border: "2px solid #ccc",
                    borderRadius: "8px",
                    margin: "0 auto",
                    outline: "none",
                    marginBottom: "25px",
                    marginTop: "25px"
                  }}
                />
              )}
            />
            <div className="otp-actions">
              <button onClick={handleOtpSubmit}>Verify OTP</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookCar;
