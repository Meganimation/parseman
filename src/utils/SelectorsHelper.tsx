
export const EnvironmentTypeEnum: any = {
  AWS:  process.env.REACT_APP_AWS,
  URL: process.env.REACT_APP_URL
}

//@ts-ignore
export let CURRENT_ENVIRONMENT_TYPE: string = process.env.REACT_APP_SERVER

export default class SelectorsHelper {
  static getURL(environmentType: string, service: string) {
    let retVal: string = process.env.REACT_APP_URL + service
    return retVal;
    }
  }




