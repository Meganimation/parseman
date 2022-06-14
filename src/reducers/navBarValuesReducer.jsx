const navBarValuesReducer = (state, action) => {
    switch (action.type) {
      case "setTailSearch":
        return {
          ...state,
          previousTailSearch: state.tailSearch,
          tailSearch: action.value,
        };
      case "setDateAndTime":
        return {
          ...state,
          selectedStartDateAndTime: action.startDateAndTime,
          selectedEndDateAndTime: action.endDateAndTime,
        };
      case "setTemplatePageAmount":
        return {
          ...state,
          templatePageAmount: (state.templatePageAmount =
            state.templatePageAmount + 10),
        };
      case "setLogtailPageAmount":
        return {
          ...state,
          logtailPageAmount: (state.logtailPageAmount =
            state.logtailPageAmount + 10),
        };
      case "setParsedDataPageAmount":
        return {
          ...state,
          parsedDataPageAmount: action.amountToAdd,
        };
      case "setTemplateVersion":
        return { ...state, templateVersion: action.templateVersion };
      default:
        return state;
    }
  };

  export default navBarValuesReducer;