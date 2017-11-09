import { ItemConfig } from "../../Model/ItemConfig";

export class JenkinsModuleConfig extends ItemConfig {
    public apiUrl: string;
    public toonGeslaagdeJobs: boolean;
    public toonActieveJobs: boolean;
    public toonAfgelasteJobs: boolean;
    public toonInstabieleJobs: boolean;
}
