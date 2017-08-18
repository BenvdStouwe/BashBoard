import { Component, OnInit } from '@angular/core';
import { BashBoardModule } from './Model/BashBoardModule';
import { OVModule } from './Modules/OV/OVModule';
import { LocalStorageService } from 'ngx-webstorage';
import { GridConfig } from './Model/GridConfig';
import { KlokModule } from './Modules/Klok/KlokModule';
import { Guid } from './Model/Utilities';

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

    while (this.modules.some(m => m.payload === module.payload)) {
      module.payload = Guid.newGuid();
    }

    this.modules.push(module);

    if (module.needsSetup) {
      module.showSettings();
    }
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

  public onContextMenu(event: Event): void {
    event.preventDefault();
  }

  private getModules(): BashBoardModule[] {
    let modules = this.storage.retrieve(StorageNames.MODULES);
    return modules ? modules : this.getDefaultModuleLayout();
  }

  private getDefaultModuleLayout(): BashBoardModule[] {
    let modules: BashBoardModule[] = [];
    modules.push(new KlokModule());
    return modules;
  }

  private getGridConfig(): GridConfig {
    let gridConfig = this.storage.retrieve(StorageNames.GRIDCONFIG);
    return gridConfig ? gridConfig : this.getDefaultGridConfig();
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
  public static readonly BORDERWIDTH: string = '--border-width';
}
