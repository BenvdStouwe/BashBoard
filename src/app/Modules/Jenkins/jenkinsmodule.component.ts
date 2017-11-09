import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

import { BashBoardModule } from "../../Model/BashBoardModule";
import { Setting } from "../../Settings/Setting";
import { JenkinsModuleConfig } from "./jenkinsmodule.config";
import { JenkinsApiResponse, JobInfo, JobStatus } from "./JobInfo";

@Component({
    templateUrl: "./jenkinsmodule.view.html",
    styleUrls: ["./jenkinsmodule.style.css"]
})
export class JenkinsModuleComponent extends BashBoardModule implements OnInit {
    protected refreshRate = 20000;
    protected config: JenkinsModuleConfig;
    private jobs: JobInfo[];

    constructor(private http: HttpClient) { super(); }

    ngOnInit(): void {
        this.setDefaultSettings();
        this.updateContent();
    }

    public updateContent(): void {
        if (!this.canUpdate()) {
            return;
        }
        this.updating = true;

        this.getBuildInfo();
    }

    private getBuildInfo(): void {
        this.http.get(this.config.apiUrl).subscribe((data: JenkinsApiResponse) => {
            this.jobs = data.jobs
                .map(job => new JobInfo(job));
            this.updating = false;
            this.setTimer();
        });
    }

    public includeJob(job: JobInfo): boolean {
        if (this.config.toonActieveJobs && job.building) {
            return true;
        }
        switch (job.status) {
            case JobStatus.GESLAAGD:
                return this.config.toonGeslaagdeJobs;
            case JobStatus.GEFAALD:
                return true;
            case JobStatus.AFGELAST:
                return this.config.toonAfgelasteJobs;
            case JobStatus.INSTABIEL:
                return this.config.toonInstabieleJobs;
            default:
                return false;
        }
    }

    public getSettings(): Setting[] {
        return this.getBasicSettings();
    }

    public setDefaultSettings(): void {
        this.config.backgroundColor = "#444444";
        this.config.textColor = "#ffffff";
        this.config.apiUrl = "http://kenny.topicus.local/view/VIP%20Monitor/api/json";
        this.config.toonActieveJobs = true;
        this.config.toonGeslaagdeJobs = false;
        this.config.toonAfgelasteJobs = false;
        this.config.toonInstabieleJobs = false;
    }
}
