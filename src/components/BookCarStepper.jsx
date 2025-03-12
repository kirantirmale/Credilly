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
  const columns = isXs ? 1 : isSm ? 2 : isMd ? 3 : 4;

  const orderedKeys = [
    "nationalId",
    "dob",
    "financingType",
    "make",
    "model",
    "carPrice",
    "downPayment",
    "financeAmount",
    "bank",
    "incomeSource",
    "companyName",
    "salary",
    "monthlyExpenses",
    "terms",
  ];

  // Merge ordered keys and additional keys, excluding empty fields
  const allKeys = orderedKeys.concat(
    Object.keys(bookCarData).filter(
      (key) =>
        !orderedKeys.includes(key) &&
        key !== "countryCode" &&
        key !== "phoneNumber" &&
        bookCarData[key] // Exclude empty/null values
    )
  );

  // Function to format the date to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid date
    return date.toLocaleDateString("en-GB"); // DD/MM/YYYY format
  };

  // Function to format currency with commas
  const formatCurrency = (value) => {
    if (!value || isNaN(value)) return value;
    return parseFloat(value).toLocaleString("en-IN"); // Uses Indian Number System
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
      

        {/* Render Mobile Number only if available */}
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
              InputLabelProps={{ sx: { color: "white", fontSize: "1.4rem" } }}
              InputProps={{
                sx: { color: "white", fontSize: "1.5rem" },
                readOnly: true,
              }}
            />
          )}

        {/* Render remaining fields, excluding empty ones */}
        {allKeys.map(
          (key) =>
            bookCarData[key] &&
            bookCarData[key].toString().trim() !== "" && (
              <TextField
                key={key}
                name={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                variant="standard"
                value={
                  ["salary", "carPrice", "downPayment", "financeAmount"].includes(key)
                    ? formatCurrency(bookCarData[key])
                    : bookCarData[key]
                }
                fullWidth
                margin="normal"
                InputLabelProps={{ sx: { color: "white", fontSize: "1.4rem" } }}
                InputProps={{
                  sx: { color: "white", fontSize: "1.5rem" },
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
