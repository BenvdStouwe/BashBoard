import { BashBoardModule, SettingNames } from '../../Model/BashBoardModule';
import { Setting } from '../../Settings/Setting';

export class KlokModule extends BashBoardModule {
    public defaultHeight = 1;
    public refreshRate = 1;

    private time: Date = new Date();

    constructor(module?: BashBoardModule) {
        super(module);
        if (!module) {
            this.title = 'Klok'
            this.backgroundColor = '#1d64d6';
            this.textColor = '';
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
