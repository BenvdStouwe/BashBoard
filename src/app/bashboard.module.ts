import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { ContextMenuModule } from 'ngx-contextmenu';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgGridModule } from 'angular2-grid';

import { BashBoardComponent }  from './bashboard.component';
import { BashBoardModuleComponent } from './Modules/bashboard-module.component';
import { ContextMenuComponent } from './ContextMenu/contextmenu.component';

@NgModule({
  imports:      [
    BrowserModule,
    Ng2Webstorage,
    // ContextMenuModule,
    NgGridModule
  ],
  declarations: [ BashBoardComponent, BashBoardModuleComponent, ContextMenuComponent ],
  bootstrap:    [ BashBoardComponent ]
})
export class BashBoardModule { }
