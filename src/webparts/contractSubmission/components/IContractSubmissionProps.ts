import { WebPartContext } from "@microsoft/sp-webpart-base"

export interface IContractSubmissionProps {
    Context:WebPartContext,
    siteURL:string
    ListName:string
    PeriodicallyListName:string
    MilestoneBasedListName:string
    ChildListName:string
    ServerUrl:string
    disabled?: boolean;
}
