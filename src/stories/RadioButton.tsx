import React from "react";
import { FormControlLabel, Radio } from '@mui/material';

export const RadioButton = ({
  label = "RadioButtonLabel",
  value = "RadioButtonValue",
  checked = false,
  radioButtonColor = "darkBlue",
  labelFontSize = "0.8em",
  onClick = () => {},
}: IRadioButtonProps) => {
  return (
    <>
    <FormControlLabel value={value} checked={checked}  
     control={<Radio 
        disableRipple
        sx={{
        "& svg": {
            width: "0.8em",
            height: "0.8em"
          },
        '&, &.Mui-checked': {
          color: radioButtonColor,
        }}} />} label={<span style={{ fontSize: labelFontSize }}>{label}</span>} onClick={onClick} />
    </>
  );
};

interface IRadioButtonProps {
  label?: string;
  value: string;
  onClick?:any;
  checked: boolean;
  radioButtonColor?: string;
  labelFontSize?: string;
}
