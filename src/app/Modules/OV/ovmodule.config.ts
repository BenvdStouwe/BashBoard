import { ItemConfig } from "../../Model/ItemConfig";

export class OVModuleConfig extends ItemConfig {
    public station: string;
    public showTimes: Boolean;
    public showWarnings: Boolean;
    public username: string;
}

export enum OVStorageNames {
    NSAUTHENTICATION = "nsAuthenticatie"
}
