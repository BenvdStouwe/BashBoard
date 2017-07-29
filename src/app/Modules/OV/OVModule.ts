import { IBashBoardModule } from '../Model/IBashBoardModule';
import { OVMelding } from './OVMelding';

export class OVModule implements IBashBoardModule {
    public title: string = 'OV Info';
    public width: number;
    public height: number;
    public defaultWidth: number = 1;
    public defaultHeight: number = 1;
    public backgroundColor: string = '#ffb310';
    public textColor: string = '';

    public station: string;
    public warnings: OVMelding[];

    private NSApiUserName: string;
    private NSApiPassWord: string;

    public OVModule(userName: string, passWord: string, station: string, width?: number, height?: number) {
        this.NSApiUserName = userName;
        this.NSApiPassWord = passWord;
        this.station = station;
        this.width = width ? width : this.defaultWidth;
        this.height = height ? height : this.defaultHeight;
    }

    public getWarnings(): void {
        let warnings = this.getNSWarnings();

        this.warnings = warnings;
    }

    public getNSWarnings(): OVMelding[] {
        return new Array<OVMelding>();
    }
}
