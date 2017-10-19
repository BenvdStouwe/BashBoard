import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BashBoardModule } from '../Model/BashBoardModule';
import { InputType } from '../Model/Utilities';
import { Setting } from './Setting';

@Component({
    selector: 'module-settings',
    templateUrl: './modulesettings.view.html'
})

export class ModuleSettingsComponent {
    private settings: Setting[];

    @Input() public module: BashBoardModule;
    @Output() public settingsClosed: EventEmitter<Setting[]> = new EventEmitter();

    constructor(private modalService: NgbModal) { }

    ngOnInit(): void {
        // if (this.module.needsSetup) {
        //     this.open(this.module);
        // }
    }

    public open(settings: any): void {
        this.settings = this.module.getSettings();
        this.modalService.open(settings).result.then((result) => {
            this.settingsClosed.emit(this.settings);
        }, (reason) => {
        });
    }

    public getTitle(): string {
        return this.module.friendlyName;
    }

    public updateModule(): void {
        this.module.updateContent();
    }

    public showUpdateButton(): boolean {
        return this.module.refreshRate > 0;
    }

    public updating(): boolean {
        return !this.module.canUpdate();
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
