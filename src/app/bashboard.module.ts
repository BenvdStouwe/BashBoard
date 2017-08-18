import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgGridModule } from 'angular2-grid';

import { BashBoardComponent } from './bashboard.component';
import { BashBoardModuleComponent } from './Modules/bashboard-module.component';
import { ModuleSettingsComponent } from './Settings/modulesettings.component';
import { BashboardSettingsComponent } from './Settings/bashboardsettings.component';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    Ng2Webstorage,
    NgGridModule
  ],
  declarations: [BashBoardComponent, BashboardSettingsComponent, BashBoardModuleComponent, ModuleSettingsComponent],
  bootstrap: [BashBoardComponent]
})
export class BashBoardModule { }
