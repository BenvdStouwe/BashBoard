import { NgGridItemConfig } from 'angular2-grid';
import { Setting } from '../Settings/Setting';
import { Guid, Timer } from './Utilities';

export abstract class BashBoardModule implements NgGridItemConfig {
    public static readonly friendlyName: string;
    public refreshRate = 0; // milliseconds, 0 for static content

    public payload: Guid;
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
    public updating: boolean;

    constructor(module?: BashBoardModule) {
        // When modules are loaded from the LocalStorage, they are just objects and not BashBoardModules.
        // They are injected to the BashBoardModule constructor to set values.
        // Subclasses can override the constructor to set extra properties.
        // Payload and classname should NOT be altered
        if (module) {
            this.payload = module.payload;
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

    public canUpdate(): boolean {
        if (this.updating) {
            return false;
        }

        return true;
    }

    public generateNewGuid() {
        this.payload = Guid.newGuid();
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

    public procesSettings(settings: Setting[]) {
        // Override in subclass to proces module specific attributes
        // Do call this one with super.procesSettings in your implementation
        this.needsSetup = false;
        for (let setting of settings) {
            switch (setting.name) {
                case SettingNames.TITLE:
                    this.title = setting.value;
                    break;
                case SettingNames.SUBTITLE:
                    this.subTitle = setting.value;
                    break;
                case SettingNames.BACKGROUNDCOLOR:
                    this.backgroundColor = setting.value;
                    break;
                case SettingNames.TEXTCOLOR:
                    this.textColor = setting.value;
                    break;
            }
        }
    }
}

export enum SettingNames {
    TITLE = 'Titel',
    SUBTITLE = 'Ondertitel',
    BACKGROUNDCOLOR = 'Achtergrondkleur',
    TEXTCOLOR = 'Tekstkleur'
}
