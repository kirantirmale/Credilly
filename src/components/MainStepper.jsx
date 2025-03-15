import React, { useState, useEffect } from "react";
import { Stepper, Step, StepLabel, Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import DescriptionIcon from "@mui/icons-material/Description";
import DoneIcon from "@mui/icons-material/Done";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled"; 
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookCarStepper from "./BookCarStepper";
import PlansStepper from "./PlansStepper";
import UploadStepper from "./UploadStepper";
import SubmitedataStepper from "./SubmitedataStepper";
import PickCar from "./PickCar";

const steps = ["Book Car", "Select Car", "Choose Plan", "Upload Documents", "Pick your Car"];

const ColorlibStepIcon = ({ active, completed, icon }) => {
  const color = active ? "orange" : completed ? "#3ffffc" : "#a0a0a0";

  const getIcon = (icon) => {
    switch (icon) {
      case 0:
        return <DirectionsCarIcon fontSize="inherit" />;
      case 1:
        return <AssignmentIcon fontSize="inherit" />;
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
        color: color,
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
  const [hasBookCarData, setHasBookCarData] = useState(false);

  // Function to check localStorage and update state
  const checkLocalStorage = () => {
    const bookCarData = localStorage.getItem("bookCarData");
    setHasBookCarData(!!bookCarData); // Convert to boolean
  };

  // Check localStorage on mount
  useEffect(() => {
    checkLocalStorage();
  }, []);

  // Handle Next button click
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    checkLocalStorage(); // Fetch local storage data
  };

  // Handle Previous button click
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    checkLocalStorage(); // Fetch local storage data
  };

  // Render step content based on active step
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <PickCar handleNext={handleNext} />;
      case 1:
        return <BookCarStepper handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <PlansStepper handleNext={handleNext} handleBack={handleBack} />;
      case 3:
        return <UploadStepper handleNext={handleNext} handleBack={handleBack} />;
      case 4:
        return <SubmitedataStepper />;
      default:
        return null;
    }
  };

  return (
    <>
      <section className="user-contact-section">
        <div className="form-container">
          <Box sx={{ color: "white", p: 3 }}>
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map((label, index) => {
                const labelColor = index === activeStep ? "orange" : index < activeStep ? "#3ffffc" : "#a0a0a0";

                return (
                  <Step key={index}>
                    <StepLabel
                      StepIconComponent={(props) => <ColorlibStepIcon {...props} icon={index} />}
                      sx={{
                        "& .MuiStepLabel-label": {
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          color: labelColor,
                        },
                        "& .Mui-active": {
                          color: "orange !important",
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

            {/* Show buttons if bookCarData exists, else hide on step 0 */}
            {(hasBookCarData || activeStep !== 0) && (
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" color="inherit">
                  Previous
                </Button>
                <Button disabled={activeStep === steps.length - 1} onClick={handleNext} color="inherit" variant="outlined">
                  Next
                </Button>
              </Box>
            )}
          </Box>
        </div>
      </section>
    </>
  );
};

export default MainStepper;
