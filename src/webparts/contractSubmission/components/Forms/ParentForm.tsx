import * as React from 'react';
import styles from '../ContractSubmission.module.scss';
import { IParentFormState } from './IParentFormState';
import { Checkbox, DatePicker, DefaultButton, Dropdown, FontWeights, getTheme, IButtonStyles, IconButton, IIconProps, mergeStyleSets, Modal, TextField } from 'office-ui-fabric-react';
import Periodically from './PeriodicallyItems';
import MilestoneBased from './MilestoneBased';
import SPServices from '../Services/SPServices';
import VariablePeriodically from './VariablePeriodically';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Web } from '@pnp/sp-commonjs';
import Obligation from './Obligation';
import Insurance from './Insurance';

export interface ParentFormProps {
  selectedItemID:any,
  RequestID:string,
  selectedContractSubmission:any,
  ContractingParty: [],
  BesaEntity: [],
  ProjectName: [],
  ContractType: [],
  TransactionType: [],
  PaymentType: [],
  Period:[],
  Context:WebPartContext,
  siteURL:string,
  Mode:string,
  PopupType:string,
  DisabledValue:boolean,
  RadioOption:string,
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
  IPeriodicallyModel:any[];
  IVariablePeriodicallyModel:[];
  IObligationModel:[];
  IInsuranceModel:[];
  IMilestoneBasedModel:[];
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
  BindPaymentDate: null;
  BindStatus:string;
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
export interface IPeriodicallyProps {
  IPeriodicallyModel: any[];
  Period: any[];
}

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
const AddMoreIcon: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralDark,
    marginLeft: '96%',
    marginTop: '4px',
    marginRight: '20px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
export default class ParentForm extends React.Component<ParentFormProps, IParentFormState> {
  _input: any;
  public AddContractingParty: string;
  public AddCompanyProject: string;
  public AddContractType: string;
  public AddRenewalPeriod: string
  public AddDaysBeforeRenewalDate: string
  public AddDaysForNotice: string;
  public AddAmountUSD: string;
  public AddRecoveryPeriod: string;
  public SelectedNoOfDays: string;
  public AddPaymentType: string;
  public AddNoOfDays: string;
  public AddRiskFactor: string;
  public AddReminderComment: string

  constructor(props) {

    super(props);
    this.state = {
      ContractDescription: this.props.BindDescription||'',
      PointOfContactAddress: this.props.BindPointOfContactAddress||'',
      VendorPointOfContact: this.props.BindVendorPointOfContact||'',
      TotalContractValue: this.props.BindTotalContractValue||'',
      ContractDate: this.props.BindContractDate||null,
      Comments: this.props.BindComments||'',
      BudgetId: this.props.BindBudgetId||'',
      BesaOfficer: this.props.BindBesaOfficer||'',
      SelectedBesaEntity: this.props.BindBesaEntity||'',
      SelectedProjectName: this.props.BindProjectName||'',
      SelectedContractType: this.props.BindContractType||'',
      SelectedContractingParty: this.props.BindContractingParty||'',
      SelectedTransactionType: this.props.BindTransactionType||'',
      isDocAttached: false,
      DocAttachedErrMsg: '',
      AddContractingParty: '',
      AddCompanyProject: '',
      AddContractType: '',
      HideMore: false,
      AddMore: false,
      DisabledValue: null,
      VarFixedValue:props.BindVarFixedValue||false,
      VarExpiredValue:props.BindVarExpiredValue|| false,
      VarAutoRnewal:props.BindVarAutoRnewal|| false,
      VarRenewalNotice:props.BindVarRenewalNotice|| false,
      VarPerpetual:props.BindVarPerpetual|| false,
      VarDiscretionary:props.BindVarDiscretionary|| false,
      VarTerminationBreach:props.BindVarTerminationBreach|| false,
      VarTerminationStopping:props.BindVarTerminationStopping|| false,
      FixedValue: props.BindFixedValue||'',
      AutoRenewalValue:props.BindAutoRenewalValue|| '',
      RenewalByNoticeValue:props.BindRenewalByNoticeValue|| '',
      PerpetualValue: '',
      DiscretionaryValue:props.BindDiscretionaryValue|| '',
      TerminationBreachValue:props.BindTerminationBreachValue||'',
      TerminationStoppingValue:props.BindTerminationStoppingValue|| '',
      TerminationDate:props.BindTerminationDate||undefined,
      RenewalNoticeDate:props.BindRenewalNoticeDate||undefined,
      SelectedPaymentType:props.Bind_PaymentType||'',
      IProcurementModel:props.IMilestoneBasedModel||[],
      IPeriodicallyModel:props.IPeriodicallyModel||[],
      IVariablePeriodicallyModel:props.IVariablePeriodicallyModel||[],
      IInsurance: this.props.IInsuranceModel||[],
      IObligation:this.props.IObligationModel||[],
      TerminationPeriod:this.props.BindTerminationPeriod|| '',
      DateToExtend: this.props.BindDateToExtend||'',
      DaysForNotice:this.props.BindDaysForNotice|| '',
      RecoveryPeriod: this.props.BindRecoveryPeriod|| '',
      NoOfDays: this.props.BindNoOfDays|| '',
      AmountUSD:this.props.BindAmountUSD||'',
      RiskFactor:this.props.BindBindRiskFactor||'',
      ReminderComment:this.props.BindBindReminderComment||'',
      status:this.props.BindStatus||'',
      PaymentDate:this.props.BindPaymentDate|| null,
      ReminderDate:this.props.BindReminderDate||null,
      SubmissionType: '',
      openObligationPopup: false,
      openInsurancePopup: false,
      selectedItemID: null,
      RequestID: '',
      PopupType: '',
      VarDropdownHide: false,
      PeriodicallyModelDelete:[],
      ObligationDelete:[],
      InsuranceDelete:[],
      VariablePeriodicallyDelete:[],
      ProcurementDelete:[],
      ExpiredValue:props.BindExpiredValue||''
    }
    this.AttachmentErr = this.AttachmentErr.bind(this);
    this.AddMoreInfo = this.AddMoreInfo.bind(this);
    this.ExitAddMore = this.ExitAddMore.bind(this);
    this._getFixedValue = this._getFixedValue.bind(this);
    this._getExpiredValue = this._getExpiredValue.bind(this);
    this._getAutoRenewal = this._getAutoRenewal.bind(this);
    this._getRenewalNotice = this._getRenewalNotice.bind(this);
    this._getPerpetual = this._getPerpetual.bind(this);
    this._getDiscretionary = this._getDiscretionary.bind(this);
    this._getTerminationBreach = this._getTerminationBreach.bind(this);
    this._getTerminationStopping = this._getTerminationStopping.bind(this);
    this.ObligationExitHandler = this.ObligationExitHandler.bind(this);
    this.ObligationOpenPopup = this.ObligationOpenPopup.bind(this);
    this.InsuranceExitHandler = this.InsuranceExitHandler.bind(this);
    this.InsuranceOpenPopup = this.InsuranceOpenPopup.bind(this);
  }
  private _getFixedValue(fixedEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarFixedValue?: boolean) {
    if (VarFixedValue == false) {

      this.setState({ VarFixedValue, FixedValue: null });
    } else {
      this.setState({ VarFixedValue, FixedValue: fixedEv.currentTarget.title });
    }

  }
  private _getExpiredValue(ExpiredEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarExpiredValue?: boolean) {
    if (VarExpiredValue == false) {
      this.setState({ VarExpiredValue, ExpiredValue: null });
    } else {
      this.setState({ VarExpiredValue, ExpiredValue: ExpiredEv.currentTarget.title });
    }

  }

  //This is function used for Periodically Items add row--
  handleAddRow = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newRow = {
      id: id,
      FirstPaymentDate: '',
      AmountUSD: '',
      Period: ''
    };
    
    this.setState(prevState => ({
      IPeriodicallyModel: [...prevState.IPeriodicallyModel, newRow]
    }));
  };

  handleRemoveRow = (idx: number) => {
    this.setState(prevState => {
      const removedRow = prevState.IPeriodicallyModel[idx];
  
      // Check if the row has an ID (i.e., it has been saved in the backend)
      let updatedPeriodicallyModelDelete = prevState.PeriodicallyModelDelete;
      if (removedRow.Id) {
        updatedPeriodicallyModelDelete = [...prevState.PeriodicallyModelDelete, removedRow];
      }
  
      // Remove the row from IPeriodicallyModel
      const updatedPeriodicallyModel = prevState.IPeriodicallyModel.filter((row, i) => i !== idx);
  
      return {
        IPeriodicallyModel: updatedPeriodicallyModel,
        PeriodicallyModelDelete: updatedPeriodicallyModelDelete
      };
    });
    
  };
  

  handleChange = (index: number, evt: any) => {
    const { name, value } = evt.target;
    this.setState(prevState => ({
      IPeriodicallyModel: prevState.IPeriodicallyModel.map((row, i) =>
        i === index ? { ...row, [name]: value } : row
      )
    }));
  };
  //-----This is function ended of Periodically-----




  //----This is function used for Obligation Items add row--
  _handleObligationAddRow = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newRow = {
        id: id,
        Description: '',
        Date: '',
        Frequency: ''
    };

    this.setState(prevState => ({
      IObligation: [...prevState.IObligation, newRow]
    }));
  };

  _handleRemoveObligationSpecificRow = (idx: number) => {
    this.setState(prevState => {
      const removedRow = prevState.IObligation[idx];
  
      // Check if the row has an Id (i.e., it exists in the backend and needs to be tracked for deletion)
      let updatedObligationDelete = prevState.ObligationDelete || [];
      if (removedRow.Id) {
        updatedObligationDelete = [...updatedObligationDelete, removedRow];
      }
  
      // Remove the row from IObligation
      const updatedObligation = prevState.IObligation.filter((row, i) => i !== idx);
  
      return {
        IObligation: updatedObligation,
        ObligationDelete: updatedObligationDelete
      };
    });
  };

  _handleChangeObligation = (index: number, evt: any) => {
    const { name, value } = evt.target;
    this.setState(prevState => ({
      IObligation: prevState.IObligation.map((row, i) =>
        i === index ? { ...row, [name]: value } : row
      )
    }));
  };
  //-----This is function ended of Obligation-----

//----This is function used for Insurance Items add row--
_handleInsuranceAddRow = () => {
  const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  const newRow = {
    id: id,
    Insurance: '',
    Amount: '',
    Comment: ''
  };

  this.setState(prevState => ({
    IInsurance: [...prevState.IInsurance, newRow]
  }));
};

_handleRemoveInsuranceSpecificRow = (idx: number) => {
  this.setState(prevState => {
    const removedRow = prevState.IInsurance[idx];

    // Check if the row has an Id (i.e., exists in the backend and needs deletion)
    let updatedInsuranceDelete = prevState.InsuranceDelete || [];
    if (removedRow.Id) {
      updatedInsuranceDelete = [...updatedInsuranceDelete, removedRow];
    }

    // Remove the row from IInsurance
    const updatedInsurance = prevState.IInsurance.filter((row, i) => i !== idx);

    return {
      IInsurance: updatedInsurance,
      InsuranceDelete: updatedInsuranceDelete
    };
  });
};

_handleChangeInsurance = (index: number, evt: any) => {
  const { name, value } = evt.target;
  this.setState(prevState => ({
    IInsurance: prevState.IInsurance.map((row, i) =>
      i === index ? { ...row, [name]: value } : row
    )
  }));
};
//-----This is function ended of Insurance-----

//This is function used for Variable Periodically Items add row--
  _handleAddRowIVariablePeriodicallyModel = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newRow = {
        id: id,
        FromDate: Date,
        ToDate: Date,
        AmountUSD: '',
        Period: ''
    };

    this.setState(prevState => ({
      IVariablePeriodicallyModel: [...prevState.IVariablePeriodicallyModel, newRow]
    }));
  };

  _handleRemoveSpecificRowIVariablePeriodicallyModel = (idx: number) => {
    this.setState(prevState => {
      const removedRow = prevState.IVariablePeriodicallyModel[idx];
  
      // Check if the row has an Id (i.e., exists in the backend and needs to be deleted)
      let updatedVariablePeriodicallyDelete = prevState.VariablePeriodicallyDelete || [];
      if (removedRow.Id) {
        updatedVariablePeriodicallyDelete = [...updatedVariablePeriodicallyDelete, removedRow];
      }
  
      // Remove the row from IVariablePeriodicallyModel
      const updatedVariablePeriodicallyModel = prevState.IVariablePeriodicallyModel.filter((row, i) => i !== idx);
  
      return {
        IVariablePeriodicallyModel: updatedVariablePeriodicallyModel,
        VariablePeriodicallyDelete: updatedVariablePeriodicallyDelete
      };
    });
  };

  _handleChangeVariablePeriodically = (index: number, evt: any) => {
    const { name, value } = evt.target;
    this.setState(prevState => ({
      IVariablePeriodicallyModel: prevState.IVariablePeriodicallyModel.map((row, i) =>
        i === index ? { ...row, [name]: value } : row
      )
    }));
  };
  //This is function ended of Periodically-----


  //This is function used for Milestone Items add row--
  Milestone_handleAddRow = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newRow = {
      id: id,
      Description: '',
      ExpectedDate: Date,
      AmountUSD: ''
    };

    this.setState(prevState => ({
      IProcurementModel: [...prevState.IProcurementModel, newRow]
    }));
  };

  Milestone_handleRemoveRow = (idx: number) => {
    this.setState(prevState => {
      const removedRow = prevState.IProcurementModel[idx];
  
      // Check if the row has an Id (i.e., exists in the backend and needs deletion)
      let updatedProcurementDelete = prevState.ProcurementDelete || [];
      if (removedRow.Id) {
        updatedProcurementDelete = [...updatedProcurementDelete, removedRow];
      }
  
      // Remove the row from IProcurementModel
      const updatedProcurementModel = prevState.IProcurementModel.filter((row, i) => i !== idx);
  
      return {
        IProcurementModel: updatedProcurementModel,
        ProcurementDelete: updatedProcurementDelete
      };
    });
  };

  Milestone_handleChange = (index: number, evt: any) => {
    const { name, value } = evt.target;
    this.setState(prevState => ({
      IProcurementModel: prevState.IProcurementModel.map((row, i) =>
        i === index ? { ...row, [name]: value } : row
      )
    }));
  };

  private _getAutoRenewal(AutoRenewalEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarAutoRnewal?: boolean) {
    if (VarAutoRnewal == false) {
      this.setState({ VarAutoRnewal, AutoRenewalValue: null });
    } else {
      this.setState({ VarAutoRnewal, AutoRenewalValue: AutoRenewalEv.currentTarget.title });
    }
  }


  private _getRenewalNotice(RenewalByNoticeEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarRenewalNotice?: boolean) {
    if (VarRenewalNotice == false) {
      this.setState({ VarRenewalNotice, RenewalByNoticeValue: null });
    } else {
      this.setState({ VarRenewalNotice, RenewalByNoticeValue: RenewalByNoticeEv.currentTarget.title });
    }

  }

  private _getPerpetual(PerpetualEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarPerpetual?: boolean) {
    if (VarPerpetual == false) {
      this.setState({ VarPerpetual, PerpetualValue: null });
    } else {
      this.setState({ VarPerpetual, PerpetualValue: PerpetualEv.currentTarget.title });
    }

  }

  // 2nd Raw-------//
  private _getDiscretionary(DiscretionaryEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarDiscretionary?: boolean) {
    if (VarDiscretionary == false) {
      this.setState({ VarDiscretionary, DiscretionaryValue: null });
    } else {
      this.setState({ VarDiscretionary, DiscretionaryValue: DiscretionaryEv.currentTarget.title });
    }

  }
  private _getTerminationBreach(TerminationBreachEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarTerminationBreach?: boolean) {
    if (VarTerminationBreach == false) {
      this.setState({ VarTerminationBreach, TerminationBreachValue: null });
    } else {
      this.setState({ VarTerminationBreach, TerminationBreachValue: TerminationBreachEv.currentTarget.title });
    }

  }
  private _getTerminationStopping(TerminationStoppingEv?: React.FormEvent<HTMLElement | HTMLInputElement>, VarTerminationStopping?: boolean) {
    if (VarTerminationStopping == false) {
      this.setState({ VarTerminationStopping, TerminationStoppingValue: null });
    } else {
      this.setState({ VarTerminationStopping, TerminationStoppingValue: TerminationStoppingEv.currentTarget.title });
    }

  }

  AttachmentErr() {
    this.setState({ isDocAttached: false })
  }
  // --------------getBesaEntity --------------
  public getBesaEntity = (event: any, data: any) => {
    this.setState({ SelectedBesaEntity: data.text })
  }
  // --------------getComment --------------
  public getAmountUSD = (event: any, data: any) => {
    this.AddAmountUSD = data;
    this.setState({ AmountUSD: data })
  }
  // --------------getTransactionType --------------
  public getTransactionType = (event: any, data: any) => {
    this.setState({ SelectedTransactionType: data.text })

  }
  // --------------getBesaOfficerTestField--------------
  public getBesaOfficer = (event: any, data: any) => {
    this.setState({ BesaOfficer: data })

  }
  public PaymentDateChange = (Paymentdate: Date | null | undefined): void => {
    this.setState({
      PaymentDate: Paymentdate
    });
  };

  /* Contract Date select*/
  public ContractDateChange = (Contractdate: Date | null | undefined): void => {
    this.setState({
      ContractDate: Contractdate
    });
  };
  //--------------getVendorContact--------------
  public getVendorContact = (event: any, data: any) => {
    this.setState({ VendorPointOfContact: data })
  }

  // --------------getContractValue --------------
  public getContractValue = (event: any, data: any) => {
    this.setState({ TotalContractValue: data })
  }
  // --------------getBudgetId --------------
  public getBudgetId = (event: any, data: any) => {
    this.setState({ BudgetId: data })
  }
  // --------------getComment --------------
  public getComment = (event: any, data: any) => {
    this.setState({ Comments: data })
  }
  // --------------getContractDescription--------------
  public getContractDescription = (event: any, data: any) => {
    this.setState({ ContractDescription: data })
  }
  // --------------getAddress --------------
  public getAddress = (event: any, data: any) => {
    this.setState({ PointOfContactAddress: data })
  }

  public getContractingParty = (event: any, data: any) => {
    this.setState({ SelectedContractingParty: data.text })
  }

  public getAddContractingParty = (event: any, data: any) => {
    const forbiddenChars = /[~`!@#$%^*_+={}\[\]:;.<>/?]/;
    if (forbiddenChars.test(data)) {
      alert("Data contains invalid character")
      event.preventDefault();

    } else
      this.setState({ AddContractingParty: data.replaceAll(/[~`!@#$%^*_+={}\[\]:;.<>/?]/g, '') })
  }

  public getProjectName = (event: any, data: any) => {
    this.setState({ SelectedProjectName: data.text })
  }

  public getAddProjectName = (event: any, data: any) => {
    const forbiddenChars = /[~`!@#$%^*_+={}\[\]:;.<>/?]/;
    if (forbiddenChars.test(data)) {
      alert("Data contains invalid character")
      event.preventDefault();

    } else
      this.setState({ AddCompanyProject: data.replaceAll(/[~`!@#$%^*_+={}\[\]:;.<>/?]/g, '') })
  }

  public getContractType = (event: any, data: any) => {
    this.setState({ SelectedContractType: data.text })
  }

  public getAddContractType = (event: any, data: any) => {
    const forbiddenChars = /[~`!@#$%^*_+={}\[\]:;.<>/?]/;
    if (forbiddenChars.test(data)) {
      alert("Data contains invalid character")
      event.preventDefault();

    } else
      this.setState({ AddContractType: data.replaceAll(/[~`!@#$%^*_+={}\[\]:;.<>/?]/g, '') })
  }
  public TerminationDateChange = (Terminationdate: Date | null | undefined): void => {
    this.setState({ TerminationDate: Terminationdate });
  };
  // --------------getComment --------------
  public getRenewalPeriod = (event: any, data: any) => {
    this.AddRenewalPeriod = data;
    this.setState({TerminationPeriod:data})
  }
  // --------------getComment --------------
  public getDaysBeforeRenewalDate = (event: any, data: any) => {
    this.AddDaysBeforeRenewalDate = data
    this.setState({DateToExtend:data})
  }
  // Renewal By Notice Date
  public RenewalNoticeDateChange = (RenewalNoticeDate: Date | null | undefined): void => {
    this.setState({ RenewalNoticeDate: RenewalNoticeDate });
  };

  // --------------getComment --------------
  public getDaysForNotice = (event: any, data: any) => {
    this.AddDaysForNotice = data;
    this.setState({ DaysForNotice: data })

  }
  // --------------getComment --------------
  public getRecoveryPeriod = (event: any, data: any) => {
    this.AddRecoveryPeriod = data;
    this.setState({ RecoveryPeriod: data })
  }
  // --------------getComment --------------
  public getNoOfDays = (event: any, data: any) => {
    this.AddNoOfDays = data;
    this.setState({ NoOfDays: data })
  }

  // --------------getComment --------------
  public getRiskFactor = (event: any, data: any) => {
    this.AddRiskFactor = data;
  this.setState({ RiskFactor: data })
  }
  // --------------getComment --------------
  public getReminderComment = (event: any, data: any) => {
    this.AddReminderComment = data;
    this.setState({ ReminderComment: data })
  }
  /**
   * Contract Date select
   */
  public ReminderDateChange = (Reminderdate: Date | null | undefined): void => {
    this.setState({ ReminderDate: Reminderdate });
  };
  
  public _getPaymentType = (event: any, data: any) => {
    const selectedPaymentType = data.text;
     this.AddPaymentType = data.text;
    this.setState({ 
      SelectedPaymentType: selectedPaymentType, 
      IProcurementModel: [],
      IPeriodicallyModel: [],
      IVariablePeriodicallyModel: [] 
    });
  
    try {
      const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      let newRow;
  
      if (selectedPaymentType === "Milestone based") {
        newRow = {
          id: id,
          Description: '',
          ExpectedDate: Date,
          AmountUSD: ''
        };
  
        this.setState(prevState => ({
          IProcurementModel: [...prevState.IProcurementModel, newRow]
        }));
      } 
      else if (selectedPaymentType === "Periodically") {
        newRow = {
          id: id,
          FirstPaymentDate: '',
          AmountUSD: '',
          Period: ''
        };
  
        this.setState(prevState => ({
          IPeriodicallyModel: [...prevState.IPeriodicallyModel, newRow]
        }));
      } 
      else if (selectedPaymentType === "Variable Periodically") {
        newRow = {
          id: id,
          FromDate: Date,
          ToDate: Date,
          AmountUSD: '',
          Period: ''
        };
  
        this.setState(prevState => ({
          IVariablePeriodicallyModel: [...prevState.IVariablePeriodicallyModel, newRow]
        }));
      }
    } catch (error) {
      console.log("Error in React Table handle Add Row: " + error);
    }
  }
  
  AddMoreInfo() {
    this.setState({ AddMore: true })
  }
  HideMoreInfo() {

    this.setState({ HideMore: false })
  }
  // Close Add More Info Popup
  public ExitAddMore() {
    this.setState({
      AddMore: false
    })
  }
  public renderDocuments() {
    return this.props.Documents.map((item: any, idx: any) => {

      return (<div key={idx}>
        <a href={item.EncodedAbsUrl} target="_blank" data-interception="off" >{item.FileLeafRef}</a>
      </div>

      )
    }
    )
  }

  
  // Close Obligation Popup
  public ObligationExitHandler(idx: any) {
    this.setState({ openObligationPopup: false })
  }
  // Open Obligation Popup
  public ObligationOpenPopup() {
    this.setState({ openObligationPopup: true })
  }
  // Close Insurance Popup
  public InsuranceExitHandler(idx: any) {
    this.setState({ openInsurancePopup: false })
  }
  // Open Insurance Popup
  public InsuranceOpenPopup() {
    this.setState({ openInsurancePopup: true })
  }

  public handleKeyDown = (e: any) => {
    const forbiddenChars = /[~`!@#$%^*_+={}\[\]:;.<>/?]/;
    if (forbiddenChars.test(e.key)) {
      e.preventDefault();
    }
  }

//** Generate Requestor unique ID */
public _getUniqueRequestorID = (ContractItemId: any) => {
  let ConItemId = ContractItemId.toString();
  var uniqueID = "";
  if (ContractItemId < 10) {
    uniqueID = "000" + ConItemId
  }
  if (ContractItemId >= 10 && ContractItemId < 100) {
    uniqueID = "00" + ConItemId
  }
  if (ContractItemId >= 100 && ContractItemId < 1000) {
    uniqueID = "0" + ConItemId
  }
  if (ContractItemId >= 1000) {
    uniqueID = ConItemId;
  }
  return "P-" + uniqueID;
}

//Create Folder in library when attahment is submitted--
public createFolders(CompanyName: string, Project: string, child: string, ContractID: string) {
  const web = Web(this.props.siteURL);
  const libraryUrl = "ContractManagementLibrary";
  
  const createFolder = async (basePath: string, folderName: string) => {
    await web.getFolderByServerRelativeUrl(basePath).folders.add(folderName);
  };

  const uploadFile = () => {
    this.uploadFileFromControl(CompanyName || "", Project || "", child || "", ContractID);
  };

  const folderStructure = async () => {
    try {
      if (CompanyName) {
        await createFolder(libraryUrl, CompanyName);
      }
      if (Project) {
        await createFolder(`${libraryUrl}/${CompanyName || ""}`, Project);
      }
      if (child) {
        await createFolder(`${libraryUrl}/${CompanyName || ""}/${Project || ""}`, child);
      }
      uploadFile();
      console.log("Folders created successfully!");
    } catch (error) {
      console.error("Error creating folders:", error);
    }
  };

  folderStructure();
}


public uploadFileFromControl(Folder: any, SubFolder: any, child: any, ContractId: any) {
  let web = Web(this.props.Context.pageContext.web.absoluteUrl);
  var file = this._input.files[0];
  let url = [Folder, SubFolder, child].filter(part => part !== "").join("/");

  // Generate a unique file name
  const randomTwoDigit = Math.floor(10 + Math.random() * 90);
  const uniqueFileName = `${file.name.split('.')[0]}_${randomTwoDigit}.${file.name.split('.').pop()}`;

  web.getFolderByServerRelativeUrl(`${this.props.Context.pageContext.web.serverRelativeUrl}/ContractManagementLibrary/${url}`)
    .files.add(uniqueFileName, file, true)
    .then(data => {
      console.log("File Uploaded");

      data.file.getItem().then(item => {
        this.updateContractId(item);
      }).catch(error => {
        console.error("Error retrieving item:", error);
      });
    })
    .catch(error => {
      console.error("File upload failed:", error);
      alert("Error uploading file");
    });
}

private updateContractId(item: any) {
  item.update({
    ContractId: this.state.status
  })
  .then(() => {
    console.log("Metadata Updated");
    this.handleSubmission();
  })
  .catch(error => {
    console.error("Error updating metadata:", error);
    // Retry updating the ContractId
    setTimeout(() => {
      console.log("Retrying ContractId update...");
      this.retryUpdateContractId(item);
    }, 2000); // Retry after 2 seconds
  });
}

private retryUpdateContractId(item: any) {
  item.update({
    ContractId: this.state.status
  })
  .then(() => {
    console.log("ContractId re-saved successfully");
    this.handleSubmission();
  })
  .catch(error => {
    console.error("Failed to re-save ContractId:", error);
    alert("ContractId could not be saved. Please try again.");
  });
}

private handleSubmission() {
  const reloadTime = this.state.SubmissionType === 'Draft' ? 150 : 200;

  setTimeout(() => {
    window.location.reload();
  }, reloadTime);
}


// This event will we Attachment File function call----
// public uploadFileFromControl(Folder: any, SubFolder: any, child: any, ContractId: any) {
//   //Get the file from File DOM
//   let web = Web(this.props.Context.pageContext.web.absoluteUrl)
//   var files = this._input.files;
//   var file = files[0];
//   let url: any = "";

//   if (Folder != "" && SubFolder != "") {
//     url = "/" + Folder + "/" + SubFolder
//     if (child != "") {
//       url = "/" + Folder + "/" + SubFolder + "/" + child
//     }
//   }
//   if (Folder != "" && SubFolder == "") {
//     url = "/" + Folder
//     if (child != "") {
//       url = "/" + Folder + "/" + child
//     }
//   }
//   if (Folder == "" && SubFolder != "") {
//     url = "/" + SubFolder
//     if (child != "") {
//       url = "/" + SubFolder + "/" + child
//     }
//   }
//   if (Folder == "" && SubFolder == "") {
//     url = ""
//     if (child != "") {
//       url = "/" + child
//     }
//   }
//   const randomTwoDigit = Math.floor(10 + Math.random() * 90); // Generates a 2-digit random number (10-99)
//   const uniqueFileName = file.name.split('.')[0] + '_' + randomTwoDigit + '.' + file.name.split('.').pop();
//   web.getFolderByServerRelativeUrl(this.props.Context.pageContext.web.serverRelativeUrl + "/ContractManagementLibrary" + url).files.add(uniqueFileName, file, true)
//   .then((data) => {
//     console.log("File Uploaded");
//     setTimeout(
//       function () {
//         data.file.getItem().then(item => {
//           item.update({
//             Contract: this.state.status
//           }).then((myupdate) => {
//             console.log(myupdate);
//             console.log("Metadata Updated");
//           });
//           this.setState({ VarDisabledBtnOnCreate: false });
//           if (this.state.SubmissionType == 'Draft') {
//             //alert("Request Drafted Succesfully ");
//             setTimeout(
//               function () {
//                 window.location.reload();

//               }
//                 .bind(this),
//               150

//             );

//           }
//           if (this.state.SubmissionType == 'Submitted') {
//             setTimeout(
//               function () {
//                 window.location.reload();
//                 this.setState({ VarDisabledBtnOnCreate: false });
//               }
//                 .bind(this),
//               200

//             );
//           }
//           if (this.state.SubmissionType == 'Update') {
//             // alert("Request Updated Succesfully ");
//             setTimeout(
//               function () {
//                 window.location.reload();
//                 this.setState({ VarDisabledBtnOnCreate: false });
//               }
//                 .bind(this),
//               200

//             );
//           }
//         })
//           .catch((error) => {
//             alert("Error is uploading");
//           });

//       }.bind(this), 80);


//   })

//   //window.location.reload();

// }


  public createItem = (SubmissionType: any) => {
    const listName = "Contract Management";
    this.setState({ SubmissionType: SubmissionType })
    var files = this._input.files;
     if (files.length == 0) {
     this.setState({ isDocAttached: true, DocAttachedErrMsg: "Please attach document/file" })
     } else
     this.setState({ isDocAttached: false })
    if (files.length > 0) {
    let isConfirm = confirm("Are you sure want to create item")
    if (isConfirm) {
      // this.setState({ VarDisabledBtnOnCreate: true });
      let PostData: any = {};
      PostData = {
        //---Basic Form Inputes---
        BesaEntity: this.state.SelectedBesaEntity == undefined ? "" : this.state.SelectedBesaEntity,
        Title: this.state.SelectedContractingParty === 'Other' ? this.state.AddContractingParty : this.state.SelectedContractingParty,
        ProjectName: this.state.SelectedProjectName === 'Other' ? this.state.AddCompanyProject : this.state.SelectedProjectName,
        ContractType: this.state.SelectedContractType === 'Other' ? this.state.AddContractType : this.state.SelectedContractType,
        DescriptionOfProduct: this.state.ContractDescription == undefined ? " " : this.state.ContractDescription,
        BesaOfficer: this.state.BesaOfficer,
        VendorPointOfContract:this.state.VendorPointOfContact == undefined ? "" : this.state.VendorPointOfContact,
        TotalContractValue: this.state.TotalContractValue == undefined ? "" : this.state.TotalContractValue,
        BudgetID: this.state.BudgetId == undefined ? "" : this.state.BudgetId,
        PointOfContractAddress: this.state.PointOfContactAddress == undefined ? "" : this.state.PointOfContactAddress,
        Comments: this.state.Comments == undefined ? " " : this.state.Comments ,
        ContractDate: this.state.ContractDate == undefined ? null : this.state.ContractDate,
        TransactionType: this.state.SelectedTransactionType,
        //---Basic Form Inputes End---
       //---Term Type Inputs---
        TerminationType: this.state.FixedValue + "" + this.state.AutoRenewalValue + "" + this.state.RenewalByNoticeValue + "" + this.state.PerpetualValue,
        NoticeOfTermination: this.state.DiscretionaryValue + "" + this.state.TerminationBreachValue + "" + this.state.TerminationStoppingValue,
        FixedDate: this.state.TerminationDate == undefined ? null : this.state.TerminationDate,
        RenewalDate: this.state.RenewalNoticeDate == undefined ? null : this.state.RenewalNoticeDate,
        TerminationPeriod: this.AddRecoveryPeriod == undefined ? "" : this.AddRecoveryPeriod,
        DateToExtend: this.AddDaysBeforeRenewalDate == undefined ? null : this.AddDaysBeforeRenewalDate,
        ConvinienceDate: this.AddDaysForNotice == undefined ? "" : this.AddDaysForNotice,
        RecoveryPeriod: this.AddRecoveryPeriod == undefined ? "" : this.AddRecoveryPeriod,
        AutoRenualDate: this.SelectedNoOfDays == undefined ? "" : this.SelectedNoOfDays,
        PaymentType: this.state.SelectedPaymentType,
        AmmountUSD: this.state.AmountUSD == undefined ? "" : this.state.AmountUSD,
        PaymentDate: this.state.PaymentDate == undefined ? null : this.state.PaymentDate,
        //---Term Type Inputs End---
        RiskFactor: this.state.RiskFactor,
        ReminderComment: this.state.ReminderComment,
        ReminderDate: this.state.ReminderDate,
        Status: "Submitted"
      }
      // Periodically items validation
      if (this.state.IPeriodicallyModel) {
        const hasInvalidPeriodicallyItems = this.state.IPeriodicallyModel.some((PeriodicallyModel: any) => {
            return !PeriodicallyModel.FirstPaymentDate || !PeriodicallyModel.AmountUSD || !PeriodicallyModel.Period;
        });

        if (hasInvalidPeriodicallyItems) {
            alert("Please fill in all required fields in the periodically items.");
            return; // Stop item creation if any periodically items have missing fields
        }
      }
      



       // Variabl Periodically items validation
       if (this.state.IVariablePeriodicallyModel) {
        const hasInvalidVariablePeriodicallyItems = this.state.IVariablePeriodicallyModel.some((VariablePeriodicallyModel: any) => {
            return !VariablePeriodicallyModel.FromDate || !VariablePeriodicallyModel.ToDate || !VariablePeriodicallyModel.AmountUSD|| !VariablePeriodicallyModel.Period;
        });

        if (hasInvalidVariablePeriodicallyItems) {
            alert("Please fill in all required fields in the Variable periodically items.");
            return; // Stop item creation if any periodically items have missing fields
        }
      }
      
      
       // Periodically items validation
       if (this.state.IObligation) {
        const hasInvalidObligationItems = this.state.IObligation.some((ObligationItems: any) => {
            return !ObligationItems.Description || !ObligationItems.Date || !ObligationItems.Frequency;
        });

        if (hasInvalidObligationItems) {
            alert("Please fill in all required fields in the Obligation items.");
            return; // Stop item creation if any periodically items have missing fields
        }
      }

      // Milestone items validation
      if (this.state.IProcurementModel) {
        const hasInvalidIProcurementModel = this.state.IProcurementModel.some((ProcurementModel: any) => {
            return !ProcurementModel.Description || !ProcurementModel.ExpectedDate || !ProcurementModel.AmountUSD
        });

        if (hasInvalidIProcurementModel) {
            alert("Please fill in all required fields in the Milestone Based  items.");
            return; // Stop item creation if any Milestone items have missing fields
        }
      }
      //if (this.state.file.length>0) {
      SPServices
        .saveListData(listName, PostData)
        .then((result:string) => {
          this.setState({ status: result});

          let requestorUniqueID = this._getUniqueRequestorID(this.state.status);
          SPServices.UpdateUiniqueID( this.state.status, requestorUniqueID, "Contract Management");

          //--Call Periodially function for submit data---
          if (this.state.IPeriodicallyModel) {
            const jsonObjArr = this.state.IPeriodicallyModel
            .map((PeriodicallyModel: any) => {
                  return {
                    ContractId: this.state.status,
                    FirstPaymentDate: PeriodicallyModel.FirstPaymentDate,
                    Title: PeriodicallyModel.AmountUSD,
                    Period: PeriodicallyModel.Period
                  };
                });
          SPServices
          .saveListDataInBatch("Periodically",jsonObjArr);
          }
          //--Call Periodially function for submit data End---

           //--Call Milestone Based function for submit data---
           if (this.state.IProcurementModel) {
            const jsonObjArr = this.state.IProcurementModel.map((Milestoneitem: any) => {
                  return {
                    ContractId:this.state.status,
                    Title:Milestoneitem.Description,
                    ExpectedDate:Milestoneitem.ExpectedDate,
                    AmountUSD:Milestoneitem.AmountUSD
                  };
                });
          SPServices
          .saveListDataInBatch("MilestoneBased",jsonObjArr);
          }
          //--Call Milestone Based function  function for submit data End---

          //--Call IVariablePeriodicallyModel function for submit data---
          if (this.state.IVariablePeriodicallyModel) {
            const VariablePeriodicallyModeljsonObjArr = this.state.IVariablePeriodicallyModel.map((VariablePeriodicallyModel: any) => {
                  return {
                    ContractId:this.state.status,
                    FromDate:VariablePeriodicallyModel.FromDate,
                    ToDate:VariablePeriodicallyModel.ToDate,
                    Title:VariablePeriodicallyModel.AmountUSD,
                    Period:VariablePeriodicallyModel.Period
                  };
                });
          SPServices
          .saveListDataInBatch("VariablePeriodically",VariablePeriodicallyModeljsonObjArr);
          }
          //--Call IVariablePeriodicallyModel function  function for submit data End---

           //--Call IInsurance function for submit data---
           if (this.state.IInsurance) {
            const jsonObjArr = this.state.IInsurance.map((Insurance: any) => {
                  return {
                    ContractId:this.state.status,
                    Title:Insurance.Insurance,
                    Amount:Insurance.Amount,
                    Comment:Insurance.Comment
                  };
                });
          SPServices
          .saveListDataInBatch("Insurance",jsonObjArr);
          }
          //--Call IInsurance function  function for submit data End---

           //--Call Obligation function for submit data---
           if (this.state.IObligation) {
            const jsonObjArr = this.state.IObligation.map((Obligation: any) => {
                  return {
                    ContractId:this.state.status,
                    Title:Obligation.Description,
                    Date:Obligation.Date,
                    Frequency:Obligation.Frequency
                  };
                });
          SPServices
          .saveListDataInBatch("Obligation",jsonObjArr);
          }
          //--Call Obligation function  function for submit data End---

          // Submit Project Name ----
          if (this.state.SelectedProjectName == "Other") {
            let ProjectPostData:any={};
            ProjectPostData={
            Title:this.state.AddCompanyProject
            }
            if (this.props.ProjectName.filter((e: any) => e.key == this.state.AddCompanyProject).length == 0)
            SPServices.saveListData('Project_Master', ProjectPostData);
          } // Submit Project Name ----

           // Submit Company Project ----
          if (this.state.SelectedContractingParty == "Other") {
            let CompanyPostData:any={}
            CompanyPostData={
                Title:this.state.AddContractingParty
            }
            if (this.props.ContractingParty.filter((e: any) => e.key == this.state.AddContractingParty).length == 0)
              SPServices.saveListData('Company_Master',CompanyPostData);
          }// Submit Company Project ----

          // Submit Contract type ----
          if (this.state.SelectedContractType == "Other") {
            let ContractTypePostData:any={}
            ContractTypePostData={
                Title:this.state.AddContractType
            }
            if (this.props.ContractType.filter((e: any) => e.key == this.state.AddContractType).length == 0)
              SPServices.saveListData('ContractType',ContractTypePostData);
          } // Submit Contract type ----



          //--This is part of the ttchment---
          var varCompanyFolder = this.state.SelectedContractingParty === 'Other' ? this.state.AddContractingParty : this.state.SelectedContractingParty;
          var varProjectFolder = this.state.SelectedProjectName === 'Other' ? this.state.AddCompanyProject : this.state.SelectedProjectName;
          var varStatus = this.state.status;
          if (varCompanyFolder || varProjectFolder) {
          this.createFolders(varCompanyFolder.trim() || "", varProjectFolder.trim() || "", "", varStatus);
          } else {
          this.uploadFileFromControl("", "", "", varStatus);
          }
          //--This is part of the ttchment End---

        })
    }
  }
  }


  public DraftFunction = (SubmissionType: any) => {
    const listName = "Contract Management";
    this.setState({ SubmissionType: SubmissionType })
    let isConfirm = confirm("Are you sure want to draft item")
    if (isConfirm) {
      // this.setState({ VarDisabledBtnOnCreate: true });
      let DraftData: any = {};
      DraftData = {
        //---Basic Form Inputes---
        BesaEntity: this.state.SelectedBesaEntity == undefined ? "" : this.state.SelectedBesaEntity,
        Title: this.state.SelectedContractingParty === 'Other' ? this.state.AddContractingParty : this.state.SelectedContractingParty,
        ProjectName: this.state.SelectedProjectName === 'Other' ? this.state.AddCompanyProject : this.state.SelectedProjectName,
        ContractType: this.state.SelectedContractType === 'Other' ? this.state.AddContractType : this.state.SelectedContractType,
        DescriptionOfProduct: this.state.ContractDescription == undefined ? " " : this.state.ContractDescription,
        BesaOfficer: this.state.BesaOfficer,
        VendorPointOfContract:this.state.VendorPointOfContact == undefined ? "" : this.state.VendorPointOfContact,
        TotalContractValue: this.state.TotalContractValue == undefined ? "" : this.state.TotalContractValue,
        BudgetID: this.state.BudgetId == undefined ? "" : this.state.BudgetId,
        PointOfContractAddress: this.state.PointOfContactAddress == undefined ? "" : this.state.PointOfContactAddress,
        Comments: this.state.Comments == undefined ? " " : this.state.Comments ,
        ContractDate: this.state.ContractDate == undefined ? null : this.state.ContractDate,
        TransactionType: this.state.SelectedTransactionType,
        //---Basic Form Inputes End---

        //---Term Type Inputs---
        TerminationType: this.state.FixedValue + "" + this.state.AutoRenewalValue + "" + this.state.RenewalByNoticeValue + "" + this.state.PerpetualValue,
        NoticeOfTermination: this.state.DiscretionaryValue + "" + this.state.TerminationBreachValue + "" + this.state.TerminationStoppingValue,

        FixedDate: this.state.TerminationDate == undefined ? null : this.state.TerminationDate,
        RenewalDate: this.state.RenewalNoticeDate == undefined ? null : this.state.RenewalNoticeDate,
        TerminationPeriod: this.AddRecoveryPeriod == undefined ? "" : this.AddRecoveryPeriod,
        DateToExtend: this.AddDaysBeforeRenewalDate == undefined ? null : this.AddDaysBeforeRenewalDate,
        ConvinienceDate: this.AddDaysForNotice == undefined ? "" : this.AddDaysForNotice,
        RecoveryPeriod: this.AddRecoveryPeriod == undefined ? "" : this.AddRecoveryPeriod,
        AutoRenualDate: this.SelectedNoOfDays == undefined ? "" : this.SelectedNoOfDays,
        PaymentType: this.state.SelectedPaymentType,
        AmmountUSD: this.state.AmountUSD == undefined ? "" : this.state.AmountUSD,
        PaymentDate: this.state.PaymentDate == undefined ? null : this.state.PaymentDate,
        //---Term Type Inputs End---
        RiskFactor: this.state.RiskFactor,
        ReminderComment: this.state.ReminderComment,
        ReminderDate: this.state.ReminderDate,
        Status: "Draft"
      }

        // Periodically items validation
        if (this.state.IPeriodicallyModel) {
          const hasInvalidPeriodicallyItems = this.state.IPeriodicallyModel.some((PeriodicallyModel: any) => {
              return !PeriodicallyModel.FirstPaymentDate || !PeriodicallyModel.AmountUSD || !PeriodicallyModel.Period;
          });
  
          if (hasInvalidPeriodicallyItems) {
              alert("Please fill in all required fields in the periodically items.");
              return; // Stop item creation if any periodically items have missing fields
          }
        }
          // Variabl Periodically items validation
       if (this.state.IVariablePeriodicallyModel) {
        const hasInvalidVariablePeriodicallyItems = this.state.IVariablePeriodicallyModel.some((VariablePeriodicallyModel: any) => {
            return !VariablePeriodicallyModel.FromDate || !VariablePeriodicallyModel.ToDate || !VariablePeriodicallyModel.AmountUSD|| !VariablePeriodicallyModel.Period;
        });

        if (hasInvalidVariablePeriodicallyItems) {
            alert("Please fill in all required fields in the Variable periodically items.");
            return; // Stop item creation if any periodically items have missing fields
        }
      }
        
        
         // Periodically items validation
         if (this.state.IObligation) {
          const hasInvalidObligationItems = this.state.IObligation.some((ObligationItems: any) => {
              return !ObligationItems.Description || !ObligationItems.Date || !ObligationItems.Frequency;
          });
  
          if (hasInvalidObligationItems) {
              alert("Please fill in all required fields in the Obligation items.");
              return; // Stop item creation if any periodically items have missing fields
          }
        }
  
        // Milestone items validation
        if (this.state.IProcurementModel) {
          const hasInvalidIProcurementModel = this.state.IProcurementModel.some((ProcurementModel: any) => {
            return !ProcurementModel.Description || !ProcurementModel.ExpectedDate || !ProcurementModel.AmountUSD
          });
  
          if (hasInvalidIProcurementModel) {
              alert("Please fill in all required fields in the Milestone Based  items.");
              return; // Stop item creation if any Milestone items have missing fields
          }
        }

      //if (this.state.file.length>0) {
      SPServices
        .saveListData(listName, DraftData)
        .then((result:string) => {
          this.setState({ status: result});
          let requestorUniqueID = this._getUniqueRequestorID(this.state.status);
          SPServices.UpdateUiniqueID( this.state.status, requestorUniqueID, "Contract Management");

          //--Call Periodially function for submit data---
          if (this.state.IPeriodicallyModel) {
            const jsonObjArr = this.state.IPeriodicallyModel
            .map((PeriodicallyModel: any) => {
                  return {
                    ContractId: this.state.status,
                    FirstPaymentDate: PeriodicallyModel.FirstPaymentDate,
                    Title: PeriodicallyModel.AmountUSD,
                    Period: PeriodicallyModel.Period
                  };
                });
          SPServices
          .saveListDataInBatch("Periodically",jsonObjArr);
          }
          //--Call Periodially function for submit data End---

           //--Call Milestone Based function for submit data---
           if (this.state.IProcurementModel) {
            const jsonObjArr = this.state.IProcurementModel.map((Milestoneitem: any) => {
                  return {
                    ContractId:this.state.status,
                    Title:Milestoneitem.Description,
                    ExpectedDate:Milestoneitem.ExpectedDate,
                    AmountUSD:Milestoneitem.AmountUSD
                  };
                });
          SPServices
          .saveListDataInBatch("MilestoneBased",jsonObjArr);
          }
          //--Call Milestone Based function  function for submit data End---

          //--Call Milestone Based function for submit data---
          if (this.state.IVariablePeriodicallyModel) {
            const jsonObjArr = this.state.IVariablePeriodicallyModel.map((VariablePeriodicallyModel: any) => {
                  return {
                    ContractId:this.state.status,
                    FromDate:VariablePeriodicallyModel.FromDate,
                    ToDate:VariablePeriodicallyModel.ToDate,
                    Title:VariablePeriodicallyModel.AmountUSD,
                    Period:VariablePeriodicallyModel.Period
                  };
                });
          SPServices
          .saveListDataInBatch("VariablePeriodically",jsonObjArr);
          }
          //--Call Milestone Based function  function for submit data End---

          //--Call IInsurance function for submit data---
          if (this.state.IInsurance) {
            const jsonObjArr = this.state.IInsurance.map((Insurance: any) => {
                  return {
                    ContractId:this.state.status,
                    Title:Insurance.Insurance,
                    Amount:Insurance.Amount,
                    Comment:Insurance.Comment
                  };
                });
          SPServices
          .saveListDataInBatch("Insurance",jsonObjArr);
          }
          //--Call IInsurance function  function for submit data End---

          //--Call Obligation function for submit data---
          if (this.state.IObligation) {
            const jsonObjArr = this.state.IObligation.map((Obligation: any) => {
                  return {
                    ContractId:this.state.status,
                    Title:Obligation.Description,
                    Date:Obligation.Date,
                    Frequency:Obligation.Frequency
                  };
                });
          SPServices
          .saveListDataInBatch("Obligation",jsonObjArr);
          }
          //--Call Obligation function  function for submit data End---
           // Submit Project Name ----
           if (this.state.SelectedProjectName == "Other") {
            let ProjectPostData:any={};
            ProjectPostData={
            Title:this.state.AddCompanyProject
            }
            if (this.props.ProjectName.filter((e: any) => e.key == this.state.AddCompanyProject).length == 0)
            SPServices.saveListData('Project_Master', ProjectPostData);
          } // Submit Project Name ----

           // Submit Company Project ----
          if (this.state.SelectedContractingParty == "Other") {
            let CompanyPostData:any={}
            CompanyPostData={
                Title:this.state.AddContractingParty
            }
            if (this.props.ContractingParty.filter((e: any) => e.key == this.state.AddContractingParty).length == 0)
              SPServices.saveListData('Company_Master',CompanyPostData);
          }// Submit Company Project ----

          // Submit Contract type ----
          if (this.state.SelectedContractType == "Other") {
            let ContractTypePostData:any={}
            ContractTypePostData={
                Title:this.state.AddContractType
            }
            if (this.props.ContractType.filter((e: any) => e.key == this.state.AddContractType).length == 0)
              SPServices.saveListData('ContractType',ContractTypePostData);
          } // Submit Contract type ----

           //--This is part of the ttchment---
           var varCompanyFolder = this.state.SelectedContractingParty === 'Other' ? this.state.AddContractingParty : this.state.SelectedContractingParty;
           var varProjectFolder = this.state.SelectedProjectName === 'Other' ? this.state.AddCompanyProject : this.state.SelectedProjectName;
           var varStatus = this.state.status;
           if (varCompanyFolder || varProjectFolder) {
           this.createFolders(varCompanyFolder.trim() || "", varProjectFolder.trim() || "", "", varStatus);
           } else {
           this.uploadFileFromControl("", "", "", varStatus);
           }
           //--This is part of the ttchment End---

        })
    }

  }
  public createChildsItem = (SubmissionType: any) => {
    this.setState({ SubmissionType: SubmissionType })
    var files = this._input.files;
    if (files.length == 0) {
      this.setState({ isDocAttached: true, DocAttachedErrMsg: "Please attach document/file" })
      alert("Please attach document/file.");
    }
    else
      this.setState({ isDocAttached: false })
    if (files.length > 0) {

      let isConfirm = confirm("Are you sure want to create Child item")
    if (isConfirm) {
   
      let PostChildData: any = {};
      PostChildData = {
        BesaEntity: this.state.SelectedBesaEntity == null ? null : this.state.SelectedBesaEntity,
        Title: this.state.SelectedContractingParty == null ? null :(this.state.SelectedContractingParty === 'Other' ? this.state.AddContractingParty : this.state.SelectedContractingParty),
        ProjectName: this.state.SelectedProjectName == null ? null :(this.state.SelectedProjectName === 'Other' ? this.state.AddCompanyProject : this.state.SelectedProjectName),
        DescriptionOfProduct: this.state.ContractDescription == null ? "" : this.state.ContractDescription,
        BesaOfficer: this.state.BesaOfficer,
        VendorPointOfContract: this.state.VendorPointOfContact == null ? "" : this.state.VendorPointOfContact,
        TotalContractValue: this.state.TotalContractValue == null ? " " : this.state.TotalContractValue,
        BudgetID: this.state.BudgetId == null ? "" : this.state.BudgetId,
        PointOfContractAddress: this.state.PointOfContactAddress == null ? "" : this.state.PointOfContactAddress,
        Comments: this.state.Comments == null ? "" : this.state.Comments,
        TerminationType: this.state.FixedValue + " " + this.state.AutoRenewalValue + " " + this.state.RenewalByNoticeValue + " " + this.state.PerpetualValue,
        NoticeOfTermination: this.state.DiscretionaryValue + " " + this.state.TerminationBreachValue + " " + this.state.TerminationStoppingValue,
        FixedDate: this.state.TerminationDate == null ? null : this.state.TerminationDate,
        RenewalDate: this.state.RenewalNoticeDate == undefined ? null : this.state.RenewalNoticeDate,
        TerminationPeriod: this.state.TerminationPeriod == null ? "" : this.state.TerminationPeriod,
        DateToExtend: this.state.DateToExtend == null ? null : this.state.DateToExtend,
        ConvinienceDate: this.state.DaysForNotice == null ? "" : this.state.DaysForNotice,
        RecoveryPeriod: this.state.RecoveryPeriod == null ? "" : this.state.RecoveryPeriod,
        AutoRenualDate: this.state.NoOfDays == null ? "" : this.state.NoOfDays,
        PaymentType: this.state.SelectedPaymentType == null ? null : this.state.SelectedPaymentType,
        AmmountUSD: this.state.AmountUSD == null ? "" : this.state.AmountUSD,
        PaymentDate: this.state.PaymentDate == null ? null : this.state.PaymentDate,
        ContractDate: this.state.ContractDate == null ? null : this.state.ContractDate,
        ContractType:  this.state.SelectedContractType == null ? "" : (this.state.SelectedContractType === 'Other' ? this.state.AddContractType : this.state.SelectedContractType),
        TransactionType: this.state.SelectedTransactionType,
        RiskFactor: this.state.RiskFactor,
        ReminderComment: this.state.Comments,
        ReminderDate: this.state.ReminderDate,
        Status:  "Submitted",
        ParentIDId: this.props.selectedItemID,
        RequestID: this.props.RequestID
      }
  // Periodically items validation
      if (this.state.IPeriodicallyModel) {
        const hasInvalidPeriodicallyItems = this.state.IPeriodicallyModel.some((PeriodicallyModel: any) => {
            return !PeriodicallyModel.FirstPaymentDate || !PeriodicallyModel.AmountUSD || !PeriodicallyModel.Period;
        });

        if (hasInvalidPeriodicallyItems) {
            alert("Please fill in all required fields in the periodically items.");
            return; // Stop item creation if any periodically items have missing fields
        }
      }
        // Variabl Periodically items validation
        if (this.state.IVariablePeriodicallyModel) {
          const hasInvalidVariablePeriodicallyItems = this.state.IVariablePeriodicallyModel.some((VariablePeriodicallyModel: any) => {
              return !VariablePeriodicallyModel.FromDate || !VariablePeriodicallyModel.ToDate || !VariablePeriodicallyModel.AmountUSD|| !VariablePeriodicallyModel.Period;
          });
  
          if (hasInvalidVariablePeriodicallyItems) {
              alert("Please fill in all required fields in the Variable periodically items.");
              return; // Stop item creation if any periodically items have missing fields
          }
        }
      
       // Periodically items validation
       if (this.state.IObligation) {
        const hasInvalidObligationItems = this.state.IObligation.some((ObligationItems: any) => {
            return !ObligationItems.Description || !ObligationItems.Date || !ObligationItems.Frequency;
        });

        if (hasInvalidObligationItems) {
            alert("Please fill in all required fields in the Obligation items.");
            return; // Stop item creation if any periodically items have missing fields
        }
      }

      // Milestone items validation
      if (this.state.IProcurementModel) {
        const hasInvalidIProcurementModel = this.state.IProcurementModel.some((ProcurementModel: any) => {
          return !ProcurementModel.Description || !ProcurementModel.ExpectedDate || !ProcurementModel.AmountUSD
        });

        if (hasInvalidIProcurementModel) {
            alert("Please fill in all required fields in the Milestone Based  items.");
            return; // Stop item creation if any Milestone items have missing fields
        }
      }


      SPServices
        .CreateChildsListItem(PostChildData)
        .then((result: string) => {
          this.setState({ status: this.props.selectedItemID });

          let requestorUniqueID = this._getUniqueRequestorID(this.state.status);
          SPServices.UpdateUiniqueID( this.state.status, requestorUniqueID, "ContractManagementChilds");
          // Submit Project Name ----
          if (this.state.SelectedProjectName == "Other") {
            let ProjectPostData:any={};
            ProjectPostData={
            Title:this.state.AddCompanyProject
            }
            if (this.props.ProjectName.filter((e: any) => e.key == this.state.AddCompanyProject).length == 0)
            SPServices.saveListData('Project_Master', ProjectPostData);
          } // Submit Project Name ----

          // Submit Company Project ----
          if (this.state.SelectedContractingParty == "Other") {
            let CompanyPostData:any={}
            CompanyPostData={
                Title:this.state.AddContractingParty
            }
            if (this.props.ContractingParty.filter((e: any) => e.key == this.state.AddContractingParty).length == 0)
              SPServices.saveListData('Company_Master',CompanyPostData);
          }// Submit Company Project ----

          // Submit Contract type ----
          if (this.state.SelectedContractType == "Other") {
            let ContractTypePostData:any={}
            ContractTypePostData={
                Title:this.state.AddContractType
            }
            if (this.props.ContractType.filter((e: any) => e.key == this.state.AddContractType).length == 0)
              SPServices.saveListData('ContractType',ContractTypePostData);
          } // Submit Contract type ----

            if(this.state.PeriodicallyModelDelete.length>0){
              SPServices.DeleteDynamicRowDetails(this.state.PeriodicallyModelDelete,"PeriodicallyChild")
            }
            if(this.state.ObligationDelete.length>0){
              SPServices.DeleteDynamicRowDetails(this.state.ObligationDelete,"ObligationChild")
            }
            if(this.state.InsuranceDelete.length>0){
              SPServices.DeleteDynamicRowDetails(this.state.InsuranceDelete,"InsuranceChild")
            }
            if(this.state.VariablePeriodicallyDelete.length>0){
              SPServices.DeleteDynamicRowDetails(this.state.VariablePeriodicallyDelete,"VariablePeriodicallyChild")
            }
            if(this.state.ProcurementDelete.length>0){
              SPServices.DeleteDynamicRowDetails(this.state.ProcurementDelete,"MilestoneBasedChild")
            }
          //--Periodically Item Update and Create----
          const periodicallyObjArr = this.state.IPeriodicallyModel
          .map((PeriodicallyModel: any) => {
                return {
                  ContractId: result,
                  FirstPaymentDate: PeriodicallyModel.FirstPaymentDate,
                  Title: PeriodicallyModel.AmountUSD,
                  Period: PeriodicallyModel.Period
                };
              });
        SPServices
        .saveListDataInBatch("PeriodicallyChild",periodicallyObjArr)
        //--Periodically Item Update and Create----


           // Milestone Details Update here----
           const ProcurementModeljsonObjArr = this.state.IProcurementModel
           .map((Milestoneitem: any) => {
            return {
              ContractId:result,
              Title:Milestoneitem.Description,
              ExpectedDate:Milestoneitem.ExpectedDate,
              AmountUSD:Milestoneitem.AmountUSD
            };
          });
            SPServices
            .saveListDataInBatch("MilestoneBasedChild",ProcurementModeljsonObjArr)
          // Milestone Details Update here----

        // Periodically Details Update here----
        const VariablePeriodicallyModeljsonObjArr = this.state.IVariablePeriodicallyModel
        .map((VariablePeriodicallyModel: any) => {
          return {
            ContractId:result,
            FromDate:VariablePeriodicallyModel.FromDate,
            ToDate:VariablePeriodicallyModel.ToDate,
            Title:VariablePeriodicallyModel.AmountUSD,
            Period:VariablePeriodicallyModel.Period
          };
        });
        SPServices
        .saveListDataInBatch("VariablePeriodicallyChild",VariablePeriodicallyModeljsonObjArr)

          // Obligation Details Update here----
          const ObligationjsonObjArr = this.state.IObligation.map((Obligation: any) => {
            return {
              ContractId:result,
              Title:Obligation.Description,
              Date:Obligation.Date,
              Frequency:Obligation.Frequency
            };
          });
           SPServices
           .saveListDataInBatch("ObligationChild",ObligationjsonObjArr) // Obligation Details Update here----

            // Insurance Details Update here----
            const InsurancejsonObjArr = this.state.IInsurance.map((Insurance: any) => {
              return {
                ContractId:result,
                Title:Insurance.Insurance,
                Amount:Insurance.Amount,
                Comment:Insurance.Comment
              };
            });
            SPServices
            .saveListDataInBatch("InsuranceChild",InsurancejsonObjArr);
             // Insurance Details Update here----

            var varCompanyFolder = this.state.SelectedContractingParty.trim();
            var varProjectFolder = this.state.SelectedProjectName.trim();
            var varStatus = this.state.status;
            var isChildDocument = this.props.RadioOption === "Child Document" ? "Child" : "";

            if (files.length === 0 && this.state.SubmissionType === 'Update') {
              alert("Request Successfully Updated");
              setTimeout(() => window.location.reload(), 600);
            } else {
              let companyTrim = varCompanyFolder || "".trim();
              let projectTrim = varProjectFolder || "".trim();

              if (varCompanyFolder || varProjectFolder) {
                this.createFolders(companyTrim, projectTrim, isChildDocument, varStatus);
              } else {
                this.uploadFileFromControl(companyTrim, projectTrim, "child", varStatus);
              }
            }


        })
        }
      }
      }

  public Update = (SubmissionType: any) => {
    this.setState({ SubmissionType: SubmissionType })
    let isConfirmUpdate = confirm("Are you sure want to update item")
    var files = this._input.files;
    if (isConfirmUpdate) {

      

      let UpdateData: any = {};
      UpdateData = {
        BesaEntity: this.state.SelectedBesaEntity == null ? null : this.state.SelectedBesaEntity,
        Title: this.state.SelectedContractingParty == null ? null : (this.state.SelectedContractingParty === 'Other' ? this.state.AddContractingParty : this.state.SelectedContractingParty),
        ProjectName: this.state.SelectedProjectName == null ? null : (this.state.SelectedProjectName === 'Other' ? this.state.AddCompanyProject : this.state.SelectedProjectName),
        DescriptionOfProduct: this.state.ContractDescription == null ? "" : this.state.ContractDescription,
        BesaOfficer: this.state.BesaOfficer,
        VendorPointOfContract: this.state.VendorPointOfContact == null ? "" : this.state.VendorPointOfContact,
        TotalContractValue: this.state.TotalContractValue == null ? " " : this.state.TotalContractValue,
        BudgetID: this.state.BudgetId == null ? "" : this.state.BudgetId,
        PointOfContractAddress: this.state.PointOfContactAddress == null ? "" : this.state.PointOfContactAddress,
        Comments: this.state.Comments == null ? "" : this.state.Comments,
        TerminationType: this.state.FixedValue + " " + this.state.AutoRenewalValue + " " + this.state.RenewalByNoticeValue + " " + this.state.PerpetualValue,
        NoticeOfTermination: this.state.DiscretionaryValue + " " + this.state.TerminationBreachValue + " " + this.state.TerminationStoppingValue,
        FixedDate: this.state.TerminationDate == null ? null : this.state.TerminationDate,
        RenewalDate: this.state.RenewalNoticeDate == undefined ? null : this.state.RenewalNoticeDate,
        TerminationPeriod: this.state.TerminationPeriod == null ? "" : this.state.TerminationPeriod,
        DateToExtend: this.state.DateToExtend == null ? null : this.state.DateToExtend,
        ConvinienceDate: this.state.DaysForNotice == null ? "" : this.state.DaysForNotice,
        RecoveryPeriod: this.state.RecoveryPeriod == null ? "" : this.state.RecoveryPeriod,
        AutoRenualDate: this.state.NoOfDays == null ? "" : this.state.NoOfDays,
        PaymentType: this.state.SelectedPaymentType == null ? null : this.state.SelectedPaymentType,
        AmmountUSD: this.state.AmountUSD == null ? "" : this.state.AmountUSD,
        PaymentDate: this.state.PaymentDate == null ? null : this.state.PaymentDate,
        ContractDate: this.state.ContractDate == null ? null : this.state.ContractDate,
        ContractType:  this.state.SelectedContractType == null ? "" : (this.state.SelectedContractType === 'Other' ? this.state.AddContractType : this.state.SelectedContractType),
        TransactionType: this.state.SelectedTransactionType,
        RiskFactor: this.state.RiskFactor,
        ReminderComment: this.state.Comments,
        ReminderDate: this.state.ReminderDate,
        Status:  this.state.VarExpiredValue===true?"Expired":"Submitted"
      }
  // Periodically items validation
  if (this.state.IPeriodicallyModel) {
    const hasInvalidPeriodicallyItems = this.state.IPeriodicallyModel.some((PeriodicallyModel: any) => {
        return !PeriodicallyModel.FirstPaymentDate || !PeriodicallyModel.AmountUSD || !PeriodicallyModel.Period;
    });

    if (hasInvalidPeriodicallyItems) {
        alert("Please fill in all required fields in the periodically items.");
        return; // Stop item creation if any periodically items have missing fields
    }
  }
     // Variabl Periodically items validation
     if (this.state.IVariablePeriodicallyModel) {
      const hasInvalidVariablePeriodicallyItems = this.state.IVariablePeriodicallyModel.some((VariablePeriodicallyModel: any) => {
          return !VariablePeriodicallyModel.FromDate || !VariablePeriodicallyModel.ToDate || !VariablePeriodicallyModel.AmountUSD|| !VariablePeriodicallyModel.Period;
      });

      if (hasInvalidVariablePeriodicallyItems) {
          alert("Please fill in all required fields in the Variable periodically items.");
          return; // Stop item creation if any periodically items have missing fields
      }
    }
  
  
   // Periodically items validation
   if (this.state.IObligation) {
    const hasInvalidObligationItems = this.state.IObligation.some((ObligationItems: any) => {
        return !ObligationItems.Description || !ObligationItems.Date || !ObligationItems.Frequency;
    });

    if (hasInvalidObligationItems) {
        alert("Please fill in all required fields in the Obligation items.");
        return; // Stop item creation if any periodically items have missing fields
    }
  }

  // Milestone items validation
  if (this.state.IProcurementModel) {
    const hasInvalidIProcurementModel = this.state.IProcurementModel.some((ProcurementModel: any) => {
      return !ProcurementModel.Description || !ProcurementModel.ExpectedDate || !ProcurementModel.AmountUSD
    });

    if (hasInvalidIProcurementModel) {
        alert("Please fill in all required fields in the Milestone Based  items.");
        return; // Stop item creation if any Milestone items have missing fields
    }
  }
      SPServices
        .UpdateItem(this.props.selectedItemID, UpdateData)
        .then((result: string) => {
          this.setState({ status: this.props.selectedItemID });
          //alert("succesfully updated");

          // Submit Project Name ----
          if (this.state.SelectedProjectName == "Other") {
            let ProjectPostData:any={};
            ProjectPostData={
            Title:this.state.AddCompanyProject
            }
            if (this.props.ProjectName.filter((e: any) => e.key == this.state.AddCompanyProject).length == 0)
            SPServices.saveListData('Project_Master', ProjectPostData);
          } // Submit Project Name ----

          // Submit Company Project ----
          if (this.state.SelectedContractingParty == "Other") {
            let CompanyPostData:any={}
            CompanyPostData={
                Title:this.state.AddContractingParty
            }
            if (this.props.ContractingParty.filter((e: any) => e.key == this.state.AddContractingParty).length == 0)
              SPServices.saveListData('Company_Master',CompanyPostData);
          }// Submit Company Project ----

          // Submit Contract type ----
          if (this.state.SelectedContractType == "Other") {
            let ContractTypePostData:any={}
            ContractTypePostData={
                Title:this.state.AddContractType
            }
            if (this.props.ContractType.filter((e: any) => e.key == this.state.AddContractType).length == 0)
              SPServices.saveListData('ContractType',ContractTypePostData);
          } // Submit Contract type ----

          //--Periodically Item Update and Create----
          if (this.state.IPeriodicallyModel.length > 0) {
            let PeriodicallyModelCreate: any = [];
            let PeriodicallyModelUpdate: any = [];

            this.state.IPeriodicallyModel.map((Periodically: any) => {

              if (Periodically.Id == undefined) {
                PeriodicallyModelCreate.push(Periodically);
              }
              else {
                PeriodicallyModelUpdate.push(Periodically);

              }
            })

            if (PeriodicallyModelCreate.length > 0) {
              const jsonObjArr = PeriodicallyModelCreate
            .map((PeriodicallyModel: any) => {
                  return {
                    ContractId: this.props.selectedItemID,
                    FirstPaymentDate: PeriodicallyModel.FirstPaymentDate,
                    Title: PeriodicallyModel.AmountUSD,
                    Period: PeriodicallyModel.Period
                  };
                });
          SPServices
          .saveListDataInBatch("Periodically",jsonObjArr)
          .then(() => {
          if (PeriodicallyModelUpdate.length > 0) {
                  SPServices.UpdatePeriodicallyDetails(PeriodicallyModelUpdate, this.props.selectedItemID, "Periodically").then(() => {
             })
             }
                });
            } else 
            if (PeriodicallyModelUpdate.length > 0) {
               SPServices.UpdatePeriodicallyDetails(PeriodicallyModelUpdate, this.props.selectedItemID, "Periodically").then(() => {
                        })
            }
          } //--Periodically Item Update and Create----


           // Milestone Details Update here----
           if (this.state.IProcurementModel.length > 0) {
            let ProcurementModelCreate: any = [];
            let ProcurementModelUpdate: any = [];

            this.state.IProcurementModel.map((Procurement: any) => {

              if (Procurement.Id == undefined) {
                ProcurementModelCreate.push(Procurement);
              }
              else {
                ProcurementModelUpdate.push(Procurement);

              }
            })
                if (ProcurementModelCreate.length > 0) {
                  const jsonObjArr = ProcurementModelCreate.map((Milestoneitem: any) => {
                    return {
                      ContractId:this.props.selectedItemID,
                      Title:Milestoneitem.Description,
                      ExpectedDate:Milestoneitem.ExpectedDate,
                      AmountUSD:Milestoneitem.AmountUSD
                    };
                  });
                    SPServices
                    .saveListDataInBatch("MilestoneBased",jsonObjArr)
                    .then(() => {
                          SPServices. UpdateMilestoneDetails(ProcurementModelUpdate, this.props.selectedItemID, "MilestoneBased")
                          .then(() => {
      
                          })
                      }
                    );
                } else if (ProcurementModelUpdate.length > 0) {
                  SPServices. UpdateMilestoneDetails(ProcurementModelUpdate, this.props.selectedItemID, "MilestoneBased")
                  .then(() => {

                  })
                }

          }// Milestone Details Update here----
          if(this.state.PeriodicallyModelDelete.length>0){
            SPServices.DeleteDynamicRowDetails(this.state.PeriodicallyModelDelete,"Periodically")
          }
          if(this.state.ObligationDelete.length>0){
            SPServices.DeleteDynamicRowDetails(this.state.ObligationDelete,"Obligation")
          }
          if(this.state.InsuranceDelete.length>0){
            SPServices.DeleteDynamicRowDetails(this.state.InsuranceDelete,"Insurance")
          }
          if(this.state.VariablePeriodicallyDelete.length>0){
            SPServices.DeleteDynamicRowDetails(this.state.VariablePeriodicallyDelete,"VariablePeriodically")
          }
          if(this.state.ProcurementDelete.length>0){
            SPServices.DeleteDynamicRowDetails(this.state.ProcurementDelete,"MilestoneBased")
          }

        // Periodically Details Update here----
        if (this.state.IVariablePeriodicallyModel.length > 0) {
          let VariablePeriodicallyModelCreate: any = [];
          let VariablePeriodicallyModelUpdate: any = [];

          this.state.IVariablePeriodicallyModel.map((VariablePeriodically: any) => {

            if (VariablePeriodically.Id == undefined) {
              VariablePeriodicallyModelCreate.push(VariablePeriodically);
            }
            else {
              VariablePeriodicallyModelUpdate.push(VariablePeriodically);

            }
          })
          if (VariablePeriodicallyModelCreate.length > 0) {
            const jsonObjArr = VariablePeriodicallyModelCreate.map((VariablePeriodicallyModel: any) => {
              return {
                ContractId:this.props.selectedItemID,
                FromDate:VariablePeriodicallyModel.FromDate,
                ToDate:VariablePeriodicallyModel.ToDate,
                Title:VariablePeriodicallyModel.AmountUSD,
                Period:VariablePeriodicallyModel.Period
              };
            });
            SPServices
            .saveListDataInBatch("VariablePeriodically",jsonObjArr)
              .then(() => {
                if (VariablePeriodicallyModelUpdate.length > 0) {
                  SPServices
                  .UpdateVariablePeriodicallyDetails(VariablePeriodicallyModelUpdate,this.props.selectedItemID,"VariablePeriodically")
                    .then(() => {
                      // Success ya additional logic handle karen
                    });
                }
              });
          } else 
          if (VariablePeriodicallyModelUpdate.length > 0) {
            SPServices
                  .UpdateVariablePeriodicallyDetails(VariablePeriodicallyModelUpdate,this.props.selectedItemID,"VariablePeriodically")
                    .then(() => {
                      // Success ya additional logic handle karen
                    });
          }

        }

          // Obligation Details Update here----
          if (this.state.IObligation.length > 0) {
            let ObligationModelCreate: any = [];
            let ObligationModelUpdate: any = [];

            this.state.IObligation.map((Obligation: any) => {

              if (Obligation.Id == undefined) {
                ObligationModelCreate.push(Obligation);

              }
              else {
                ObligationModelUpdate.push(Obligation);
              }
            })

            if (ObligationModelCreate.length > 0) {
              const jsonObjArr = ObligationModelCreate.map((Obligation: any) => {
                return {
                  ContractId:this.props.selectedItemID,
                  Title:Obligation.Description,
                  Date:Obligation.Date,
                  Frequency:Obligation.Frequency
                };
              });
        SPServices
        .saveListDataInBatch("Obligation",jsonObjArr)
                .then(() => {
                  if (ObligationModelUpdate.length > 0) {
              SPServices.
              UpdateObligationDetails(ObligationModelUpdate, this.props.selectedItemID, "Obligation")
              .then(() => {

              })
                  }
                });
            } else if (ObligationModelUpdate.length > 0) {
              SPServices.
              UpdateObligationDetails(ObligationModelUpdate, this.props.selectedItemID, "Obligation")
              .then(() => {

              })
            }

          }  // Obligation Details Update here----

            // Insurance Details Update here----
            if (this.state.IInsurance.length > 0) {
              let InsuranceModelCreate: any = [];
              let InsuranceModelUpdate: any = [];
  
              this.state.IInsurance.map((Insurance: any) => {
  
                if (Insurance.Id == undefined) {
                  InsuranceModelCreate.push(Insurance);
                }
                else {
                  InsuranceModelUpdate.push(Insurance);
  
                }
              })

              if (InsuranceModelCreate.length > 0) {
                const jsonObjArr = InsuranceModelCreate.map((Insurance: any) => {
                  return {
                    ContractId:this.props.selectedItemID,
                    Title:Insurance.Insurance,
                    Amount:Insurance.Amount,
                    Comment:Insurance.Comment
                  };
                });
                SPServices
                .saveListDataInBatch("Insurance",jsonObjArr)
                  .then(() => {
                    if (InsuranceModelUpdate.length > 0) {
                      SPServices
                      . UpdateInsuranceDetails(InsuranceModelUpdate, this.state.selectedItemID, "Insurance")
                      .then(() => {
  
                      })
                    }
                  });
              } else if (InsuranceModelUpdate.length > 0) {
                SPServices
                . UpdateInsuranceDetails(InsuranceModelUpdate, this.state.selectedItemID, "Insurance")
                .then(() => {

                })
              }
            } // Insurance Details Update here----
            var varCompanyFolder = this.state.SelectedContractingParty.trim();
            var varProjectFolder = this.state.SelectedProjectName.trim();
            var varStatus = this.state.status;
            var isChildDocument = this.props.RadioOption === "Child Document" ? "Child" : "";

            if (files.length === 0 && this.state.SubmissionType === 'Update') {
              alert("Request Successfully Updated");
              setTimeout(() => window.location.reload(), 600);
            } else {
              let companyTrim = varCompanyFolder || "".trim();
              let projectTrim = varProjectFolder || "".trim();

              if (varCompanyFolder || varProjectFolder) {
                this.createFolders(companyTrim, projectTrim, isChildDocument, varStatus);
              } else {
                this.uploadFileFromControl(companyTrim, projectTrim, "child", varStatus);
              }
            }


        })
        }
      }


      public ChildUpdate = (SubmissionType: any) => {
        this.setState({ SubmissionType: SubmissionType })
        let isConfirmUpdate = confirm("Are you sure want to update item")
        var files = this._input.files;
        if (isConfirmUpdate) {
          let ChildUpdateData: any = {};
          ChildUpdateData = {
            BesaEntity: this.state.SelectedBesaEntity == null ? null : this.state.SelectedBesaEntity,
            Title: this.state.SelectedContractingParty == null ? null :  (this.state.SelectedContractingParty === 'Other' ? this.state.AddContractingParty : this.state.SelectedContractingParty),
            ProjectName: this.state.SelectedProjectName == null ? null : (this.state.SelectedProjectName === 'Other' ? this.state.AddCompanyProject : this.state.SelectedProjectName),
            DescriptionOfProduct: this.state.ContractDescription == null ? "" : this.state.ContractDescription,
            BesaOfficer: this.state.BesaOfficer,
            VendorPointOfContract: this.state.VendorPointOfContact == null ? "" : this.state.VendorPointOfContact,
            TotalContractValue: this.state.TotalContractValue == null ? " " : this.state.TotalContractValue,
            BudgetID: this.state.BudgetId == null ? "" : this.state.BudgetId,
            PointOfContractAddress: this.state.PointOfContactAddress == null ? "" : this.state.PointOfContactAddress,
            Comments: this.state.Comments == null ? "" : this.state.Comments,
            TerminationType: this.state.FixedValue + " " + this.state.AutoRenewalValue + " " + this.state.RenewalByNoticeValue + " " + this.state.PerpetualValue,
            NoticeOfTermination: this.state.DiscretionaryValue + " " + this.state.TerminationBreachValue + " " + this.state.TerminationStoppingValue,
            FixedDate: this.state.TerminationDate == null ? null : this.state.TerminationDate,
            RenewalDate: this.state.RenewalNoticeDate == undefined ? null : this.state.RenewalNoticeDate,
            TerminationPeriod: this.state.TerminationPeriod == null ? "" : this.state.TerminationPeriod,
            DateToExtend: this.state.DateToExtend == null ? null : this.state.DateToExtend,
            ConvinienceDate: this.state.DaysForNotice == null ? "" : this.state.DaysForNotice,
            RecoveryPeriod: this.state.RecoveryPeriod == null ? "" : this.state.RecoveryPeriod,
            AutoRenualDate: this.state.NoOfDays == null ? "" : this.state.NoOfDays,
            PaymentType: this.state.SelectedPaymentType == null ? null : this.state.SelectedPaymentType,
            AmmountUSD: this.state.AmountUSD == null ? "" : this.state.AmountUSD,
            PaymentDate: this.state.PaymentDate == null ? null : this.state.PaymentDate,
            ContractDate: this.state.ContractDate == null ? null : this.state.ContractDate,
            ContractType: this.state.SelectedContractType == null ? "" : (this.state.SelectedContractType === 'Other' ? this.state.AddContractType : this.state.SelectedContractType),
            TransactionType: this.state.SelectedTransactionType,
            RiskFactor: this.state.RiskFactor,
            ReminderComment: this.state.Comments,
            ReminderDate: this.state.ReminderDate,
            Status:  this.state.VarExpiredValue===true?"Expired":"Submitted"
          }
      // Periodically items validation
      if (this.state.IPeriodicallyModel) {
        const hasInvalidPeriodicallyItems = this.state.IPeriodicallyModel.some((PeriodicallyModel: any) => {
            return !PeriodicallyModel.FirstPaymentDate || !PeriodicallyModel.AmountUSD || !PeriodicallyModel.Period;
        });

        if (hasInvalidPeriodicallyItems) {
            alert("Please fill in all required fields in the periodically items.");
            return; // Stop item creation if any periodically items have missing fields
        }
      }
        // Variabl Periodically items validation
        if (this.state.IVariablePeriodicallyModel) {
          const hasInvalidVariablePeriodicallyItems = this.state.IVariablePeriodicallyModel.some((VariablePeriodicallyModel: any) => {
              return !VariablePeriodicallyModel.FromDate || !VariablePeriodicallyModel.ToDate || !VariablePeriodicallyModel.AmountUSD|| !VariablePeriodicallyModel.Period;
          });
  
          if (hasInvalidVariablePeriodicallyItems) {
              alert("Please fill in all required fields in the Variable periodically items.");
              return; // Stop item creation if any periodically items have missing fields
          }
        }
      
      
       // Periodically items validation
       if (this.state.IObligation) {
        const hasInvalidObligationItems = this.state.IObligation.some((ObligationItems: any) => {
            return !ObligationItems.Description || !ObligationItems.Date || !ObligationItems.Frequency;
        });

        if (hasInvalidObligationItems) {
            alert("Please fill in all required fields in the Obligation items.");
            return; // Stop item creation if any periodically items have missing fields
        }
      }

      // Milestone items validation
      if (this.state.IProcurementModel) {
        const hasInvalidIProcurementModel = this.state.IProcurementModel.some((ProcurementModel: any) => {
          return !ProcurementModel.Description || !ProcurementModel.ExpectedDate || !ProcurementModel.AmountUSD
        });

        if (hasInvalidIProcurementModel) {
            alert("Please fill in all required fields in the Milestone Based  items.");
            return; // Stop item creation if any Milestone items have missing fields
        }
      }
          SPServices
            .ChildUpdateItem(this.props.selectedItemID, ChildUpdateData)
            .then((result: string) => {
              this.setState({ status: this.props.selectedItemID });
              //alert("succesfully updated");
    
              // Submit Project Name ----
              if (this.state.SelectedProjectName == "Other") {
                let ProjectPostData:any={};
                ProjectPostData={
                Title:this.state.AddCompanyProject
                }
                if (this.props.ProjectName.filter((e: any) => e.key == this.state.AddCompanyProject).length == 0)
                SPServices.saveListData('Project_Master', ProjectPostData);
              } // Submit Project Name ----
    
              // Submit Company Project ----
              if (this.state.SelectedContractingParty == "Other") {
                let CompanyPostData:any={}
                CompanyPostData={
                    Title:this.state.AddContractingParty
                }
                if (this.props.ContractingParty.filter((e: any) => e.key == this.state.AddContractingParty).length == 0)
                  SPServices.saveListData('Company_Master',CompanyPostData);
              }// Submit Company Project ----
    
              // Submit Contract type ----
              if (this.state.SelectedContractType == "Other") {
                let ContractTypePostData:any={}
                ContractTypePostData={
                    Title:this.state.AddContractType
                }
                if (this.props.ContractType.filter((e: any) => e.key == this.state.AddContractType).length == 0)
                  SPServices.saveListData('ContractType',ContractTypePostData);
              } // Submit Contract type ----
    
              //--Periodically Item Update and Create----
              if (this.state.IPeriodicallyModel.length > 0) {
                let PeriodicallyModelCreate: any = [];
                let PeriodicallyModelUpdate: any = [];
    
                this.state.IPeriodicallyModel.map((Periodically: any) => {
    
                  if (Periodically.Id == undefined) {
                    PeriodicallyModelCreate.push(Periodically);
                  }
                  else {
                    PeriodicallyModelUpdate.push(Periodically);
    
                  }
                })
    
                if (PeriodicallyModelCreate.length > 0) {
                  const jsonObjArr = PeriodicallyModelCreate
                .map((PeriodicallyModel: any) => {
                      return {
                        ContractId: this.props.selectedItemID,
                        FirstPaymentDate: PeriodicallyModel.FirstPaymentDate,
                        Title: PeriodicallyModel.AmountUSD,
                        Period: PeriodicallyModel.Period
                      };
                    });
              SPServices
              .saveListDataInBatch("PeriodicallyChild",jsonObjArr)
              .then(() => {
              if (PeriodicallyModelUpdate.length > 0) {
                      SPServices.UpdatePeriodicallyDetails(PeriodicallyModelUpdate, this.props.selectedItemID, "PeriodicallyChild").then(() => {
                 })
                 }
                    });
                } else 
                if (PeriodicallyModelUpdate.length > 0) {
                   SPServices.UpdatePeriodicallyDetails(PeriodicallyModelUpdate, this.props.selectedItemID, "PeriodicallyChild").then(() => {
                            })
                }
              } //--Periodically Item Update and Create----
    
    
               // Milestone Details Update here----
               if (this.state.IProcurementModel.length > 0) {
                let ProcurementModelCreate: any = [];
                let ProcurementModelUpdate: any = [];
    
                this.state.IProcurementModel.map((Procurement: any) => {
    
                  if (Procurement.Id == undefined) {
                    ProcurementModelCreate.push(Procurement);
                  }
                  else {
                    ProcurementModelUpdate.push(Procurement);
    
                  }
                })
                    if (ProcurementModelCreate.length > 0) {
                      const jsonObjArr = ProcurementModelCreate.map((Milestoneitem: any) => {
                        return {
                          
                          ContractId:this.props.selectedItemID,
                          Title:Milestoneitem.Description,
                          ExpectedDate:Milestoneitem.ExpectedDate,
                          AmountUSD:Milestoneitem.AmountUSD
                        };
                      });
                        SPServices
                        .saveListDataInBatch("MilestoneBasedChild",jsonObjArr)
                        .then(() => {
                              SPServices. UpdateMilestoneDetails(ProcurementModelUpdate, this.props.selectedItemID, "MilestoneBasedChild")
                              .then(() => {
          
                              })
                          }
                        );
                    } else if (ProcurementModelUpdate.length > 0) {
                      SPServices. UpdateMilestoneDetails(ProcurementModelUpdate, this.props.selectedItemID, "MilestoneBasedChild")
                      .then(() => {
    
                      })
                    }
    
              }// Milestone Details Update here----
              if(this.state.PeriodicallyModelDelete.length>0){
                SPServices.DeleteDynamicRowDetails(this.state.PeriodicallyModelDelete,"PeriodicallyChild")
              }
              if(this.state.ObligationDelete.length>0){
                SPServices.DeleteDynamicRowDetails(this.state.ObligationDelete,"ObligationChild")
              }
              if(this.state.InsuranceDelete.length>0){
                SPServices.DeleteDynamicRowDetails(this.state.InsuranceDelete,"InsuranceChild")
              }
              if(this.state.VariablePeriodicallyDelete.length>0){
                SPServices.DeleteDynamicRowDetails(this.state.VariablePeriodicallyDelete,"VariablePeriodicallyChild")
              }
              if(this.state.ProcurementDelete.length>0){
                SPServices.DeleteDynamicRowDetails(this.state.ProcurementDelete,"MilestoneBasedChild")
              }
    
            // Periodically Details Update here----
            if (this.state.IVariablePeriodicallyModel.length > 0) {
              let VariablePeriodicallyModelCreate: any = [];
              let VariablePeriodicallyModelUpdate: any = [];
    
              this.state.IVariablePeriodicallyModel.map((VariablePeriodically: any) => {
    
                if (VariablePeriodically.Id == undefined) {
                  VariablePeriodicallyModelCreate.push(VariablePeriodically);
                }
                else {
                  VariablePeriodicallyModelUpdate.push(VariablePeriodically);
    
                }
              })
              if (VariablePeriodicallyModelCreate.length > 0) {
                const jsonObjArr = VariablePeriodicallyModelCreate.map((VariablePeriodicallyModel: any) => {
                  return {
                    ContractId:this.props.selectedItemID,
                    FromDate:VariablePeriodicallyModel.FromDate,
                    ToDate:VariablePeriodicallyModel.ToDate,
                    Title:VariablePeriodicallyModel.AmountUSD,
                    Period:VariablePeriodicallyModel.Period
                  };
                });
                SPServices
                .saveListDataInBatch("VariablePeriodicallyChild",jsonObjArr)
                  .then(() => {
                    if (VariablePeriodicallyModelUpdate.length > 0) {
                      SPServices
                      .UpdateVariablePeriodicallyDetails(VariablePeriodicallyModelUpdate,this.props.selectedItemID,"VariablePeriodicallyChild")
                        .then(() => {
                          // Success ya additional logic handle karen
                        });
                    }
                  });
              } else 
              if (VariablePeriodicallyModelUpdate.length > 0) {
                SPServices
                      .UpdateVariablePeriodicallyDetails(VariablePeriodicallyModelUpdate,this.props.selectedItemID,"VariablePeriodicallyChild")
                        .then(() => {
                          // Success ya additional logic handle karen
                        });
              }
    
            }
    
              // Obligation Details Update here----
              if (this.state.IObligation.length > 0) {
                let ObligationModelCreate: any = [];
                let ObligationModelUpdate: any = [];
    
                this.state.IObligation.map((Obligation: any) => {
    
                  if (Obligation.Id == undefined) {
                    ObligationModelCreate.push(Obligation);
    
                  }
                  else {
                    ObligationModelUpdate.push(Obligation);
                  }
                })
    
                if (ObligationModelCreate.length > 0) {
                  const jsonObjArr = ObligationModelCreate.map((Obligation: any) => {
                    return {
                      ContractId:this.props.selectedItemID,
                      Title:Obligation.Description,
                      Date:Obligation.Date,
                      Frequency:Obligation.Frequency
                    };
                  });
            SPServices
            .saveListDataInBatch("ObligationChild",jsonObjArr)
                    .then(() => {
                      if (ObligationModelUpdate.length > 0) {
                  SPServices.
                  UpdateObligationDetails(ObligationModelUpdate, this.props.selectedItemID, "ObligationChild")
                  .then(() => {
    
                  })
                      }
                    });
                } else if (ObligationModelUpdate.length > 0) {
                  SPServices.
                  UpdateObligationDetails(ObligationModelUpdate, this.props.selectedItemID, "ObligationChild")
                  .then(() => {
    
                  })
                }
    
              }  // Obligation Details Update here----
    
                // Insurance Details Update here----
                if (this.state.IInsurance.length > 0) {
                  let InsuranceModelCreate: any = [];
                  let InsuranceModelUpdate: any = [];
      
                  this.state.IInsurance.map((Insurance: any) => {
      
                    if (Insurance.Id == undefined) {
                      InsuranceModelCreate.push(Insurance);
                    }
                    else {
                      InsuranceModelUpdate.push(Insurance);
      
                    }
                  })
    
                  if (InsuranceModelCreate.length > 0) {
                    const jsonObjArr = InsuranceModelCreate.map((Insurance: any) => {
                      return {
                        ContractId:this.props.selectedItemID,
                        Title:Insurance.Insurance,
                        Amount:Insurance.Amount,
                        Comment:Insurance.Comment
                      };
                    });
                    SPServices
                    .saveListDataInBatch("InsuranceChild",jsonObjArr)
                      .then(() => {
                        if (InsuranceModelUpdate.length > 0) {
                          SPServices
                          . UpdateInsuranceDetails(InsuranceModelUpdate, this.state.selectedItemID, "InsuranceChild")
                          .then(() => {
      
                          })
                        }
                      });
                  } else if (InsuranceModelUpdate.length > 0) {
                    SPServices
                    . UpdateInsuranceDetails(InsuranceModelUpdate, this.state.selectedItemID, "InsuranceChild")
                    .then(() => {
    
                    })
                  }
                } // Insurance Details Update here----
                var varCompanyFolder = this.state.SelectedContractingParty.trim();
                var varProjectFolder = this.state.SelectedProjectName.trim();
                var varStatus = this.state.status;
                var isChildDocument = this.props.RadioOption === "Child Document" ? "Child" : "";
    
                if (files.length === 0 && this.state.SubmissionType === 'Update') {
                  alert("Request Successfully Updated");
                  setTimeout(() => window.location.reload(), 600);
                } else {
                  let companyTrim = varCompanyFolder || "".trim();
                  let projectTrim = varProjectFolder || "".trim();
    
                  if (varCompanyFolder || varProjectFolder) {
                    this.createFolders(companyTrim, projectTrim, isChildDocument, varStatus);
                  } else {
                    this.uploadFileFromControl(companyTrim, projectTrim, "child", varStatus);
                  }
                }
    
    
            })
            }
          }

  render() {
    return (
      <section className={`${styles.contractSubmission}`}>
                                {
                                  (this.props.Mode==="Edit"&&this.props.PopupType ==="Edit"&&this.props.DisabledValue !== true ||this.props.PopupType ==="ChildEdit"&&this.props.DisabledValue !== true) &&
                                  <div className={styles.ExpiredCheckBox}>
                                    <Checkbox label="Expired"
                                      checked={this.state.VarExpiredValue}
                                      title="Expired"
                                      onChange={this._getExpiredValue}
                                      //defaultChecked={this.state.BindStatus == "Expired" ? true : false}
                                      disabled={this.state.DisabledValue} />
                                  </div>
                                }
              <div>
                   <div className={styles.newRequestForm}>
                      
                            <div className={styles.rowTable}>
                                 
                                  <div className={styles.colmd3}> {/* BesaEntity Dropdown */}
                                          <label className={styles.labelstyle}>Besa Entity</label>
                                          <br></br>
                                          <Dropdown className={styles.myDropDown}
                                            options={this.props.BesaEntity}
                                            onChange={this.getBesaEntity}
                                            placeholder="Select Besa Entity .."
                                            disabled={this.props.DisabledValue}
                                            defaultSelectedKey={this.props.Mode==="New"?this.props.BesaEntity:this.state.SelectedBesaEntity}
                                          >
                                          </Dropdown>
                                  </div>
                                   
                                  <div className={styles.colmd3}> {/* ProjectName Dropdown */}
                                            <label className={styles.labelstyle}>Project Name</label>
                                            <Dropdown className={styles.myDropDown}
                                              options={this.props.ProjectName}
                                              onChange={this.getProjectName}
                                              disabled={this.props.DisabledValue}
                                              defaultSelectedKey={this.props.Mode==="New"?this.props.ProjectName:this.state.SelectedProjectName}
                                              placeholder="Select Project Name..">
                                            </Dropdown>
                                  </div>

                                    
                                  <div className={styles.colmd3}>{/* Contracting Party Dropdown */}
                                            <label className={styles.labelstyle}>Contracting Party</label>
                                            <Dropdown className={styles.myDropDown}
                                              options={this.props.ContractingParty}
                                              onChange={this.getContractingParty}
                                              disabled={this.props.DisabledValue}
                                              defaultSelectedKey={this.props.Mode==="New"?this.props.ContractingParty:this.state.SelectedContractingParty}
                                              placeholder="Select Contracting Party..">
                                             
                                            </Dropdown>
                                  </div>
                          </div>
                          <div className={styles.rowTable}> {/* 2st Row of Other Functionality*/}

                                        {/* Contract Description TextField */}
                                        {(this.state.SelectedProjectName === 'Other'  )&&
                                          <div className={styles.colmd3}>
                                            <label className={styles.labelstyle}>Add Project Name </label>

                                            <TextField className={styles.myDropDown}
                                              type="textarea"
                                              onChange={this.getAddProjectName}
                                              disabled={this.props.DisabledValue}
                                              placeholder="Add Project Name .."
                                              onKeyDown={this.handleKeyDown}
                                            />
                                          </div>
                                        }

                                        {/* Vendor Point of Contract Text Field */}
                                        {(this.state.SelectedContractingParty === 'Other'||this.props.BindContractingParty==='Other') &&
                                         <div className={styles.colmd3}>
                                              <label className={styles.labelstyle}>Add Contracting Party</label>

                                              <TextField className={styles.myDropDown}
                                                type="textarea"
                                                onChange={this.getAddContractingParty}
                                                disabled={this.props.DisabledValue}
                                                placeholder="Type Contracting Party.."
                                                onKeyDown={this.handleKeyDown}
                                              />

                                          </div>
                                        }

                          </div>

                            {/* 2st Row of Form */}
                          <div className={styles.rowTable}>

                                        {/* BesaOfficer Dropdown */}
                                    <div className={styles.colmd3}>
                                              <label className={styles.labelstyle}>Besa Officer</label>
                                              <br></br>
                                              <TextField className={styles.myDropDown}
                                                type="textarea"
                                                onChange={this.getBesaOfficer}
                                                disabled={this.props.DisabledValue}
                                                placeholder="Name of the Besa Officer.."
                                                defaultValue={this.props.Mode==="New"?"":this.state.BesaOfficer}
                                              />
                                    </div>

                                          {/* Contracting Party Dropdown */}
                                    <div className={styles.colmd3}>
                                                <label className={styles.labelstyle}>Contract Type</label>
                                                <Dropdown className={styles.myDropDown}
                                                  options={this.props.ContractType}
                                                  onChange={this.getContractType}
                                                  disabled={this.props.DisabledValue}
                                                  defaultSelectedKey={this.props.Mode==="New"?this.props.ContractType:this.state.SelectedContractType}
                                                  placeholder="Select Contract Type..">
                                                </Dropdown>
                                    </div>

                                         {/* ProjectName Dropdown */}
                                    <div className={styles.colmd3}>
                                              <label className={styles.labelstyle}>Contract Date</label>
                                              {/* <span className={styles.RedStar}>*</span> */}
                                              <br></br>
                                              <div className={styles.myDropDown}>
                                                <DatePicker
                                                  placeholder="Select a date..."
                                                  ariaLabel="Select a date"
                                                  disabled={this.props.DisabledValue}
                                                  value={this.props.Mode=="New"?this.state.ContractDate:this.state.ContractDate}
                                                  onSelectDate={this.ContractDateChange}
                                                />

                                                </div>

                                    </div>

                          </div>

                                {/* 2st Row of Other Functionality*/}
                          <div className={styles.rowTable}>

                                    {/* Contract Description TextField */}
                                    {(this.state.SelectedContractType === 'Other' || this.props.BindContractType === 'Other') &&
                                      <div className={styles.colmd3}>
                                                  <label className={styles.labelstyle}>Add Contract Type</label>

                                                  <TextField className={styles.myDropDown}
                                                    type="textarea"
                                                    onChange={this.getAddContractType}
                                                    disabled={this.props.DisabledValue}
                                                    placeholder="Add Project Name .."
                                                    onKeyDown={this.handleKeyDown}
                                                  />
                                      </div>}

                          </div>

                          {/* 3st Row of Form */}
                          <div className={styles.rowTable}>

                                      
                                      <div className={styles.colmd3}>{/* Vendor Point of Contract Text Field */}
                                              <label className={styles.labelstyle}>Vendor Point of Contact</label>

                                              <TextField className={styles.myDropDown}
                                                type="textarea"
                                                onChange={this.getVendorContact}
                                                disabled={this.props.DisabledValue}
                                                defaultValue={this.props.Mode=="New"?"":this.state.VendorPointOfContact}
                                                placeholder="Type Vendor Contact.."
                                              />
                                      </div>

                                     
                                      <div className={styles.colmd3}> {/* Total Contrct ValuenText Field */}
                                              <label className={styles.labelstyle}>Total Contract Value (USD)</label>
                                              <br></br>
                                              <TextField className={styles.myDropDown}
                                                type="textarea"
                                                onChange={this.getContractValue}
                                                disabled={this.props.DisabledValue}
                                                defaultValue={this.props.Mode=="New"?"":this.state.TotalContractValue}
                                                placeholder="Type Total Contract Value (USD).."
                                              />
                                      </div>

            
                                      <div className={styles.colmd3}>{/* Budget ID Tex Field */}
                                              <label className={styles.labelstyle}>Budget ID</label>
                                              <TextField className={styles.myDropDown}
                                                type="textarea"
                                                onChange={this.getBudgetId}
                                                disabled={this.props.DisabledValue}
                                                defaultValue={this.props.Mode=="New"?"":this.state.BudgetId}
                                                placeholder="Type Budget ID.."
                                              />

                                      </div>
                          </div>

                          <div className={styles.rowTable}>
                                     
                                      <div className={styles.colmd3}> {/* Comments MultiTextLine Field */}
                                                <label className={styles.labelstyle}>Comment</label>
                                                <br></br>
                                                <TextField className={styles.myDropDown1}
                                                  type="textarea"
                                                  multiline rows={1}
                                                  onChange={this.getComment}
                                                  disabled={this.props.DisabledValue}
                                                  defaultValue={this.props.Mode=="New"?"":this.state.Comments}
                                                  placeholder="Type Comment.." />
                                      </div>

                                      
                                      <div className={styles.colmd3}>{/* Contract Description TextField */}
                                                <label className={styles.labelstyle}>Contract Description</label>

                                                <TextField className={styles.myDropDown1}
                                                  type="textarea"
                                                  onChange={this.getContractDescription}
                                                  multiline rows={1}
                                                  disabled={this.props.DisabledValue}
                                                  defaultValue={this.props.Mode=="New"?"":this.state.ContractDescription}
                                                  placeholder="Type Contract Description.."
                                                />
                                      </div>
                                      
                                      <div className={styles.colmd3}>{/* Budget ID Tex Field */}
                                                <label className={styles.labelstyle}>Transaction Type</label>
                                                <Dropdown
                                                  className={styles.myDropDown}
                                                  options={this.props.TransactionType}
                                                  onChange={this.getTransactionType}
                                                  disabled={this.props.DisabledValue}
                                                  defaultSelectedKey={this.props.Mode=="New"?this.props.TransactionType:this.state.SelectedTransactionType}
                                                  placeholder="Select Transaction Type..">
                                                </Dropdown>

                                      </div>
                          </div>
                  
                          <br></br>
          
                          <div className={styles.rowTable}>{/* 4th Row */}
                                    {/* Address MultiTextLine Field*/}
                                    <div className={styles.colmd3}>
                                      <label className={styles.labelstyle}>Point of Contact Address</label>
                                      <TextField className={styles.myDropDown}
                                        type="textarea"
                                        multiline rows={7}
                                        onChange={this.getAddress}
                                        disabled={this.props.DisabledValue}
                                        defaultValue={this.props.Mode=="New"?"":this.state.PointOfContactAddress}
                                        placeholder="Type Address.." />
                                    </div>

                          </div>
                          <br></br>
                          <div className={styles.rowTable}>

                                      <div className={styles.colmd3}></div>

                                      <div className={styles.colmd3}>
                                        <label className={styles.labelstyle}>Attachment</label>

                                        <input className='form-control'
                                          type="file" ref={(elm) => { this._input = elm; }}
                                          onChange={this.AttachmentErr}
                                        >

                                        </input>
                                        {this.state.isDocAttached && <span className={styles.errorMSG}>
                                          {this.state.DocAttachedErrMsg}
                                        </span>}

                                      </div>
                          </div>
                </div>
      
                <br></br>
        {/* Second Form  */}
        {
          this.state.AddMore &&
          <div className={styles.newRequestForm}>
            <IconButton
              styles={AddMoreIcon}
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={this.ExitAddMore.bind(this)}
            />
            {/* 1st Row of Form */}
            <div className={styles.rowTable}>

              {/* Term Type Check Box */}
              {this.state.VarAutoRnewal === false &&
                <div className={styles.colmd3}>
                  <label className={styles.labelstyle}>Term Type</label>
                  <br></br>
                  <div className={styles.myDropDown}>
                    
                    <Checkbox label="Fixed"
                      checked={this.state.VarFixedValue}
                      title="Fixed"
                      //defaultChecked={this.state.FixedValue != null ? this.state.FixedValue.indexOf("Fixed") > -1 ? true : false : false}
                      onChange={this._getFixedValue} 
                      disabled={this.props.DisabledValue}
                      />
                  </div>
                </div>
                }

              {/* Auto Renewal checkBox */}
              {this.state.VarFixedValue === false &&
                <div className={styles.colmd3}>
                  <br></br>

                  <div className={styles.myDropDown}>
                    <Checkbox label="Auto Renewal"
                      checked={this.state.VarAutoRnewal}
                      title="Auto Renewal"
                      //defaultChecked={this.state.AutoRenewalValue != null ? this.state.AutoRenewalValue.indexOf("Auto Renewal") > -1 ? true : false : false}
                      onChange={this._getAutoRenewal}
                      disabled={this.props.DisabledValue}
                      />
                  </div>
                </div>}

              {/* Renewal by Notice check box */}
              <div className={styles.colmd3}>
                <br></br>
                <div className={styles.myDropDown}>
                  <Checkbox label="Renewal by Notice"
                    checked={this.state.VarRenewalNotice}
                    title="Renewal by Notice"
                    //defaultChecked={this.state.RenewalByNoticeValue != null ? this.state.RenewalByNoticeValue.indexOf("Renewal by Notice") > -1 ? true : false : false}
                    onChange={this._getRenewalNotice}
                    disabled={this.props.DisabledValue}
                    />
                </div>

              </div>

              <div className={styles.colmd3}>
                <br></br>
                <div className={styles.myDropDown}>
                  <Checkbox label="Perpetual"
                    checked={this.state.VarPerpetual} 
                    title="Perpetual"
                    onChange={this._getPerpetual}
                    //defaultChecked={this.state.PerpetualValue != null ? this.state.PerpetualValue.indexOf("Perpetual") > -1 ? true : false : false}
                    disabled={this.props.DisabledValue}
                  />
                </div>

              </div>
            </div>
            {/* 2nd Row of Form */}
            <div className={styles.rowTable}>

              {/* Termination DatePicker */}
              { 
               this.state.VarFixedValue===true
              &&
                <div className={styles.colmd3}>
                  <label className={styles.labelstyle}>Termination Date</label>
                  <br></br>
                  <div className={styles.myDropDown}>
                    <DatePicker
                      placeholder="Select Termination Date..."
                      ariaLabel="Select a date"
                      value={this.state.TerminationDate}
                      onSelectDate={this.TerminationDateChange}
                      disabled={this.props.DisabledValue}
                    /> 
                  </div>
                </div>
              }

              {/* ProjectName Dropdown */}
              {
              this.state.VarAutoRnewal===true
              &&
                <div className={styles.colmd3}>
                  <label className={styles.labelstyle}>Renewal Period</label>
                  <br></br>
                  <TextField className={styles.myDropDown}
                    type="textarea"
                    onChange={this.getRenewalPeriod}
                    defaultValue={this.props.Mode !=="Edit"?"":this.state.TerminationPeriod}
                    disabled={this.props.DisabledValue}
                    placeholder="Type Renewal Period.."
                  />
                </div>
              }

              {/* Days beore Renewal Date TextField */}
              {
               this.state.VarRenewalNotice===true
              &&
                <div className={styles.colmd3}>
                  <label className={styles.labelstyle}>Days before Renewal Date</label>
                  <br></br>
                  <TextField className={styles.myDropDown}
                    type="textarea"
                    onChange={this.getDaysBeforeRenewalDate}
                    defaultValue={this.props.Mode !=="Edit"?"":this.state.DateToExtend}
                    disabled={this.props.DisabledValue}
                    placeholder="Type Days before Renewal Date.."
                  />
                </div>
              }
              {
                this.state.VarRenewalNotice===true
              &&
                <div className={styles.colmd3}>
                  <label className={styles.labelstyle}>Renewal Date</label>
                  <br></br>
                  <div className={styles.myDropDown}>
                    <DatePicker
                      placeholder="Select Renewal Date..."
                      ariaLabel="Select a date"
                      value={this.state.RenewalNoticeDate}
                      onSelectDate={this.RenewalNoticeDateChange}
                      disabled={this.props.DisabledValue}
                    />
                  </div>
                </div>
              }
            </div>


            {/* 1st Row of Form */}
            <div className={styles.rowTable}>

              {/* Termination CheckBox */}
              <div className={styles.colmd3}>
                <label className={styles.labelstyle}>Termination</label>
                <br></br>
                <div className={styles.myDropDown}>
                  <Checkbox 
                    label="Discretionary Termination"
                    checked={this.state.VarDiscretionary}
                    title="Discretionary Termination"
                    //defaultChecked={this.state.DiscretionaryValue != null ? this.state.DiscretionaryValue.indexOf("Discretionary Termination") > -1 ? true : false : false}
                    onChange={this._getDiscretionary} 
                    disabled={this.props.DisabledValue}
                    />
                </div>
              </div>

              {/* Termination of Breach Check Box */}
              <div className={styles.colmd3}>
                <br></br>
                <div className={styles.myDropDown}>
                  <Checkbox 
                    label="Termination by breach"
                    checked={this.state.VarTerminationBreach}
                    title="Termination by breach"
                    //defaultChecked={this.state.TerminationBreachValue != null ? this.state.TerminationBreachValue.indexOf("Termination by breach") > -1 ? true : false : false}
                    onChange={this._getTerminationBreach}
                    disabled={this.props.DisabledValue}
                    />
                </div>
              </div>

              {/* Contracting Party Dropdown */}
              <div className={styles.colmd3}>
                {/* <label className={styles.labelstyle}>Contracting Party</label>
                                                         <span className={styles.RedStar}>*</span> */}
                <br></br>
                <div className={styles.myDropDown}>
                  <Checkbox label="Termination by non-renewal" 
                  checked={this.state.VarTerminationStopping} 
                  title="Termination by non-renewal" 
                  //defaultChecked={this.state.TerminationStoppingValue != null ? this.state.TerminationStoppingValue.indexOf("Termination by non-renewal") > -1 ? true : false : false}
                  onChange={this._getTerminationStopping} 
                  disabled={this.props.DisabledValue}
                  />
                </div>
                <React.Fragment>

                </React.Fragment>
              </div>
            </div>

            {/* 4th Row of Form */}
            <div className={styles.rowTable}>

              {/* BesaEntity Dropdown */}
              {
              this.state.VarDiscretionary===true
              &&
                <div className={styles.colmd3}>
                  <label className={styles.labelstyle}>No. of Days for Notice</label>
                  {/* <span className={styles.RedStar}>*</span> */}
                  <br></br>

                  <TextField className={styles.myDropDown}
                    type="textarea"
                    onChange={this.getDaysForNotice}
                    defaultValue={this.props.Mode !=="Edit"?"":this.state.DaysForNotice}
                    disabled={this.props.DisabledValue}
                    placeholder="No. of Days for Notice.."

                  />


                </div>}

              {/* ProjectName Dropdown */}
              {
               this.state.VarTerminationBreach ===true
              &&
                <div className={styles.colmd3}>
                  <label className={styles.labelstyle}>Recovery Period</label>
                  {/* <span className={styles.RedStar}>*</span> */}
                  <br></br>
                  <TextField className={styles.myDropDown}
                    type="textarea"
                    onChange={this.getRecoveryPeriod}
                    defaultValue={this.props.Mode !=="Edit"?"":this.state.RecoveryPeriod}
                    disabled={this.props.DisabledValue}
                    placeholder="Type Recovery Period.."

                  />
                  <React.Fragment>

                  </React.Fragment>
                </div>}

              {/* Contracting Party Dropdown */}
              {
              this.state.VarTerminationStopping ===true
              &&
                <div className={styles.colmd3}>
                  <label className={styles.labelstyle}>No. of Days</label>
                  {/* <span className={styles.RedStar}>*</span> */}
                  <br></br>
                  <TextField className={styles.myDropDown}
                    type="textarea"
                    onChange={this.getNoOfDays}
                    defaultValue={this.props.Mode !=="Edit"?"":this.state.NoOfDays}
                    disabled={this.props.DisabledValue}
                    placeholder="Type No. of Days.."

                  />
                  <React.Fragment>

                  </React.Fragment>
                </div>}
            </div>


            {/* 4th Row of Form */}
            <div className={styles.rowTable}>

              {/* BesaEntity Dropdown */}

              <div className={styles.colmd3}>
                <label className={styles.labelstyle}>Payment Type</label>
                {/* <span className={styles.RedStar}>*</span> */}
                <br></br>
                <Dropdown className={styles.myDropDown}
                  options={this.props.PaymentType}
                  onChange={this._getPaymentType}
                  defaultSelectedKey={this.props.Mode=="New"?this.props.PaymentType:this.state.SelectedPaymentType}
                  disabled={this.props.DisabledValue}
                  placeholder="Select Payment Type.."
                ></Dropdown>
              </div>




            </div>

            {/* 4th Row of Form */}
            {this.state.SelectedPaymentType === 'One Time' &&
              <div className={styles.rowTable}>

                {/* BesaEntity Dropdown */}

                <div className={styles.colmd3}>
                  <label className={styles.labelstyle}>Amount (USD)</label>
                  {/* <span className={styles.RedStar}>*</span> */}
                  <br></br>
                  <TextField className={styles.myDropDown}
                    type="textarea"
                    onChange={this.getAmountUSD}
                    defaultValue={this.props.Mode=="New"?"":this.state.AmountUSD}
                    disabled={this.props.DisabledValue}
                    placeholder="Type Amount (USD).."

                  />
                </div>

                {/* ProjectName Dropdown */}
                <div className={styles.colmd3}>
                  <label className={styles.labelstyle}>Payment Date</label>
                  {/* <span className={styles.RedStar}>*</span> */}
                  <br></br>
                  <div className={styles.myDropDown}>
                    <DatePicker
                      placeholder="Select Payment Date..."
                      value={this.state.PaymentDate}
                      onSelectDate={this.PaymentDateChange}
                      disabled={this.props.DisabledValue}
                      onKeyDown={(e) => e.preventDefault()}
                    />

                  </div>
                  <React.Fragment>

                  </React.Fragment>
                </div>

              </div>
            }

            {                 

              this.state.SelectedPaymentType === 'Periodically' &&
              
              <div className={styles.rowTablePeriodically}>
                <table className={styles.PeriodicallyTable}>
                        
                        <div className={this.state.IPeriodicallyModel.length > 0 ? styles.groove : ""}>
                        {this.state.IPeriodicallyModel.map((item: any, idx: any) => (
                        <Periodically
                          periodicallyModel={this.state.IPeriodicallyModel}
                          handleAddRow={this.handleAddRow}
                          handleRemoveRow={this.handleRemoveRow}
                          handleChange={this.handleChange}
                          periodOptions={this.props.Period}
                          DisabledValue={this.props.DisabledValue}
                          idx={idx}
                          item={item}
                        />
                        ))}
                        </div>
                        
                  <br></br>
                  <button className='btn btn-primary addItemsRow'
                    disabled={this.props.DisabledValue} id="addDetailRow"
                    onClick={this.handleAddRow}>Add New</button>
                </table>

              </div>
            }

                        {
                          this.state.SelectedPaymentType === 'Variable Periodically' &&

                          <div className={styles.rowTablePeriodically}>
                            <table className={styles.PeriodicallyTable}>
                              <div className={this.state.IVariablePeriodicallyModel.length > 0 ? styles.groove : ""}>
                              {
                              this.state.IVariablePeriodicallyModel.map((item: any, idx: any) => (
                              <VariablePeriodically
                              VariablePeriodicallyModel={this.state.IVariablePeriodicallyModel}
                              _handleAddRowIVariablePeriodicallyModel={this._handleAddRowIVariablePeriodicallyModel}
                              _handleRemoveSpecificRowIVariablePeriodicallyModel={this._handleRemoveSpecificRowIVariablePeriodicallyModel}
                              _handleChangeVariablePeriodically={this._handleChangeVariablePeriodically}
                              periodOptions={this.props.Period}
                              DisabledValue={this.props.DisabledValue}
                              idx={idx}
                              item={item}
                              /> 
                              ))}
                              </div>
                              <br></br>
                              <button className='btn btn-primary addItemsRow' 
                              id="addDetailRow"
                              disabled={this.props.DisabledValue}
                              onClick={this._handleAddRowIVariablePeriodicallyModel}>Add New</button>
                            </table>
                          </div>
                        }

            {
              this.state.SelectedPaymentType === 'Milestone based' &&
              <div className={styles.rowTablePeriodically}>
                <table className={styles.PeriodicallyTable}>

                  <div className={this.state.IProcurementModel.length > 0 ? styles.groove : ""}>
                  {
                    this.state.IProcurementModel.map((item: any, idx: any) => (
                    <MilestoneBased
                      IProcurementModel={this.state.IProcurementModel}
                      Milestone_handleAddRow={this.Milestone_handleAddRow}
                      Milestone_handleRemoveRow={this.Milestone_handleRemoveRow}
                      Milestone_handleChange={this.Milestone_handleChange}
                      DisabledValue={this.props.DisabledValue}
                      idx={idx}
                      item={item}
                    />
                    ))}
                  </div>

                  <br></br>
                  <button className='btn btn-primary addItemsRow'
                    disabled={this.props.DisabledValue} id="addDetailRow"
                    onClick={this.Milestone_handleAddRow}>Add New</button>
                </table>

              </div>
            }

          </div>
        }
        {/* 1st Form */}
        <div className={styles.newRequestForm}>
          <div className={styles.rowTableBtn}>
            {/* Add More Button*/}
            <div className={styles.colmd4}>
              <label className={styles.labelstyle}>Risk Factor</label>
              <TextField className={styles.myDropDown1}
                type="textarea"
                multiline rows={3}
                onChange={this.getRiskFactor}
                defaultValue={this.props.Mode=="New"?"":this.state.RiskFactor}
                disabled={this.props.DisabledValue}
                placeholder="Type Comment.." />
            </div>
          </div>
          <br></br>
          <br></br>

          <div className={styles.rowTableBtn}>

            <div className={styles.colmd4}>
              <label className={styles.labelstyle}>Reminder Comment</label>
              <br></br>
              <TextField className={styles.myDropDown}
                type="textarea"
                onChange={this.getReminderComment}
                defaultValue={this.props.Mode=="New"?"":this.state.ReminderComment}
                disabled={this.props.DisabledValue}
                placeholder="Type Reminder comment.."

              />
            </div>


            <div className={styles.colmd4}>
              <label className={styles.labelstyle}>Reminder Date</label>
              {/* <span className={styles.RedStar}>*</span> */}
              <br></br>
              <div className={styles.myDropDown}>
                <DatePicker
                  placeholder="Select a date..."
                  value={this.state.ReminderDate}
                  disabled={this.props.DisabledValue}
                  onSelectDate={this.ReminderDateChange}
                />
              </div>
            </div>
          </div>
        </div>
       
        <br></br>
        
        <br></br>
        <br></br>

        {/* Buttons For Action */}
        <div className={styles.rowTableBtn}>
                  {/* Add More Button*/}
                  <div className={styles.colmd4}>

                            {
                              (this.state.AddMore === false && this.props.Mode==="New") &&
                              <DefaultButton className={styles.AddmoreBtn} 
                              onClick={this.AddMoreInfo}>Add More</DefaultButton>
                            }
                             {
                              (this.state.AddMore === false  && this.props.Mode==="Edit") &&
                              <DefaultButton className={styles.AddmoreBtn} 
                              onClick={this.AddMoreInfo}>View More</DefaultButton>
                            }

                            <DefaultButton className={styles.ObligationBtn} 
                            onClick={this.ObligationOpenPopup} >Obligation</DefaultButton>

                            <DefaultButton className={styles.ObligationBtn} 
                            onClick={this.InsuranceOpenPopup} >Insurance</DefaultButton>
                  </div>   
                 
                    {/* Submitted Button */}
                    
                    <div className={styles.colmd3}>

                            {
                            this.props.Mode==="New"&&
                                <span>
                                  <DefaultButton 
                                  className={styles.CreateBtn} 
                                  onClick={() => this.createItem("Submitted")}>Submit</DefaultButton>
                                  <span className={styles.errorMSGButtonside}>{this.state.DocAttachedErrMsg}</span>
                                </span>
                            }
                            {
                                this.props.DisabledValue === false && this.props.RadioOption != 'Child Document'&& this.props.PopupType == 'Edit' &&
                                <span>
                                  <DefaultButton
                                    className={styles.UpdateBtn}
                                    onClick={() => this.Update('Update')}
                                  >Update</DefaultButton>
                                </span>
                            }
                             {
                                this.props.DisabledValue === false && this.props.RadioOption === 'Child Document'&& this.props.PopupType == 'ChildEdit' &&
                                <span>
                                  <DefaultButton
                                    className={styles.UpdateBtn}
                                    onClick={() => this.ChildUpdate('Update')}
                                  >Update</DefaultButton>
                                </span>
                            }
                                { 
                                this.props.DisabledValue === false && this.props.RadioOption == 'Child Document' && this.props.PopupType == 'ParentEdit' &&
                                <span>
                                  <DefaultButton 
                                  className={styles.UpdateBtn} 
                                  // disabled={this.state.VarDisabledBtnOnCreate} 
                                  onClick={() => this.createChildsItem("Submitted")}
                                  >Create Childs</DefaultButton>
                                 
                                </span>

                              }     
                  </div>
                  <div className={styles.colmd3}>
                    {this.props.Mode==="New"&&
                  <span>
                            <DefaultButton 
                            className={styles.DraftBtn}
                            onClick={() => this.DraftFunction("Draft")}>Save Draft</DefaultButton>
                  </span>
                  }
                  </div> 
                            
                  
        </div>     
        
        {this.props.Mode=="Edit" &&
        <div className={styles.rowTable}>
                <div className={styles.colmd3}>
                  <label className={styles.labelstyle}>Attachment</label>
                  {this.renderDocuments()}
                </div>
              </div>
        }

        <Modal
              titleAriaId={"Milestone"}
              isOpen={this.state.openInsurancePopup}
              onDismiss={this.InsuranceExitHandler}
              isBlocking={true}
              containerClassName={contentStyles.container}
            >

              <div className={contentStyles.header}>
                <span id={"Popup"}>Insurance</span>
                <IconButton
                  styles={iconButtonStyles}
                  iconProps={cancelIcon}
                  ariaLabel="Close popup modal"
                  onClick={this.InsuranceExitHandler}
                />
              </div>

              <table className={styles.newRequestTable}>
                <div className={this.state.IInsurance.length > 0 ? styles.groove : ""}>
                {
                this.state.IInsurance.map((item: any, idx: any) => (
                <Insurance
                      IInsurance={this.state.IInsurance}
                      _handleInsuranceAddRow={this._handleInsuranceAddRow}
                      _handleRemoveInsuranceSpecificRow={this._handleRemoveInsuranceSpecificRow}
                      _handleChangeInsurance={this._handleChangeInsurance}
                      DisabledValue={this.props.DisabledValue}
                      idx={idx}
                      item={item}
                    />
                ))}
                </div>
              </table>

              <button className='btn btn-primary addItemsRow'
                disabled={this.props.DisabledValue} id="addDetailRow"
                onClick={this._handleInsuranceAddRow}>Add New</button>
              {/* <br></br> */}
              <div className={styles.CloseMilestone}>
                <DefaultButton className={styles.CloseMilestonetbtn} disabled={this.state.DisabledValue} onClick={this.InsuranceExitHandler}>Save</DefaultButton>
              </div>
            </Modal>
            {/* Insurance Popup Form */}



        <Modal
              titleAriaId={"Milestone"}
              isOpen={this.state.openObligationPopup}
              onDismiss={this.ObligationExitHandler}
              isBlocking={true}
              containerClassName={contentStyles.container}
            >

              <div className={contentStyles.header}>
                <span id={"Popup"}>Obligation</span>
                <IconButton
                  styles={iconButtonStyles}
                  iconProps={cancelIcon}
                  ariaLabel="Close popup modal"
                  onClick={this.ObligationExitHandler}
                />
              </div>

              <table className={styles.newRequestTable}>
                <div className={this.state.IObligation.length > 0 ? styles.groove : ""}>
                {
                this.state.IObligation.map((item: any, idx: any) => (
                <Obligation
                      IObligation={this.state.IObligation}
                      _handleObligationAddRow={this._handleObligationAddRow}
                      _handleRemoveObligationSpecificRow={this._handleRemoveObligationSpecificRow}
                      _handleChangeObligation={this._handleChangeObligation}
                      DisabledValue={this.props.DisabledValue}
                      idx={idx}
                      item={item}
                    />
                ))}
                </div>
              </table>

              <button className='btn btn-primary addItemsRow'
                disabled={this.props.DisabledValue} id="addDetailRow"
                onClick={this._handleObligationAddRow}>Add New</button>
              {/* <br></br> */}
              <div className={styles.CloseMilestone}>
                <DefaultButton className={styles.CloseMilestonetbtn} disabled={this.state.DisabledValue} onClick={this.ObligationExitHandler}>Save</DefaultButton>
              </div>
            </Modal>

           
      
    </div>
</section>
    );
  }
}
