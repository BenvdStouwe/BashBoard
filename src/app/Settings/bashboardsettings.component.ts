import { Component, OnInit, Input } from '@angular/core';
import { GridConfig } from '../Model/GridConfig';

@Component({
    selector: 'bashboard-settings',
    templateUrl: './bashboardsettings.view.html'
})

export class BashboardSettingsComponent implements OnInit {
    @Input() gridConfig: GridConfig;

    constructor() { }

    ngOnInit() { }
}
