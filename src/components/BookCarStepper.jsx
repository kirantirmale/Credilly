import React, { useEffect, useState } from "react";
import { TextField, Box, useMediaQuery } from "@mui/material";

const BookCarForm = () => {
  const [bookCarData, setBookCarData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("bookCarData");
    if (storedData) setBookCarData(JSON.parse(storedData));
  }, []);

  useEffect(() => {
    if (Object.keys(bookCarData).length) {
      localStorage.setItem("bookCarData", JSON.stringify(bookCarData));
    }
  }, [bookCarData]);

  const isXs = useMediaQuery("(max-width:600px)");
  const isSm = useMediaQuery("(min-width:600px) and (max-width:960px)");
  const isMd = useMediaQuery("(min-width:960px) and (max-width:1280px)");
  const columns = isXs ? 1 : isSm ? 2 : isMd ? 3 : 5;

  const labelMapping = {
    nationalId: "National ID",
    phoneNumber: "Mobile Number",
    month: "Month",
    year: "Year",
    financingType: "Financing Type",
    make: "Make",
    model: "Model",
    carPrice: "Car Price",
    downPayment: "Down Payment",
    financeAmount: "Finance Amount",
    bank: "Bank",
    incomeSource: "Income Source",
    companyName: "Company Name",
    salary: "Salary",
    monthlyExpenses: "Monthly Expenses",
  };

  const orderedKeys = Object.keys(labelMapping);

  const allKeys = orderedKeys.concat(
    Object.keys(bookCarData).filter(
      (key) =>
        !orderedKeys.includes(key) &&
        key !== "countryCode" &&
        key !== "terms" && // Exclude "terms"
        bookCarData[key]
    )
  );

  const formatCurrency = (value) => {
    if (!value || isNaN(value)) return value;
    return parseFloat(value).toLocaleString("en-IN");
  };

  return (
    <Box sx={{ color: "white", p: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 2,
        }}
      >
        {/* National ID */}
        {bookCarData.nationalId && (
          <TextField
            name="nationalId"
            label="National ID"
            variant="standard"
            value={bookCarData.nationalId}
            fullWidth
            margin="normal"
            InputLabelProps={{ sx: { color: "white", fontSize: "1.6rem" } }}
            InputProps={{
              sx: { color: "white", fontSize: "1.7rem" },
              readOnly: true,
            }}
          />
        )}

        {/* Mobile Number */}
        {bookCarData.countryCode &&
          bookCarData.phoneNumber &&
          bookCarData.phoneNumber.trim() !== "" && (
            <TextField
              name="contactInfo"
              label="Mobile Number"
              variant="standard"
              value={`+${bookCarData.countryCode} ${bookCarData.phoneNumber}`}
              fullWidth
              margin="normal"
              InputLabelProps={{ sx: { color: "white", fontSize: "1.6rem" } }}
              InputProps={{
                sx: { color: "white", fontSize: "1.7rem" },
                readOnly: true,
              }}
            />
          )}

        {/* Date of Birth (Month-Year) */}
        {bookCarData.month && bookCarData.year && (
          <TextField
            name="dob"
            label="DOB"
            variant="standard"
            value={`${bookCarData.month}-${bookCarData.year}`}
            fullWidth
            margin="normal"
            InputLabelProps={{ sx: { color: "white", fontSize: "1.6rem" } }}
            InputProps={{
              sx: { color: "white", fontSize: "1.7rem" },
              readOnly: true,
            }}
          />
        )}

        {/* Render remaining fields */}
        {allKeys.map(
          (key) =>
            bookCarData[key] &&
            bookCarData[key].toString().trim() !== "" &&
            key !== "nationalId" &&
            key !== "phoneNumber" &&
            key !== "countryCode" &&
            key !== "month" &&
            key !== "year" && (
              <TextField
                key={key}
                name={key}
                label={labelMapping[key] || key.replace(/([A-Z])/g, " $1").trim()}
                variant="standard"
                value={
                  ["salary", "carPrice", "downPayment", "financeAmount"].includes(key)
                    ? formatCurrency(bookCarData[key])
                    : bookCarData[key]
                }
                fullWidth
                margin="normal"
                InputLabelProps={{ sx: { color: "white", fontSize: "1.6rem" } }}
                InputProps={{
                  sx: { color: "white", fontSize: "1.7rem" },
                  readOnly: true,
                }}
              />
            )
        )}
      </Box>
    </Box>
  );
};

export default BookCarForm;
