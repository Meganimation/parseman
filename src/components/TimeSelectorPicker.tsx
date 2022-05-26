import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import styled from "styled-components";

const StyledDateTimePickerWrapper = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  width: 21rem;
  cursor: pointer;
  margin-right: 100px;
`;

const StyledDateTimePicker = styled(DateTimePicker)`
   
    border-radius: 10px;
    background: #1251A2;
    align-items: center;
    display: flex;
    height: 3em;
    &:hover {
      background: #9B6BA9;
 
    }

     * {
      color: white !important;

      width: 10rem;
      height: 1.5rem;
      cursor: pointer;    
      }
    }
  `;

const CalendarWrapper = styled.div`
  background: #1251A2;
  padding: 10px;
  position: relative;
  top: -12px;
  border-radius: 10px;
  margin-left: 30px;

  &:hover {
    background: #9b6ba9;
  }
`;

export default function TimeSelectorPicker(props: ITimeSelectorPickerProps) {
  let localStartValue =
    props.selectedStartDateAndTime[0] + " " + props.selectedStartDateAndTime[1];
  let localEndValue =
    props.selectedEndDateAndTime[0] + " " + props.selectedEndDateAndTime[1];

  return (
    <StyledDateTimePickerWrapper>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {/* <Localization dateAdapter={AdapterDateFns}> */}
        <CalendarWrapper>
          <StyledDateTimePicker
            format="yyyy-MM-dd HH:mm"
            label={<sup> From</sup>}
            value={localStartValue}
            onChange={props.handleStartDateChange}
          />
        </CalendarWrapper>
        <CalendarWrapper>
          <StyledDateTimePicker
            format="yyyy-MM-dd HH:mm"
            label={<sup>To</sup>}
            value={localEndValue}
            onChange={props.handleEndDateChange}
          />
        </CalendarWrapper>
      </MuiPickersUtilsProvider>
    </StyledDateTimePickerWrapper>
  );
}

interface ITimeSelectorPickerProps {
  handleStartDateChange: any;
  handleEndDateChange: any;

  selectedStartDateAndTime: string[];
  selectedEndDateAndTime: string[];
}
