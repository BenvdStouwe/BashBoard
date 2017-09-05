import { BashBoardModule, SettingNames } from '../../Model/BashBoardModule';
import { Setting } from '../../Settings/Setting';
import { Timer } from '../../Model/Utilities';

export class KlokModule extends BashBoardModule {
    public static readonly friendlyName = 'Klok';
    public defaultHeight = 1;
    public refreshRate = 1000;

    private time: Date = new Date();

    constructor(module?: BashBoardModule) {
        super(module);
        if (!module) {
            this.title = 'Klok'
            this.backgroundColor = '#1d64d6';
            this.textColor = '#fff';
        }
        this.updateContent();
    }

    public updateContent() {
        this.time = new Date();
        console.log(this.time);
        this.timer = new Timer(
            () => this.updateContent(),
            this.refreshRate
        );
    }

    public getSettings(): Setting[] {
        return [
            new Setting(SettingNames.TITLE, this.title),
            new Setting(SettingNames.BACKGROUNDCOLOR, this.backgroundColor),
            new Setting(SettingNames.TEXTCOLOR, this.textColor)
        ];
    }
}
