import { BashBoardModule, SettingNames } from '../../Model/BashBoardModule';
import { Setting } from '../../Settings/Setting';

export class BuienradarModule extends BashBoardModule {
    public title = 'Buienradar';

    constructor(module?: BashBoardModule) {
        super(module);
        if (!module) {
            this.title = 'Buienradar';
        }
    }

    public getSettings(): Setting[] {
        let settings = [
            new Setting(SettingNames.TITLE, this.title),
            new Setting(SettingNames.BACKGROUNDCOLOR, this.backgroundColor)
        ];

        return settings;
    }
}
