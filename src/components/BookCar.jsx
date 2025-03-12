import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { validationSchema } from '../schema/bookCar';
import { toast, ToastContainer } from "react-toastify";
import OtpInput from "react-otp-input";
import MainStepper from "./MainStepper";
import Select from "react-select";
import { customStyles } from '../styles/bookcar/costomcss';
import { carOptions, aircraftOptions, bankOptions } from '../data/MakeCar';

const BookCar = () => {
  const {
    register,
    handleSubmit,
    trigger,
    watch,

    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema), defaultValues: {
      incomeSource: "salaried", // Setting default value
    },
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [countryCode, setCountryCode] = useState("966");
  const [phoneNumber, setPhoneNumber] = useState("");
  const incomeSource = watch("incomeSource");
  const carPrice = watch("carPrice") || 0;
  const downPayment = watch("downPayment");

  useEffect(() => {
    const financeAmount = Math.max(carPrice - downPayment, 0);
    setValue("financeAmount", financeAmount); // Set computed value
  }, [carPrice, downPayment, setValue]);

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
  };

  const handleTermsChange = () => {
    setIsTermsAccepted((prevState) => !prevState);
  };

  const onSubmit = async (data) => {
    if (!isTermsAccepted) {
      setResponseMessage("Please accept the terms and conditions.");
      return;
    }

    const finalData = {
      ...data,
      phoneNumber,
      countryCode,
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
        localStorage.setItem("bookCarData", JSON.stringify(submittedData));
      }

      setLoading(true);
      setResponseMessage("");
      setIsAuthenticated(true);
      setIsOtpOpen(false);
      setOtp("");

      reset({
        nationalId: "",
        phoneNumber: "",
        countryCode: "966",
        incomeSource: "salaried",
      });

      setNationalId("");
      setPhoneNumber("");
      setCountryCode("966");
      setIsTermsAccepted(false);
      setSubmittedData(null);
    } else {
      toast.error("Invalid OTP. Try again.");
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("bookCarData");
    toast.error("OTP verification canceled. Please try again!", {
      position: "top-right",
      autoClose: 3000,
    });

    setIsOtpOpen(false);
    setOtp("");
    setResponseMessage("");
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

                {/* Date of Birth (DOB) */}
                <div className="input-container">
                  <Controller
                    control={control}
                    name="dob"
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        id="dob"
                        className={`input-field ${errors.dob ? "input-error" : ""}`}
                        onClick={(e) => e.target.showPicker()}
                        placeholder="DD/MM/YYYY"
                        max={new Date().toISOString().split("T")[0]} // Max date is today
                        title="Date of Birth" // Shows field name on hover
                      />
                    )}
                  />
                  {errors.dob && <p className="error-message">{errors.dob.message}</p>}
                </div>

                {/* Phone Input */}
                <div className="input-container">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue="966"
                    rules={{
                      required: "Mobile number is required",
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
                          setValue("phoneNumber", `${code}${cleanedNumber}`, { shouldValidate: true });
                        }}
                        inputStyle={{
                          backgroundColor: "#111827",
                          color: "white",
                          fontSize: "16px",
                          borderRadius: "8px",
                          paddingLeft: "50px",
                          height: "45px",
                          border: "1px solid #4b5563",
                          width:"333px"
                        }}
                        dropdownStyle={{
                          backgroundColor: "#111827",
                        }}
                        containerStyle={{
                          width: "100%",
                        }}
                        buttonStyle={{
                          backgroundColor: "#111827", // Flag area background
                          border: "1px solid #4b5563", // Flag area border
                          borderRadius: "8px 0 0 8px", // Ensures it blends well with the input field
                        }}
                      />
                    )}
                  />
                  {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
                </div>

                {/* Financing Type */}
                <div className="input-container">
                  <select {...register("financingType")} id="financingType" className="select-field">
                    <option value="">Select Financing Type</option>
                    <option value="New Car">New Car</option>
                    <option value="50 / 50 Plan">50 / 50 Plan</option>
                    <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                  </select>
                  {errors.financingType && <p className="error-message">{errors.financingType.message}</p>}
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

                {/* Car Price */}
                <div className="input-container">
                  <input
                    {...register("carPrice", { valueAsNumber: true })}
                    placeholder="Car Price ﷼"
                    className={`input-field ${errors.carPrice ? "input-error" : ""}`}
                    type="number"
                  />
                  {errors.carPrice && <p className="error-message">{errors.carPrice.message}</p>}
                </div>

                {/* Down Payment */}
                <div className="input-container">
                  <input
                    {...register("downPayment", { valueAsNumber: true })}
                    placeholder="Down Payment ﷼"
                    className={`input-field ${errors.downPayment ? "input-error" : ""}`}
                    type="number"
                  />
                  {errors.downPayment && <p className="error-message">{errors.downPayment.message}</p>}
                </div>

                {/* Finance Amount (Auto-calculated) */}
                <div className="input-container">
                  <input
                    {...register("financeAmount")}
                    placeholder="Finance Amount ﷼"
                    className="input-field"
                    type="number"
                    readOnly // Prevent manual editing
                  />
                </div>


                {/* Bank */}
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

                {/* Income Type*/}
                <div className="input-container">
                  <select
                    {...register("incomeSource")}
                    id="incomeSource"
                    className="select-field"
                    defaultValue="salaried"
                    onChange={(e) => setValue("incomeSource", e.target.value, { shouldValidate: true })}
                  >
                    <option value="">Select Income Type</option>
                    <option value="salaried">Salaried</option>
                    <option value="self-employed">Self-Employed</option>
                    <option value="business">Business</option>
                    <option value="retired">Retired</option>
                  </select>
                  {errors.incomeSource && <p className="error-message">{errors.incomeSource.message}</p>}
                </div>

              </div>
              <div>

                {/* Salaried Fields */}
                {incomeSource === "salaried" && (
                  <div className="grid-container">
                    <div className="input-container">
                      <input
                        {...register("salary")}
                        placeholder="Monthly Income (M)"
                        className={`input-field ${errors.salary ? "input-error" : ""}`}
                      />
                      {errors.salary && <p className="error-message">{errors.salary.message}</p>}
                    </div>

                    <div className="input-container">
                      <input
                        {...register("companyName")}
                        placeholder="Employer Name (M)"
                        className={`input-field ${errors.companyName ? "input-error" : ""}`}
                      />
                      {errors.companyName && <p className="error-message">{errors.companyName.message}</p>}
                    </div>

                    <div className="input-container">
                      <input
                        {...register("monthlyExpenses")}
                        placeholder="Monthly Expenses (M)"
                        className={`input-field ${errors.monthlyExpenses ? "input-error" : ""}`}
                      />
                      {errors.monthlyExpenses && <p className="error-message">{errors.monthlyExpenses.message}</p>}
                    </div>
                  </div>

                )}

                {/* Self-Employed / Business Fields */}
                {(incomeSource === "self-employed" || incomeSource === "business") && (
                  <div className="grid-container">
                    <div className="input-container">
                      <input {...register("monthlyIncome")} placeholder="Monthly Income (M)" className="input-field" />
                      {errors.monthlyIncome && <p className="error-message">{errors.monthlyIncome.message}</p>}
                    </div>

                    <div className="input-container">
                      <input {...register("organizationName")} placeholder="Organization Name (NM)" className="input-field" />
                      {errors.organizationName && <p className="error-message">{errors.financeAmount.message}</p>}
                    </div>
                  </div>
                )}

                {/* Retired Fields */}
                {incomeSource === "retired" && (
                  <div className="grid-container">
                    <div className="input-container">
                      <input
                        {...register("monthlyIncome")}
                        placeholder="Monthly Income (M)"
                        className={`input-field ${errors.monthlyIncome ? "input-error" : ""}`}
                      />
                      {errors.monthlyIncome && <p className="error-message">{errors.monthlyIncome.message}</p>}
                    </div>
                  </div>

                )}

              </div>




              {/* Terms and Submit Button */}
              <div className="terms-checkbox">
                <input {...register("terms")} type="checkbox" id="terms" checked={isTermsAccepted} onChange={handleTermsChange} />
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
