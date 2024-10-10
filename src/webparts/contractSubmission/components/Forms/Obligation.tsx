import * as React from 'react';
import styles from '../ContractSubmission.module.scss';
import { Icon } from 'office-ui-fabric-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import 'font-awesome/css/font-awesome.min.css';

export interface ObligationProps {
  IObligation: any[];
  _handleObligationAddRow: () => void;
  _handleRemoveObligationSpecificRow: (index: number) => void;
  _handleChangeObligation: (index: number, evt: any) => void;
  DisabledValue:boolean;
  idx:number;
  item:any
}

export default class Obligation extends React.Component<ObligationProps> {
  render() {
    const {  _handleChangeObligation, _handleRemoveObligationSpecificRow} = this.props;

    // var selectHeight = {
    //   color: 'black',
    //   'margin-top': '6px',
    // };
    return (
      <div>
      
          <div key={this.props.idx} className={styles.PopuprenderPeriodicallyTbl}>
              <div className="form-group col-md-2">
              {this.props.idx === 0 && <label className={styles.lblCtrl}>Description</label>}
            <input
              placeholder='Type Description'
              type="text"
              className='form-control'
              name="Description"
              value={this.props.item.Description}
              onChange={(e) => _handleChangeObligation(this.props.idx, e)}
              id={this.props.item.id}
              disabled={this.props.DisabledValue}
            />
           </div>

            <div className="form-group col-md-2">
              {this.props.idx === 0 && <label className={styles.lblCtrl}>First Payment Date</label>}
           <input
              placeholder='Select Date'
              className='form-control'
              type="date"
              id={this.props.item.id}
              value={this.props.item.Date}
              name="Date"
              onChange={(e) => _handleChangeObligation(this.props.idx, e)}
              onKeyDown={(e) => e.preventDefault()}
              disabled={this.props.DisabledValue}
            />

            </div>

            <div className="form-group col-md-2">
              {this.props.idx === 0 && <label className={styles.lblCtrl}>Amount (USD) </label>}
               <input
              placeholder='Frequency'
              type="text"
              className='form-control'
              name="Frequency"
              value={this.props.item.Frequency}
              onChange={(e) => _handleChangeObligation(this.props.idx, e)}
              id={this.props.item.id}
              disabled={this.props.DisabledValue}
            />
            </div>

            

            {/* {IObligation.length > 1 && ( */}
              <div className="form-group col-md-1">
                <div onClick={() => _handleRemoveObligationSpecificRow(this.props.idx)} className={styles.deleteIcon}>
                  <Icon iconName="delete" className="ms-IconExample" />
                </div>
              </div>
            {/* )} */}
          </div>
       
        
      </div>
    );
  }
}
