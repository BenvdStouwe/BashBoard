import { Component, OnInit } from '@angular/core';
import { BashBoardModule } from './Modules/Model/BashBoardModule';
import { OVModule } from './Modules/OV/OVModule';
import { LocalStorageService } from 'ngx-webstorage';
import { GridConfig } from './Modules/Model/NgGridConfig';

@Component({
  selector: 'bashboard',
  templateUrl: './bashboard.view.html',
})
export class BashBoardComponent implements OnInit {

  public modules: BashBoardModule[];
  public gridConfig: GridConfig;

  constructor(private storage: LocalStorageService) {};

  ngOnInit(): void {
    this.modules = this.storage.retrieve(Storage.STORAGE_MODULES);
    let gridConfig = this.storage.retrieve(Storage.STORAGE_GRIDCONFIG);
    this.gridConfig = gridConfig != null ? gridConfig : this.getDefaultGridConfig();
  }

  public addModule(module: BashBoardModule) {
    module = new OVModule('henk', 'sjaak', 'Deventer');
    if (!this.modules) {
      this.modules = [];
    }

    this.modules.push(module);
    this.saveLayout();
  }

  public saveLayout() {
    this.storage.store(Storage.STORAGE_MODULES, this.modules);
  }

  private getDefaultGridConfig(): GridConfig {
    return new GridConfig();
  }
}

export class Storage {
  public static get STORAGE_MODULES(): string { return 'BashBoardModules'; }
  public static get STORAGE_GRIDCONFIG(): string { return 'GridConfig'; }
}
