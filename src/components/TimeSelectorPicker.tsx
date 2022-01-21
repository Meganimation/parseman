import React, { Dispatch, SetStateAction, useEffect } from "react";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import styled from 'styled-components'




  const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
    all: unset;
    width: 30%;
    position: relative;
    top: -12px;
    background: white;
    border-radius: 10px;


     * {
      color: #47115C;
      }
    }
  `

  const ExternalLabel = styled.label`
  padding-right: 10px;
  padding-left: 10px;
  `

export default function TimeSelectorPicker(props: ITimeSelectorPickerProps) {


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>


<Grid container >

            <ExternalLabel>from</ExternalLabel><StyledKeyboardDatePicker
       
   
              format="MM/dd/yy"
              value={props.selectedStartDate}
              onChange={props.handleStartDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
 
 
   
 <ExternalLabel>to</ExternalLabel><StyledKeyboardDatePicker
              format="MM/dd/yy"
              value={props.selectedEndDate}
              onChange={props.handleEndDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
   
          </Grid>


    </MuiPickersUtilsProvider>
  );
}

interface ITimeSelectorPickerProps {

  selectedStartDate: string;
  setSelectedStartDate: Dispatch<SetStateAction<string>>;
  selectedEndDate: string;
  setSelectedEndDate: Dispatch<SetStateAction<string>>;

  handleStartDateChange: any;
  handleEndDateChange: any;
}
