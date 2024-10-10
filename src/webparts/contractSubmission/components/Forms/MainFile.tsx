import * as React from 'react';
import styles from '../ContractSubmission.module.scss';
import { IContractSubmissionProps } from '../IContractSubmissionProps';
import { ChoiceGroup, DefaultButton, IChoiceGroupOption, IChoiceGroupStyles, IDropdownOption, Pivot, PivotItem } from 'office-ui-fabric-react';
import  Services  from '../Services/Services';
import ParentForm from './ParentForm';
import SPServices from '../Services/SPServices';
import { IListItem } from '../Dashboard/IListItem';
import SubmittedRequest from '../Dashboard/SubmittedRequest';
import ModelPopup from './ModelPopup';
import {  trimStart } from '@microsoft/sp-lodash-subset';
import { IMainFileState } from './IMainFileState';
import ChildSubmittedRequest from '../Dashboard/ChildSubmittedRequest';
import { sp } from '@pnp/sp';
import * as XLSX from "xlsx";


  const listName = "Contract Management"; // Replace with your SharePoint list name
  const selectables ="*,Author/Title";   // Replace with the columns you want to retrieve
  const pageSize = 500;                 // Set the page size; use a larger number if needed
  const expandStr = " Author";         // Expand related fields if needed; otherwise, leave empty
  const SelectLablesforFiles ="*,FileLeafRef,FileRef,EncodedAbsUrl,Author/Title,Author/ID,Author/EMail,Contract/ID,Contract/Title"
  const ExpandStrforFiles="Author,Contract"

export default class MainFile extends React.Component<IContractSubmissionProps, IMainFileState, {}> {
  public _SPOps: Services;

  constructor(props: IContractSubmissionProps) {
    super(props);
    this.state = {
      PopupType:'',
      selectedContractSubmission:[],
      ContractingParty: [],
      BesaEntity: [],
      ProjectName: [],
      ContractType: [],
      TransactionType: [],
      PaymentType: [],
      items: [],
      RadioOption: 'Parent Agreement .',
      openEditDialog: false,
      Period:[],
      DisabledValue:false,
      Documents: [],
      BindBesaEntity:'',
      BindContractingParty:'',
      BindProjectName:'',
      BindDescription:'',
      BindBesaOfficer:'',
      selectedItemID:null,
      RequestID:'',
      Mode:"New",

      IPeriodicallyModel:[],
      IMilestoneBasedModel:[],
      IVariablePeriodicallyModel:[],
      IInsuranceModel:[],
      IObligationModel:[],

      Bind_PaymentType:'',
      BindVendorPointOfContact:'',
      BindTotalContractValue:'',
      BindBudgetId:'',
      BindPointOfContactAddress:'',
      BindComments:'',
      BindContractDate:null,
      BindContractType:'',
      BindTransactionType:'',
      IContractItems: [],
      allContractItems: [],

      BindTerminationDate:undefined,
      BindRenewalNoticeDate:undefined,
      BindTerminationPeriod: '',
      BindDateToExtend: '',
      BindDaysForNotice: '',
      BindRecoveryPeriod: '',
      BindNoOfDays: '',
      BindAmountUSD: '',
      BindBindRiskFactor:'',
      BindReminderDate: '', 
      BindBindReminderComment: '',
      BindPaymentDate: null,
      BindStatus:'',

      BindFixedValue:'',
      BindVarFixedValue:false,

      BindAutoRenewalValue:'',
      BindVarAutoRnewal:false,

      BindRenewalByNoticeValue:'',
      BindVarRenewalNotice:false,

      BindVarPerpetual:false,
      BindPerpetualValue:'',

      BindVarDiscretionary: false,
      BindDiscretionaryValue:'',

      BindVarTerminationBreach: false,
      BindTerminationBreachValue:'',

      BindVarTerminationStopping:false,
      BindTerminationStoppingValue:'',

      BindVarExpiredValue:false,
      BindExpiredValue:''
    }
    this.RadioOnchange = this.RadioOnchange.bind(this)
    this.ExitHandler = this.ExitHandler.bind(this);
  }

  

  public componentDidMount(): void {
    //Get BesaEntity Dropdown data from list
    Services.
      getTeamMaster().then((data: any) => {
        var BesaEntity: IDropdownOption[] = [];
        data.map((result: any) => { BesaEntity.push({ key: result.Title, text: result.Title }) })
        this.setState({ BesaEntity: BesaEntity })
      });
    //Get ProjectName Dropdown data from list
    Services.
      getProjectMaster().then((data: any) => {
        var ProjectName: IDropdownOption[] = [];
        data.map((result: any) => { 
        ProjectName.push({ key: result.Title, text: result.Title }) })
        this.setState({ ProjectName: ProjectName })
      });
    //Get ContractingParty Dropdown data from list
    Services.
      getCompanyMaster().then((data: any) => {
        var ContractingParty: IDropdownOption[] = [];
        data.map((result: any) => { ContractingParty.push({ key: result.Title, text: result.Title }) })
        this.setState({ ContractingParty: ContractingParty })
      });
    //Get ContractType Dropdown data from list
    Services.
      getContractType().then((data: any) => {
        var ContractType: IDropdownOption[] = [];
        data.map((result: any) => { ContractType.push({ key: result.Title, text: result.Title }) })
        this.setState({ ContractType: ContractType })
      });
      //Get PaymentType Dropdown data from list
      Services.
      getPaymentType().then((data: any) => {
        var PaymentType: IDropdownOption[] = [];
        data.map((result: any) => { PaymentType.push({key: result.Payment_Type,text: result.Payment_Type})})
        this.setState({ PaymentType: PaymentType })
      });

      //Get PaymentType Dropdown data from lists
      Services.
      getTransactionType().then((data: any) => {
        var TransactionType: IDropdownOption[] = [];
        data.map((result: any) => { TransactionType.push({key: result.TransactionType,text: result.TransactionType})})
        this.setState({ TransactionType: TransactionType })
      });

      //Get PaymentType Dropdown data from lists
      Services.
      GetPeriod().then((data: any) => {
        var Period: IDropdownOption[] = [];
        data.map((result: any) => { Period.push({key: result.Period,text: result.Period})})
        this.setState({ Period: Period })
      });
      let IListItem: IListItem[] = [];
      SPServices.
      getAllListData(listName,selectables,pageSize,expandStr)
      .then((results) => {  
        results.map((item: any) => { 
          IListItem.push({  
                Title: item.Title,  
                ProjectName: item.ProjectName,  
                BesaEntity: item.BesaEntity,  
                VndorDetails: item.VndorDetails,
                Status: item.Status,
                TransactionType: item.TransactionType,
                RequestID: item.RequestID,
                AuthorTitle: item.Author.Title,
                ID: item.ID
            });  
        });  
        this.setState({items:IListItem})
    });

  let filterItems: any = [];
  // let ChildsItems:any=[];
  SPServices.getAllParentsItems(this.props.ListName).then((parentResponse: any) => {
    SPServices.getAllChildsItems(this.props.ChildListName).then((childResponse: any) => {
      let AllData = [...parentResponse, ...childResponse];
      parentResponse.map((filterItem: any, index: any) => {
        let item = { Id: '', ID: '', BesaEntity: "", ProjectName: "", Title: "", TransactionType: "", BesaOfficer: "", RequestID: "" };
        item.ID = filterItem.ID;
        item.Id = filterItem.ID;
        item.BesaEntity = filterItem.BesaEntity;
        item.ProjectName = filterItem.ProjectName;
        item.Title = filterItem.Title;
        item.TransactionType = filterItem.TransactionType;
        item.BesaOfficer = filterItem.BesaOfficer;
        item.RequestID = filterItem.RequestID;
        if (filterItem.ParentIDId == undefined) {
          filterItems.push(item);
          SPServices.getChilds(item, AllData);

        }
      })
      this.setState({
        IContractItems: filterItems,
        allContractItems: filterItems
      })
      console.log(filterItems)
    });
  });

  
  }

  


  public ConvertDate(dateValue:any) {
    var d = new Date(dateValue),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  
public OpenEditForm =(formType: string, selectedItem: any,Mode:string)=> {
  this.setState({Mode:Mode});
  this.getSelectedContractSubmissionDetail(selectedItem, formType);
  this.setState({ selectedItemID: selectedItem.ID, RequestID: selectedItem.RequestID })
  if (formType == "EditMySubmission") {
    selectedItem.formType = "Edit";
    this.setState({ DisabledValue: false, PopupType: 'Edit' })
  }
  if (formType == "ChildEdit") {
    selectedItem.formType = "Child";
    this.setState({ DisabledValue: false, PopupType: 'ChildEdit' })
  }
  if (formType == "ParentEdit") {
    selectedItem.formType = "Parent";
    this.setState({ DisabledValue: false, PopupType: 'ParentEdit' })
  }
  if (formType == "ViewChildSubmission") {
    selectedItem.formType = "View";
    this.setState({ DisabledValue: true })
  }
  if (formType == "ViewMySubmission") {
    selectedItem.formType = "View";
    this.setState({ DisabledValue: true })
  }
};
/**
   * get selectedConract Submission form Item ---
   */
getSelectedContractSubmissionDetail = (selectedItem: any, formType: any) => {
    let PeriodicallyListName = "";
    let MilestonebasedListName = "";
    let InsuranceListName = "";
    let ObligationListName = "";
    let VariablePeriodicallyListName = "";
    let listName = "";
  if (formType == "EditMySubmission") {
    listName = "Contract Management"
    PeriodicallyListName = "Periodically"
    MilestonebasedListName = "MilestoneBased"
    InsuranceListName = "Insurance"
    ObligationListName = "Obligation"
    VariablePeriodicallyListName = "VariablePeriodically"
  }
  if (formType == "ViewMySubmission") {
    listName = "Contract Management"
    PeriodicallyListName = "Periodically"
    MilestonebasedListName = "MilestoneBased"
    InsuranceListName = "Insurance"
    ObligationListName = "Obligation"
    VariablePeriodicallyListName = "VariablePeriodically"
  }
  if (formType == "ChildEdit") {
    listName = "ContractManagementChilds"
    PeriodicallyListName = "PeriodicallyChild"
    MilestonebasedListName = "MilestoneBasedChild"
    InsuranceListName = "InsuranceChild"
    ObligationListName = "ObligationChild"
    VariablePeriodicallyListName = "VariablePeriodicallyChild"
  }
  if (formType == "ViewChildSubmission") {
    listName = "ContractManagementChilds"
    PeriodicallyListName = "PeriodicallyChild"
    MilestonebasedListName = "MilestoneBasedChild"
    InsuranceListName = "InsuranceChild"
    ObligationListName = "ObligationChild"
    VariablePeriodicallyListName = "VariablePeriodicallyChild"
  }
  if (formType == "ParentEdit") {
    listName = "Contract Management"
    PeriodicallyListName = "Periodically"
    MilestonebasedListName = "MilestoneBased"
    InsuranceListName = "Insurance"
    ObligationListName = "Obligation"
    VariablePeriodicallyListName = "VariablePeriodically"
  }

  SPServices.getListItem(listName,selectables,expandStr,selectedItem.ID ).then((result) => {
    this.setState({
     BindBesaEntity:result.BesaEntity,
     BindContractingParty:result.Title,
     BindProjectName:trimStart(result.ProjectName),
     BindDescription:result.DescriptionOfProduct,
     BindBesaOfficer:result.BesaOfficer,
     Bind_PaymentType:result.PaymentType,
     BindVendorPointOfContact:result.VendorPointOfContract,
     BindTotalContractValue:result.TotalContractValue,
     BindBudgetId:result.BudgetID,
     BindPointOfContactAddress:result.PointOfContractAddress,
     BindComments:result.Comments,
     BindContractDate:result.ContractDate != null ? new Date(result.ContractDate) : null,
     BindContractType:result.ContractType,
     BindTransactionType:result.TransactionType,
     //---Basic Form Inputes End---
     BindVarExpiredValue:result.Status ==="Expired"?true:false,
     BindExpiredValue:result.Status,

     BindVarFixedValue:result.TerminationType != null && result.TerminationType.indexOf("Fixed") > -1 == true ? true : false,
     BindFixedValue: result.TerminationType != null && result.TerminationType.indexOf("Fixed") > -1 == true ? "Fixed" : null,

     BindVarAutoRnewal: result.TerminationType != null && result.TerminationType.indexOf("Auto Renewal") > -1 == true ? true : false,
     BindAutoRenewalValue: result.TerminationType != null && result.TerminationType.indexOf("Auto Renewal") > -1 == true ? "Auto Renewal" : null,

     BindVarRenewalNotice: result.TerminationType != null && result.TerminationType.indexOf("Renewal by Notice") > -1 == true ? true : false,
     BindRenewalByNoticeValue: result.TerminationType != null && result.TerminationType.indexOf("Renewal by Notice") > -1 == true ? "Renewal by Notice" : null,

     BindVarPerpetual: result.TerminationType != null && result.TerminationType.indexOf("Perpetual") > -1 == true ? true : false,
     BindPerpetualValue: result.TerminationType != null && result.TerminationType.indexOf("Perpetual") > -1 == true ? "Perpetual" : null,

     BindVarDiscretionary: result.NoticeOfTermination != null && result.NoticeOfTermination.indexOf("Discretionary Termination") > -1 == true ? true : false,
     BindDiscretionaryValue: result.NoticeOfTermination != null && result.NoticeOfTermination.indexOf("Discretionary Termination") > -1 == true ? "Discretionary Termination" : null,

     BindVarTerminationBreach: result.NoticeOfTermination != null && result.NoticeOfTermination.indexOf("Termination by breach") > -1 == true ? true: false,
     BindTerminationBreachValue: result.NoticeOfTermination != null && result.NoticeOfTermination.indexOf("Termination by breach") > -1 == true ? "Termination by breach" : null,

     BindVarTerminationStopping: result.NoticeOfTermination && result.NoticeOfTermination.indexOf("Termination by non-renewal") > -1 == true ? true : false,
     BindTerminationStoppingValue: result.NoticeOfTermination && result.NoticeOfTermination.indexOf("Termination by non-renewal") > -1 == true ? "Termination by non-renewal" : null,

     BindTerminationDate:result.FixedDate!= null ? new Date(result.FixedDate) : null,
     BindRenewalNoticeDate:result.RenewalDate != null ? new Date(result.RenewalDate) : null,
     BindTerminationPeriod: result.TerminationPeriod,
     BindDateToExtend: result.DateToExtend,
     BindDaysForNotice: result.ConvinienceDate,
     BindRecoveryPeriod: result.RecoveryPeriod,
     BindNoOfDays: result.AutoRenualDate,
     BindAmountUSD: result.AmmountUSD,
     BindBindRiskFactor: result.RiskFactor,
     BindReminderDate: result.ReminderDate != null ? new Date(result.ReminderDate) : null,
     BindBindReminderComment: result.ReminderComment,
     BindPaymentDate: result.PaymentDate != null ? new Date(result.PaymentDate) : null,
     BindStatus: result.Status
     
    });

    setTimeout(
      function () {
        this.setState({ openEditDialog: true, selectedContractSubmission: selectedItem })
      }.bind(this), 500);

      //--Get Periodically Items---
      let PeriodicallyDetails: any[] = [];
      SPServices.GetDynamicDetails(selectedItem.ID, PeriodicallyListName)
        .then((results) => {
          results.map((item) => {
            PeriodicallyDetails.push({
              id: item.Id,
              Id: item.Id,
              AmountUSD: item.Title,
              FirstPaymentDate: item.FirstPaymentDate != null ? this.ConvertDate(item.FirstPaymentDate) : null,
              Period: item.Period,
            });
          });
      
          this.setState({ IPeriodicallyModel: PeriodicallyDetails }); // Correctly access state
          console.log(this.state.IPeriodicallyModel);
        })
        .catch((error) => {
          console.error(error);
        });

        //--Get Milestone Details Items---
        let MilestoneBasedDetails: any[] = [];
        SPServices.GetDynamicDetails(selectedItem.ID, MilestonebasedListName)
          .then((results) => {
            results.map((item) => {
              MilestoneBasedDetails.push({
                id:item.Id,
                Id:item.Id,
                Description:item.Title,
                ExpectedDate:item.ExpectedDate !=null?this.ConvertDate(item.ExpectedDate): null,
                AmountUSD:item.AmountUSD,
              });
            });
        
            this.setState({IMilestoneBasedModel: MilestoneBasedDetails }); // Correctly access state
          })
          .catch((error) => {
            console.error(error);
          });


           //--Get Variable Periodiclly Details Items---
        let VariablePeriodicallyDetails: any[] = [];
        SPServices.GetDynamicDetails(selectedItem.ID, VariablePeriodicallyListName)
          .then((results) => {
            results.map((item) => {
              VariablePeriodicallyDetails.push({
                id:item.Id,
                Id:item.Id,
                AmountUSD:item.Title,
                FromDate:item.FromDate !=null?this.ConvertDate(item.FromDate): null,
                ToDate:item.ToDate !=null?this.ConvertDate(item.ToDate): null,
                Period:item.Period
              });
            });
        
            this.setState({IVariablePeriodicallyModel: VariablePeriodicallyDetails }); // Correctly access state
          })
          .catch((error) => {
            console.error(error);
          });

        //--Get Obligation Details Items---
        let ObligationDetails: any[] = [];
        SPServices.GetDynamicDetails(selectedItem.ID, ObligationListName)
          .then((results) => {
            results.map((item) => {
              ObligationDetails.push({
                id:item.Id,   
                Id:item.Id,
                Description:item.Title,
                Date:item.Date !=null?this.ConvertDate(item.Date): null,
                Frequency:item.Frequency,
              });
            });
        
            this.setState({IObligationModel: ObligationDetails }); // Correctly access state
          })
          .catch((error) => {
            console.error(error);
          });

           //--Get Obligation Details Items---
        let InsuranceDetails: any[] = [];
        SPServices.GetDynamicDetails(selectedItem.ID, InsuranceListName)
          .then((results) => {
            results.map((item) => {
              InsuranceDetails.push({
                id:item.Id,
                Id:item.Id,
                Insurance:item.Title,
                Amount:item.Amount,
                Comment:item.Comment,
              });
            });
        
            this.setState({IInsuranceModel: InsuranceDetails }); // Correctly access state
          })
          .catch((error) => {
            console.error(error);
          });
     
  });
  if (formType == "ChildEdit" || formType == "ViewChildSubmission") {
    SPServices.GetLibraryDocument(selectedItem.ParentIDId, "ContractManagementLibrary",SelectLablesforFiles,ExpandStrforFiles)
      .then((result) => {
        this.setState({ Documents: result })
      })
  }
  else {
    SPServices.GetLibraryDocument(selectedItem.ID, "ContractManagementLibrary",SelectLablesforFiles,ExpandStrforFiles)
      .then((result) => {
        this.setState({ Documents: result })
      })
  }
}

public ExitHandler() {  
    this.setState({
      openEditDialog: false,
    })
    this.setState({
      Mode: "New",
      PopupType: '',
      DisabledValue:false,
      IMilestoneBasedModel:[],
      IPeriodicallyModel:[],
      IVariablePeriodicallyModel:[],
      IObligationModel:[],
      IInsuranceModel:[],
      Bind_PaymentType:'',
      BindVendorPointOfContact:'',
      BindTotalContractValue:'',
      BindBudgetId:'',
      BindPointOfContactAddress:'',
      BindComments:'',
      BindContractDate:null,
      BindContractType:'',
      BindTransactionType:'',
      BindTerminationDate:undefined,
      BindRenewalNoticeDate:undefined,
      BindTerminationPeriod: '',
      BindDateToExtend: '',
      BindDaysForNotice: '',
      BindRecoveryPeriod: '',
      BindNoOfDays: '',
      BindAmountUSD: '',
      BindBindRiskFactor:'',
      BindReminderDate: '',
      BindBindReminderComment: '',
      BindPaymentDate: null,
      BindStatus:'',

      BindVarFixedValue:false,
      BindFixedValue:'',
      BindVarAutoRnewal:false,
      BindAutoRenewalValue:'',
      BindVarRenewalNotice:false,
      BindRenewalByNoticeValue:'',
      BindVarPerpetual:false,
      BindPerpetualValue:'',
      BindVarDiscretionary:false,
      BindDiscretionaryValue:'',
      BindVarTerminationBreach:false,
      BindTerminationBreachValue:'',
      BindVarTerminationStopping:false,
      BindTerminationStoppingValue:''
    })
  }

  public RadioOnchange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
    console.dir(option);
    this.setState({ RadioOption: option.text })
  }

  public ExportExcelFormat(items: any) {
    try {
      const formattedData = items.map((excelItem: any) => ({
        Title: excelItem.Title,
        BesaEntity: excelItem.BesaEntity,
        ProjectName: excelItem.ProjectName,
        DescriptionOfProduct: excelItem.DescriptionOfProduct,
        VendorName: excelItem.VendorName,
        DocumentLink: excelItem.DocumentLink,
        Comments: excelItem.Comments,
        TerminationType: excelItem.TerminationType,
        NoticeOfTermination: excelItem.NoticeOfTermination,
        FixedDate: excelItem.FixedDate,
        TerminationPeriod: excelItem.TerminationPeriod,
        DateToExtend: excelItem.DateToExtend,
        ConvinienceDate: excelItem.ConvinienceDate,
        RecoveryPeriod: excelItem.RecoveryPeriod,
        AutoRenualDate: excelItem.AutoRenualDate,
        PaymentType: excelItem.PaymentType,
        AmmountUSD: excelItem.AmmountUSD,
        HowMuch: excelItem.HowMuch,
        FirstPaymentDate: excelItem.FirstPaymentDate,
        Amount_x0028_USD_x0029_: excelItem.Amount_x0028_USD_x0029_,
        Period: excelItem.Period,
        ContractDate: excelItem.ContractDate,
        CompanyID: excelItem.CompanyID,
        ProjectID: excelItem.ProjectID,
        ContractType: excelItem.ContractType,
        TransactionType: excelItem.TransactionType,
      })
      );

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const data = new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ListData.xlsx";
      link.click();
    } catch (error) {
      console.error(error);
    }

  }

 //Export to excel of list data -----
 public exportToExcel = async () => {
  //let web = Web(this.props.siteURL);
  let count: any = 0;
  try {
    const list = sp.web.lists.getByTitle("Contract Management");
    const items = await list.items.get();


    //let TemID: any[] = [];
    items.map((item) => {

      //TemID.push(item.ID);
      SPServices
        .GetLibraryDocumentForExcel(item)
        .
        then((results) => {
          count++
          results.map((Doc: any) => {
            if (item.ID == Doc.Contract.ID) {
              item.DocumentLink = Doc.EncodedAbsUrl
            }
          })

          if (items.length == count) {
            this.ExportExcelFormat(items)
          }
        });


    });


  } catch (error) {
    console.error(error);
  }
};

private openNewTab(url: string): void {
  window.open(url, '_blank');
}
  


  public render(): React.ReactElement<IContractSubmissionProps> {
    const {

    } = this.props;
    const options: IChoiceGroupOption[] = [
      { key: 'A', text: 'Parent Agreement .' },
      { key: 'B', text: 'Child Document' },
    ];
    const customStyles: Partial<IChoiceGroupStyles> = {

      flexContainer: {
        flexDirection: 'row', // Change the direction of options to horizontal
        display: "flex",
        marginRight: '50px'
      },
    };
    return (
      <section className={`${styles.contractSubmission}`}>
          <div className={styles.ems_body}>
          <div className={styles.row}>

                <div className='styles.col-md-7'>
                    <h4>Contract Submission</h4>
                </div>

                <div className='styles.col-md-7'>
                      <div className={styles.rowTable}>
                          {/* BesaEntity Dropdown */}
                          <div className={styles.colmd3}>
                              <div className={styles.printIcon}>
                                    <DefaultButton className={styles.Exportbtn} onClick={this.exportToExcel}>Export</DefaultButton>

                              </div>
                          </div>
                          <div className={styles.colmd3}>
                                  <div className={styles.printIcon}>
                                      <DefaultButton className={styles.Reportbtn} onClick={() => this.openNewTab('https://app.powerbi.com/reportEmbed?reportId=d0461672-031f-489d-9377-7b6a86c45d0f&autoAuth=true&ctid=8d7a8614-7904-447a-9147-6b74a48adbea')}>Report</DefaultButton>

                                  </div>
                          </div>
                      </div>
                </div>
          </div>

              <br></br>
              <div role='toolbar' aria-label='Onchange Pivot Example'>
                <Pivot aria-label="Basic Pivot Example">
                        <PivotItem headerText="New Request" headerButtonProps={{'data-order': 1,'data-title': 'My Files Title',}}>
                            '<div className={styles.rowTableRadio}>

                                  {/* Readio Option */}
                                  <ChoiceGroup
                                    styles={customStyles}
                                    defaultSelectedKey="A"
                                    options={options}
                                    onChange={this.RadioOnchange}
                                    required={true}
                                  />
                              </div>
                              {
                              this.state.RadioOption == 'Parent Agreement .' &&
                                              <ParentForm
                                              ContractingParty={this.state.ContractingParty}
                                              BindVarExpiredValue={this.state.BindVarExpiredValue}
                                              BindExpiredValue={this.state.BindExpiredValue}
                                              selectedItemID={this.state.selectedItemID}
                                              RequestID={this.state.RequestID}
                                              BesaEntity={this.state.BesaEntity}
                                              ProjectName={this.state.ProjectName}
                                              ContractType={this.state.ContractType}
                                              TransactionType={this.state.TransactionType}
                                              PaymentType={this.state.PaymentType}
                                              Period={this.state.Period}
                                              Context={this.props.Context}
                                              siteURL={this.props.siteURL}
                                              Mode={this.state.Mode}
                                              DisabledValue={this.state.DisabledValue}
                                              RadioOption={this.state.RadioOption}
                                              PopupType={this.state.PopupType}
                                              Documents={this.state.Documents}
                                              BindBesaEntity={this.state.BindBesaEntity}
                                              BindBesaOfficer={this.state.BindBesaOfficer}
                                              BindContractingParty={this.state.BindContractingParty}
                                              BindProjectName={this.state.BindProjectName}
                                              BindDescription={this.state.BindDescription}
                                              Bind_PaymentType={this.state.Bind_PaymentType}
                                              BindVendorPointOfContact={this.state.BindVendorPointOfContact}
                                              BindTotalContractValue={this.state.BindTotalContractValue}
                                              BindBudgetId={this.state.BindBudgetId}
                                              BindPointOfContactAddress={this.state.BindPointOfContactAddress}
                                              BindComments={this.state.BindComments}
                                              BindContractDate={this.state.BindContractDate}
                                              BindContractType={this.state.BindContractType}
                                              BindTransactionType={this.state.BindTransactionType}
                                              IPeriodicallyModel={this.state.IPeriodicallyModel}
                                              IMilestoneBasedModel={this.state.IMilestoneBasedModel}
                                              IVariablePeriodicallyModel={this.state.IVariablePeriodicallyModel}
                                              IInsuranceModel={this.state.IInsuranceModel}
                                              IObligationModel={this.state.IObligationModel}
                                              BindFixedValue={this.state.BindFixedValue}
                                              BindVarFixedValue={this.state.BindVarFixedValue}
                                              BindAutoRenewalValue={this.state.BindAutoRenewalValue}
                                              BindVarAutoRnewal={this.state.BindVarAutoRnewal}
                                              BindRenewalByNoticeValue={this.state.BindRenewalByNoticeValue}
                                              BindVarRenewalNotice={this.state.BindVarRenewalNotice}
                                              BindVarPerpetual={this.state.BindVarPerpetual}
                                              BindPerpetualValue={this.state.BindPerpetualValue}
                                              BindVarDiscretionary={this.state.BindVarDiscretionary}
                                              BindDiscretionaryValue={this.state.BindDiscretionaryValue}
                                              BindVarTerminationBreach={this.state.BindVarTerminationBreach}
                                              BindTerminationBreachValue={this.state.BindTerminationBreachValue}
                                              BindVarTerminationStopping={this.state.BindVarTerminationStopping}
                                              BindTerminationStoppingValue={this.state.BindTerminationStoppingValue}
                                              BindTerminationDate={this.state.BindTerminationDate}
                                              BindRenewalNoticeDate={this.state.BindRenewalNoticeDate}
                                              BindTerminationPeriod={this.state.BindTerminationPeriod}
                                              BindDateToExtend={this.state.BindDateToExtend}
                                              BindDaysForNotice={this.state.BindDaysForNotice}
                                              BindRecoveryPeriod={this.state.BindRecoveryPeriod}
                                              BindNoOfDays={this.state.BindNoOfDays}
                                              BindAmountUSD={this.state.BindAmountUSD}
                                              BindBindRiskFactor={this.state.BindBindRiskFactor}
                                              BindReminderDate={this.state.BindReminderDate}
                                              BindBindReminderComment={this.state.BindBindReminderComment}
                                              BindPaymentDate={this.state.BindPaymentDate}
                                              BindStatus={this.state.BindStatus}
                                              selectedContractSubmission={this.state.selectedContractSubmission}
                                              />
                              }
                               {
                                this.state.RadioOption == 'Child Document' &&
                               <ChildSubmittedRequest 
                               IContractItems={this.state.IContractItems}
                               OpenEditForm={this.OpenEditForm}
                               allContractItems={this.state.allContractItems}
                               />
                               }
                               <ModelPopup 
                                                ContractingParty={this.state.ContractingParty}
                                                BindVarExpiredValue={this.state.BindVarExpiredValue}
                                              BindExpiredValue={this.state.BindExpiredValue}
                                                RequestID={this.state.RequestID}
                                                selectedItemID={this.state.selectedItemID}
                                                BesaEntity={this.state.BesaEntity}
                                                ProjectName={this.state.ProjectName}
                                                ContractType={this.state.ContractType}
                                                TransactionType={this.state.TransactionType}
                                                PaymentType={this.state.PaymentType}
                                                Period={this.state.Period}
                                                Context={this.props.Context}
                                                siteURL={this.props.siteURL} 
                                                Documents={this.state.Documents}
                                                PopupType={this.state.PopupType}
                                                openEditDialog={this.state.openEditDialog}
                                                DisabledValue={this.state.DisabledValue}
                                                RadioOption={this.state.RadioOption}
                                                ExitHandler={this.ExitHandler} // Pass the function as a prop
                                                BindBesaEntity={this.state.BindBesaEntity}
                                                BindBesaOfficer={this.state.BindBesaOfficer}
                                                BindContractingParty={this.state.BindContractingParty}
                                                BindProjectName={this.state.BindProjectName}
                                                BindDescription={this.state.BindDescription}
                                                Mode={this.state.Mode}
                                                Bind_PaymentType={this.state.Bind_PaymentType}
                                                BindVendorPointOfContact={this.state.BindVendorPointOfContact}
                                                BindTotalContractValue={this.state.BindTotalContractValue}
                                                BindBudgetId={this.state.BindBudgetId}
                                                BindPointOfContactAddress={this.state.BindPointOfContactAddress}
                                                BindComments={this.state.BindComments}
                                                BindContractDate={this.state.BindContractDate}
                                                BindContractType={this.state.BindContractType}
                                                BindTransactionType={this.state.BindTransactionType}
                                                IPeriodicallyModel={this.state.IPeriodicallyModel}
                                                IMilestoneBasedModel={this.state.IMilestoneBasedModel}
                                                IVariablePeriodicallyModel={this.state.IVariablePeriodicallyModel}
                                                IInsuranceModel={this.state.IInsuranceModel}
                                                IObligationModel={this.state.IObligationModel}
                                                BindFixedValue={this.state.BindFixedValue}
                                                BindVarFixedValue={this.state.BindVarFixedValue}
                                                BindAutoRenewalValue={this.state.BindAutoRenewalValue}
                                                BindVarAutoRnewal={this.state.BindVarAutoRnewal}
                                                BindRenewalByNoticeValue={this.state.BindRenewalByNoticeValue}
                                                BindVarRenewalNotice={this.state.BindVarRenewalNotice}
                                                BindVarPerpetual={this.state.BindVarPerpetual}
                                                BindPerpetualValue={this.state.BindPerpetualValue}
                                                BindVarDiscretionary={this.state.BindVarDiscretionary}
                                                BindDiscretionaryValue={this.state.BindDiscretionaryValue}
                                                BindVarTerminationBreach={this.state.BindVarTerminationBreach}
                                                BindTerminationBreachValue={this.state.BindTerminationBreachValue}
                                                BindVarTerminationStopping={this.state.BindVarTerminationStopping}
                                                BindTerminationStoppingValue={this.state.BindTerminationStoppingValue}
                                                BindTerminationDate={this.state.BindTerminationDate}
                                                BindRenewalNoticeDate={this.state.BindRenewalNoticeDate}
                                                BindTerminationPeriod={this.state.BindTerminationPeriod}
                                                BindDateToExtend={this.state.BindDateToExtend}
                                                BindDaysForNotice={this.state.BindDaysForNotice}
                                                BindRecoveryPeriod={this.state.BindRecoveryPeriod}
                                                BindNoOfDays={this.state.BindNoOfDays}
                                                BindAmountUSD={this.state.BindAmountUSD}
                                                BindBindRiskFactor={this.state.BindBindRiskFactor}
                                                BindReminderDate={this.state.BindReminderDate}
                                                BindBindReminderComment={this.state.BindBindReminderComment}
                                                BindPaymentDate={this.state.BindPaymentDate}
                                                BindStatus={this.state.BindStatus}
                                                selectedContractSubmission={this.state.selectedContractSubmission}
                                      />          
                        </PivotItem>
                        <PivotItem headerText="Submitted Requested">

                                              <SubmittedRequest 
                                              items={this.state.items}
                                              OpenEditForm={this.OpenEditForm}
                                              />     
                                      <ModelPopup 
                                                ContractingParty={this.state.ContractingParty}
                                                BindVarExpiredValue={this.state.BindVarExpiredValue}
                                              BindExpiredValue={this.state.BindExpiredValue}
                                                RequestID={this.state.RequestID}
                                                selectedItemID={this.state.selectedItemID}
                                                BesaEntity={this.state.BesaEntity}
                                                ProjectName={this.state.ProjectName}
                                                ContractType={this.state.ContractType}
                                                TransactionType={this.state.TransactionType}
                                                PaymentType={this.state.PaymentType}
                                                Period={this.state.Period}
                                                Context={this.props.Context}
                                                siteURL={this.props.siteURL} 
                                                PopupType={this.state.PopupType}
                                                Documents={this.state.Documents}
                                                openEditDialog={this.state.openEditDialog}
                                                DisabledValue={this.state.DisabledValue}
                                                RadioOption={this.state.RadioOption}
                                                ExitHandler={this.ExitHandler} // Pass the function as a prop
                                                BindBesaEntity={this.state.BindBesaEntity}
                                                BindBesaOfficer={this.state.BindBesaOfficer}
                                                BindContractingParty={this.state.BindContractingParty}
                                                BindProjectName={this.state.BindProjectName}
                                                BindDescription={this.state.BindDescription}
                                                Mode={this.state.Mode}
                                                Bind_PaymentType={this.state.Bind_PaymentType}
                                                BindVendorPointOfContact={this.state.BindVendorPointOfContact}
                                                BindTotalContractValue={this.state.BindTotalContractValue}
                                                BindBudgetId={this.state.BindBudgetId}
                                                BindPointOfContactAddress={this.state.BindPointOfContactAddress}
                                                BindComments={this.state.BindComments}
                                                BindContractDate={this.state.BindContractDate}
                                                BindContractType={this.state.BindContractType}
                                                BindTransactionType={this.state.BindTransactionType}
                                                IPeriodicallyModel={this.state.IPeriodicallyModel}
                                                IMilestoneBasedModel={this.state.IMilestoneBasedModel}
                                                IVariablePeriodicallyModel={this.state.IVariablePeriodicallyModel}
                                                IInsuranceModel={this.state.IInsuranceModel}
                                                IObligationModel={this.state.IObligationModel}
                                                BindFixedValue={this.state.BindFixedValue}
                                                BindVarFixedValue={this.state.BindVarFixedValue}
                                                BindAutoRenewalValue={this.state.BindAutoRenewalValue}
                                                BindVarAutoRnewal={this.state.BindVarAutoRnewal}
                                                BindRenewalByNoticeValue={this.state.BindRenewalByNoticeValue}
                                                BindVarRenewalNotice={this.state.BindVarRenewalNotice}
                                                BindVarPerpetual={this.state.BindVarPerpetual}
                                                BindPerpetualValue={this.state.BindPerpetualValue}
                                                BindVarDiscretionary={this.state.BindVarDiscretionary}
                                                BindDiscretionaryValue={this.state.BindDiscretionaryValue}
                                                BindVarTerminationBreach={this.state.BindVarTerminationBreach}
                                                BindTerminationBreachValue={this.state.BindTerminationBreachValue}
                                                BindVarTerminationStopping={this.state.BindVarTerminationStopping}
                                                BindTerminationStoppingValue={this.state.BindTerminationStoppingValue}
                                                BindTerminationDate={this.state.BindTerminationDate}
                                                BindRenewalNoticeDate={this.state.BindRenewalNoticeDate}
                                                BindTerminationPeriod={this.state.BindTerminationPeriod}
                                                BindDateToExtend={this.state.BindDateToExtend}
                                                BindDaysForNotice={this.state.BindDaysForNotice}
                                                BindRecoveryPeriod={this.state.BindRecoveryPeriod}
                                                BindNoOfDays={this.state.BindNoOfDays}
                                                BindAmountUSD={this.state.BindAmountUSD}
                                                BindBindRiskFactor={this.state.BindBindRiskFactor}
                                                BindReminderDate={this.state.BindReminderDate}
                                                BindBindReminderComment={this.state.BindBindReminderComment}
                                                BindPaymentDate={this.state.BindPaymentDate}
                                                BindStatus={this.state.BindStatus}
                                                selectedContractSubmission={this.state.selectedContractSubmission}
                                      />          
                        </PivotItem> 
                </Pivot>
              </div>

           </div> 
     </section>
    );
  }
}
