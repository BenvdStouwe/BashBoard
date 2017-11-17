export class JobInfo {
    public naam: string;
    public status: JobStatus;
    public url: URL;
    public estimatedDuration: number;
    public duration: number;

    public get building(): boolean {
        switch (this.status) {
            case JobStatus.AFGELAST_EN_BOUWT:
            case JobStatus.GEFAALD_EN_BOUWT:
            case JobStatus.GESLAAGD_EN_BOUWT:
            case JobStatus.INSTABIEL_EN_BOUWT:
                return true;
            default:
                return false;
        }
    }

    constructor(jobResponse: JobResponse) {
        this.naam = jobResponse.name;
        this.status = jobResponse.color as JobStatus;
        this.url = new URL(jobResponse.url);
    }
}

export enum JobStatus {
    // normale statussen
    GESLAAGD = "blue",
    GEFAALD = "red",
    AFGELAST = "aborted",
    INSTABIEL = "yellow",

    // bouwstatussen
    GESLAAGD_EN_BOUWT = "blue_anime",
    GEFAALD_EN_BOUWT = "red_anime",
    AFGELAST_EN_BOUWT = "aborted_anime",
    INSTABIEL_EN_BOUWT = "yellow_anime"
}

export class JenkinsApiResponse {
    public name: string;
    public description: string;
    public jobs: JobResponse[];
}

export class JobResponse {
    public name: string;
    public url: string;
    public color: string;
}
