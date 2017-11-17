import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgGridModule } from "angular2-grid/main";
import { MomentModule } from "angular2-moment";
import { Ng2Webstorage } from "ngx-webstorage/dist/app";

import { AppComponent } from "./app.component";
import { BashBoardModuleDirective } from "./Modules/bashboard-module.directive";
import { BashBoardModulesService } from "./Modules/bashboard-modules.service";
import { Modules } from "./Modules/Modules";
import { BashboardSettingsComponent } from "./Settings/bashboardsettings.component";
import { ModuleSettingsComponent } from "./Settings/modulesettings.component";

@NgModule({
  declarations: [
    AppComponent,
    BashBoardModuleDirective,
    BashboardSettingsComponent,
    ModuleSettingsComponent,

    // #region Modules
    Modules.BuienradarModuleComponent,
    Modules.JenkinsModuleComponent,
    Modules.KlokModuleComponent,
    Modules.OVModuleComponent
    // #endregion
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    NgbModule.forRoot(),
    Ng2Webstorage,
    NgGridModule
  ],
  providers: [
    BashBoardModulesService
  ],
  entryComponents: [
    Modules.BuienradarModuleComponent,
    Modules.JenkinsModuleComponent,
    Modules.KlokModuleComponent,
    Modules.OVModuleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
