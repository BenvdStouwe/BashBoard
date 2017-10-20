import { NgGridItemConfig } from "angular2-grid";

import { Guid } from "./Utilities";

export class ItemConfig implements NgGridItemConfig {
    public id: Guid;
    public moduleType: string; // needed so objects from LocalStorage can be cast to correct class
    public title?: string;
    public col: number;
    public row: number;
    public sizex: number; // # of columns wide
    public sizey: number; // # of rows high
    public defaultWidth = 1; // default for sizex
    public defaultHeight = 1; // default for sizey
    public backgroundColor = "#333333"; // due to HTML input type color standards, use 6 character hexcolors
    public textColor = "#ffffff"; // due to HTML input type color standards, use 6 hexcharacter colors
}
