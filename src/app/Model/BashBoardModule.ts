import { EventEmitter, Input, OnInit } from "@angular/core";

import { Setting } from "../Settings/Setting";
import { ItemConfig } from "./ItemConfig";
import { Guid, InputType, Timer } from "./Utilities";

export abstract class BashBoardModule implements OnInit {
    public readonly friendlyName: string;
    public needsSetup = false; // shows settings when added

    protected refreshRate = 0; // milliseconds, 0 for static content
    protected timer: Timer;
    protected updating: boolean;

    @Input() public config: ItemConfig;
    @Input() public moduleChanged: EventEmitter<boolean> = new EventEmitter();

    ngOnInit(): void {
    }

    abstract updateContent(): void;

    public getConfig(): ItemConfig {
        return this.config;
    }

    public setConfig(config: ItemConfig): void {
        this.config = config;
    }

    public updateSettings(settings: Setting[]): void {
        this.procesSettings(settings);
        this.moduleChanged.emit(true);
    }

    public abstract getSettings(): Setting[];

    public getModuleType(): string {
        return this.config.moduleType;
    }

    public canUpdate(): boolean {
        return !this.updating && this.refreshRate > 0;
    }

    public getId(): Guid {
        return this.config.id;
    }

    public generateNewGuid(): void {
        this.config.id = Guid.newGuid();
    }

    public setTimer(): void {
        if (this.timer) {
            this.timer.restart();
        } else {
            this.timer = new Timer(
                () => this.updateContent(),
                this.refreshRate
            );
        }
    }

    public pauseTimer(): void {
        if (this.timer) {
            this.timer.pause();
        }
    }

    public resumeTimer(): void {
        if (this.timer) {
            this.timer.resume();
        }
    }

    public procesSettings(settings: Setting[]): void {
        // override in subclass to proces module specific attributes
        // do call this one with super.procesSettings in your implementation
        this.needsSetup = false;
        for (const setting of settings) {
            switch (setting.name) {
                case SettingNames.TITLE:
                    if (this.config.title !== setting.value) {
                        this.config.title = setting.value;
                    }
                    break;
                case SettingNames.BACKGROUNDCOLOR:
                    if (this.config.backgroundColor !== setting.value) {
                        this.config.backgroundColor = setting.value;
                    }
                    break;
                case SettingNames.TEXTCOLOR:
                    if (this.config.textColor !== setting.value) {
                        this.config.textColor = setting.value;
                    }
                    break;
            }
        }
    }

    protected getBasicSettings(): Setting[] {
        return [
            new Setting(SettingNames.BACKGROUNDCOLOR, this.config.backgroundColor, InputType.COLOR),
            new Setting(SettingNames.TEXTCOLOR, this.config.textColor, InputType.COLOR)
        ];
    }

    public setModuleType(): void {
        this.config.moduleType = this.constructor.name;
    }
}

export enum SettingNames {
    TITLE = "Titel",
    BACKGROUNDCOLOR = "Achtergrondkleur",
    TEXTCOLOR = "Tekstkleur"
}
