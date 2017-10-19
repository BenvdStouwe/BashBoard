import { EventEmitter, Input } from '@angular/core';

import { Setting } from '../Settings/Setting';
import { ItemConfig } from './ItemConfig';
import { Guid, InputType, Timer } from './Utilities';

export abstract class BashBoardModule {
    public readonly friendlyName: string;
    public refreshRate = 0; // milliseconds, 0 for static content
    public needsSetup = false; // Shows settings when added

    private id: Guid;
    protected config: ItemConfig;
    protected timer: Timer;
    protected updating: boolean;

    @Input() public moduleChanged: EventEmitter<boolean> = new EventEmitter();

    constructor(config?: ItemConfig) {
        // When modules are loaded from the LocalStorage, they are just objects and not BashBoardModules.
        // They are injected to the BashBoardModule constructor to set values.
        // Subclasses can override the constructor to set extra properties.
        // Payload and classname should NOT be altered
        if (config) {
            this.config.id = config.id;
            this.config.moduleType = config.moduleType;
            this.config.title = config.title;
            this.config.col = config.col;
            this.config.row = config.row;
            this.config.sizex = config.sizex;
            this.config.sizey = config.sizey;
            this.config.backgroundColor = config.backgroundColor;
            this.config.textColor = config.textColor;
            this.needsSetup = false;
        } else {
            this.generateNewGuid();
            this.config.moduleType = this.constructor.name;
        }
    }

    abstract updateContent(): void;

    public getConfig(): ItemConfig {
        return this.config;
    }

    public updateSettings(settings: Setting[]) {
        this.procesSettings(settings);
        this.moduleChanged.emit(true);
    }

    abstract getSettings(): Setting[];

    public abstract setDefaultSettings(): void;

    public getModuleType(): string {
        return this.config.moduleType;
    }

    public canUpdate(): boolean {
        return !this.updating;
    }

    public getId(): Guid {
        return this.id;
    }

    public generateNewGuid(): void {
        this.id = Guid.newGuid();
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
        // Override in subclass to proces module specific attributes
        // Do call this one with super.procesSettings in your implementation
        this.needsSetup = false;
        for (let setting of settings) {
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
            new Setting(SettingNames.TITLE, this.config.title),
            new Setting(SettingNames.BACKGROUNDCOLOR, this.config.backgroundColor, InputType.COLOR),
            new Setting(SettingNames.TEXTCOLOR, this.config.textColor, InputType.COLOR)
        ];
    }
}

export enum SettingNames {
    TITLE = 'Titel',
    BACKGROUNDCOLOR = 'Achtergrondkleur',
    TEXTCOLOR = 'Tekstkleur'
}
