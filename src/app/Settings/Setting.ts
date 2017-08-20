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
                    return InputType.PASSWORD;
                } else if (hexColorRegex.test(this.value)) {
                    return InputType.COLOR;
                } else {
                    return InputType.STRING;
                }
            case 'number':
                return InputType.NUMBER;
            case 'boolean':
                return InputType.BOOLEAN;
            case 'object':
                if (this.value instanceof Date) {
                    return InputType.DATE;
                } else {
                    return InputType.STRING;
                }
            default:
                return InputType.STRING;
        }
    }
}

export enum InputType {
    STRING = 'text',
    PASSWORD = 'password',
    DATE = 'datetime-local',
    COLOR = 'color',
    BOOLEAN = 'checkbox',
    NUMBER = 'number'
}
