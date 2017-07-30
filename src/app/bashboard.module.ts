import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgGridModule } from 'angular2-grid';

import { BashBoardComponent }  from './bashboard.component';
import { BashBoardModuleComponent } from './Modules/bashboard-module.component';

@NgModule({
  imports:      [
    BrowserModule,
    Ng2Webstorage,
    NgGridModule
  ],
  declarations: [ BashBoardComponent, BashBoardModuleComponent ],
  bootstrap:    [ BashBoardComponent ]
})
export class BashBoardModule { }
