import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    'Stay',
    'Activities',
    'Extras',
    'Transport',
    'Payment'
  ];

  export default function HorizontalLinearAlternativeLabelStepper() {
    return (
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
    );
  }