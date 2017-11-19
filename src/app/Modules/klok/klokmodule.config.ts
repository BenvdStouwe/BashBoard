import { ItemConfig } from "../../Model/ItemConfig";
import { KlokModuleComponent } from "./klokmodule.component";

export class KlokModuleConfig extends ItemConfig {
    public timeFormat: string;
    public dateFormat: string;

    constructor() {
        super();
        this.backgroundColor = "#0000ff";
        this.textColor = "#ffffff";
        this.timeFormat = "H:mm:ss";
        this.dateFormat = "dddd D MMMM";
        this.sizex = 2;
        this.moduleType = KlokModuleComponent.constructor.name;
    }
}
