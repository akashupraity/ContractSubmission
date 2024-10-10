import { IListItem } from "../Dashboard/IListItem";

export interface IMainFileState {
    ContractingParty: any;//--
    BesaEntity: any;//--
    ProjectName: any;//--
    ContractType: any;//--
    TransactionType: any;//--
    RadioOption:string;
    openEditDialog:boolean;
    items?: IListItem[];
    PaymentType:any;
    Period:any;
    DisabledValue:boolean;
    selectedItemID:any;
    RequestID:string;
    Documents:any;
    Mode:string;
    selectedContractSubmission:any,
    IPeriodicallyModel:any;
    IMilestoneBasedModel:any;
    IVariablePeriodicallyModel:any;
    IInsuranceModel:any;
    IObligationModel:any;

    BindBesaEntity:string;
    BindContractingParty:string;
    BindProjectName:string;
    BindDescription:string;
    BindBesaOfficer:string;
    Bind_PaymentType:string;
    BindVendorPointOfContact:string;
    BindTotalContractValue:string;
    BindBudgetId:string;
    BindPointOfContactAddress:string;
    BindComments:string;
    BindContractDate:any;
    BindContractType:string;
    BindTransactionType:string;
    IContractItems:any;
    allContractItems:any[];

    BindTerminationDate:Date;
    BindRenewalNoticeDate:Date;
    BindTerminationPeriod: string;
    BindDateToExtend: string;
    BindDaysForNotice: string;
    BindRecoveryPeriod: string;
    BindNoOfDays: string;
    BindAmountUSD: string;
    BindBindRiskFactor: string,
    BindReminderDate: any;
    BindBindReminderComment: string;
    BindPaymentDate: any;
    BindStatus:string;
    PopupType:string;
    BindFixedValue:string,
    BindVarFixedValue?:boolean,

    BindAutoRenewalValue:string,
    BindVarAutoRnewal?:boolean,

    BindRenewalByNoticeValue:string,
    BindVarRenewalNotice?:boolean

    BindVarPerpetual?:boolean,
    BindPerpetualValue:string

    BindVarDiscretionary?: boolean,
    BindDiscretionaryValue:string

    BindVarTerminationBreach?: boolean,
    BindTerminationBreachValue:string

    BindVarTerminationStopping?:boolean,
    BindTerminationStoppingValue:string,

    BindVarExpiredValue?:boolean,
    BindExpiredValue:string

}