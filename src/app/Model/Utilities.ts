export class Guid {
    static newGuid(): Guid {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c: string): string {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export class Timer {
    private readonly timeout: number; // milliseconds
    private id: number;
    private callback: Function;
    private start: Date = null;

    public constructor(callback: Function, timeout: number) {
        this.callback = callback;
        this.timeout = timeout;
        this.resume();
    }

    public resume(): void {
        const remainingTime = this.start ? this.timeout - (new Date().getTime() - this.start.getTime()) : this.timeout;
        this.start = this.start ? this.start : new Date();
        this.id = setTimeout(this.callback, Math.max(remainingTime, 0));
    }

    public pause(): void {
        clearTimeout(this.id);
    }

    public restart(): void {
        this.pause();
        this.start = null;
        this.resume();
    }
}

export function DetermineInputType(input: any): InputType {
    switch (typeof (input)) {
        case "string":
            const hexColorRegex = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
            if (hexColorRegex.test(input)) {
                return InputType.COLOR;
            } else {
                return InputType.STRING;
            }
        case "number":
            return InputType.NUMBER;
        case "boolean":
            return InputType.BOOLEAN;
        case "object":
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
    STRING = "text",
    PASSWORD = "password",
    DATE = "datetime-local",
    COLOR = "color",
    BOOLEAN = "checkbox",
    NUMBER = "number"
}

