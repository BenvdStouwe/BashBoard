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
    private readonly timeout: number;
    private id: number;
    private callback: Function;
    private remainingTime: number;
    private startDate: Date;
    private pauseDate: Date;

    constructor(callback: Function, timeout: number) {
        this.callback = callback;
        this.timeout = timeout;
        this.remainingTime = timeout;
        this.resume();
    }

    public resume(): void {
        this.startDate = new Date();
        clearTimeout(this.id);
        if (this.pauseDate) {
            let elapsedTime = this.startDate.getTime() - this.pauseDate.getTime();
            this.pauseDate = null;
            if (elapsedTime > this.remainingTime) {
                this.callback();
                return;
            } else {
                this.remainingTime -= elapsedTime;
            }
        }
        this.id = setTimeout(this.callback, this.remainingTime);
    }

    public pause(): void {
        clearTimeout(this.id);
        this.remainingTime -= new Date().getTime() - this.startDate.getTime();
        this.pauseDate = new Date();
    }

    public restart(): void {
        this.pauseDate = null;
        this.remainingTime = this.timeout;
        this.resume();
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

