import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgGridModule } from "angular2-grid";
import { Ng2Webstorage } from "ngx-webstorage";

import { BashBoardComponent } from "./bashboard.component";
import { BashBoardModuleDirective } from "./Modules/bashboard-module.directive";
import { BuienradarModuleComponent } from "./Modules/buienradar/buienradarmodule.component";
import { KlokModuleComponent } from "./Modules/klok/klokmodule.component";
import { OVModuleComponent } from "./Modules/ov/ovmodule.component";
import { BashboardSettingsComponent } from "./Settings/bashboardsettings.component";
import { ModuleSettingsComponent } from "./Settings/modulesettings.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    Ng2Webstorage,
    NgGridModule
  ],
  declarations: [
    //#region BashBoard
    // bashboard
    BashBoardComponent,
    BashBoardModuleDirective,
    // settings
    BashboardSettingsComponent,
    ModuleSettingsComponent,
    //#endregion

    // #region Modules
    BuienradarModuleComponent,
    KlokModuleComponent,
    OVModuleComponent
    // #endregion
  ],
  bootstrap: [BashBoardComponent]
})
export class BashBoardModule { }
