import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: "[appBashboardModule]"
})
export class BashBoardModuleDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
