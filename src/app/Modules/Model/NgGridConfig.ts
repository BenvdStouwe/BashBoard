import { NgGridConfig as INgGridConfig } from 'angular2-grid/main';

export class GridConfig implements INgGridConfig  {
    //  The size of the margins of each item. Supports up to four values in the same way as CSS margins. Can be updated using setMargins()
    public margins: number[] = [1];
    //  Whether the items can be dragged. Can be updated using enableDrag()/disableDrag()
    public draggable: boolean = true;
    //  Whether the items can be resized. Can be updated using enableResize()/disableResize()
    public resizable: boolean = true;
    //  The maximum number of columns allowed. Set to 0 for infinite. Cannot be used with max_rows
    public max_cols: number = 0;
    //  The maximum number of rows allowed. Set to 0 for infinite. Cannot be used with max_cols
    public max_rows: number = 5;
    //  The number of columns shown on screen when auto_resize is set to true. Set to 0 to not auto_resize. Will be overriden by max_cols
    public visible_cols: number = 10;
    //  The number of rows shown on screen when auto_resize is set to true. Set to 0 to not auto_resize. Will be overriden by max_rows
    public visible_rows: number = 0;
    //  The minimum number of columns allowed. Can be any number greater than or equal to 1.
    public min_cols: number = 0;
    //  The minimum number of rows allowed. Can be any number greater than or equal to 1.
    public min_rows: number = 0;
    //  The width of each column
    public col_width: number = 250;
    //  The height of each row
    public row_height: number = 250;
    //  The direction to cascade grid items (up, right, down, left)
    public cascade: string = '';
    //  The minimum width of an item. If greater than col_width, this will update the value of min_cols
    public min_width: number = 100;
    //  The minimum height of an item. If greater than row_height, this will update the value of min_rows
    public min_height: number = 100;
    //  Fix all item movements to the grid
    public fix_to_grid: boolean = false;
    //  Automatically add required element styles at run-time
    public auto_style: boolean = true;
    //  Automatically set col_width/row_height so that max_cols/max_rows fills the screen. Only has effect is max_cols or max_rows is set
    public auto_resize: boolean = true;
    //  Attempts to maintain aspect ratio based on the colWidth/rowHeight values set in the config
    public maintain_ratio: boolean = true;
    //  When adding new items, will use that items position ahead of existing items
    public prefer_new: boolean = false;
    // tslint:disable-next-line:max-line-length
    //  When resizing the screen, with this true and auto_resize false, the grid will re-arrange to fit the screen size. Please note, at present this only works with cascade direction up.
    public limit_to_screen: boolean = false;

    public background_color: string = '#000';
}
