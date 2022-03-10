import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentDataSliceState {
  parsedData: any;
  newParsedData: any;
  newParsedHeaders: any;
  hashedParsedData: any;
}

const initialState: CurrentDataSliceState = {
  parsedData: [],
  newParsedData: [],
  newParsedHeaders: [],
  hashedParsedData: {},
};

export const CurrentDataSlice = createSlice({
  name: "returnedData",
  initialState,
  reducers: {
    convertToParsed: (state, action: PayloadAction<any>) => {
 
      state.parsedData = action.payload;
      let arrOfRows: any = [];
      let arrOfHeaders: any = [];
      const tempHash: any = {};

      action.payload.lines.map((line: any) => {
        const tempArr: any = [];
        const tempArrOfHeaders: any = [];
        const arrayOfLines = line.itemBody;
        for (let i = 0; i < arrayOfLines.length; i++) {
          if (!tempHash[arrayOfLines[i].bodyHeader]) {
            tempHash[arrayOfLines[i].bodyHeader] = [];
          }
          tempHash[arrayOfLines[i].bodyHeader] = tempHash[
            arrayOfLines[i].bodyHeader
          ].concat(arrayOfLines[i].bodyValue);

          tempArr.push(arrayOfLines[i].bodyValue);
          tempArrOfHeaders.push([arrayOfLines[i].bodyHeader]); //if I cant figure out a better way to do the sort thing, change this to [arrayOfLines[i].bodyHeader, false]
        }

        arrOfRows = [...arrOfRows, tempArr];
        arrOfHeaders = [tempArrOfHeaders];
      });

      state.newParsedData = arrOfRows;
      state.newParsedHeaders = Array.from(new Set(arrOfHeaders))[0];
      state.hashedParsedData = tempHash;
    },
  },
});

export const { convertToParsed } = CurrentDataSlice.actions;

export default CurrentDataSlice.reducer;
