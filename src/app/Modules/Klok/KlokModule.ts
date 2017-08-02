import { BashBoardModule } from '../Model/BashBoardModule';

export class KlokModule extends BashBoardModule {
    public title: string = 'Klok';
    public sizex: number;
    public sizey: number;
    public defaultWidth: number = 1;
    public defaultHeight: number = 1;
    public backgroundColor: string = '#1d64d6';
    public textColor: string = '';
    public content: HTMLDivElement;

    private time: Date;

    public generateContent(): HTMLDivElement {
        let contentDiv = new HTMLDivElement();
        contentDiv.innerHTML = this.time.getTime.toString();
        return contentDiv;
    }
}
