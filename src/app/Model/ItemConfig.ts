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

    // due to HTML input type color standards, use 7 character string with hexcolor
    // css color strings like 'red' or 'blue'  will work, but will throw an error when opening them in a settingsmodal
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
    public backgroundColor = "#333333";
    public textColor = "#ffffff";

    constructor() {
        if (!this.id) {
            this.id = Guid.newGuid();
        }
    }
}
