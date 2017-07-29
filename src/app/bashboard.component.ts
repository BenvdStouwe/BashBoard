import { Component } from '@angular/core';
import { IBashBoardModule } from './Modules/Model/IBashBoardModule';

@Component({
  selector: 'bashboard',
  templateUrl: './bashboard.view.html',
})
export class BashBoardComponent  {
  public modules: IBashBoardModule[];
}
