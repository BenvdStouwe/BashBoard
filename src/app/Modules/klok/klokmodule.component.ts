import { Component, OnInit } from '@angular/core';

import { BashBoardModule, SettingNames } from '../../Model/BashBoardModule';
import { Setting } from '../../Settings/Setting';
import { KlokModuleConfig } from './klokmodule.config';

@Component({
    templateUrl: './KlokModule.view.html'
})
export class KlokModuleComponent extends BashBoardModule implements OnInit {
    public readonly friendlyName = 'Klok';
    public readonly refreshRate = 1000;
    protected config: KlokModuleConfig;

    private time: Date = new Date();

    constructor(config?: KlokModuleConfig) {
        super(config);
        if (!config) {
            this.setDefaultSettings();
        } else {
            this.config.showDate = config.showDate;
            this.config.showSeconds = config.showSeconds;
        }
    }

    ngOnInit(): void {
        this.updateContent();
    }

    public updateContent() {
        if (!this.canUpdate()) {
            return;
        }
        this.time = new Date();
        super.setTimer();
    }

    public setDefaultSettings(): void {
        this.config.title = 'Klok'
        this.config.backgroundColor = '#1d64d6';
        this.config.textColor = '#ffffff';
        this.config.showDate = true;
        this.config.showSeconds = false;
        this.config.defaultHeight = 1;
    }

    public procesSettings(settings: Setting[]) {
        super.procesSettings(settings);
        for (let setting of settings) {
            switch (setting.name) {
                case KlokSettingsNames.SHOWDATE:
                    this.config.showDate = setting.value;
                    break;
                case KlokSettingsNames.SHOWSECONDS:
                    this.config.showSeconds = setting.value;
                    break;
            }
        }
    }

    public getSettings(): Setting[] {
        return [
            new Setting(SettingNames.TITLE, this.config.title),
            new Setting(SettingNames.BACKGROUNDCOLOR, this.config.backgroundColor),
            new Setting(SettingNames.TEXTCOLOR, this.config.textColor),

            new Setting(KlokSettingsNames.SHOWDATE, this.config.showDate),
            new Setting(KlokSettingsNames.SHOWSECONDS, this.config.showSeconds)
        ];
    }
}

enum KlokSettingsNames {
    SHOWDATE = 'Toon datum',
    SHOWSECONDS = 'Toon seconden'
}
