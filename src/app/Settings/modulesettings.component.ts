import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BashBoardModule } from '../Model/BashBoardModule';
import { Setting } from './Setting';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputType } from '../Model/Utilities';

@Component({
    selector: 'module-settings',
    templateUrl: './modulesettings.view.html'
})

export class ModuleSettingsComponent {
    public settings: Setting[];

    @Input() public module: BashBoardModule;

    @Output() public settingsClosed: EventEmitter<Setting[]> = new EventEmitter();

    constructor(private modalService: NgbModal) { }

    public open(settings: String) {
        this.settings = this.module.getSettings();
        this.modalService.open(settings).result.then((result) => {
            this.settingsClosed.emit(this.settings);
        }, (reason) => {
        });
    }

    public valueIsDate(inputType: InputType): boolean {
        return inputType === InputType.DATE;
    }

    public valueIsColor(inputType: InputType): boolean {
        return inputType === InputType.COLOR;
    }

    public setDateToNow(value: Date) {
        value = new Date();
    }
}
