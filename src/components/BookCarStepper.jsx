import React, { useEffect, useState } from "react";
import { TextField, Box, useMediaQuery } from "@mui/material";

const BookCarForm = () => {
  const [bookCarData, setBookCarData] = useState({
    nationalId: "",
    month: "",
    year: "",
    make: "",
    model: "",
    estimatedAmount: "",
    financingType: "",
    incomeSource: "",
    mobile: "",
    salary: "",
    companyName: "",
    bank: ""
  });

  // Load from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("bookCarData");
    if (storedData) setBookCarData(JSON.parse(storedData));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("bookCarData", JSON.stringify(bookCarData));
  }, [bookCarData]);

  // Handle input changes
  const handleChange = (e) => {
    setBookCarData({ ...bookCarData, [e.target.name]: e.target.value });
  };

  // Responsive Grid Layout
  const isXs = useMediaQuery("(max-width:600px)"); // Mobile (1 column)
  const isSm = useMediaQuery("(min-width:600px) and (max-width:960px)"); // Tablet (2 columns)
  const isMd = useMediaQuery("(min-width:960px) and (max-width:1280px)"); // Medium (3 columns)
  const columns = isXs ? 1 : isSm ? 2 : isMd ? 3 : 4;

  return (
    <Box sx={{ color: "white", p: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 2
        }}
      >
        {Object.keys(bookCarData).map((key) => (
          <TextField
            key={key}
            name={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            variant="standard"
            value={bookCarData[key]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ sx: { color: "white", fontSize: "1.4rem" } }}
            InputProps={{ sx: { color: "white", fontSize: "1.5rem" } ,readOnly: true }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BookCarForm;
