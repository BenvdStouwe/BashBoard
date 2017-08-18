import { Component, Input } from '@angular/core';
import { BashBoardModule } from '../Model/BashBoardModule';

@Component({
    selector: 'bashboard-module',
    templateUrl: './bashboard-module.view.html'
})
export class BashBoardModuleComponent {
    @Input() public module: BashBoardModule;
}
