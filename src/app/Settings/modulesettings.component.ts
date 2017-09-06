import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { BashBoardModule } from '../Model/BashBoardModule';
import { Setting } from './Setting';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputType } from '../Model/Utilities';

@Component({
    selector: 'module-settings',
    templateUrl: './modulesettings.view.html'
})

export class ModuleSettingsComponent {
    private settings: Setting[];

    @Input() private module: BashBoardModule;
    @Output() public settingsClosed: EventEmitter<Setting[]> = new EventEmitter();

    constructor(private modalService: NgbModal) { }

    ngOnInit(): void {
        if (this.module.needsSetup) {
            this.open(this.module);
        }
    }

    public open(settings: any) {
        this.settings = this.module.getSettings();
        this.modalService.open(settings).result.then((result) => {
            this.settingsClosed.emit(this.settings);
        }, (reason) => {
        });
    }

    public updateModule() {
        this.module.updateContent();
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
