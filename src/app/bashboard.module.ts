import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgGridModule } from "angular2-grid";
import { MomentModule } from "angular2-moment";
import { Ng2Webstorage } from "ngx-webstorage";

import { BashBoardComponent } from "./bashboard.component";
import { BashBoardModuleDirective } from "./Modules/bashboard-module.directive";
import { BashBoardModulesService } from "./Modules/bashboard-modules.service";
import { BuienradarModuleComponent } from "./Modules/Buienradar/buienradarmodule.component";
import { KlokModuleComponent } from "./Modules/Klok/klokmodule.component";
import { OVModuleComponent } from "./Modules/OV/ovmodule.component";
import { BashboardSettingsComponent } from "./Settings/bashboardsettings.component";
import { ModuleSettingsComponent } from "./Settings/modulesettings.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
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
  providers: [
    BashBoardModulesService
  ],
  entryComponents: [
    BuienradarModuleComponent,
    KlokModuleComponent
  ],
  bootstrap: [BashBoardComponent]
})
export class BashBoardModule { }
