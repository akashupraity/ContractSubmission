import * as React from 'react';
import styles from '../ContractSubmission.module.scss';
import { FontWeights, getTheme, IButtonStyles, IconButton, IIconProps, mergeStyleSets, Modal } from 'office-ui-fabric-react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import ParentForm from './ParentForm';

const cancelIcon: IIconProps = { iconName: 'Cancel' };
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    overflowx: 'hidden',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: '80%',
    height: '100%'
  },
  container1: {
    display: 'flex',
    overflowx: 'hidden',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: '100%',
    height: '100%'
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLarge,
    {
      flex: '1 1 auto',
      borderTop: '4px solid ${theme.palette.themePrimary}',
      overflowx: 'hidden',
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    overflowX: 'hidden',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

export interface ModelPopupProps{
  BindVarExpiredValue?:boolean,
    BindExpiredValue:string
    selectedContractSubmission:any,
    openEditDialog: boolean;
    DisabledValue: boolean;
    VarDropdownHide?: boolean;
    RadioOption:string,
    selectedItemID:any;
    RequestID: string;
    PopupType: string;
    ContractingParty: [];
    BesaEntity: [];
    ProjectName: [];
    ContractType: [];
    TransactionType: [];
    PaymentType: [];
    Period: [];
    Context: WebPartContext;
    siteURL: string;
    Documents:[],
    BindBesaEntity:string,
    BindContractingParty:string,
    BindProjectName:string,
    BindDescription:string,
    BindBesaOfficer:string,
    Bind_PaymentType:string,
    BindVendorPointOfContact:string;
    BindTotalContractValue:string;
    BindBudgetId:string;
    BindPointOfContactAddress:string;
    BindComments:string;
    BindContractDate:any;
    BindContractType:string;
    BindTransactionType:string;
    IPeriodicallyModel:any;
    IMilestoneBasedModel:any;
    IVariablePeriodicallyModel:any;
    IInsuranceModel:any;
    IObligationModel:any;
    Mode:string,
    ExitHandler: () => void; // Add the prop type for the function
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
}
export default class ModelPopup extends React.Component<ModelPopupProps,{}> {

  constructor(props:ModelPopupProps) {
    super(props);
    this.state = {

    }



   
  }
  public handleClose = () => {
    this.props.ExitHandler(); // Call the passed function
  };
  
  render() {
    return (
      <section className={`${styles.contractSubmission}`}>

<Modal
    titleAriaId={"Akash"}
    isOpen={this.props.openEditDialog}
    onDismiss={this.handleClose}
    isBlocking={true}
    containerClassName={contentStyles.container}
    scrollableContentClassName='overflow-x: hidden'>

    <div className={contentStyles.header}>
      {this.props.DisabledValue == true &&
        <span id={"Popup"}>View Submission</span>
      }
      {
        this.props.DisabledValue != true &&
        <span id={"Popup"}>Edit Submission</span>
      }
      <IconButton
        styles={iconButtonStyles}
        iconProps={cancelIcon}
        ariaLabel="Close popup modal"
        onClick={this.handleClose}
      />
    </div>
    <ParentForm
      ContractingParty={this.props.ContractingParty}
      RequestID={this.props.RequestID}
      selectedItemID={this.props.selectedItemID}
      BesaEntity={this.props.BesaEntity}
      ProjectName={this.props.ProjectName}
      ContractType={this.props.ContractType}
      TransactionType={this.props.TransactionType}
      PaymentType={this.props.PaymentType}
      Period={this.props.Period}
      Context={this.props.Context}
      siteURL={this.props.siteURL}
      Documents={this.props.Documents}
      BindBesaEntity={this.props.BindBesaEntity}
      BindBesaOfficer={this.props.BindBesaOfficer}
      BindContractingParty={this.props.BindContractingParty}
      BindProjectName={this.props.BindProjectName}
      BindDescription={this.props.BindDescription}
      Mode={this.props.Mode}
      DisabledValue={this.props.DisabledValue}
      Bind_PaymentType={this.props.Bind_PaymentType}
      BindVendorPointOfContact={this.props.BindVendorPointOfContact}
      BindTotalContractValue={this.props.BindTotalContractValue}
      BindBudgetId={this.props.BindBudgetId}
      BindPointOfContactAddress={this.props.BindPointOfContactAddress}
      BindComments={this.props.BindComments}
      BindContractDate={this.props.BindContractDate}
      BindContractType={this.props.BindContractType}
      BindTransactionType={this.props.BindTransactionType}
      IPeriodicallyModel={this.props.IPeriodicallyModel}
      IMilestoneBasedModel={this.props.IMilestoneBasedModel}
      IVariablePeriodicallyModel={this.props.IVariablePeriodicallyModel}
      IInsuranceModel={this.props.IInsuranceModel}
      IObligationModel={this.props.IObligationModel}
      BindFixedValue={this.props.BindFixedValue}
      BindVarFixedValue={this.props.BindVarFixedValue}
      BindAutoRenewalValue={this.props.BindAutoRenewalValue}
      BindVarAutoRnewal={this.props.BindVarAutoRnewal}
      BindRenewalByNoticeValue={this.props.BindRenewalByNoticeValue}
      BindVarRenewalNotice={this.props.BindVarRenewalNotice}
      BindVarPerpetual={this.props.BindVarPerpetual}
      BindPerpetualValue={this.props.BindPerpetualValue}
      BindVarDiscretionary={this.props.BindVarDiscretionary}
      BindDiscretionaryValue={this.props.BindDiscretionaryValue}
      BindVarTerminationBreach={this.props.BindVarTerminationBreach}
      BindTerminationBreachValue={this.props.BindTerminationBreachValue}
      BindVarTerminationStopping={this.props.BindVarTerminationStopping}
      BindTerminationStoppingValue={this.props.BindTerminationStoppingValue}
      selectedContractSubmission={this.props.selectedContractSubmission}
      PopupType={this.props.PopupType}
      RadioOption={this.props.RadioOption}
      BindTerminationDate={this.props.BindTerminationDate}
      BindRenewalNoticeDate={this.props.BindRenewalNoticeDate}
      BindTerminationPeriod={this.props.BindTerminationPeriod}
      BindDateToExtend={this.props.BindDateToExtend}
      BindDaysForNotice={this.props.BindDaysForNotice}
      BindRecoveryPeriod={this.props.BindRecoveryPeriod}
      BindNoOfDays={this.props.BindNoOfDays}
      BindAmountUSD={this.props.BindAmountUSD}
      BindBindRiskFactor={this.props.BindBindRiskFactor}
      BindReminderDate={this.props.BindReminderDate}
      BindBindReminderComment={this.props.BindBindReminderComment}
      BindPaymentDate={this.props.BindPaymentDate}
      BindStatus={this.props.BindStatus}
      BindVarExpiredValue={this.props.BindVarExpiredValue}
      BindExpiredValue={this.props.BindExpiredValue}

      />                          
    </Modal>

      </section>
    );
  }
}
