import { Component, OnInit } from '@angular/core';
import { BashBoardModule } from './Modules/Model/BashBoardModule';
import { OVModule } from './Modules/OV/OVModule';
import { LocalStorageService } from 'ngx-webstorage';
import { GridConfig } from './Modules/Model/NgGridConfig';
import { KlokModule } from './Modules/Klok/KlokModule';

@Component({
  selector: 'bashboard',
  templateUrl: './bashboard.view.html',
})
export class BashBoardComponent implements OnInit {

  public modules: BashBoardModule[];
  public gridConfig: GridConfig;

  constructor(private storage: LocalStorageService) {};

  ngOnInit(): void {
    let modules =  this.storage.retrieve(StorageNames.MODULES);
    this.modules = modules ? modules : this.getDefaultModuleLayout();
    let gridConfig = this.storage.retrieve(StorageNames.GRIDCONFIG);
    this.gridConfig = gridConfig ? gridConfig : this.getDefaultGridConfig();
    this.setStyleSettings();
  }

  public addModule(module: BashBoardModule) {
    module = new OVModule();

    this.modules.push(module);

    if (module.needsSetup) {
      module.showSettings();
    }
  }

  public removeModule(module: BashBoardModule) {
    this.modules = this.modules.filter(m => m !== module);
  }

  public setStyleSettings() {
    document.querySelector('body').style.setProperty(StyleSettingNames.BACKGROUNDCOLOR, this.gridConfig.background_color);
  }

  public saveLayout() {
    this.storage.store(StorageNames.MODULES, this.modules);
  }

  private getDefaultModuleLayout(): BashBoardModule[] {
    let modules: BashBoardModule[] = [];
    modules.push(new KlokModule());
    return modules;
  }

  private getDefaultGridConfig(): GridConfig {
    return new GridConfig();
  }
}

export class StorageNames {
  public static readonly MODULES: string = 'BashBoardModules';
  public static readonly GRIDCONFIG: string = 'GridConfig';
}

export class StyleSettingNames {
  public static readonly BACKGROUNDCOLOR: string = '--background-color';
}
