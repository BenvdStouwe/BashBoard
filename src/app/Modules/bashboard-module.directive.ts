import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: "bashboard-module"
})
export class BashBoardModuleDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
