import { BashBoardModule } from '../Model/BashBoardModule';
import { OVMelding } from './OVMelding';

export class OVModule extends BashBoardModule {
    public title = 'OV Info';
    public backgroundColor = '#ffb310';
    public textColor = '';
    public refreshRate: 60;

    public station: string;
    public warnings: OVMelding[];

    // private NSApiUserName: string;
    // private NSApiPassWord: string;

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
}
