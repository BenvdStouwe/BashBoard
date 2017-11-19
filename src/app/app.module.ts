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
import { BashboardSettingsComponent } from "./Settings/bashboardsettings.component";
import { ModuleSettingsComponent } from "./Settings/modulesettings.component";
import { OVModuleComponent } from "./Modules/OV/ovmodule.component";
import { KlokModuleComponent } from "./Modules/Klok/klokmodule.component";
import { JenkinsModuleComponent } from "./Modules/Jenkins/jenkinsmodule.component";
import { BuienradarModuleComponent } from "./Modules/Buienradar/buienradarmodule.component";

@NgModule({
  declarations: [
    AppComponent,
    BashBoardModuleDirective,
    BashboardSettingsComponent,
    ModuleSettingsComponent,

    // #region Modules
    BuienradarModuleComponent,
    JenkinsModuleComponent,
    KlokModuleComponent,
    OVModuleComponent
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
    // All BashBoardModules should be inserted here
    // This is so they can be dynamically inserted with the ComponentFactoryResolver
    // Modules not listed here cannot be added to the grid

    // Don't forget to also add them to Modules.ts
    BuienradarModuleComponent,
    JenkinsModuleComponent,
    KlokModuleComponent,
    OVModuleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
