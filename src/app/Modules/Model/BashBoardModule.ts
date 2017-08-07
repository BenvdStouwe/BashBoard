import { NgGridItemConfig } from 'angular2-grid';

export abstract class BashBoardModule implements NgGridItemConfig {
    public title: string;
    public col: number;
    public row: number;
    public sizex: number; // # of columns wide
    public sizey: number; // # of rows high
    public subTitle?: string;
    public defaultWidth = 1; // default for sizex
    public defaultHeight = 1; // default for sizey
    public backgroundColor: string;
    public refreshRate: number; // seconds, 0 for static content
    public needsSetup = false; // Shows settings when added

    public showSettings?(): void;
}
