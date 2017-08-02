import { BashBoardModule } from '../Model/BashBoardModule';

export class KlokModule extends BashBoardModule {
    public title: string = 'Klok';
    public defaultHeight: number = 1;
    public backgroundColor: string = '#1d64d6';
    public textColor: string = '';
    public refreshRate: number = 1;

    // private time: Date = new Date();
}
