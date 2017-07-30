export interface IBashBoardModule {
    title: string;
    subTitle?: string;
    width: number;
    height: number;
    defaultWidth: number;
    defaultHeight: number;
    backgroundColor: string;
    content: HTMLDivElement;

    showPopup?(): void;
}
