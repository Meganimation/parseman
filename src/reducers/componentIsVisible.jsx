const componentIsVisibleReducer = (state , action) => {
    switch (action.type) {
      case "toggleLogtailVisibility":
        console.log('this needs to be toggled', action.visible, action.type)
        return { ...state, logtailIsVisible: action.visible};
      case "toggleTemplateVisibility":
        return { ...state, templateIsVisible: action.visible };
      case "toggleWordCloudVisibility":
        return { ...state, wordCloudIsVisible: action.visible };
      case "toggleParsedDataTableSideVisibility":
        return {
          ...state,
          parsedSideInfoIsVisible: action.visible
        };
      case "toggleParsedDataTableVisibility":
        return {
          ...state,
          parsedDataIsVisible: action.visible
        };
      case "toggleParsedDataModalVisbility":
        return {
          ...state,
          savedParsedDataModal: action.visible
        };
      case "toggleModalVisibility":
        return {
          ...state,
          modal: action.visible
        };
      default:
        return state;
    }
  };

  export default componentIsVisibleReducer;