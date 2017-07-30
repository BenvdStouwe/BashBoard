import { IBashBoardModule } from '../Model/IBashBoardModule';

export class KlokModule implements IBashBoardModule {
    public title: string = 'Klok';
    public width: number;
    public height: number;
    public defaultWidth: number = 1;
    public defaultHeight: number = 1;
    public backgroundColor: string = '#1d64d6';
    public textColor: string = '';
    public content: HTMLDivElement;

    private time: Date;

    public generateContent(): HTMLDivElement {
        var contentDiv = new HTMLDivElement();
        contentDiv.innerHTML = this.time.getTime.toString();
        return contentDiv;
    }
}