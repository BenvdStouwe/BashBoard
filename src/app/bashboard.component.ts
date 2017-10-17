import { Component, OnInit } from '@angular/core';
import { BashBoardModule } from './Model/BashBoardModule';
import { OVModule } from './Modules/OV/OVModule';
import { LocalStorageService } from 'ngx-webstorage';
import { GridConfig } from './Model/GridConfig';
import { Modules } from './Modules/Modules';

@Component({
  selector: 'bashboard',
  templateUrl: './bashboard.view.html',
})
export class BashBoardComponent implements OnInit {
  public visible = false;
  public modules: BashBoardModule[];
  public gridConfig: GridConfig;

  constructor(private storage: LocalStorageService) { };

  ngOnInit(): void {
    this.modules = this.getModules();
    this.gridConfig = this.getGridConfig();
    this.setStyleSettings();
    setTimeout(() => this.visible = true, 1);
  }

  public addModule(module: BashBoardModule): void {
    module = new OVModule();

    while (this.modules.some(m => m.getId() === module.getId())) {
      module.generateNewGuid();
    }

    this.modules.push(module);
  }

  public removeModule(module: BashBoardModule): void {
    this.modules = this.modules.filter(m => m !== module);
  }

  public setStyleSettings(): void {
    let bodyElement = document.querySelector('body');
    bodyElement.style.setProperty(StyleSettingNames.BACKGROUNDCOLOR, this.gridConfig.background_color);
    bodyElement.style.setProperty(StyleSettingNames.BORDERWIDTH, this.gridConfig.border_width + 'px');
  }

  public saveLayout(): void {
    this.storage.store(StorageNames.MODULES, this.modules);
  }

  private getModules(): BashBoardModule[] {
    let modulesFromStorage = this.storage.retrieve(StorageNames.MODULES) as BashBoardModule[];
    if (!modulesFromStorage) { modulesFromStorage = [] };
    let modules: BashBoardModule[] = [];

    modulesFromStorage.forEach(element => {
      modules.push(new Modules[element.className](element));
    });

    return modules.length > 0 ? modules : this.getDefaultModuleLayout();
  }

  private getDefaultModuleLayout(): BashBoardModule[] {
    let modules: BashBoardModule[] = [];
    modules.push(new Modules.KlokModule());
    return modules;
  }

  private saveGridConfig(): void {
    this.storage.store(StorageNames.GRIDCONFIG, this.gridConfig);
  }

  private getGridConfig(): GridConfig {
    let gridConfig = this.storage.retrieve(StorageNames.GRIDCONFIG);
    return gridConfig ? gridConfig : this.getDefaultGridConfig();
  }

  private getDefaultGridConfig(): GridConfig {
    return new GridConfig();
  }
}

enum StorageNames {
  MODULES = 'BashBoardModules',
  GRIDCONFIG = 'GridConfig'
}

enum StyleSettingNames {
  BACKGROUNDCOLOR = '--background-color',
  BORDERWIDTH = '--border-width'
}
