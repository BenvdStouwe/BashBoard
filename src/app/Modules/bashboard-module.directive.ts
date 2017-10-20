import { Directive, Input } from "@angular/core";

import { BashBoardModule } from "../Model/BashBoardModule";

@Directive({
    selector: "bashboard-module"
})
export class BashBoardModuleDirective {
    @Input() bashBoardModule: BashBoardModule;
}
