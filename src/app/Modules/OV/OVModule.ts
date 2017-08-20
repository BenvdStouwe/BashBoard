import { BashBoardModule, SettingNames } from '../../Model/BashBoardModule';
import { OVMelding } from './OVMelding';
import { Setting } from '../../Settings/Setting';

export class OVModule extends BashBoardModule {
    public refreshRate: 60;

    public station: string;
    public warnings: OVMelding[];

    constructor(module?: OVModule) {
        super(module);
        if (module) {
            this.station = module.station;
            this.warnings = module.warnings;
        } else {
            this.title = 'OV Info';
            this.backgroundColor = '#ffb310';
            this.textColor = '';
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
            new Setting(SettingNames.BACKGROUNDCOLOR, this.backgroundColor),
            new Setting(OVSettingNames.STATION, this.station)
        ];

        return settings;
    }

    public procesSettings(settings: Setting[]) {
        super.procesSettings(settings);
        for (let setting of settings) {
            switch (setting.name) {
                case OVSettingNames.STATION:
                    this.station = setting.value;
            }
        }
    }
}

enum OVSettingNames {
    STATION = 'Station'
}
