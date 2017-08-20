export class OVMelding {
    public vanStation: string;
    public naarStation: string;
    public vertrekTijd: Date;
    public vertraging: number;
    public vervoerder: Vervoerder;
    public melding?: string;
}

enum Vervoerder {
    NS = 'NS',
    ARIVA = 'Ariva'
}
