import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useMatch } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const steps = [
  'Welcome',
  'Stay',
  'Activities',
  'Transport',
  'Payment'
];

export default function HorizontalLinearAlternativeLabelStepper() {

  let index = Boolean(useMatch('/'))? 0 : -1
  index = Boolean(useMatch('/stay/*'))? 1 : index
  index = Boolean(useMatch('/activities/*'))? 2 : index
  index = Boolean(useMatch('/transport/*'))? 3 : index
  index = Boolean(useMatch('/payment/*'))? 4 : index

  return (
    <Stepper activeStep={index} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}