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

const ColorlibStepIcon = (props) => {
  const { active, completed, icon } = props;

  const getIcon = (icon) => {
    switch (icon) {
      case 1:
        return <LocalCarWashIcon fontSize="large" />;
      case 2:
        return <CheckCircleIcon fontSize="large" />;
      case 3:
        return <DescriptionIcon fontSize="large" />;
      case 4:
        return <DoneIcon fontSize="large" />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        color: active ? "orange" : completed ? "green" : "gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        return  <SubmitedataStepper/>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ color: "white", p: 3 }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              sx={{ "& .MuiStepLabel-label": { color: "white" } }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStepContent(activeStep)}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="contained"
        >
          Previous
        </Button>
        <Button
          disabled={activeStep === steps.length - 1}
          onClick={handleNext}
          variant="contained"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default MainStepper;
