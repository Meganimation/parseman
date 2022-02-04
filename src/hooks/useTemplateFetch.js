import {useEffect, useState} from 'react'
import axios from 'axios'
import {
    convertToTemplateList,
  } from "slices/currentDataSlice";

import { useDispatch, useSelector } from "react-redux"; 

import SelectorsHelper, {
    CURRENT_ENVIRONMENT_TYPE,
  } from "utils/SelectorsHelper";


export default function useTemplateFetch(templateVersion, selectedStartDate, selectedStartTime, selectedEndDate, selectedEndTime, value, pageAmount) {

    const [loadingTemplateData, setLoadingTemplateData] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const dispatch = useDispatch();

    const URL= SelectorsHelper.getURL(
        CURRENT_ENVIRONMENT_TYPE,
        "templateList"
      );

      let urlWithString = `${URL}/${templateVersion}/${selectedStartDate}&${selectedStartTime}:00/${selectedEndDate}&${selectedEndTime}:00?filter=${value}&from=${pageAmount}&to=0`;

        useEffect(() => {
            setLoadingTemplateData(true)
            setError(false)
            axios.get(urlWithString)
            .then(res => {
                setData(res.data)
                setHasMore(res.data.length > 0)
                setLoadingTemplateData(false)
                console.log('I AM DATA', res.data);
                // dispatch(convertToTemplateList(res.data));
            }).catch(err => {
                console.log(err);
                setError(true)
            })
        }, [urlWithString, dispatch]);
        return {loadingTemplateData, 
            testData: data,
            error, 
             hasMore};

}