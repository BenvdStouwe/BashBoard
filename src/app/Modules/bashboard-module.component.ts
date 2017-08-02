import { Component, Input, EventEmitter, Output } from '@angular/core';
import { BashBoardModule } from './Model/BashBoardModule';

@Component({
    selector: 'bashboard-module',
    templateUrl: './bashboard-module.view.html'
})
export class BashBoardModuleComponent {
    @Input() public module: BashBoardModule;
    @Output() public changed: EventEmitter<BashBoardModule> = new EventEmitter();

    public moduleChanged() {
        this.changed.emit(this.module);
    }
}
