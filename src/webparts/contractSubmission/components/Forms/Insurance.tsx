import * as React from 'react';
import styles from '../ContractSubmission.module.scss';
import { Icon } from 'office-ui-fabric-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import 'font-awesome/css/font-awesome.min.css';

export interface InsuranceProps {
  IInsurance: any[];
  _handleInsuranceAddRow: () => void;
  _handleRemoveInsuranceSpecificRow: (index: number) => void;
  _handleChangeInsurance: (index: number, evt: any) => void;
  DisabledValue:boolean;
  idx:number;
  item:any
}

export default class Obligation extends React.Component<InsuranceProps> {
  render() {
    const { _handleChangeInsurance, _handleRemoveInsuranceSpecificRow} = this.props;
    return (
      <div>
       
          <div key={this.props.idx} className={styles.PopuprenderPeriodicallyTbl}>

              <div className="form-group col-md-2">
              {this.props.idx === 0 && <label className={styles.lblCtrl}>Type of Insurance</label>}
              <input
              placeholder='Type of Insurance'
              type="text"
              className='form-control'
              name="Insurance"
              value={this.props.item.Insurance}
              onChange={(e) => _handleChangeInsurance(this.props.idx, e)}
              id={this.props.item.id}
              disabled={this.props.DisabledValue}
            />
        
           </div>

            <div className="form-group col-md-2">
              {this.props.idx === 0 && <label className={styles.lblCtrl}>Amount</label>}
              <input
              placeholder='Type Amount'
              type="text"
              className='form-control'
              name="Amount"
              value={this.props.item.Amount}
              onChange={(e) => _handleChangeInsurance(this.props.idx, e)}
              id={this.props.item.id}
              disabled={this.props.DisabledValue}
            />

            </div>

            <div className="form-group col-md-2">
              {this.props.idx === 0 && <label className={styles.lblCtrl}>Comment</label>}
              <textarea
              placeholder='Type Comment'
              rows={3}
              cols={50}
              className='form-control'
              name="Comment"
              value={this.props.item.Comment}
              onChange={(e) => _handleChangeInsurance(this.props.idx, e)}
              id={this.props.item.id}
              disabled={this.props.DisabledValue}
            />
            </div>
            {/* {IInsurance.length > 1 && ( */}
              <div className="form-group col-md-1">
                <div onClick={() => _handleRemoveInsuranceSpecificRow(this.props.idx)} className={styles.deleteIcon}>
                  <Icon iconName="delete" className="ms-IconExample" />
                </div>
              </div>
            {/* )} */}
          </div>
      
        
      </div>
    );
  }
}
