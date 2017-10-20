import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { GridConfig } from "../Model/GridConfig";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "bashboard-settings",
    templateUrl: "./bashboardsettings.view.html"
})

export class BashboardSettingsComponent {
    @Input() gridConfig: GridConfig;

    @Output() settingsClosed: EventEmitter<boolean> = new EventEmitter();

    constructor(private modalService: NgbModal) { }

    public open(settingModal: any): void {
        this.settingsClosed.emit(true);
        this.modalService.open(settingModal).result.then((result) => {
            this.settingsClosed.emit(true);
        }, (reason) => {
            this.settingsClosed.emit(true);
        });
    }
}
