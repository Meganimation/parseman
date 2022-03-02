
export enum EnvironmentTypeEnum {
  OFFLINE = "offline",
  LOCAL = "local",
  REMOTE = "remote",
  AWS = "aws",
}

let person = prompt("Type Y to run on AWS, press N to run locally (This is case-sensitive will solve it later)", "Y");

export let CURRENT_ENVIRONMENT_TYPE: string = EnvironmentTypeEnum.AWS;

if (person === "Y") {
  CURRENT_ENVIRONMENT_TYPE = EnvironmentTypeEnum.AWS;
}

if (person === "N") {
  console.log('N')
  CURRENT_ENVIRONMENT_TYPE = EnvironmentTypeEnum.REMOTE;
}


export default class SelectorsHelper {
  static getURL(environmentType: string, service: String) {
    console.log('envType', environmentType)
    let retVal: string = `http://10.12.2.94:8081/${service}`;
    switch (environmentType) {
      case EnvironmentTypeEnum.LOCAL:
        retVal = `http://localhost:8081/${service}`;
        break;
        case EnvironmentTypeEnum.AWS:
        retVal = `http://clickhouseapi.aws.sliceup.co:8082/${service}`;
        break;
        // case EnvironmentTypeEnum.REMOTE:
        // retVal = `http://clickhouseapi.kubedemo.sliceup.co/${service}`
        // break;

            case EnvironmentTypeEnum.REMOTE:
              retVal = `http://10.12.2.242:8081/${service}`
              break;
    }
    return retVal;
  }

}



