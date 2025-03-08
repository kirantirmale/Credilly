import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { englishMonths, hijriMonths } from "../data/Calender"; // Same as BookCar file
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { validationSchema } from '../schema/bookCar'

const currentYear = new Date().getFullYear();
export const englishYears = Array.from({ length: 100 }, (_, index) => currentYear - index);
export const hijriYears = Array.from({ length: 100 }, (_, index) => 1446 + index);



const BookFlight = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setValue,
    } = useForm({ resolver: yupResolver(validationSchema) });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [isHijri, setIsHijri] = useState(false);
    const [phone, setPhone] = useState("");
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [incomeSource, setIncomeSource] = useState("salaried"); // Income source state

    const showSalariedFields = incomeSource === "salaried"; // Condition to show salaried fields

    // useEffect(() => {
    //     const savedData = JSON.parse(localStorage.getItem("formData"));
    //     if (savedData) {
    //         setValue("nationalId", savedData.nationalId || "");
    //         setValue("month", savedData.month || "");
    //         setValue("year", savedData.year || "");
    //         setValue("make", savedData.make || "");
    //         setValue("mobile", savedData.mobile || "");
    //         setValue("model", savedData.model || "");
    //         setValue("estimatedAmount", savedData.estimatedAmount || "");
    //         setPhone(savedData.mobile || "");
    //         setIsHijri(savedData.nationalId && savedData.nationalId.startsWith("10"));
    //         setIsTermsAccepted(savedData.termsAccepted || false);
    //         setIncomeSource(savedData.incomeSource || ""); 
    //     }
    // }, [setValue]);

    const handleNationalIdChange = (e) => {
        const id = e.target.value;
        setNationalId(id);
        setIsHijri(id.startsWith("10"));
    };

    const handleTermsChange = () => {
        setIsTermsAccepted((prevState) => !prevState);
    };

    const handleIncomeSourceChange = (e) => { // Handle income source change
        setIncomeSource(e.target.value);
    };

    const onSubmit = async (data) => {
        if (!isTermsAccepted) {
            setResponseMessage("Please accept the terms and conditions.");
            return;
        }

        if (Object.keys(errors).length > 0) {
            setResponseMessage("Please fill out all required fields.");
            return;
        }

        setLoading(true);
        setResponseMessage("");

        try {
            // Save data to localStorage
            localStorage.setItem("formData", JSON.stringify({
                ...data,
                phone,
                termsAccepted: isTermsAccepted,
                incomeSource, // Save income source
            }));

            // Reset form
            reset();

            // Clear the state variables
            setNationalId(""); // Reset National ID
            setPhone(""); // Reset Phone number
            setIsHijri(false); // Reset Hijri flag
            setIsTermsAccepted(false); // Reset terms accepted checkbox
            setIncomeSource(""); // Reset income source state

            setResponseMessage("Your flight estimate has been saved!");
        } catch (error) {
            setResponseMessage("There was an error processing your request. Please try again later.");
        }

        setLoading(false);
    };


    return (
        <section className="user-contact-section">
            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="form-title">Get Flight Estimate</h2>
                    <p className="form-description">Let's plan your next flight. Get an estimate now!</p>

                    <div className="grid-container">
                        {/* National ID */}
                        <div className="input-container">
                            <input
                                {...register("nationalId")}
                                placeholder="National ID / Iqama No"
                                className={`input-field ${errors.nationalId ? "input-error" : ""}`}
                                value={nationalId}
                                onChange={handleNationalIdChange}
                            />
                            {errors.nationalId && <p className="error-message">{errors.nationalId.message}</p>}
                        </div>

                        {/* Month Dropdown */}
                        <div className="input-container">
                            <select {...register("month")} className={`select-field small-dropdown ${errors.month ? "input-error" : ""}`}>
                                <option value="">Month</option>
                                {(isHijri ? hijriMonths : englishMonths).map((month, index) => (
                                    <option key={index} value={month}>{month}</option>
                                ))}
                            </select>
                            {errors.month && <p className="error-message">{errors.month.message}</p>}
                        </div>

                        {/* Year Dropdown */}
                        <div className="input-container">
                            <select {...register("year")} className={`select-field small-dropdown ${errors.year ? "input-error" : ""}`}>
                                <option value="">Year</option>
                                {(isHijri ? hijriYears : englishYears).map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                            {errors.year && <p className="error-message">{errors.year.message}</p>}
                        </div>

                        {/* Make */}
                        <div className="input-container">
                            <input {...register("make")} placeholder="Make" className={`input-field ${errors.make ? "input-error" : ""}`} />
                            {errors.make && <p className="error-message">{errors.make.message}</p>}
                        </div>

                        {/* Phone Input */}
                        <div className="input-container">
                            <Controller
                                name="mobile"
                                control={control}
                                rules={{
                                    required: "Mobile number is required",
                                    pattern: {
                                        value: /^\d{12}$/,
                                        message: "Mobile number must be 12 digits",
                                    },
                                }}
                                render={({ field }) => (
                                    <PhoneInput
                                        country="sa"
                                        value={phone}
                                        onChange={(value) => {
                                            setPhone(value);
                                            field.onChange(value);
                                        }}
                                        inputStyle={{
                                            backgroundColor: '#111827',
                                            color: 'white',
                                            fontSize: '16px',
                                            borderRadius: '8px',
                                            marginRight: '20px',
                                            paddingLeft: '50px',
                                            height: "45px",
                                        }}
                                        dropdownStyle={{
                                            backgroundColor: '#111827',
                                            width: '230px',
                                            marginRight: '20px',
                                        }}

                                    />
                                )}
                            />
                            {errors.mobile && <p className="error-message">{errors.mobile.message}</p>}
                        </div>

                        {/* Model Dropdown */}
                        <div className="input-container">
                            <select {...register("model")} className={`select-field ${errors.model ? "input-error" : ""}`}>
                                <option value="">Model</option>
                                <option value="Airbus A320">Airbus A320</option>
                                <option value="Boeing 737">Boeing 737</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.model && <p className="error-message">{errors.model.message}</p>}
                        </div>

                        {/* Estimated Amount */}
                        <div className="input-container">
                            <select {...register("estimatedAmount")} className={`select-field ${errors.estimatedAmount ? "input-error" : ""}`}>
                                <option value="">Estimated Amount</option>
                                <option value="$100 - $1000">$100 - $1000</option>
                                <option value="$1000 - $5000">$1000 - $5000</option>
                                <option value="$5000 - $10,000">$5000 - $10,000</option>
                                <option value="$10,000+">$10,000+</option>
                            </select>
                            {errors.estimatedAmount && <p className="error-message">{errors.estimatedAmount.message}</p>}
                        </div>
                    </div>

                    <div className="radio-main">
                        <div className="radio-group">
                            <p>Financing Type</p>
                            <input type="radio" value="New Car" id="New Car" name="financingType" {...register("financingType")} />
                            <label htmlFor="New Car">New Car</label>
                            <input type="radio" value="50 / 50 Plan" id="50 / 50 Plan" name="financingType" {...register("financingType")} />
                            <label htmlFor="50 / 50 Plan">50 / 50 Plan</label>
                        </div>

                        <div className="radio-group">
                            <p>Income Source</p>
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
                        </div>
                    </div>

                    {showSalariedFields && (
                        <div className="grid-container">
                            <div className="input-container">
                                <select {...register("bank")} className={`select-field ${errors.bank ? "input-error" : ""}`} aria-describedby={errors.bank ? "bankError" : undefined}>
                                    <option value="">Bank</option>
                                    <option value="Standard Bank">Standard Bank</option>
                                    <option value="Standard Chartered">Standard Chartered</option>
                                    <option value="Barclays">Barclays</option>
                                </select>
                                {errors.bank && <p className="error-message">{errors.bank.message}</p>}
                            </div>
                            {/* Company Name */}
                            <div className="input-container">
                                <input
                                    {...register("companyName")}
                                    placeholder="Company Name"
                                    className={`input-field ${errors.companyName ? "input-error" : ""}`}
                                />
                                {errors.companyName && <p className="error-message">{errors.companyName.message}</p>}
                            </div>

                            <div className="input-container">
                                <input {...register("salary")} placeholder="Monthly Salary" className={`input-field ${errors.salary ? "input-error" : ""}`} />
                                {errors.salary && <p className="error-message">{errors.salary.message}</p>}
                            </div>
                        </div>
                    )}

                    {/* Terms and Submit Button */}
                    <div className="terms-checkbox">
                        <input type="checkbox" id="terms" checked={isTermsAccepted} onChange={handleTermsChange} />
                        <label htmlFor="terms">I accept the terms and conditions</label>
                    </div>


                    <div className="submit-btn">
                        <button type="submit" disabled={loading || !isTermsAccepted}>
                            {loading ? "Sending..." : "Here We Go!"}
                        </button>
                    </div>
                </form>

                {responseMessage && <p className="response-message">{responseMessage}</p>}
            </div>
        </section>
    );
};

export default BookFlight;
