import { BashBoardModule } from '../Model/BashBoardModule';
import { OVMelding } from './OVMelding';

export class OVModule extends BashBoardModule {
    public title: string = 'OV Info';
    public col: number;
    public row: number;
    public sizex: number;
    public sizey: number;
    public defaultWidth: number = 1;
    public defaultHeight: number = 1;
    public backgroundColor: string = '#ffb310';
    public textColor: string = '';
    public content: HTMLDivElement;

    public station: string;
    public warnings: OVMelding[];

    private NSApiUserName: string;
    private NSApiPassWord: string;

    public constructor(userName: string, passWord: string, station: string, width?: number, height?: number) {
        super();
        this.NSApiUserName = userName;
        this.NSApiPassWord = passWord;
        this.station = station;
        this.sizex = width ? width : this.defaultWidth;
        this.sizey = height ? height : this.defaultHeight;
    }

    public generateContent(): HTMLDivElement {
        let contentDiv = new HTMLDivElement;

        return contentDiv;
    }

    public retrieveWarnings(): void {
        let warnings = this.getNSWarnings();

        this.warnings = warnings;
    }

    public getNSWarnings(): OVMelding[] {
        return new Array<OVMelding>();
    }
}
