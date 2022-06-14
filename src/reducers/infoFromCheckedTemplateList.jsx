const infoFromCheckedTemplateListReducer = (state, action) => {
  switch (action.type) {
    case "clearAll":
      return {
        previousCheckedTemplateId: state.checkedTemplateId,
        previousCheckedTemplateVersion: state.checkedTemplateVersion,
        previousCheckedTemplateLiteral: state.checkedTemplateLiteral,
        previousTemplateTotalAmount: state.checkedTemplateTotalAmount,
        checkedTemplateId: "",
        checkedTemplateVersion: "",
        checkedTemplateLiteral: "",
        checkedTemplateTotalAmount: "",
      };
    case "setAll":
      return {
        previousCheckedTemplateId: state.checkedTemplateId,
        previousCheckedTemplateVersion: state.checkedTemplateVersion,
        previousCheckedTemplateLiteral: state.checkedTemplateLiteral,
        previousTemplateTotalAmount: state.checkedTemplateTotalAmount,
        checkedTemplateId: action.templateIdValue,
        checkedTemplateVersion: action.templateVersionValue,
        checkedTemplateLiteral: action.templateLiteralValue,
        checkedTemplateTotalAmount: action.templateTotalAmount,
      };
    default:
      return state;
  }
};
export default infoFromCheckedTemplateListReducer;
