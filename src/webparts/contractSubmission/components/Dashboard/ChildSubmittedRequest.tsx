import * as React from 'react';
import styles from '../ContractSubmission.module.scss';

import { FontIcon, TextField } from 'office-ui-fabric-react';
import { IChildsItems } from './IChildsItems';

export interface ChildSubmittedRequestProps{
  IContractItems:any;
  allContractItems:any[];
  OpenEditForm: (action: string, item: IChildsItems,Mode:string) => void;
}


export default class SubmittedRequest extends React.Component<ChildSubmittedRequestProps,{}> {
    constructor(props) {
    
        super(props);
        this.state = {
      
        }
    }
    public renderDynamicId(idx: any) {
      return '#demo' + idx
    }
    public renderId(idx: any) {
      return 'demo' + idx
    }

    _renderTable() {
      return this.props.IContractItems.map((item: any, idx: any) => {
  
        return (
          <>
            <tr key={idx} className={"accordion-toggle"}>
  
              <td>
                <button className="btn btn-default btn-xs" data-toggle={"collapse"} data-target={this.renderDynamicId(idx)}>
                  <FontIcon aria-label="Childof" iconName="Childof" />
  
                </button>
              </td>
              <td className={styles.Childtable}>{this.props.IContractItems[idx].BesaEntity}</td>
              <td className={styles.Childtable}>{this.props.IContractItems[idx].ProjectName}</td>
              <td className={styles.Childtable}> {this.props.IContractItems[idx].Title}</td>
              <td className={styles.Childtable}>{this.props.IContractItems[idx].TransactionType}</td>
              <td className={styles.Childtable}>{this.props.IContractItems[idx].BesaOfficer}</td>
              <td className={styles.Childtable}> {this.props.IContractItems[idx].RequestID}</td>
              <td className={styles.Childtable}>
                <button type="button" className={styles.EditBtn}
                  id="add-row" onClick={() => this.props.OpenEditForm("ParentEdit", item,"Edit")}><i className="fa fa-pencil-square-o" title="Show Progress"></i></button>
              </td>
              <td className={styles.Childtable}>
                <button type="button" className={styles.EditBtn}
                  id="add-row" onClick={() => this.props.OpenEditForm("ViewMySubmission", item,"Edit")}><i className="fa fa-eye" title="Show Progress"></i></button>
              </td>
            </tr>
  
            {this.props.IContractItems[idx].childs.length > 0 &&
              <tr>
                <td colSpan={12} className={styles.hiddenRow}>
                  <div className={"accordian-body collapse"} id={this.renderId(idx)}>
  
  
                    <table className={styles.styledtableChild}>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Besa Entity</th>
                          <th>Project Name</th>
                          <th>Vendor Name</th>
                          <th>Transaction Type</th>
                          <th>RequestID</th>
                          <th></th>
                          <th></th>
  
                        </tr>
                      </thead>
                      <tbody>
  
                        {this.renderChildTable(this.props.IContractItems[idx].childs, item.Id)}
                      </tbody>
                    </table>
  
                  </div>
                </td>
              </tr>
            }
          </>
        );
  
      });
    }
    renderChildTable(childItems: any, parentID: any) {
      return childItems.map((childItem: any, childIdx: any) => {
        return (
          <tr key={childIdx}>
  
            <td> </td>
            <td> {childItems[childIdx].BesaEntity}</td>
            <td> {childItems[childIdx].ProjectName}</td>
            <td> {childItems[childIdx].Title}</td>
            <td> {childItems[childIdx].TransactionType}</td>
            {/* <td> {childItems[childIdx].BesaOfficer}</td> */}
            <td> {childItems[childIdx].RequestID}</td>
            <td>
              <button type="button" className={styles.EditBtn}
                id="add-row" onClick={() => this.props.OpenEditForm("ChildEdit", childItem,"Edit")}><i className="fa fa-pencil-square-o" title="Show Progress"></i></button>
            </td>
            <td>
              <button type="button" className={styles.EditBtn}
                id="add-row" onClick={() => this.props.OpenEditForm("ViewChildSubmission", childItem,"Edit")}><i className="fa fa-eye" title="Show Progress"></i></button>
            </td>
          </tr>
        );
  
      });
    }

    private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {

      this.setState({
  
        IContractItems: text ? this.props.allContractItems.filter(i =>
          i.Title.toLowerCase().indexOf(text.toLowerCase()) > -1) : this.props.allContractItems,
  
      });
  
    };

    render() {
    return (
      <section className={`${styles.contractSubmission}`}>
                   
                   
                   <div className={'container'}>
                                    <div className={"col-md-12"}>
                                      <TextField

                                        placeholder='Search by Vendor...'
                                        onChange={this._onFilter}
                                      />
                                      <br></br>
                                      <div className={"panel panel-default"}>
                                        <div className={"panel-heading"}>
                                        </div>
                                        <div className={"panel-body"}>
                                          <table className={styles.styledtableParent}>
                                            <thead>
                                              <tr>
                                                <th></th>
                                                <th>Besa Entity</th>
                                                <th>Project Name</th>
                                                <th>Vendor Name</th>
                                                <th>Transaction Type</th>
                                                <th>Besa Officer</th>
                                                <th>Request ID</th>
                                                <th></th>
                                                <th></th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {this._renderTable()}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>

                                    </div>
                                  </div>

      </section>
    );
  }
}
