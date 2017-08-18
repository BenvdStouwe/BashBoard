import { BashBoardModule } from '../../Model/BashBoardModule';
import { Setting } from '../../Settings/Setting';

export class KlokModule extends BashBoardModule {
    public title = 'Klok';
    public defaultHeight = 1;
    public backgroundColor = '#1d64d6';
    public textColor = '';
    public refreshRate = 1;

    private time: Date = new Date();

    constructor() {
        super();
        this.settings = [
            new Setting('Titel', this.title),
            new Setting('Achtergrondkleur', this.backgroundColor)
        ];
    }
}
