import { Component, Input, OnInit } from "@angular/core";

import { BashBoardModule, SettingNames } from "../../Model/BashBoardModule";
import { Setting } from "../../Settings/Setting";
import { KlokModuleConfig } from "./klokmodule.config";

@Component({
    templateUrl: "./klokmodule.view.html",
    styleUrls: ["./klokmodule.style.css"]
})
export class KlokModuleComponent extends BashBoardModule implements OnInit {
    public readonly friendlyName = "Klok";
    @Input() protected config: KlokModuleConfig;
    protected refreshRate = 1000;

    private time: Date = new Date();

    ngOnInit(): void {
        this.updateContent();
    }

    public updateContent(): void {
        if (!this.canUpdate()) {
            return;
        }
        this.time = new Date();
        super.setTimer();
    }

    public setConfig(config: KlokModuleConfig): void {
        super.setConfig(config);
    }

    public setDefaultSettings(): void {
        if (!this.config) {
            this.config = new KlokModuleConfig();
        }
        super.setDefaultSettings();
        this.config.backgroundColor = "#0000ff";
        this.config.textColor = "#ffffff";
        this.config.timeFormat = "H:mm:ss";
        this.config.dateFormat = "dddd D MMMM";
        this.config.sizex = 2;
    }

    public procesSettings(settings: Setting[]): void {
        super.procesSettings(settings);
        for (let setting of settings) {
            switch (setting.name) {
                case KlokSettingsNames.DATEFORMAT:
                    this.config.dateFormat = setting.value;
                    break;
                case KlokSettingsNames.TIMEFORMAT:
                    this.config.timeFormat = setting.value;
            }
        }
    }

    public getSettings(): Setting[] {
        return [
            new Setting(SettingNames.BACKGROUNDCOLOR, this.config.backgroundColor),
            new Setting(SettingNames.TEXTCOLOR, this.config.textColor),

            new Setting(KlokSettingsNames.DATEFORMAT, this.config.dateFormat),
            new Setting(KlokSettingsNames.TIMEFORMAT, this.config.timeFormat)
        ];
    }
}

enum KlokSettingsNames {
    TIMEFORMAT = "Tijd weergave",
    DATEFORMAT = "Datum weergave"
}
