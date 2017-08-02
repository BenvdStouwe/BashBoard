import { NgGridItemConfig } from 'angular2-grid';

export abstract class BashBoardModule implements NgGridItemConfig {
    public title: string;
    public col: number;
    public row: number;
    public sizex: number;
    public sizey: number;
    public subTitle?: string;
    public defaultWidth: number = 1;
    public defaultHeight: number = 1;
    public backgroundColor: string;
    public refreshRate: number; // seconds
    public needsSetup: boolean = false;

    public showSettings?(): void;
}
