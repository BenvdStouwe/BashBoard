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
    public backgroundColor: string;
    public textColor: string;
    public refreshRate: number; // seconds, 0 for static content
    public needsSetup = false; // Shows settings when added

    constructor(module?: BashBoardModule) {
        if (module) {
            this.payload = module.payload;
            this.className = module.className;
            this.title = module.title;
            this.col = module.col;
            this.row = module.row;
            this.backgroundColor = module.backgroundColor;
            this.textColor = module.textColor;
        } else {
            this.payload = Guid.newGuid();
            this.className = this.constructor.name;
        }
    }

    abstract getSettings(): Setting[];

    public procesSettings(settings: Setting[]) {
        for (let setting of settings) {
            switch (setting.name) {
                case SettingNames.TITLE:
                    this.title = setting.value;
                    break;
                case SettingNames.BACKGROUNDCOLOR:
                    this.backgroundColor = setting.value;
                    break;
            }
        }
    }
}

export enum SettingNames {
    TITLE = 'Titel',
    BACKGROUNDCOLOR = 'Achtergrondkleur'
}
