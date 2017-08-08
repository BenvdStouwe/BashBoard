import { Component, Input } from '@angular/core';
import { BashBoardModule } from './Model/BashBoardModule';

@Component({
    selector: 'bashboard-module',
    templateUrl: './bashboard-module.view.html'
})
export class BashBoardModuleComponent {
    public visible = false;

    @Input() public module: BashBoardModule;

    ngOnInit() {
        setTimeout(() => this.visible = true, 100);
    }
}
