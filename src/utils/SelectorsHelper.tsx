
export const EnvironmentTypeEnum: any = {
  REMOTE: process.env.REACT_APP_REMOTE, 
  AWS:  process.env.REACT_APP_AWS,
  URL: process.env.REACT_APP_URL
}




//@ts-ignore
export let CURRENT_ENVIRONMENT_TYPE: string = process.env.REACT_APP_SERVER



console.log(process.env.REACT_APP_SERVER)




export default class SelectorsHelper {
  static getURL(environmentType: string, service: string) {
    console.log('envType', environmentType)
    let retVal: string = process.env.REACT_APP_URL + service


    // switch (process.env.REACT_APP_SERVER) {
    //     case "aws":
    //     retVal = `http://clickhouseapi.aws.sliceup.co:8082/${service}`;
    //     break;
    //     case "kubedemo":
    //     case EnvironmentTypeEnum.REMOTE:
    //     retVal = `http://clickhouseapi.kubedemo.sliceup.co/${service}`
    //     break;
    //     case "remote":
    //           retVal = `http://10.12.2.242:8081/${service}`
    //           break;
    return retVal;
    }

  }





