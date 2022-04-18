import { useEffect, useState } from "react";
import axios from "axios";
import SelectorsHelper, {
  CURRENT_ENVIRONMENT_TYPE,
} from "utils/SelectorsHelper";

export default function useLogtailFetch(
  templateVersion,
  selectedStartDate,
  selectedEndDate,
  tailSearch,
  logtailPageAmount,
  newTailSearch
) {
  const [loadingLogtail, setLoadingLogtail] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const URL = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, "logTail");

  let urlWithString = `${URL}/${templateVersion}/${selectedStartDate[0]}&${selectedStartDate[1]}/${selectedEndDate[0]}&${selectedEndDate[1]}?filter=${newTailSearch}&from=${logtailPageAmount}&to=0`;

  useEffect(() => {
    setLoadingLogtail(true);
    setError(false);
    axios
      .get(urlWithString)
      .then((res) => {
        setData(res.data);
        setHasMore(res.data.length > 0);
        setLoadingLogtail(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [urlWithString]);
  return {
    loadingLogtail,
    logtailData: data,
    logtailError: error,
    logtailHasMore: hasMore,
  };
}
