export interface ISPItem {
    Title: string;
    Title_CH : string;
    Content_CH : string;
    Content_EN: string;
    RollupImage: string;
    ID : number;
    DisplayOrder : number;
    PublishDate : string;
    ApplicationArea_ENId : number;
    RelatedTechnology_ENId : number;

    image : (string) => void;
}