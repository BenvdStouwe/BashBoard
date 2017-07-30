import { Component, OnInit } from '@angular/core';
import { IBashBoardModule } from './Modules/Model/IBashBoardModule';
import { OVModule } from './Modules/OV/OVModule';

@Component({
  selector: 'bashboard',
  templateUrl: './bashboard.view.html',
})
export class BashBoardComponent implements OnInit {
  public modules: IBashBoardModule[] = [];

  ngOnInit(): void {
    this.modules.push(new OVModule());
  }
}
