import { Component, Input, ViewChild } from '@angular/core';
import { BashBoardModule } from '../Model/BashBoardModule';
import { ModuleSettingsComponent } from '../Settings/modulesettings.component';

@Component({
    selector: 'bashboard-module',
    templateUrl: './bashboard-module.view.html'
})
export class BashBoardModuleComponent {
    @Input() public module: BashBoardModule;
    @ViewChild(ModuleSettingsComponent) private moduleSettingsComponent: ModuleSettingsComponent;

    public updateSettings() {
        console.log('Updating');
        this.module.procesSettings(this.moduleSettingsComponent.settings);
    }
}
