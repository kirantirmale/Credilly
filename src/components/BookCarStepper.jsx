import React, { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";

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

  useEffect(() => { 
    const storedData = localStorage.getItem("bookCarData");
    if (storedData) {
      setBookCarData(JSON.parse(storedData));
    }
  }, []);

  return (
    <Box sx={{ color: "white", p: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2
        }}
      >
        {Object.keys(bookCarData).map((key) => (
          <TextField
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            variant="standard"
            value={bookCarData[key]}
            fullWidth
            margin="normal"
            InputLabelProps={{ sx: { color: "white", fontSize: "1.6rem" } }} // Increase label font size
            InputProps={{ sx: { color: "white", fontSize: "1.7rem" } }} // Increase input font size
          />
        ))}
      </Box>
    </Box>
  );
};

export default BookCarForm;
