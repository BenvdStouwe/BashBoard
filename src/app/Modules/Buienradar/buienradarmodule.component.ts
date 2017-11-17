import { Component } from "@angular/core";

import { BashBoardModule, SettingNames } from "../../Model/BashBoardModule";
import { Setting } from "../../Settings/Setting";

@Component({
    templateUrl: "./buienradarmodule.view.html"
})
export class BuienradarModuleComponent extends BashBoardModule {
    public readonly friendlyName = "Buienradar";

    public updateContent(): void {
        return;
    }

    public setDefaultSettings(): void {
        this.config.title = "Buienradar";
    }

    public getSettings(): Setting[] {
        const settings = [
            new Setting(SettingNames.TITLE, this.config.title),
            new Setting(SettingNames.BACKGROUNDCOLOR, this.config.backgroundColor)
        ];

        return settings;
    }
}
