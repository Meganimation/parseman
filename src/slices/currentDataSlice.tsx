import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentDataSliceState {
  parsedDataSidebarInfo: string[];
  parsedDataRows: string[];
  parsedDataHeaders: string[] | string;
  hashedParsedData: any;
  parsedSortBool: any;
}

const initialState: CurrentDataSliceState = {
  parsedDataSidebarInfo: [],
  parsedDataRows: [],
  parsedDataHeaders: [],
  parsedSortBool: [],
  hashedParsedData: {},
};

export const CurrentDataSlice = createSlice({
  name: "returnedData",
  initialState,
  reducers: {
    convertToParsed: (state, action: PayloadAction<any>) => {
      let {host, recordId, templateId, timestamp, version} = action.payload
      state.parsedDataSidebarInfo = [host, recordId, templateId, timestamp, version]
      state.parsedDataSidebarInfo = action.payload;
      let arrOfRows: string[] = [];
      let arrOfHeaders: string[] = [];
      let arrOfSortBool: any[] = [];
      const tempHash: any = {};

      action.payload.lines.map((line: any) => {
        const tempArr: any = [];
        const tempArrOfHeaders: any = [];
        const tempSortArr: any  = [];
        const arrayOfLines = line.itemBody;
        for (let i = 0; i < arrayOfLines.length; i++) {
          if (!tempHash[arrayOfLines[i].bodyHeader]) {
            tempHash[arrayOfLines[i].bodyHeader] = [];
          }
          tempHash[arrayOfLines[i].bodyHeader] = tempHash[
            arrayOfLines[i].bodyHeader
          ].concat(arrayOfLines[i].bodyValue);
          tempSortArr.push('descending')
          tempArr.push(arrayOfLines[i].bodyValue);
          tempArrOfHeaders.push([arrayOfLines[i].bodyHeader]); //if I cant figure out a better way to do the sort thing, change this to [arrayOfLines[i].bodyHeader, false]
        }

        arrOfRows = [...arrOfRows, tempArr];
        arrOfHeaders = [tempArrOfHeaders];
        arrOfSortBool = tempSortArr
      });

      state.parsedDataRows = arrOfRows;
      state.parsedDataHeaders = Array.from(new Set(arrOfHeaders))[0];
      state.hashedParsedData = tempHash;
      state.parsedSortBool = arrOfSortBool;
    },
  },
});

export const { convertToParsed } = CurrentDataSlice.actions;

export default CurrentDataSlice.reducer;
