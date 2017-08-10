import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'contextmenu',
    templateUrl: './contextmenu.view.html'
})

export class ContextMenuComponent implements OnInit {
    @Input() public visible = false;
    @Input() public element = Element;

    constructor() { }

    ngOnInit() { }

    public actionz(): void {
        console.log('hoi');
    }
}
