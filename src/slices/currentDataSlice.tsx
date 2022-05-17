import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentDataSliceState {
  parsedDataSidebarInfo: string[];
  parsedDataRows: string[];
  parsedDataHeaders: string[] | string;
  hashedParsedData: any;
  parsedSortBool: any;
  HASHED_DATA: any;
  parsedDataIsLoading: boolean;
  savedParsedData: any;
}

const initialState: CurrentDataSliceState = {
  parsedDataSidebarInfo: [],
  parsedDataRows: [],
  parsedDataHeaders: [],
  parsedSortBool: [],
  hashedParsedData: {},
  parsedDataIsLoading: false, 
  HASHED_DATA: [],
  savedParsedData: [],
};

export const CurrentDataSlice = createSlice({
  name: "returnedData",
  initialState,
  reducers: {
    convertToParsed: (state, action: PayloadAction<any>) => {
      let pageAmount = action.payload[1]
      action.payload = action.payload[0]
      
      let { host, recordId, templateId, timestamp, version } = action.payload;
      state.parsedDataSidebarInfo = [
        host,
        recordId,
        templateId,
        timestamp,
        version,
      ];
      state.parsedDataSidebarInfo = action.payload;
      let arrOfRows: string[] = [];
      let arrOfHeaders: string[] = [];
      let arrOfSortBool: any[] = [];
      const tempHash: any = {};
      state.parsedDataIsLoading = true;
      for (let i = 0; i <= pageAmount; i++) {
        const tempArr: any = [];
        const tempArrOfHeaders: any = [];
        const tempSortArr: any = [];
        const arrayOfLines = action.payload.lines[i].itemBody;
        for (let i = 0; i < arrayOfLines.length; i++) {
          if (!tempHash[arrayOfLines[i].bodyHeader]) {
            tempHash[arrayOfLines[i].bodyHeader] = [];
          }
          tempHash[arrayOfLines[i].bodyHeader] = tempHash[
            arrayOfLines[i].bodyHeader
          ].concat(arrayOfLines[i].bodyValue);
          tempSortArr.push("descending");
          tempArr.push(arrayOfLines[i].bodyValue);
          tempArrOfHeaders.push([arrayOfLines[i].bodyHeader]);
        }

        arrOfRows = [...arrOfRows, tempArr];
        arrOfHeaders = [tempArrOfHeaders];
        arrOfSortBool = tempSortArr;

        state.parsedDataRows = arrOfRows;
        state.parsedDataHeaders = Array.from(new Set(arrOfHeaders))[0];
        state.hashedParsedData = tempHash;
        state.parsedSortBool = arrOfSortBool;
        state.parsedDataIsLoading = false;
      }
    },
    hashedData: (state, action: PayloadAction<any>) => {
      console.log("hey", state.HASHED_DATA);

      const tempHash: any = {};

      for (let i = 0; i < action.payload.lines.length; i++) {
        const arrayOfLines = action.payload.lines[i].itemBody;
        for (let i = 0; i < arrayOfLines.length; i++) {
          if (!tempHash[arrayOfLines[i].bodyHeader]) {
            tempHash[arrayOfLines[i].bodyHeader] = [];
          }
          tempHash[arrayOfLines[i].bodyHeader] = tempHash[
            arrayOfLines[i].bodyHeader
          ].concat(arrayOfLines[i].bodyValue);
        }

        state.HASHED_DATA = tempHash;
      }
    },
    savedParsedData: (state, action: PayloadAction<any>) => {
      state.savedParsedData = action.payload;
      console.log('new saved parsed info', state.savedParsedData)
  }},
});

export const { convertToParsed, hashedData, savedParsedData } = CurrentDataSlice.actions;

export default CurrentDataSlice.reducer;
