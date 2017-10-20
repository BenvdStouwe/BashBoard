import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChildren } from "@angular/core";

import { BashBoardModule } from "./Model/BashBoardModule";
import { GridConfig } from "./Model/GridConfig";
import { BashBoardModuleDirective } from "./Modules/bashboard-module.directive";
import { BashBoardModulesService } from "./Modules/bashboard-modules.service";
import { Modules } from "./Modules/Modules";

@Component({
  selector: "bashboard",
  templateUrl: "./bashboard.view.html",
})
export class BashBoardComponent implements OnInit {
  @ViewChildren(BashBoardModuleDirective) bashBoardModules: QueryList<BashBoardModuleDirective>;
  public visible = false;
  public modules: BashBoardModule[];
  public gridConfig: GridConfig;

  constructor(private modulesService: BashBoardModulesService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.modules = this.getModules();
    this.addModules(this.modules);
    this.gridConfig = this.getDefaultGridConfig();
    this.setStyleSettings();
    setTimeout(() => this.visible = true, 1);
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
    let bodyElement = document.querySelector("body");
    bodyElement.style.setProperty(StyleSettingNames.BACKGROUNDCOLOR, this.gridConfig.background_color);
    bodyElement.style.setProperty(StyleSettingNames.BORDERWIDTH, this.gridConfig.border_width + "px");
  }

  public saveLayout(): void {
    this.modulesService.setModules(this.modules);
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
