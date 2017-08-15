export class Setting {
    public name: string;
    public value: any;
    public inputType: InputType;

    constructor(name: string, value: any, inputType?: InputType) {
        this.name = name;
        this.value = value;
        this.inputType = inputType ? inputType : null;
        if (this.inputType == null) {
            this.inputType = this.determineInputType();
        }
    }

    private determineInputType(): InputType {
        switch (typeof(this.value)) {
            case 'string':
                let hexColorRegex = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');
                if (this.name.toLowerCase().indexOf('password') >= 0) {
                    return InputType.password;
                } else if (hexColorRegex.test(this.value)) {
                    return InputType.color;
                } else {
                    return InputType.string;
                }
            case 'number':
                return InputType.number;
            case 'boolean':
                return InputType.boolean;
            case 'object':
                if (this.value instanceof Date) {
                    return InputType.date;
                } else {
                    return InputType.string;
                }
            default:
                return InputType.string;
        }
    }
}

export enum InputType {
    string = 'text',
    password = 'password',
    date = 'datetime-local',
    color = 'color',
    boolean = 'checkbox',
    number = 'number'
}
