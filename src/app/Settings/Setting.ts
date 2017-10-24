import { DetermineInputType, InputType } from "../Model/Utilities";

export class Setting {
    public name: string;
    public value: any;
    public inputType: InputType;

    constructor(name: string, value: any, inputType?: InputType) {
        this.name = name;
        this.value = value;
        this.inputType = inputType;
        if (this.inputType == null) {
            this.inputType = DetermineInputType(this.value);
        }
    }
}
