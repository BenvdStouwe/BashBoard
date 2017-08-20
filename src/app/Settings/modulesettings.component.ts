import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BashBoardModule } from '../Model/BashBoardModule';
import { Setting, InputType } from './Setting';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'module-settings',
    templateUrl: './modulesettings.view.html'
})

export class ModuleSettingsComponent {
    @Input() public module: BashBoardModule;
    public settings: Setting[];
    @Output() public settingsClosed: EventEmitter<boolean> = new EventEmitter();

    constructor(private modalService: NgbModal) {}

    public open(settings: String) {
        this.settings = this.module.getSettings();
        this.modalService.open(settings).result.then((result) => {
            this.settingsClosed.emit(true);
        }, (reason) => {
            this.settingsClosed.emit(true);
        });
    }

    public valueIsDate(inputType: InputType): boolean {
        return inputType === InputType.date;
    }

    public valueIsColor(inputType: InputType): boolean {
        return inputType === InputType.color;
    }

    public setDateToNow(value: Date) {
        value = new Date();
    }
}
