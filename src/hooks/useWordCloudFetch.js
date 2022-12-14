import { useEffect, useState } from "react";
import axios from "axios";

import SelectorsHelper, {
  CURRENT_ENVIRONMENT_TYPE,
} from "utils/SelectorsHelper";

import {testLocalData} from "utils/offlineData/wordCloud"

export default function useWordCloudFetch(
  templateVersion,
  selectedStartDate,
  selectedEndDate,
  value,
  pageAmount
) {
  const [loadingWordCloudData, setLoadingWordCloudData] = useState(true);
  const [wordCloudError, setWordCloudError] = useState(false);
  const [wordCloudData, setWordCloudData] = useState([]);
  // const [templateHasMore, setHasMore] = useState(false);

  const URL = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, "wordCloud/nonNumerical");

  let urlWithString = `${URL}/${templateVersion}/${selectedStartDate[0]}&${selectedStartDate[1]}/${selectedEndDate[0]}&${selectedEndDate[1]}?filter=${value}`;
  useEffect(() => {
    setLoadingWordCloudData(true);
    setWordCloudError(false);
    axios
    .get(urlWithString, {
      headers: {"Access-Control-Allow-Origin": "*"}
    })
      .then((res) => {
        setWordCloudData(res.data);
        // setHasMore(res.data.length > 0);
        setLoadingWordCloudData(false);
      })
      .catch((err) => {
        console.log(err);
        if (URL === "OFFLINEwordCloud/nonNumerical") {
          setWordCloudData(testLocalData);
          // setHasMore(testLocalData.length > 0);
          setLoadingWordCloudData(false);
        }
        else {
        setWordCloudError(true);
        }
      });
  }, [urlWithString, URL]);
  return { loadingWordCloudData, wordCloudData, wordCloudError };
}
