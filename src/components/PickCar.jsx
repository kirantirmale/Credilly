import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { validationSchema } from '../schema/bookCar';
import { toast, ToastContainer } from "react-toastify";
import OtpInput from "react-otp-input";
import { FaWhatsapp, FaSms, FaPhoneAlt, FaEdit } from "react-icons/fa";

import Select from "react-select";
import { customStyles } from '../styles/bookcar/costomcss';
import { carOptions, aircraftOptions, bankOptions } from '../data/MakeCar';
import { englishMonths, hijriMonths, englishYears, hijriYears } from "../data/Calender";

const PickCar = ({handleNext }) => {

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
            incomeSource: "salaried",
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
        setIsHijri(id.startsWith("1"));

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
            setIsHijri(false);
            setIsTermsAccepted(false);
            setSubmittedData(null);
            handleNext();

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

    const resendButtonStyle = {
        display: "flex", alignItems: "center", gap: "5px",
        background: "#e0e0e0", border: "none", padding: "8px 12px",
        borderRadius: "5px", cursor: "pointer", fontSize: "0.9rem"
    };


    return (
        <>
            <section className="">
                <ToastContainer />
                <div className="">
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* <h2 className="form-title">Easiest Financing. Let’s apply!</h2> */}

                            <div className="grid-container">

                                {/* National ID */}
                                <div className="input-container">
                                    <label className="lable">National ID / Iqama No</label>
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
                                <div>
                                    <label className="lable">DOB</label>
                                    <div className="dob-container">
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
                                    </div>
                                </div>

                                {/* Phone Input */}
                                <div className="input-container">
                                    <label className="lable">Mobile number</label>

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
                                                    width: "333px"
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
                                    <label className="lable">Financing Type</label>

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
                                    <label className="lable">Make</label>

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
                                    <label className="lable">Model</label>

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
                                    <label className="lable">Car Price</label>

                                    <input
                                        {...register("carPrice", { valueAsNumber: true })}
                                        placeholder="﷼ Car Price"
                                        className={`input-field ${errors.carPrice ? "input-error" : ""}`}
                                        type="text"
                                    />
                                    {errors.carPrice && <p className="error-message">{errors.carPrice.message}</p>}
                                </div>

                                {/* Down Payment */}
                                <div className="input-container">
                                    <label className="lable">Down Payment</label>

                                    <input
                                        {...register("downPayment", { valueAsNumber: true })}
                                        placeholder="﷼ Down Payment "
                                        className={`input-field ${errors.downPayment ? "input-error" : ""}`}
                                        type="text"
                                    />
                                    {errors.downPayment && <p className="error-message">{errors.downPayment.message}</p>}
                                </div>

                                {/* Finance Amount (Auto-calculated) */}
                                <div className="input-container">
                                    <label className="lable">Finance Amount</label>

                                    <input
                                        {...register("financeAmount")}
                                        placeholder="﷼ Finance Amount "
                                        className="input-field"
                                        type="number"
                                        readOnly // Prevent manual editing
                                    />
                                </div>

                                {/* Income Type*/}
                                <div className="input-container">
                                    <label className="lable">Income Type</label>

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

                                {/* Salaried Fields */}
                                {incomeSource === "salaried" && (
                                    <>
                                        <div className="input-container">
                                            <label className="lable">Income / Salary SAR</label>

                                            <input
                                                {...register("salary")}
                                                placeholder="Income / Salary SAR"
                                                className={`input-field ${errors.salary ? "input-error" : ""}`}
                                            />
                                            {errors.salary && <p className="error-message">{errors.salary.message}</p>}
                                        </div>


                                        <div className="input-container">
                                            <label className="lable">Employer Name</label>

                                            <input
                                                {...register("companyName")}
                                                placeholder="Employer Name"
                                                className={`input-field ${errors.companyName ? "input-error" : ""}`}
                                            />
                                            {errors.companyName && <p className="error-message">{errors.companyName.message}</p>}
                                        </div>


                                        <div className="input-container">
                                            <label className="lable">Monthly Expenses</label>

                                            <input
                                                {...register("monthlyExpenses")}
                                                placeholder="Monthly Expenses"
                                                className={`input-field ${errors.monthlyExpenses ? "input-error" : ""}`}
                                            />
                                            {errors.monthlyExpenses && <p className="error-message">{errors.monthlyExpenses.message}</p>}
                                        </div>
                                    </>

                                )}

                                {/* Self-Employed / Business Fields */}
                                {(incomeSource === "self-employed" || incomeSource === "business") && (
                                    <>
                                        <div className="input-container">
                                            <label className="lable">Monthly Income</label>

                                            <input {...register("monthlyIncome")} placeholder="Monthly Income" className="input-field" />
                                            {errors.monthlyIncome && <p className="error-message">{errors.monthlyIncome.message}</p>}
                                        </div>

                                        <div className="input-container">
                                            <label className="lable">Organization Name</label>

                                            <input {...register("organizationName")} placeholder="Organization Name" className="input-field" />
                                            {errors.organizationName && <p className="error-message">{errors.financeAmount.message}</p>}
                                        </div>
                                    </>
                                )}

                                {/* Retired Fields */}
                                {incomeSource === "retired" && (
                                    <>
                                        <div className="input-container">
                                            <label className="lable">Monthly Income</label>

                                            <input
                                                {...register("monthlyIncome")}
                                                placeholder="Monthly Income"
                                                className={`input-field ${errors.monthlyIncome ? "input-error" : ""}`}
                                            />
                                            {errors.monthlyIncome && <p className="error-message">{errors.monthlyIncome.message}</p>}
                                        </div>
                                    </>

                                )}

                                {/* Bank */}
                                <div className="input-container">
                                    <label className="lable">Bank</label>

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
                </div>
                {isOtpOpen && (
                    <div className="otp-modal">
                        <div className="otp-content">
                            <h2 style={{ fontWeight: "bold", fontSize: "1.5rem", color:"black" }}>Verify Mobile Number</h2>

                            {/* OTP Sent Info */}
                            <div className="otp-sent" style={{
                                background: "#f1f5f9", padding: "10px", borderRadius: "8px",
                                display: "flex", alignItems: "center", gap: "8px", margin: "10px 0"
                            }}>
                                <span style={{ background: "#25D366", padding: "5px", borderRadius: "10%" }}>
                                    <FaWhatsapp color="white" />
                                </span>
                                <span className="otp-sent">OTP sent on <strong>Mobile Number  +91-xxx0155</strong></span>
                                <FaEdit style={{ cursor: "pointer", color: "#007bff" }} />
                            </div>
                            <p style={{ marginTop: "15px", fontSize: "0.9rem" }}>Resend via</p>
                            <div className="otp-resend" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                <button style={resendButtonStyle}><FaSms /> SMS</button>
                                <button style={resendButtonStyle}><FaPhoneAlt /> Call</button>
                                <button style={resendButtonStyle}><FaWhatsapp /> WhatsApp</button>
                            </div>
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
                            <p style={{ marginTop: "10px", fontSize: "0.8rem" }}>
                                By logging in, you agree to the following <br />
                                <a href="#" style={{ color: "#007bff", textDecoration: "none" }}>Credit Report Terms of Use</a>,
                                <a href="#" style={{ color: "#007bff", textDecoration: "none" }}> Terms of Use</a> and
                                <a href="#" style={{ color: "#007bff", textDecoration: "none" }}> Privacy Policy</a>
                            </p>
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

export default PickCar
