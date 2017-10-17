import { NgGridItemConfig } from 'angular2-grid';
import { Setting } from '../Settings/Setting';
import { Guid, Timer, InputType } from './Utilities';

export abstract class BashBoardModule implements NgGridItemConfig {
    public readonly friendlyName: string;
    public refreshRate = 0; // milliseconds, 0 for static content

    private id: Guid;

    public className: string; // Needed so objects from LocalStorage can be cast to correct class
    public title?: string;
    public subTitle?: string;
    public col: number;
    public row: number;
    public sizex: number; // # of columns wide
    public sizey: number; // # of rows high
    public defaultWidth = 1; // default for sizex
    public defaultHeight = 1; // default for sizey
    public backgroundColor = '#333333'; // Due to HTML input type color standards, use 6 character hexcolors
    public textColor = '#ffffff'; // Due to HTML input type color standards, use 6 hexcharacter colors
    public needsSetup = false; // Shows settings when added

    protected timer: Timer;
    protected updating: boolean;

    constructor(module?: BashBoardModule) {
        // When modules are loaded from the LocalStorage, they are just objects and not BashBoardModules.
        // They are injected to the BashBoardModule constructor to set values.
        // Subclasses can override the constructor to set extra properties.
        // Payload and classname should NOT be altered
        if (module) {
            this.id = module.id;
            this.className = module.className;
            this.title = module.title;
            this.col = module.col;
            this.row = module.row;
            this.sizex = module.sizex;
            this.sizey = module.sizey;
            this.backgroundColor = module.backgroundColor;
            this.textColor = module.textColor;
            this.needsSetup = false;
        } else {
            this.generateNewGuid();
            this.className = this.constructor.name;
        }
    }

    abstract updateContent(): void;

    abstract getSettings(): Setting[];

    abstract setDefaultSettings(): void;

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
                    if (this.title !== setting.value) {
                        this.title = setting.value;
                    }
                    break;
                case SettingNames.SUBTITLE:
                    if (this.subTitle !== setting.value) {
                        this.subTitle = setting.value;
                    }
                    break;
                case SettingNames.BACKGROUNDCOLOR:
                    if (this.backgroundColor !== setting.value) {
                        this.backgroundColor = setting.value;
                    }
                    break;
                case SettingNames.TEXTCOLOR:
                    if (this.textColor !== setting.value) {
                        this.textColor = setting.value;
                    }
                    break;
            }
        }
    }

    protected getBasicSettings(): Setting[] {
        return [
            new Setting(SettingNames.TITLE, this.title),
            new Setting(SettingNames.BACKGROUNDCOLOR, this.backgroundColor, InputType.COLOR),
            new Setting(SettingNames.TEXTCOLOR, this.textColor, InputType.COLOR)
        ];
    }
}

export enum SettingNames {
    TITLE = 'Titel',
    SUBTITLE = 'Ondertitel',
    BACKGROUNDCOLOR = 'Achtergrondkleur',
    TEXTCOLOR = 'Tekstkleur'
}
