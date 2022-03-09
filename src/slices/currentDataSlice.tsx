import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentDataSliceState {
  parsedData: any;
  newParsedData: any;
  newParsedHeaders: any;
}

const initialState: CurrentDataSliceState = {
  parsedData: [],
  newParsedData: [],
  newParsedHeaders: []
};



export const CurrentDataSlice = createSlice({
  name: "returnedData",
  initialState,
  reducers: {
    convertToParsed: (state, action: PayloadAction<any>) => {
      state.parsedData = action.payload
      let arr: any = []
      let arrOfHeaders: any = []

      action.payload.lines.map((line: any) => {
        let tempArr: any = []
        let tempArrOfHeaders: any = []
        let arrayOfLines = line.itemBody
        for (let i = 0; i < arrayOfLines.length; i++) {
          tempArr.push(arrayOfLines[i].bodyValue)
          tempArrOfHeaders.push(arrayOfLines[i].bodyHeader)

        }

        arr = [...arr, tempArr]
        arrOfHeaders = [tempArrOfHeaders]

      })

      
      state.newParsedData = arr
      // state.newParsedHeaders = new Set(arrOfHeaders)
      state.newParsedHeaders =Array.from(new Set(arrOfHeaders))[0];

      console.log('done, this is the newParsed', state.newParsedData)
      console.log('done, this is the headers', state.newParsedHeaders)
    }
  },
});


export const { convertToParsed } =
  CurrentDataSlice.actions;

export default CurrentDataSlice.reducer;