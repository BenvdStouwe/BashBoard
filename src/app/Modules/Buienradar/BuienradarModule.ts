import { BashBoardModule, SettingNames } from '../../Model/BashBoardModule';
import { Setting } from '../../Settings/Setting';

export class BuienradarModule extends BashBoardModule {
    public readonly friendlyName = 'Buienradar';
    public title: string;

    constructor(module?: BashBoardModule) {
        super(module);
        if (!module) {
            this.setDefaultSettings();
        }
    }

    public updateContent(): void {

    }

    public setDefaultSettings(): void {
        this.title = 'Buienradar';
    }

    public getSettings(): Setting[] {
        let settings = [
            new Setting(SettingNames.TITLE, this.title),
            new Setting(SettingNames.BACKGROUNDCOLOR, this.backgroundColor)
        ];

        return settings;
    }
}
