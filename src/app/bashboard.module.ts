import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgGridModule } from 'angular2-grid';

import { BashBoardComponent } from './bashboard.component';
import { BashBoardModuleDirective } from './Modules/bashboard-module.component';
import { ModuleSettingsComponent } from './Settings/modulesettings.component';
import { BashboardSettingsComponent } from './Settings/bashboardsettings.component';
import { FormsModule } from '@angular/forms';
import { KlokModuleComponent } from './Modules/klok/klokmodule.component';
import { OVModuleComponent } from './Modules/ov/ovmodule.component';
import { BuienradarModuleComponent } from './Modules/buienradar/buienradarmodule.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    Ng2Webstorage,
    NgGridModule
  ],
  declarations: [
    // Bashboard
    BashBoardComponent,
    BashBoardModuleDirective,
    // Settings
    BashboardSettingsComponent,
    ModuleSettingsComponent,

    // Modules
    BuienradarModuleComponent,
    KlokModuleComponent,
    OVModuleComponent
  ],
  bootstrap: [BashBoardComponent]
})
export class BashBoardModule { }
