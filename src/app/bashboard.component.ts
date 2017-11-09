import { HttpClient } from "@angular/common/http";
import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
} from "@angular/core";
import * as moment from "moment";

import { BashBoardModule } from "./Model/BashBoardModule";
import { GridConfig } from "./Model/GridConfig";
import { ItemConfig } from "./Model/ItemConfig";
import { BashBoardModuleDirective } from "./Modules/bashboard-module.directive";
import { BashBoardModulesService } from "./Modules/bashboard-modules.service";
import { KlokModuleConfig } from "./Modules/Klok/klokmodule.config";
import { Modules } from "./Modules/Modules";

@Component({
  selector: "bashboard",
  templateUrl: "./bashboard.view.html"
})
export class BashBoardComponent implements OnInit, AfterViewInit {
  @ViewChild("bashBoardModuleContainer", { read: ViewContainerRef }) bashBoardModuleContainer: ViewContainerRef;
  @ViewChildren(BashBoardModuleDirective) bashBoardModuleDirectives: QueryList<BashBoardModule>;
  public visible = false;
  public configs: ItemConfig[];
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

  public restoreModules(): void {
    const configs = this.modulesService.getConfigs();
    this.configs = configs ? configs : [];
    if (this.configs.length > 0) {
      this.configs.forEach(config => {
        let moduleComponentFactory = this.componentFactoryResolver.resolveComponentFactory(Modules[config.moduleType]);
        this.bashBoardModuleContainer.createComponent(moduleComponentFactory);
        // (<BashBoardModule>component.instance).setConfig(config);
      });
    } else {
      const module = new Modules.KlokModuleComponent();
      this.configs.push(module.getConfig());
      let moduleComponentFactory = this.componentFactoryResolver.resolveComponentFactory(Modules[module.getConfig().moduleType]);
      this.bashBoardModuleContainer.createComponent(moduleComponentFactory);
    }
  }

  public addModules(configs: ItemConfig[]): void {
    configs.forEach(config => this.addModule(config));
  }

  public addModule(config: ItemConfig): void {
    config = new KlokModuleConfig();

    this.configs.push(config);
  }

  public removeModule(config: ItemConfig): void {
    this.configs = this.configs.filter(m => m !== config);
  }

  public setStyleSettings(): void {
    const bodyElement = document.querySelector("body");
    bodyElement.style.setProperty(StyleSettingNames.BACKGROUNDCOLOR, this.gridConfig.background_color);
    bodyElement.style.setProperty(StyleSettingNames.BORDERWIDTH, this.gridConfig.border_width + "px");
  }

  public saveLayout(): void {
    this.modulesService.saveConfigs(this.configs);
  }

  private getModules(): BashBoardModule[] {
    return [];
    // return this.modulesService.getModules();
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
