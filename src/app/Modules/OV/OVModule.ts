import { BashBoardModule, SettingNames } from '../../Model/BashBoardModule';
import { OVMelding } from './OVMelding';
import { Setting } from '../../Settings/Setting';
import { InputType, Timer } from '../../Model/Utilities';

export class OVModule extends BashBoardModule {
    public static readonly friendlyName = 'Reisinformatie';
    public readonly refreshRate = 120000;

    public station: string;
    public warnings: OVMelding[];
    public showTimes: Boolean;
    public showWarnings: Boolean;

    constructor(module?: OVModule) {
        super(module);
        if (module) {
            this.station = module.station;
            this.warnings = module.warnings;
        } else {
            this.title = 'OV Info';
            this.backgroundColor = '#ffb310';
            this.textColor = '#fffff';
            this.showTimes = true;
            this.showWarnings = false;
            this.needsSetup = true;
        }
        this.updateContent();
    }

    public updateContent(): void {
        if (!this.canUpdate()) {
            return;
        }
        this.updating = true;
        let warnings = this.getNSTrainTimes();
        console.log('NS meldingen ophalen');
        this.warnings = warnings;
        super.setTimer();
        this.updating = false;
    }

    public getSettings(): Setting[] {
        return [
            new Setting(SettingNames.TITLE, this.title),
            new Setting(SettingNames.BACKGROUNDCOLOR, this.backgroundColor),
            new Setting(SettingNames.TEXTCOLOR, this.textColor, InputType.COLOR),

            new Setting(OVSettingNames.STATION, this.station),
            new Setting(OVSettingNames.TRAINTIMES, this.showTimes, InputType.BOOLEAN),
            new Setting(OVSettingNames.WARNINGS, this.showWarnings, InputType.BOOLEAN)
        ];
    }

    public procesSettings(settings: Setting[]) {
        super.procesSettings(settings);
        for (let setting of settings) {
            switch (setting.name) {
                case OVSettingNames.STATION:
                    this.station = setting.value;
                    break;
                case OVSettingNames.TRAINTIMES:
                    this.showTimes = setting.value;
                    break;
                case OVSettingNames.WARNINGS:
                    this.showWarnings = setting.value;
                    break;
            }
        }
        this.updateContent();
    }

    private getNSWarnings(): OVMelding[] {
        return new Array<OVMelding>();
    }

    private getNSTrainTimes(): OVMelding[] {
        let url = 'https://webservices.ns.nl/ns-api-avt?station=' + this.station;
        // let result = this.http.get(url).subscribe(data => {
        //     console.log(data);
        // })
        return new Array<OVMelding>();
    }
}

enum OVSettingNames {
    STATION = 'Station',
    TRAINTIMES = 'Toon vertrektijden',
    WARNINGS = 'Toon waarschuwingen'
}
