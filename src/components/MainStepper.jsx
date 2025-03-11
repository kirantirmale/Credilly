import React, { useState } from "react";
import { Stepper, Step, StepLabel, Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import DescriptionIcon from "@mui/icons-material/Description";
import DoneIcon from "@mui/icons-material/Done";
import BookCarStepper from "./BookCarStepper";
import PlansStepper from "./PlansStepper";
import UploadStepper from "./UploadStepper";
import SubmitedataStepper from "./SubmitedataStepper";

const steps = ["Select Car", "Choose Plan", "Upload Documents", "Submit Data"];

const ColorlibStepIcon = ({ active, completed, icon }) => {
  const color = active ? "orange" : completed ? "#3ffffc" : "#a0a0a0"; // Ensure active color is orange

  const getIcon = (icon) => {
    switch (icon) {
      case 1:
        return <LocalCarWashIcon fontSize="inherit" />;
      case 2:
        return <CheckCircleIcon fontSize="inherit" />;
      case 3:
        return <DescriptionIcon fontSize="inherit" />;
      case 4:
        return <DoneIcon fontSize="inherit" />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        color: color, // Dynamic color applied
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px",
      }}
    >
      {getIcon(icon)}
    </div>
  );
};

const MainStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <BookCarStepper handleNext={handleNext} />;
      case 1:
        return <PlansStepper handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <UploadStepper handleNext={handleNext} handleBack={handleBack} />;
      case 3:
        return <SubmitedataStepper />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ color: "white", p: 3 }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => {
          const labelColor = index === activeStep ? "orange" : index < activeStep ? "#3ffffc" : "#a0a0a0";

          return (
            <Step key={index}>
              <StepLabel
                StepIconComponent={(props) => <ColorlibStepIcon {...props} />}
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: labelColor, // Ensure step text matches icon color
                  },
                  "& .Mui-active": {
                    color: "orange !important", // Force active color to orange
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {renderStepContent(activeStep)}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="contained">
          Previous
        </Button>
        <Button disabled={activeStep === steps.length - 1} onClick={handleNext} variant="contained">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default MainStepper;
