import { Component } from "@angular/core";
import { Http } from "@angular/http";

import { BashBoardModule, SettingNames } from "./../../Model/BashBoardModule";
import { InputType } from "./../../Model/Utilities";
import { Setting } from "./../../Settings/Setting";
import { OVMelding } from "./OVMelding";
import { OVModuleConfig } from "./ovmodule.config";

@Component({
    templateUrl: "./ovmodule.view.html"
})
export class OVModuleComponent extends BashBoardModule {
    public readonly friendlyName = "Reisinformatie";
    public readonly refreshRate = 120000;
    protected config: OVModuleConfig;

    public warnings: OVMelding[];

    constructor(private http: Http) {
        super();
    }

    public updateContent(): void {
        if (!this.canUpdate()) {
            return;
        }
        if (!this.config.station) {
            alert("Er is geen station voor de reisinformatie geselecteerd.");
            return;
        }
        this.updating = true;
        let warnings = this.getNSTrainTimes();
        this.warnings = warnings;
        super.setTimer();
        this.updating = false;
    }

    public setDefaultSettings(): void {
        this.config.title = "Reisinformatie";
        this.config.backgroundColor = "#ffb310";
        this.config.textColor = "#ffffff";
        this.config.showTimes = true;
        this.config.showWarnings = false;
        this.needsSetup = true;
    }

    public getSettings(): Setting[] {
        return [
            new Setting(SettingNames.TITLE, this.config.title),
            new Setting(SettingNames.BACKGROUNDCOLOR, this.config.backgroundColor),
            new Setting(SettingNames.TEXTCOLOR, this.config.textColor, InputType.COLOR),

            new Setting(OVSettingNames.STATION, this.config.station),
            new Setting(OVSettingNames.TRAINTIMES, this.config.showTimes, InputType.BOOLEAN),
            new Setting(OVSettingNames.WARNINGS, this.config.showWarnings, InputType.BOOLEAN),
            new Setting(OVSettingNames.NSUSERNAME, this.config.username),
            new Setting(OVSettingNames.NSPASSWORD, "", InputType.PASSWORD)
        ];
    }

    public procesSettings(settings: Setting[]): void {
        let updateContent = false;
        super.procesSettings(settings);
        for (let setting of settings) {
            switch (setting.name) {
                case OVSettingNames.STATION:
                    if (this.config.station !== setting.value) {
                        this.config.station = setting.value;
                        updateContent = true;
                    }
                    break;
                case OVSettingNames.TRAINTIMES:
                    if (this.config.showTimes !== setting.value) {
                        this.config.showTimes = setting.value;
                        updateContent = true;
                    }
                    break;
                case OVSettingNames.WARNINGS:
                    if (this.config.showWarnings !== setting.value) {
                        this.config.showWarnings = setting.value;
                        updateContent = true;
                    }
                    break;
                case OVSettingNames.NSUSERNAME:
                    if (this.config.username !== setting.value) {
                        this.config.username = setting.value;
                        updateContent = true;
                    }
                case OVSettingNames.NSPASSWORD:
                    if (setting.value) {
                        // this.storeAuthentication(this.config.username, setting.value);
                    }
            }
        }
        if (updateContent) {
            this.updateContent();
        }
    }

    private getNSWarnings(): OVMelding[] {
        return new Array<OVMelding>();
    }

    private getNSTrainTimes(): OVMelding[] {
        let url = "https://webservices.ns.nl/ns-api-avt?station=" + this.config.station;
        let headers = new Headers();
        let result = this.http.get(url).subscribe(data => {
            console.log(data);
        });
        return new Array<OVMelding>();
    }

    // private storeAuthentication(username: string, password: string): void {
    //     this.storage.store(OVStorageNames.NSAUTHENTICATION, "jemoeder");
    // }
}

enum OVSettingNames {
    STATION = "Station",
    TRAINTIMES = "Toon vertrektijden",
    WARNINGS = "Toon waarschuwingen",
    NSUSERNAME = "NS API gebruiksernaam",
    NSPASSWORD = "NS API wachtwoord"
}