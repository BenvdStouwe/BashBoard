import { Component, Input, OnInit } from '@angular/core';
import { BashBoardModule } from '../Model/BashBoardModule';
import { Setting, InputType } from './Setting';

@Component({
    selector: 'module-settings',
    templateUrl: './modulesettings.view.html'
})

export class ModuleSettingsComponent implements OnInit {
    @Input() public module: BashBoardModule;
    @Input() public settings: Setting[];

    ngOnInit() {
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
