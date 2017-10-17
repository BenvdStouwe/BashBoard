import { BashBoardModule, SettingNames } from '../../Model/BashBoardModule';
import { Setting } from '../../Settings/Setting';
import { Timer } from '../../Model/Utilities';

export class KlokModule extends BashBoardModule {
    public readonly friendlyName = 'Klok';
    public readonly refreshRate = 1000;
    public defaultHeight = 1;
    public showDate = false;
    public showSeconds = false;

    private time: Date = new Date();

    constructor(module?: KlokModule) {
        super(module);
        if (!module) {
            this.setDefaultSettings();
        } else {
            this.showDate = module.showDate;
            this.showSeconds = module.showSeconds;
        }
        this.updateContent();
    }

    public updateContent() {
        this.time = new Date();
        console.log(this.time);
        super.setTimer();
    }

    public setDefaultSettings(): void {
        this.title = 'Klok'
        this.backgroundColor = '#1d64d6';
        this.textColor = '#ffffff';
    }

    public procesSettings(settings: Setting[]) {
        super.procesSettings(settings);
        for (let setting of settings) {
            switch (setting.name) {
                case KlokSettingsNames.SHOWDATE:
                    this.showDate = setting.value;
                    break;
                case KlokSettingsNames.SHOWSECONDS:
                    this.showSeconds = setting.value;
                    break;
            }
        }
    }

    public getSettings(): Setting[] {
        return [
            new Setting(SettingNames.TITLE, this.title),
            new Setting(SettingNames.BACKGROUNDCOLOR, this.backgroundColor),
            new Setting(SettingNames.TEXTCOLOR, this.textColor),

            new Setting(KlokSettingsNames.SHOWDATE, this.showDate),
            new Setting(KlokSettingsNames.SHOWSECONDS, this.showSeconds)
        ];
    }
}

enum KlokSettingsNames {
    SHOWDATE = 'Toon datum',
    SHOWSECONDS = 'Toon seconden'
}
