import { Component, Input, OnInit } from '@angular/core';
import { BashBoardModule } from '../Modules/Model/BashBoardModule';
import { Setting, InputType } from './Setting';

@Component({
    selector: 'module-settings',
    templateUrl: './modulesettings.view.html'
})

export class ModuleSettingsComponent implements OnInit {
    @Input() public module: BashBoardModule;
    @Input() public settings: Setting[];

    ngOnInit() {
    }
}
