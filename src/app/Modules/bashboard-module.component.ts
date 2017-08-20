import { Setting } from '../Settings/Setting';
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BashBoardModule } from '../Model/BashBoardModule';
import { ModuleSettingsComponent } from '../Settings/modulesettings.component';

@Component({
    selector: 'bashboard-module',
    templateUrl: './bashboard-module.view.html'
})
export class BashBoardModuleComponent {
    @Input() public module: BashBoardModule;
    @Output() public moduleChanged: EventEmitter<boolean> = new EventEmitter();

    public updateSettings(settings: Setting[]) {
        this.module.procesSettings(settings);
        this.moduleChanged.emit(true);
    }
}
