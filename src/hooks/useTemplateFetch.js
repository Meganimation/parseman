import {useEffect, useState} from 'react'
import axios from 'axios'

import SelectorsHelper, {
    CURRENT_ENVIRONMENT_TYPE,
  } from "utils/SelectorsHelper";


export default function useTemplateFetch(templateVersion, selectedStartDate, selectedEndDate, value, pageAmount) {

    const [loadingTemplateData, setLoadingTemplateData] = useState(true);
    const [templateError, setError] = useState(false);
    const [templateData, setData] = useState([]);
    const [templateHasMore, setHasMore] = useState(false);

    const URL= SelectorsHelper.getURL(
        CURRENT_ENVIRONMENT_TYPE,
        "templateList"
      );

      let urlWithString = `${URL}/${templateVersion}/${selectedStartDate[0]}&${selectedStartDate[1]}/${selectedEndDate[0]}&${selectedEndDate[1]}?filter=${value}&from=${pageAmount}&to=0`;

        useEffect(() => {
            setLoadingTemplateData(true)
            setError(false)
            axios.get(urlWithString)
            .then(res => {
                setData(res.data)
                setHasMore(res.data.length > 0)
                setLoadingTemplateData(false)
            }).catch(err => {
                console.log(err);
                setError(true)
            })
        }, [urlWithString]);
        return {loadingTemplateData, 
            templateData,
            templateError, 
            templateHasMore};

}