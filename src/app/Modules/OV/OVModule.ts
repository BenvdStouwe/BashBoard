import { BashBoardModule, SettingNames } from '../../Model/BashBoardModule';
import { OVMelding } from './OVMelding';
import { Setting } from '../../Settings/Setting';

export class OVModule extends BashBoardModule {
    public title = 'OV Info';
    public backgroundColor = '#ffb310';
    public textColor = '';
    public refreshRate: 60;

    public station: string;
    public warnings: OVMelding[];

    constructor(module?: OVModule) {
        super(module);
        if (module) {
            this.station = module.station;
            this.warnings = module.warnings;
        }
    }

    public retrieveWarnings(): void {
        let warnings = this.getNSWarnings();

        this.warnings = warnings;
    }

    public getNSTrainTimes(): OVMelding[] {
        return new Array<OVMelding>();
    }

    public getNSWarnings(): OVMelding[] {
        return new Array<OVMelding>();
    }

    public getSettings(): Setting[] {
        let settings = [
            new Setting(SettingNames.TITLE, this.title),
            new Setting(SettingNames.BACKGROUNDCOLOR, this.backgroundColor)
        ];

        return settings;
    }
}
