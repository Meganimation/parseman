import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentDataSliceState {
  parsedDataSidebarInfo: string[];
  parsedDataRows: string[];
  parsedDataHeaders: string[] | string;
  hashedParsedData: any;
  parsedSortBool: any;
  ALL_DATA: any;
}

const initialState: CurrentDataSliceState = {
  parsedDataSidebarInfo: [],
  parsedDataRows: [],
  parsedDataHeaders: [],
  parsedSortBool: [],
  hashedParsedData: {},
  ALL_DATA: [],
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

      for (let i = 0; i < 50; i++) {
        const tempArr: any = [];
        const tempArrOfHeaders: any = [];
        const tempSortArr: any  = [];
        const arrayOfLines = action.payload.lines[i].itemBody;
        for (let i = 0; i < arrayOfLines.length; i++) {
          if (!tempHash[arrayOfLines[i].bodyHeader]) {
            tempHash[arrayOfLines[i].bodyHeader] = [];
          }
          tempHash[arrayOfLines[i].bodyHeader] = tempHash[
            arrayOfLines[i].bodyHeader
          ].concat(arrayOfLines[i].bodyValue);
          tempSortArr.push('descending')
          tempArr.push(arrayOfLines[i].bodyValue);
          tempArrOfHeaders.push([arrayOfLines[i].bodyHeader]); 
        }

        arrOfRows = [...arrOfRows, tempArr];
        arrOfHeaders = [tempArrOfHeaders];
        arrOfSortBool = tempSortArr
   

      state.parsedDataRows = arrOfRows;
      state.parsedDataHeaders = Array.from(new Set(arrOfHeaders))[0];
      state.hashedParsedData = tempHash;
      state.parsedSortBool = arrOfSortBool;

      console.log(tempHash, 'temp');
      }
    },
    testSomething: (state, action: PayloadAction<any>) => {
      state.ALL_DATA = action.payload;
      console.log('hey', state.ALL_DATA);

      const tempHash: any = {};

      for (let i = 0; i < 500; i++) {
;
        const arrayOfLines = action.payload.lines[i].itemBody;
        for (let i = 0; i < arrayOfLines.length; i++) {
          if (!tempHash[arrayOfLines[i].bodyHeader]) {
            tempHash[arrayOfLines[i].bodyHeader] = [];
          }
          tempHash[arrayOfLines[i].bodyHeader] = tempHash[
            arrayOfLines[i].bodyHeader
          ].concat(arrayOfLines[i].bodyValue);
        }

   


      console.log(tempHash, 'temp');
      }
      
    },
  },
});

export const { convertToParsed, testSomething } = CurrentDataSlice.actions;

export default CurrentDataSlice.reducer;
