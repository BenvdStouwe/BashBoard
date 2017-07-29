import { Component, Input } from '@angular/core';
import { IBashBoardModule } from './Model/IBashBoardModule';

@Component({
    selector: 'bashboard-module',
    templateUrl: './bashboard-module.view.html'
})
export class BashBoardModuleComponent {
    @Input() public module: IBashBoardModule;
}