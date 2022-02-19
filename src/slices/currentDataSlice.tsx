import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentDataSliceState {
  parsedData: any;
  wordCloudData: any[];
}

const initialState: CurrentDataSliceState = {
  parsedData: [],
  wordCloudData: [],
};



export const CurrentDataSlice = createSlice({
  name: "returnedData",
  initialState,
  reducers: {
    convertToParsed: (state, action: PayloadAction<string[]>) => {
      console.log(action.payload);
      state.parsedData = action.payload;
    },
    convertToWordCloud:  (state, action: PayloadAction<string[]>) => {
      state.wordCloudData = action.payload;
    },
  },
});


export const { convertToParsed, convertToWordCloud } =
  CurrentDataSlice.actions;

export default CurrentDataSlice.reducer;