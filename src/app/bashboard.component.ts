import { Component, OnInit } from '@angular/core';
import { IBashBoardModule } from './Modules/Model/IBashBoardModule';
import { OVModule } from './Modules/OV/OVModule';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'bashboard',
  templateUrl: './bashboard.view.html',
})
export class BashBoardComponent implements OnInit {
  @LocalStorage('BashBoardModules')
  public modules: IBashBoardModule[];

  constructor(private storage:LocalStorageService) {};
  ngOnInit(): void {
    this.storage.observe('BashBoardModules')
      .subscribe((newValue: IBashBoardModule[]) => {
        this.modules = newValue;
      });
  }

  public addModule(module: IBashBoardModule) {
    module = new OVModule('henk', 'sjaak', 'Deventer');
    if (this.modules === undefined) {
      this.modules = [];
    }
    this.modules.push(module);
    this.modules = this.modules;
  }
}
