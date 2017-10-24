import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import * as moment from "moment";

import { BashBoardModule } from "./Model/BashBoardModule";
import { GridConfig } from "./Model/GridConfig";
import { BashBoardModulesService } from "./Modules/bashboard-modules.service";
import { KlokModuleComponent } from "./Modules/Klok/klokmodule.component";
import { Modules } from "./Modules/Modules";

@Component({
  selector: "bashboard",
  templateUrl: "./bashboard.view.html"
})
export class BashBoardComponent implements OnInit, AfterViewInit {
  @ViewChild("bashBoard", { read: ViewContainerRef }) bashBoard: ViewContainerRef;
  @ViewChild("bashBoardModuleContainer", { read: ViewContainerRef }) bashBoardModuleContainer: ViewContainerRef;
  public visible = false;
  public modules: BashBoardModule[];
  public gridConfig: GridConfig;

  constructor(
    private http: HttpClient,
    private modulesService: BashBoardModulesService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.gridConfig = this.getDefaultGridConfig();
    this.setStyleSettings();
    this.visible = true;

    moment.locale("nl-nl");
  }

  ngAfterViewInit(): void {
    this.restoreModules();
  }

  public get bashBoardModules(): BashBoardModule[] {
    // return this.bashBoardModuleContainer.;
    return [];
  }

  public restoreModules(): void {
    const configs = this.modulesService.getConfigs();
    configs.forEach(config => {
      let moduleComponentFactory = this.componentFactoryResolver.resolveComponentFactory(KlokModuleComponent);
      let component = this.bashBoardModuleContainer.createComponent(moduleComponentFactory);
      (<BashBoardModule>component.instance).setConfig(config);
    });
  }

  public addModules(modules: BashBoardModule[]): void {
    modules.forEach(module => this.addModule(module));
  }

  public addModule(module: BashBoardModule): void {
    module = new Modules.KlokModuleComponent();

    while (this.modules.some(m => m.getId() === module.getId())) {
      module.generateNewGuid();
    }

    this.modules.push(module);
  }

  public removeModule(module: BashBoardModule): void {
    this.modules = this.modules.filter(m => m !== module);
  }

  public setStyleSettings(): void {
    const bodyElement = document.querySelector("body");
    bodyElement.style.setProperty(StyleSettingNames.BACKGROUNDCOLOR, this.gridConfig.background_color);
    bodyElement.style.setProperty(StyleSettingNames.BORDERWIDTH, this.gridConfig.border_width + "px");
  }

  public saveLayout(): void {
    this.modulesService.saveModules(this.modules);
  }

  private getModules(): BashBoardModule[] {
    return this.modulesService.getModules();
  }

  // private saveGridConfig(): void {
  //   this.storage.store(StorageNames.GRIDCONFIG, this.gridConfig);
  // }

  // private getGridConfig(): GridConfig {
  //   let gridConfig = this.storage.retrieve(StorageNames.GRIDCONFIG);
  //   return gridConfig ? gridConfig : this.getDefaultGridConfig();
  // }

  private getDefaultGridConfig(): GridConfig {
    return new GridConfig();
  }
}

enum StyleSettingNames {
  BACKGROUNDCOLOR = "--background-color",
  BORDERWIDTH = "--border-width"
}
