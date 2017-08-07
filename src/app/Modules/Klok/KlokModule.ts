import { BashBoardModule } from '../Model/BashBoardModule';

export class KlokModule extends BashBoardModule {
    public title = 'Klok';
    public defaultHeight = 1;
    public backgroundColor = '#1d64d6';
    public textColor = '';
    public refreshRate = 1;

    // private time: Date = new Date();
}
