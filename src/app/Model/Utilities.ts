export class Guid {
    static newGuid(): Guid {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export class Timer {
    private id: number;
    private callback: any;
    private remaining: number;
    private start: Date;

    constructor(callback: any, delay: number) {
        this.callback = callback;
        this.remaining = delay;
        this.resume();
    }

    public resume(): void {
        this.start = new Date();
        window.clearTimeout(this.id);
        this.id = window.setTimeout(this.callback, this.remaining);
    }

    public pause(): void {
        window.clearTimeout(this.id);
        this.remaining -= new Date().getTime() - this.start.getTime();
    }
}

export function DetermineInputType(input: any): InputType {
    switch (typeof (input)) {
        case 'string':
            let hexColorRegex = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');
            if (hexColorRegex.test(input)) {
                return InputType.COLOR;
            } else {
                return InputType.STRING;
            }
        case 'number':
            return InputType.NUMBER;
        case 'boolean':
            return InputType.BOOLEAN;
        case 'object':
            if (input instanceof Date) {
                return InputType.DATE;
            } else {
                return InputType.STRING;
            }
        default:
            return InputType.STRING;
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

