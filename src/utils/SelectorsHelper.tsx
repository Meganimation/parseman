
export enum EnvironmentTypeEnum {
  OFFLINE = "offline",
  LOCAL = "local",
  REMOTE = "remote",
  AWS = "aws",
}

export const CURRENT_ENVIRONMENT_TYPE: string = EnvironmentTypeEnum.REMOTE;

export default class SelectorsHelper {
  static getURL(environmentType: string, service: String) {
    console.log('envType', environmentType)
    let retVal: string = `http://10.12.2.94:8081/${service}`;
    switch (environmentType) {
      case EnvironmentTypeEnum.LOCAL:
        retVal = `http://localhost:8081/${service}`;
        break;
      case EnvironmentTypeEnum.REMOTE:
        retVal = `http://clickhouseapi.aws.sliceup.co:8082/${service}`;
        break;
        case EnvironmentTypeEnum.AWS:
          retVal = `http://10.0.10.30:8081/${service}`;
          break;
    }
    return retVal;
  }

}



