import { Component } from '@angular/core';

import { BashBoardModule, SettingNames } from '../../Model/BashBoardModule';
import { ItemConfig } from '../../Model/ItemConfig';
import { Setting } from '../../Settings/Setting';

@Component({
    templateUrl: './buienradarmodule.view.html'
})
export class BuienradarModuleComponent extends BashBoardModule {
    public readonly friendlyName = 'Buienradar';

    constructor(config?: ItemConfig) {
        super(config);
        if (!config) {
            this.setDefaultSettings();
        }
    }

    public updateContent(): void {
        return;
    }

    public setDefaultSettings(): void {
        this.config.title = 'Buienradar';
    }

    public getSettings(): Setting[] {
        let settings = [
            new Setting(SettingNames.TITLE, this.config.title),
            new Setting(SettingNames.BACKGROUNDCOLOR, this.config.backgroundColor)
        ];

        return settings;
    }
}
