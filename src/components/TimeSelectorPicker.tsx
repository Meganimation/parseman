import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import styled from "styled-components";
import {colors} from "utils/theme/colors"

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
    background: ${colors.vividBlue};
    align-items: center;
    display: flex;
    height: 3em;
    &:hover {
      background: ${colors.pinkPurple};
 
    }

     * {
      color: ${colors.white} !important;

      width: 10rem;
      height: 1.5rem;
      cursor: pointer;    
      }
    }
  `;

const CalendarWrapper = styled.div`
  background: ${colors.vividBlue};
  padding: 10px;
  position: relative;
  top: -12px;
  border-radius: 10px;
  margin-left: 30px;

  &:hover {
    background: ${colors.pinkPurple};
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
