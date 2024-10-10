export interface IParentFormState {
    ContractDescription: string;//--
    PointOfContactAddress: string;
    VendorPointOfContact: string;//--
    TotalContractValue: string;//--
    ContractDate: any;//--
    Comments: string;//--
    BudgetId: string;//--
    BesaOfficer: string;
    SelectedBesaEntity: string;
    SelectedProjectName: string;//--
    SelectedContractType: string;//--
    SelectedContractingParty: string;
    SelectedTransactionType: string;
    AddMore: boolean;
    HideMore: boolean;
    isDocAttached: boolean;
    DocAttachedErrMsg: string;
    PaymentDate:any;
    AddContractingParty: string;
    AddCompanyProject: string;
    AddContractType: string;
    ReminderDate:any;

    VarFixedValue?: boolean;
    VarExpiredValue?: boolean;
    VarAutoRnewal?: boolean,
    VarRenewalNotice?: boolean,
    VarPerpetual?: boolean
    VarDiscretionary?: boolean,
    VarTerminationBreach?: boolean,
    VarTerminationStopping?: boolean,

    ExpiredValue:string,
    FixedValue:string;
    AutoRenewalValue:string;
    RenewalByNoticeValue:string;
    PerpetualValue:string;
    DiscretionaryValue:string;
    TerminationBreachValue:string;
    TerminationStoppingValue:string;
    TerminationDate:Date;
    RenewalNoticeDate:Date;
    SelectedPaymentType:string;
    IProcurementModel:any;
    IPeriodicallyModel:any;
    IVariablePeriodicallyModel:any;
    DisabledValue:boolean;

    PeriodicallyModelDelete:any,
    ObligationDelete:any,
    InsuranceDelete:any,
    VariablePeriodicallyDelete:any,
    ProcurementDelete:any,

    SubmissionType:string;
    IObligation:any;
    openObligationPopup:boolean;
    IInsurance:any;
    openInsurancePopup:boolean;
    VarDropdownHide:boolean;
    selectedItemID:any;
    RequestID:string;
    PopupType:string;

    TerminationPeriod:string
    DateToExtend:string;
    DaysForNotice:string;
    RecoveryPeriod:string;
    NoOfDays:string;
    AmountUSD:string;
    RiskFactor:string;
    ReminderComment:string;
    status:string;
}