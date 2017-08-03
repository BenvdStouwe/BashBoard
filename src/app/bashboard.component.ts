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
    let modules =  this.storage.retrieve(Storage.MODULES);
    this.modules = modules ? modules : this.getDefaultModuleLayout();
    let gridConfig = this.storage.retrieve(Storage.GRIDCONFIG);
    this.gridConfig = gridConfig ? gridConfig : this.getDefaultGridConfig();
  }

  public addModule(module: BashBoardModule) {
    module = new OVModule();

    if (module.needsSetup) {
      module.showSettings();
    }

    this.modules.push(module);
  }

  public removeModule(module: BashBoardModule) {
    this.modules = this.modules.filter(m => m !== module);
  }

  public saveLayout() {
    this.storage.store(Storage.MODULES, this.modules);
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

export class Storage {
  public static readonly MODULES: string = 'BashBoardModules';
  public static readonly GRIDCONFIG: string = 'GridConfig';
}
