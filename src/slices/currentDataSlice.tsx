import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentDataSliceState {
  value: number;
  parsedData: any;
  logTailData: any[];
  wordCloudData: any[];
  templateListData: any[];
}

const initialState: CurrentDataSliceState = {
  value: 0,
  parsedData: [],
  logTailData: [],
  wordCloudData: [],
  templateListData: []
};



export const CurrentDataSlice = createSlice({
  name: "returnedData",
  initialState,
  reducers: {
    convertToParsed: (state, action: PayloadAction<string[]>) => {
      console.log(action.payload);
      state.parsedData = action.payload;
    },
    convertToLogged: (state, action: PayloadAction<string[]>) => {
      state.logTailData = action.payload;
    },
    convertToWordCloud:  (state, action: PayloadAction<string[]>) => {
      state.wordCloudData = action.payload;
    },
    convertToTemplateList:  (state, action: PayloadAction<string[]>) => {
      state.templateListData = action.payload;
    },
  },
});


export const { convertToParsed, convertToLogged, convertToWordCloud, convertToTemplateList } =
  CurrentDataSlice.actions;

export default CurrentDataSlice.reducer;