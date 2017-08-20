import { BashBoardModule, SettingNames } from '../../Model/BashBoardModule';
import { Setting } from '../../Settings/Setting';

export class KlokModule extends BashBoardModule {
    public title = 'Klok';
    public defaultHeight = 1;
    public backgroundColor = '#1d64d6';
    public textColor = '';
    public refreshRate = 1;

    private time: Date = new Date();

    public getSettings(): Setting[] {
        let settings = [
            new Setting(SettingNames.TITLE, this.title),
            new Setting(SettingNames.BACKGROUNDCOLOR, this.backgroundColor)
        ];
        return settings;
    }
}
