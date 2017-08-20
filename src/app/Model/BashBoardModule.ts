import { NgGridItemConfig } from 'angular2-grid';
import { Setting } from '../Settings/Setting';
import { Guid } from './Utilities';

export abstract class BashBoardModule implements NgGridItemConfig {
    public payload: Guid;
    public className: string; // Needed so objects from LocalStorage can be cast to correct class
    public title: string;
    public col: number;
    public row: number;
    public sizex: number; // # of columns wide
    public sizey: number; // # of rows high
    public subTitle?: string;
    public defaultWidth = 1; // default for sizex
    public defaultHeight = 1; // default for sizey
    public backgroundColor = '#333';
    public textColor: string;
    public refreshRate: number; // seconds, 0 for static content
    public needsSetup = false; // Shows settings when added

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
        } else {
            this.generateNewGuid();
            this.className = this.constructor.name;
        }
    }

    public generateNewGuid() {
        this.payload = Guid.newGuid();
    }

    abstract getSettings(): Setting[];

    public procesSettings(settings: Setting[]) {
        // Override in subclass to proces module specific attirbutes
        for (let setting of settings) {
            switch (setting.name) {
                case SettingNames.TITLE:
                    this.title = setting.value;
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
    BACKGROUNDCOLOR = 'Achtergrondkleur',
    TEXTCOLOR = 'Tekstkleur'
}
