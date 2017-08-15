import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { ContextMenuModule } from 'ngx-contextmenu';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgGridModule } from 'angular2-grid';

import { BashBoardComponent }  from './bashboard.component';
import { BashBoardModuleComponent } from './Modules/bashboard-module.component';
import { ModuleSettingsComponent } from './Settings/modulesettings.component';

@NgModule({
  imports:      [
    BrowserModule,
    Ng2Webstorage,
    // ContextMenuModule,
    NgGridModule
  ],
  declarations: [ BashBoardComponent, BashBoardModuleComponent, ModuleSettingsComponent ],
  bootstrap:    [ BashBoardComponent ]
})
export class BashBoardModule { }
