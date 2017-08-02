import { NgGridItemConfig } from 'angular2-grid';

export abstract class BashBoardModule implements NgGridItemConfig {
    public title: string;
    public col: number;
    public row: number;
    public sizex: number;
    public sizey: number;
    public subTitle?: string;
    public defaultWidth: number;
    public defaultHeight: number;
    public backgroundColor: string;

    public showPopup?(): void;
}
