export interface IProcurementModel{
    Description:string,
    ExpectedDate:Date,
    AmountUSD:string
}
export interface IAuthor {
    ID: number;
    Title: string;
    EMail: string;
}
export interface IListItem {  
    Title: string,  
    ProjectName: string,  
    BesaEntity: string,  
    AuthorTitle: IAuthor | null; // Author field added here
    VndorDetails:string,
    Status:string,
    TransactionType:string,
    RequestID:string
    ID:any
}  
export interface IListItemColl {  
    value: IListItem[];  
}  