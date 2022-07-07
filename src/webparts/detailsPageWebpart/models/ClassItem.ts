
import { ISPItem } from "./ISPItem";

export class ClassItem{
    public Title: string;
    public Content_EN: string;
    public imageServerURL: string;
    public imageRelativeURL: number; 
    public RollupImage: string;
    public LOOKUPId: number;
    public LOOKUP2Id: number;
    public ID : number;

    constructor(item: ISPItem) {
        this.Title = item.Title;
        this.Content_EN = item.Content_EN;
        this.RollupImage = item.RollupImage;
        this.LOOKUPId = item.LOOKUPId;
        this.LOOKUP2Id = item.LOOKUP2Id;
        this.ID = item.ID;
    }
}