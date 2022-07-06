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
  error: boolean;
}

const initialState: CurrentDataSliceState = {
  parsedDataSidebarInfo: [],
  parsedDataRows: [],
  parsedDataHeaders: [],
  parsedSortBool: [],
  hashedParsedData: {},
  parsedDataIsLoading: false,
  HASHED_DATA: [],
  error: false,
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
      let amountToIterateThrough = Math.min(pageAmount, action.payload.lines.length - 1)
      for (let i = 0; (i <= amountToIterateThrough); i++) {
        const tempArr: any = [];
        const tempArrOfHeaders: any = [];
        const tempSortArr: any = [];

        if (action.payload.lines[i].itemBody === undefined) {
          console.log('item body doesnt exist, somehow an error occurred')
          state.error = true;
          break
        }

        const arrayOfLines = action.payload.lines[i].itemBody;
        for (let j = 0; j < arrayOfLines.length; j++) {
          if (!tempHash[arrayOfLines[j].bodyHeader]) {
            tempHash[arrayOfLines[j].bodyHeader] = [];
          }
          tempHash[arrayOfLines[j].bodyHeader] = tempHash[
            arrayOfLines[j].bodyHeader
          ].concat(arrayOfLines[j].bodyValue);
          tempSortArr.push("descending");
          tempArr.push(arrayOfLines[j].bodyValue);
          tempArrOfHeaders.push([arrayOfLines[j].bodyHeader]);
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
    saveToParsedData: (state, action: PayloadAction<any>) => {
      state.savedParsedData = [...state.savedParsedData, action.payload];
    },
    clearData: (state, action: PayloadAction<any>) => {
      state.parsedDataSidebarInfo = [];
        state.parsedDataRows = [];
        state.parsedDataHeaders = [];
        state.parsedSortBool = [];
        state.hashedParsedData = {};
        state.parsedDataIsLoading = true;
        state.HASHED_DATA = [];
        state.error = false
    },
  },
});

export const { convertToParsed, hashedData, saveToParsedData, clearData } = CurrentDataSlice.actions;

export default CurrentDataSlice.reducer;