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

  // const handleStartDateChange = (date: Date | null) => {
  //   const dateAsString = (date as Date).toISOString().slice(0, 10);
  //   props.setSelectedStartDate(dateAsString);
  //   props.updateStartEndTimeHandler(dateAsString, props.selectedEndDate, false);
  // };

  // const handleEndDateChange = (date: Date | null) => {
  //   const dateAsString = (date as Date).toISOString().slice(0, 10);
  //   props.setSelectedEndDate(dateAsString);
  //   props.updateStartEndTimeHandler(
  //     props.selectedStartDate,
  //     dateAsString,
  //     false
  //   );
  // };


  // useEffect(() => {
  //   console.log(props.selectedEndDate)
  //   if (props.selectedStartDate && props.selectedStartDate !== "")
  //     setSelectedStartDate(new Date(props.selectedStartDate));
  //   if (props.selectedEndDate && props.selectedEndDate !== "")
  //     setSelectedEndDate(new Date(props.selectedEndDate));
  // }, [props.selectedStartDate, props.selectedEndDate]);

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
